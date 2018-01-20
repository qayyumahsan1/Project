/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/*global jQuery: false, sap: false, travel: false */

jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("travel.request.create.util.Formatters");
jQuery.sap.require("travel.request.create.util.InputHelper");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.m.MessageBox");

sap.ca.scfld.md.controller.BaseDetailController.extend("travel.request.create.view.DetailForm",
		{

			/**
			 * [onInit is loaded when DetailForm.view.app.xml is loaded]
			 * 
			 * @return {[type]} [description]
			 */
			onInit : function() {
				// sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit.call(this);

				this.oResourceBundle = this.oApplicationFacade.getResourceBundle();
				this.oDataModel = this.oApplicationFacade.getODataModel();

				this.viewModes = {
					"NewTravel" : 1,
					"EditTravel" : 2
				};

				var that = this;
				var view = this.getView();
				this.setHeaderFooterOptions(this.createHeaderFooterOptions());
				this.oRouter.attachRouteMatched(function(oEvent) {
					var page = this.byId("TRC_NEW_PAGE");
					page.scrollTo(0);
					var context = new sap.ui.model.Context(view.getModel(), "/" + oEvent.getParameter("arguments").contextPath);
					
					if (oEvent.getParameter("name") === "new") {
//						this.updateModelWithCostCenterTypes();
						page.setTitle(that.oResourceBundle.getText("TRC_NEW_PAGE"));
						that.viewMode = that.viewModes.NewTravel;
						this.callValueHelps(that.viewMode);
						this.createEmptyRequestModel();
					}
					
					if (oEvent.getParameter("name") === "edit") {
//						this.updateModelWithCostCenterTypes();
						this.getView().bindElement(context.sPath);
						// refresh the detail form view data from the bindings before the page is dispalyed
						this.getView().getModel().updateBindings(true);
						page.setTitle(that.oResourceBundle.getText("TRC_EDIT_PAGE"));
						that.viewMode = that.viewModes.EditTravel;
						that.detailContextPath = context.sPath;
						this.callValueHelps(that.viewMode, context.sPath);
						this.createEmptyRequestModel();
						this.resetControlState();
						
					}
					
					if (oEvent.getParameter("name") === "edit" || oEvent.getParameter("name") === "new") {
						this.oDataModel.resetChanges();
						this.buffer =  new sap.ui.model.json.JSONModel({
								validatedCountryCode : "",
								countryHasRegions    : false
							});
						var oFormCountry = this.byId("MB_FORM_COUNTRY");
						var oFormPerDiemRegion = this.byId("MB_FORM_PER_DIEM_REGION");
						var oFormDestination = this.byId("MB_FORM_DESTINATION");
						var bWithPerDiemRegions = this.isPerDiemRegionsEnabled();
						if (oFormCountry) {
							oFormCountry.setVisible(bWithPerDiemRegions);
						}
						if (oFormPerDiemRegion) {
							oFormPerDiemRegion.setVisible(bWithPerDiemRegions);
						}
						if (oFormDestination) {
							oFormDestination.setVisible(!bWithPerDiemRegions);
						}
						if (bWithPerDiemRegions) {
							if (oEvent.getParameter("name") === "edit") {
								var oCountryField = this.byId("Trc_SD_Country");
								var sCountryCode = this.getCodeFromFormattedValue(oCountryField.getValue());
								this.handlePerDiemRegionVisibility(sCountryCode, false);
							} else { // "new"
								oFormPerDiemRegion.setVisible(false);
							}
						}
					}
				}, this);

			},
					
			isPerDiemRegionsEnabled : function () {
				var oModel = this.oApplicationFacade.getODataModel();
				var oRegions = oModel.oMetadata._getEntityTypeName("Regions");
				
				return (oRegions !== undefined);
			},				

			callValueHelps : function(viewMode, contextPath) {
				// Create batch operation array
				var aBatchOperations = [];
				var oBatchOperation;
				var that = this;

				var oModel = this.getView().getModel();
				oModel.clearBatch();

				oBatchOperation = oModel.createBatchOperation("Countries", "GET");
				aBatchOperations.push(oBatchOperation);

				oBatchOperation = oModel.createBatchOperation("Currencies", "GET");
				aBatchOperations.push(oBatchOperation);

				oBatchOperation = oModel.createBatchOperation("TripActivities", "GET");
				aBatchOperations.push(oBatchOperation);

				oBatchOperation = oModel.createBatchOperation("UserInfo", "GET");
				aBatchOperations.push(oBatchOperation);

				if (viewMode === this.viewModes.EditTravel) {
					oBatchOperation = oModel.createBatchOperation(contextPath + "/CostAssignments", "GET");
					aBatchOperations.push(oBatchOperation);
				}

				// Set the change operation array to the data model
				oModel.addBatchReadOperations(aBatchOperations);
				// Execute the bach operations

				// execute the Batch request
				this._setBusyOn();

				oModel.submitBatch(function(oData, oResponse, aErrorResponses) {
					that.createModels(oData, viewMode);
					
					if (viewMode === that.viewModes.NewTravel) {
						that.intiateCostAssignments();
						that.cleanUpForm();
					} else {
						that.createCostAssignmentsModel();						
					}
					
				}, function(oError) {
					that._onRequestFailed(oError);
				}, true);
			},

			createModels : function(oData, viewMode) {
				var that = this;
				oData = JSON.parse(JSON.stringify(oData));
				var batchResponses = oData.__batchResponses;
				var DestinationJSON = null;
				
				if (batchResponses[0]) {
					DestinationJSON = batchResponses[0].data;
					var oDestinationModel = new sap.ui.model.json.JSONModel(DestinationJSON);
					oDestinationModel.setSizeLimit(500);
					this.getView().setModel(oDestinationModel, "Destination");
				}

				var CurrenciesJSON = null;
				if (batchResponses[1]) {
					CurrenciesJSON = batchResponses[1].data;
					var oCurrenciesModel = new sap.ui.model.json.JSONModel(CurrenciesJSON);
					oCurrenciesModel.setSizeLimit(500);
					this.getView().setModel(oCurrenciesModel, "Currencies");
				}

				/*
				 * var CostCentersJSON = null; if (batchResponses[2]) { CostCentersJSON = batchResponses[2].data; var
				 * oCostCentersModel = new sap.ui.model.json.JSONModel(CostCentersJSON); oCostCentersModel.setSizeLimit(500);
				 * this.getView().setModel(oCostCentersModel, "CostCenters"); }
				 */

				var TripActivitiesJSON = null;
				if (batchResponses[2]) {
					TripActivitiesJSON = batchResponses[2].data;
					var oTripActivitiesModel = new sap.ui.model.json.JSONModel(TripActivitiesJSON);
					oTripActivitiesModel.setSizeLimit(500);
					this.getView().setModel(oTripActivitiesModel, "TripActivities");
				}

				var UserInfoJSON = null;
				if (batchResponses[3]) {
					UserInfoJSON = batchResponses[3].data;
					var oUserInfoModel = new sap.ui.model.json.JSONModel(UserInfoJSON);
					oUserInfoModel.setSizeLimit(500);
					this.getView().setModel(oUserInfoModel, "UserInfo");
					this.updateModelWithCostCenterTypes(); //cost centers are dependent from UserInfo
				}

				if (viewMode === this.viewModes.EditTravel) {
					var CostAssignmentsJSON = null;
					if (batchResponses[4]) {
						CostAssignmentsJSON = batchResponses[4].data;
						var oCostAssignmentsModel = new sap.ui.model.json.JSONModel(CostAssignmentsJSON);
						oCostAssignmentsModel.setSizeLimit(500);
						this.getView().setModel(oCostAssignmentsModel, "CostAssignments");
					}
				}

				/*
				 * var InternalOrdersJSON = null; if (batchResponses[4]) { InternalOrdersJSON = batchResponses[4].data; var
				 * oInternalOrdersModel = new sap.ui.model.json.JSONModel(InternalOrdersJSON);
				 * oInternalOrdersModel.setSizeLimit(500); this.getView().setModel(oInternalOrdersModel, "InternalOrders"); }
				 */

				/*
				 * var SalesOrdersJSON = null; if (batchResponses[5]) { SalesOrdersJSON = batchResponses[5].data; var
				 * oSalesOrdersModel = new sap.ui.model.json.JSONModel(SalesOrdersJSON); oSalesOrdersModel.setSizeLimit(500);
				 * this.getView().setModel(oSalesOrdersModel, "SalesOrders"); }
				 */

				that._setBusyOff();
			},

			/**
			 * [createEmptyRequestModel description]
			 */
			createEmptyRequestModel : function() {
				this.CreateTravelRequestModel = new sap.ui.model.json.JSONModel({
					"Purpose" : "",
					"TripActivity" : "",
					"Departure" : "",
					"Arrival" : "",
					"CountryCode" : "",
					"RegionCode" : "",
					"Location" : "",
					"EstimatedCost" : {
						Value : '',
						Currency : ''
					},
					"Note" : ""
				});
			},

			/**
			 * [cleanUpForm description]
			 */
			cleanUpForm : function() {
				var curDate = travel.request.create.util.Formatters.getTodayDate();
				var oToday = new Date(); // this is for setting nonconverted value

				this.byId("Trc_I_Purpose").setValue("");
				this.byId("Trc_s_Activity").setSelectedKey("");
				this.byId("Trc_D_From").setValue(curDate);
				this.byId("Trc_D_From").setDateValue(oToday);
				this.byId("Trc_D_To").setValue(curDate);
				this.byId("Trc_D_To").setDateValue(oToday);
				this.byId("Trc_SD_Destination").setValue("");
				this.byId("Trc_SD_Country").setValue("");
				this.byId("Trc_SD_PerDiemRegion").setValue("");
				this.byId("Trc_E_City").setValue("");
				this.byId("Trc_E_Cost").setValue("");
				
				if(!this.checkGlobalSettingsFixedCurrency())
					{
						var userInfo = this.getUserInfo();
						this.byId("Trc_SC_Currency").setValue(userInfo.Currency );
					}
				else
					{
						this.byId("Trc_SC_Currency").setValue("");
					}				
				
				this.byId("Trc_L_Note").setValue("");

				// TODO: cost assignments

				this.resetControlState();
			},

				
			resetControlState : function() {
				this.byId("Trc_I_Purpose").setValueState(sap.ui.core.ValueState.None);
				// this.byId("Trc_s_Activity").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_D_From").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_D_To").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_SD_Destination").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_SD_Country").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_SD_PerDiemRegion").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_E_City").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_E_Cost").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_SC_Currency").setValueState(sap.ui.core.ValueState.None);
				this.byId("Trc_L_Note").setValueState(sap.ui.core.ValueState.None);

				// TODO: cost assignmets
			},

			/**
			 * [createModel creates json model]
			 * 
			 * @param modelName
			 * @param sParam
			 * @returns
			 */
			createModel : function(modelName, sParam) {
				
				var oModel = new sap.ui.model.json.JSONModel();
				
				var onRequestSuccess = function(oData, oResponse) {
					oModel.setData(oData);
				};
				
				oModel.setSizeLimit(500);
				this.getView().setModel(oModel, modelName);
				this.oDataModel.read(sParam, null, null, true, jQuery.proxy(onRequestSuccess, this), jQuery.proxy(
						this._onRequestFailed, this));
				return modelName;
			},
			

			/**
			 * [updateModelWithCostCenterTypes description]
			 */
			updateModelWithCostCenterTypes : function() {
				
				var aTypes = [];
				var UserInfo = this.getUserInfo();
				var GlobalSettings;
		 	
				if(UserInfo.GlobalSettings)
						{
						  GlobalSettings = UserInfo.GlobalSettings;
						}						 
				
				if( GlobalSettings )
					{
					
					if( GlobalSettings.CostObjectNetwork )
						{
						 aTypes.push({
							 "name" : this.oResourceBundle.getText("TRC_NETWORK"),
							 "key" : "Network"
						 	});						
						}
					 if( GlobalSettings.CostObjectNetworkActivity )						
						{
						 aTypes.push({
							"name" : this.oResourceBundle.getText("TRC_NETWORK_ACTIVITY"),
							"key" : "NetworkActivity"
							 });							
						}
					if( GlobalSettings.CostObjectProject )						
					{
					 aTypes.push({
							"name" : this.oResourceBundle.getText("TRC_PROJECT"),
							"key" : "Project"
							 });							
					}
					if( GlobalSettings.CostObjectCostCenter )						
					{
					 aTypes.push({
							"name" : this.oResourceBundle.getText("TRC_COST_CENTER"),
							"key" : "CostCenter"
							 });							
					}
					if( GlobalSettings.CostObjectInternalOrder )						
					{
					 aTypes.push({
							"name" : this.oResourceBundle.getText("TRC_INTERNAL_ORDER"),
							"key" : "InternalOrder"
							 });							
					}
					if( GlobalSettings.CostObjectSalesOrderItem )						
					{
					 aTypes.push({
							"name" : this.oResourceBundle.getText("TRC_SALES_ORDER_ITEM"),
							"key" : "SalesOrderItem"
							 });							
					}					
					
				}
				else
					{
				
				    aTypes = [{
					"name" : this.oResourceBundle.getText("TRC_COST_CENTER"),
					"key" : "CostCenter"
				}, {
					"name" : this.oResourceBundle.getText("TRC_INTERNAL_ORDER"),
					"key" : "InternalOrder"
				}, {
					"name" : this.oResourceBundle.getText("TRC_SALES_ORDER"),
					"key" : "SalesOrder"
				}];
					}
				
				var oModel = new sap.ui.model.json.JSONModel(aTypes);
				oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
				this.getView().setModel(oModel, "costObjects");
					
				},

			/**
			 * [intiateCostAssignments description]
			 */
			intiateCostAssignments : function() {
				 
					var UserInfo = this.getUserInfo();
					var defaultCostCenter;
					var defaultCostCenterName;					
				 
					defaultCostCenter = UserInfo.CostCenter;	
					defaultCostCenterName = UserInfo.CostCenterName;
					 			
				

				var CostAssignments = [{
					"title" : this.oResourceBundle.getText("TRC_LBL_COST_CENTER"),
					"counter" : 1,
					"percentage" : 100,
					"orderItemDisplayed" : false,
					"selectedCostObject" : defaultCostCenter,
					"displaySelectedCostObjectField" : false,
					"selectedCostObjectDesc" : defaultCostCenterName + " (" + defaultCostCenter + ")",
					"selectedCostObjectType" : "CostCenter",
					"removeDisplayed" : false
				}];
				var oModel = new sap.ui.model.json.JSONModel(CostAssignments);
				this.getView().setModel(oModel, "CostAssignmentsModel");

			},

			createCostAssignmentsModel : function() {
				if (this.getView().getModel("CostAssignments") !== undefined) {
					var costAssignments = this.getView().getModel("CostAssignments").getData().results;
					var costCenters = [];
					var i;
					for (i = 0; i < costAssignments.length; i++) {
						var costCenter = {};
						if (i === 0) {
							costCenter.title = this.oResourceBundle.getText("TRC_LBL_COST_CENTER");
							costCenter.removeDisplayed = false;
						}

						costCenter.Id = i;
						costCenter.selectedCostObjectDesc = costAssignments[i].CostObjectName + " ("
								+ costAssignments[i].CostObjectId + ")";
						costCenter.selectedCostObjectType = costAssignments[i].CostObjectType;
						costCenter.selectedSalesOrderItem = costAssignments[i].CostObjectItemId;
						costCenter.selectedSalesOrderItemDescription = costAssignments[i].CostObjectItemName;
						costCenter.selectedCostObject = costAssignments[i].CostObjectId;
						costCenter.percentage = costAssignments[i].Percentage;
						costCenters.push(costCenter);
						if (costCenter.selectedCostObjectType == "SalesOrder") {
							this._soId = costCenter.selectedCostObject;
							costCenter.displaySelectedCostObjectField = true;
							costCenter.orderItemDisplayed = false;
						} else
							costCenter.displaySelectedCostObjectField = false;
						costCenter.supported = this.isCostCenterTypeSupported(costCenter.selectedCostObjectType);
						costCenter.showNotEditableField = !costCenter.supported; // this property is used to hide/show fields
						// when
						// the
						// cost object type is not supported (e.g.: when a
						// cost object is not supported we display a label
						// instead of a select or a button in the form)
					}
					var oModel = new sap.ui.model.json.JSONModel(costCenters);
					this.getView().setModel(oModel, "CostAssignmentsModel");
				}
			},

			isCostCenterTypeSupported : function(sCostCenterType) {
				var aCostCenterTypes = this.getView().getModel("costObjects").getData();
				for ( var i = 0; i < aCostCenterTypes.length; i++) {
					if (sCostCenterType == aCostCenterTypes[i].key)
						return true;
				}
				return false;
			},
			
			clearPerDiemRegionFormField : function() {
				var oField = this.byId("Trc_SD_PerDiemRegion");
				var oContext = this.getView().getBindingContext();
				if (oField) {
					oField.setValueState(sap.ui.core.ValueState.None);
					this.oDataModel.setProperty("/Regions", []);
					if (oContext) {
						this.oDataModel.setProperty("RegionCode", "", oContext);
						this.oDataModel.setProperty("RegionName", "", oContext);
					} else {
						oField.setValue("");
					}
					
				}
			},

			onDestinationValueHelpRequest : function(oEvent) {
				var ofilter = ["Id", "Name"];
				this.onValueHelpRequest("Trc_SD_Destination", "TRC_DESTINATION", "/results", "{Id}", "{Name}", "both", ofilter,
						"Destination");
			},
			
			onDestinationSuggestionItemSelected : function(oEvent) {
				oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
			},

			onCountryValueHelpRequest : function(oEvent) {
				var ofilter = ["Id", "Name"];
				this.onValueHelpRequest("Trc_SD_Country", "TRC_COUNTRY", "/results", "{Id}", "{Name}", "both", ofilter,
						"Destination", jQuery.proxy(this.handlePerDiemRegionVisibility, this));
			},
			
			onCountryChange : function(oEvent) {
				if (travel.request.create.util.InputHelper.validateValueHelpWithSuggestion(oEvent)) {
					var sCountryCode = this.getCodeFromFormattedValue(oEvent.getParameter("newValue"));
					this.handlePerDiemRegionVisibility(sCountryCode, true);
				} else {
					var oFormPerDiemRegion = this.byId("MB_FORM_PER_DIEM_REGION");
					oFormPerDiemRegion.setVisible(false);
				}
			},
			
			onCountrySuggestionItemSelected : function(oEvent) {
				var oField = this.byId("Trc_SD_Country");
				oField.setValueState(sap.ui.core.ValueState.None);
			},
			
			onCountryLiveChange : function(oEvent) {
				if (oEvent.getSource().getValue() === "") {
					var oFormPerDiemRegion = this.byId("MB_FORM_PER_DIEM_REGION");
					oFormPerDiemRegion.setVisible(false);
				}
			},
			
			onPerDiemRegionLiveChange : function(oEvent) {
				if (oEvent.getSource().getValue() === "") {
					var oField = this.byId("Trc_SD_PerDiemRegion");
					oField.setValueState(sap.ui.core.ValueState.None);
				}
			},
			
			onPerDiemRegionChange : function(oEvent) {
				if (travel.request.create.util.InputHelper.validateValueHelpWithSuggestion(oEvent)) {
                    var sNewValue = oEvent.getParameter("newValue");
					var sRegionCode = this.getCodeFromFormattedValue(sNewValue);
					var sRegionName = this.getDescriptionFromFormattedValue(sNewValue);
					var oContext = this.getView().getBindingContext();
					if (oContext) {
						this.oDataModel.setProperty("RegionCode", sRegionCode, oContext);
						this.oDataModel.setProperty("RegionName", sRegionName, oContext);
					} else {
						var oField = this.byId("Trc_SD_PerDiemRegion");
						var sFormattedValue = travel.request.create.util.Formatters.formatNameWithId(sRegionName, sRegionCode);
						oField.setValue(sFormattedValue);
					}
				}
			},
			
			onPerDiemRegionSuggestionItemSelected : function(oEvent) {
				var oField = this.byId("Trc_SD_PerDiemRegion");
				oField.setValueState(sap.ui.core.ValueState.None);
			},

			getCodeFromFormattedValue : function(sFormattedValue) {
				var sCode = "";
				if (sFormattedValue && sFormattedValue.length > 0) {
					sCode = sFormattedValue.substring(sFormattedValue.lastIndexOf(' (') + 2, sFormattedValue.lastIndexOf(')'));
				}
				return sCode;
			},
			
			getDescriptionFromFormattedValue : function(sFormattedValue) {
				var sDescription = "";
				if (sFormattedValue && sFormattedValue.length > 0) {
					sDescription = sFormattedValue.substring(0, sFormattedValue.lastIndexOf(' ('));
				}
				return sDescription;
			},
			
			handlePerDiemRegionVisibility : function(sCountryCode, bForceClear) {
				if (sCountryCode) {
					var that = this;
					var oFormPerDiemRegion = this.byId("MB_FORM_PER_DIEM_REGION");
					if (sCountryCode !== this.buffer.getProperty("/validatedCountryCode")) {
						this.buffer.setProperty("/countryHasRegions", false);
						this.buffer.setProperty("/validatedCountryCode", sCountryCode);
						this.oDataModel.read("Regions/$count", {
							context : null,
				            urlParameters : "$filter=" + jQuery.sap.encodeURL("CountryID" + " eq " + "'" + sCountryCode + "'"),
				            async : true,
				            success: function (oData, oResponse) {
				            	if (oResponse && parseInt(oResponse.body, 10) > 0) {
				            		that.buffer.setProperty("/countryHasRegions", true);
				            		oFormPerDiemRegion.setVisible(true);
				            		that.CreateTravelRequestModel.setProperty("/CountryCode", sCountryCode);
				            		if (bForceClear) {
				            			that.clearPerDiemRegionFormField();
				            		}
				                } else {
				                	that.buffer.setProperty("countryHasRegions", false);
				                	oFormPerDiemRegion.setVisible(false);
				                }
				            }
						});
					} else {
						if (this.buffer.getProperty("/countryHasRegions")) {
							oFormPerDiemRegion.setVisible(true);
						}
					}	
				}
			},
			
			onPerDiemRegionValueHelpRequest : function(oEvent) {
				var that = this;
				var oBindingInfo;
				var oCountryField = this.byId("Trc_SD_Country");
				var oPerDiemRegionField = this.byId("Trc_SD_PerDiemRegion");
				var sCountryValueState = oCountryField.getValueState();
				var sCountryCode = this.getCodeFromFormattedValue(oCountryField.getValue());
				var aFilters = [];
				var handleClose = function(oEvent) {
					var oSelectedItem = oEvent.getParameter("selectedItem");
					
		            if (oSelectedItem) {
		                var sRegionCode = oSelectedItem.getProperty("title");
		                var sRegionName = oSelectedItem.getProperty("description");
		                var oContext = that.getView().getBindingContext();		            	
		            	if (oPerDiemRegionField.getValueState() === sap.ui.core.ValueState.Error) {
		            		if (oContext) {
		            			that.oDataModel.setProperty("RegionCode", "", oContext);
		            			that.oDataModel.setProperty("RegionName", "", oContext);
		            		} else {
		            			oPerDiemRegionField.setValue("");
		            		}
		            	}
		            	oPerDiemRegionField.setValueState(sap.ui.core.ValueState.None);
		            	if (oContext) {
		            		that.oDataModel.setProperty("RegionCode", sRegionCode, oContext);
		            		that.oDataModel.setProperty("RegionName", sRegionName, oContext);
		            	} else {
							var sFormattedValue = travel.request.create.util.Formatters.formatNameWithId(sRegionName, sRegionCode);
							oPerDiemRegionField.setValue(sFormattedValue);
		            	}
		            }
				};
				
				if (sCountryCode && sCountryValueState !== sap.ui.core.ValueState.Error) {
					aFilters.push(new sap.ui.model.Filter("CountryID", sap.ui.model.FilterOperator.EQ, sCountryCode));
				}
				
				if (!this.oPerDiemRegionSelectDialog) {
					this.oPerDiemRegionSelectDialog = new sap.m.SelectDialog({
						title: this.oResourceBundle.getText("TRC_PER_DIEM_REGION"),
						items: {
							path : "/Regions",
							template : new sap.m.StandardListItem({
								title : "{RegionID}",
								description : "{Description}",
								active : true
							}),
							filters: aFilters
						},
						confirm: handleClose,
						cancel: handleClose
					});
				} else {
		            oBindingInfo = this.oPerDiemRegionSelectDialog.getBindingInfo("items");
		            this.oPerDiemRegionSelectDialog.bindAggregation("items", {
		                path: oBindingInfo.path,
		                template: oBindingInfo.template,
		                filters: aFilters,
		                parameters: { custom: {search: ""} } // reset search
		            });
				}
				this.oPerDiemRegionSelectDialog.setModel(this.getView().getModel());
				this.oPerDiemRegionSelectDialog.open();
				
			},
			
			onPerDiemRegionSuggest : function(oEvent) {
				var oBindingInfo;
				var oCountryField = this.byId("Trc_SD_Country");				
				var sCountryValueState = oCountryField.getValueState();
				var sCountryCode = this.getCodeFromFormattedValue(oCountryField.getValue()); 
				var aFilters = [];
				
				if (sCountryCode && sCountryValueState !== sap.ui.core.ValueState.Error) {
					aFilters.push(new sap.ui.model.Filter("CountryID", sap.ui.model.FilterOperator.EQ, sCountryCode));
				}
				
				var sNewValue = oEvent.getParameter("suggestValue") || "";
				oBindingInfo = oEvent.getSource().getBindingInfo("suggestionItems"); 
				if (!oBindingInfo) {	
					oEvent.getSource().bindAggregation("suggestionItems", {
						path: "/Regions",
						filters: aFilters,
						startIndex: 0,
						length: 10,
						parameters: { custom: {search: sNewValue} },
						template: new sap.ui.core.Item({text: "{parts:[{path:'Description'},{path:'RegionID'}], formatter:'travel.request.create.util.Formatters.formatNameWithId'}"}) 
					});			
				} else {
					oEvent.getSource().bindAggregation("suggestionItems", {
						path: "/Regions",
						filters: aFilters,
						startIndex: 0,
						length: 10,
						parameters: { custom: {search: sNewValue} },
 		            	template: oBindingInfo.template
					});
				}
			},
			
			onCurrencyValueHelpRequest : function(oEvent) {
				var ofilter = ["Id", "Name"];
				this.onValueHelpRequest("Trc_SC_Currency", "TRC_CURRENCY", "/results", "{Id}", "{Name}", "single", ofilter,
						"Currencies");
			},

			onCADescValueHelpRequest : function(oEvent) {
				var aFilter;
				var ccFieldId = oEvent.getSource().getId();
				var CADescField = ccFieldId;
				ccFieldId = ccFieldId.replace("Trc_S_Type_Desc", "Trc_S_Type");
				var ccVal = this.getView().byId(ccFieldId).getSelectedKey();				
				
				if (ccVal === "CostCenter") {
					aFilter = ["Id", "Description"];
					if (this.getView().getModel("CostCenters") === undefined) {
						this.createModel('CostCenters', "CostCenters");
					}
					this.onValueHelpRequest(CADescField, "TRC_COST_CENTER", "/results", "{Id}", "{Name}", "both", aFilter, "CostCenters");
				}
				
				if (ccVal === "InternalOrder") {
					aFilter = ["Id", "Name"];
					if (this.getView().getModel("InternalOrders") === undefined) {
						this.createModel('InternalOrders', "InternalOrders");
					}
					this.onValueHelpRequest(CADescField, "TRC_INTERNAL_ORDER", "/results", "{Id}", "{Name}", "Id", aFilter, "InternalOrders");
				}

				if (ccVal === "SalesOrder") {
					aFilter = ["Id", "Name"];
					if (this.getView().getModel("SalesOrders") === undefined) {
						this.createModel('SalesOrders', "SalesOrders");
					}
					this.onValueHelpRequest(CADescField, "TRC_SALES_ORDER", "/results", "{Id}", "{Name}", "Id", aFilter, "SalesOrders");
				}
				
				if (ccVal === "Network") {
					aFilter = ["Id", "Description"];
					if (this.getView().getModel("Network") === undefined) {
						this.createModel('Network', "Network");
					}
					this.onValueHelpRequest(CADescField, "TRC_NETWORK", "/results", "{Id}", "{Name}", "Id", aFilter, "Network");
				}
				
				if (ccVal === "NetworkActivity") {
					aFilter = ["Id", "Description"];
					if (this.getView().getModel("NetworkActivity") === undefined) {
						this.createModel('NetworkActivity', "NetworkActivity");
					}
					this.onValueHelpRequest(CADescField, "TRC_NETWORK_ACTIVITY", "/results", "{Id}", "{Name}", "Id", aFilter, "NetworkActivity");
				}
				
				if (ccVal === "Project") {
					aFilter = ["Id", "Description"];
					if (this.getView().getModel("Project") === undefined) {
						this.createModel('Project', "Project");
					}
					this.onValueHelpRequest(CADescField, "TRC_PROJECT", "/results", "{Id}", "{Name}", "Id", aFilter, "Project");
				}

				if (ccVal === "SalesOrderItem") {
					aFilter = ["Id", "Description"];
					if (this.getView().getModel("SalesOrderItem") === undefined) {
						this.createModel('SalesOrderItem', "SalesOrderItem");
					}
					this.onValueHelpRequest(CADescField, "TRC_SALES_ORDER_ITEM", "/results", "{Id}", "{Name}", "Id", aFilter, "SalesOrderItem");
				}
			},

			onOrderItemsValueHelpRequest : function(oEvent) {
				var that = this;
				var Id =  oEvent.getSource().getId();
				var ofilter = ["Id", "Name"];
				var ccVal = oEvent.getSource().getBindingContext("CostAssignmentsModel").getProperty("selectedCostObjectDesc");
				if (ccVal !== "") {

					var path = "SalesOrders('" + ccVal + "')/SalesOrderItems";

					this.createModel('OrderItems', path);
					if (this.getView().getModel("OrderItems") !== undefined) {
						this.onValueHelpRequest(Id, "TRC_LBL_SALES_ORDER_ITEM", "/results", "{ItemId}", "{Description}", "both",
								ofilter, "OrderItems");
					} else {
						that._setBusyOn();
						jQuery.sap.delayedCall(1000, this, function() {
							that.onValueHelpRequest(Id, "TRC_LBL_SALES_ORDER_ITEM", "/results", "{ItemId}", "{Description}", "both",
									ofilter, "OrderItems");
							that._setBusyOff();
						});
					}
				} else {
					var CADescField = Id;
					CADescField = CADescField.replace("Trc_S_OrderItem", "Trc_S_Type_Desc");
					this.byId(CADescField).setValueState(sap.ui.core.ValueState.Error);
					this.byId(CADescField).setValueStateText("Please Select Sales Order");
				}
			},

			onValueHelpRequest : function(field, title, path, displayvalue, descval, output, filterby, modelName, fnChangedValue) {
				var title1 = this.oResourceBundle.getText(title);
				var title2 = displayvalue;
				var filter= filterby;
				var oField = this.getView().byId(field);
				var sNewValue = "";
				var sOldValue = "";
				
				// Handling of both confirm and cancel; clear the filter
				var handleClose = function(oEvent) {

					var oSelectedItem = oEvent.getParameter("selectedItem");
					if (oSelectedItem) {
						if (output === "both") {
							sNewValue = oSelectedItem.getDescription() + " (" + oSelectedItem.getTitle() + ")";
							sOldValue = oField.getValue();
							oField.setValue(sNewValue);
						} else {
							sNewValue = oSelectedItem.getTitle();
							sOldValue = oField.getValue();
							oField.setValue(sNewValue);
						}
						if (oEvent.getId() === "confirm") {
							// Entry is valid, reset possible error state
							oField.setValueState(sap.ui.core.ValueState.None);
							if (fnChangedValue && sOldValue !== sNewValue) {
								fnChangedValue(oSelectedItem.getTitle(), true);
							}
						}
					}
					oEvent.getSource().getBinding("items").filter([]);
				};
				
				var valueHelpSearch = function(oEvent ) {
					var sValue = oEvent.getParameter("value");
													
					 if (filter instanceof Array)
						 {
						 var arrayOfFilters = [];
						 
						 for(var i = 0; i < filter.length; i++)
							 {
							 var oSingleFilter = new sap.ui.model.Filter(filter[i], sap.ui.model.FilterOperator.Contains, sValue);
							 arrayOfFilters.push(oSingleFilter);
							 }
						 var oFilter = new sap.ui.model.Filter(arrayOfFilters, false);
						 }
					 else
						 {
						 	var oFilter = new sap.ui.model.Filter(filter, sap.ui.model.FilterOperator.Contains, sValue);
						 }						
					oEvent.getSource().getBinding("items").filter([oFilter]);
				};

				// Create a SelectDialog and display it; bind to the same
				// model as for the suggested items
				// if (!this._valueHelpSelectDialog)
				// {
				this._valueHelpSelectDialog = new sap.m.SelectDialog({
					title : title1,
					items : {
							path : path,
							template : new sap.m.StandardListItem({
								title : title2,
								description : descval,
								active : true
								})
							},
					search : valueHelpSearch, 					
					liveChange: valueHelpSearch, 					
					confirm : handleClose,
					cancel : handleClose
				});
				
				this._valueHelpSelectDialog.setModel(this.getView().getModel(modelName));
				// }
				// this._valueHelpSelectDialog.setModel(this.getView().getModel(modelName));
				this._valueHelpSelectDialog.open();
			},		
	
			extractKey : function(value) {
				if(value.indexOf("(") > 0 && value.indexOf(")") > 0) {
					return value.substring(value.indexOf("(") + 1, value.indexOf(")"));	
				}
				else {
					return value;
				}
			},

			onChangeCostDesc : function(oEvent) {

			},

			_onUpdateCostAssigment : function(oEvent) {
				var that = this;
				if (this.getView().getModel("CostAssignmentsModel") !== undefined) {
					var costCenters = this.getView().getModel("CostAssignmentsModel").getData();
					var sPath = oEvent.getSource().getBindingContext("CostAssignmentsModel").sPath;
					var index = parseInt(sPath.substring(sPath.indexOf("/") + 1, sPath.length));

					var selectedType = oEvent.getSource().getBindingContext("CostAssignmentsModel").getProperty(
							"selectedCostObjectType");
					var sCostCenterType = "";

					if (selectedType === "CostCenter"){
						sCostCenterType = this.oResourceBundle.getText("TRC_COST_CENTER");
						}
					else if (selectedType === "InternalOrder") {
						sCostCenterType = this.oResourceBundle.getText("TRC_INTERNAL_ORDER");
						if (this.getView().getModel("InternalOrders") === undefined) {
							that.createModel('InternalOrders', "InternalOrders");
						}
					}
					else if (selectedType === "Network") {
							sCostCenterType = this.oResourceBundle.getText("TRC_NETWORK");
							if (this.getView().getModel("Network") === undefined) {
								that.createModel('Network', "Network");
							}
					}					
					else if (selectedType === "NetworkActivity") {
						sCostCenterType = this.oResourceBundle.getText("TRC_NETWORK_ACTIVITY");
						if (this.getView().getModel("NetworkActivity") === undefined) {
							that.createModel('NetworkActivity', "NetworkActivity");
						}
					}
					else if (selectedType === "Project") {
						sCostCenterType = this.oResourceBundle.getText("TRC_PROJECT");
						if (this.getView().getModel("Project") === undefined) {
							that.createModel('Project', "Project");
						}
					}
					else if (selectedType === "SalesOrderItem") {
						sCostCenterType = this.oResourceBundle.getText("TRC_SALES_ORDER_ITEM");
						if (this.getView().getModel("SalesOrderItem") === undefined) {
							that.createModel('SalesOrderItem', "SalesOrderItem");
						}
					}
					
					 else {
						sCostCenterType = this.oResourceBundle.getText("TRC_SALES_ORDER");
						if (this.getView().getModel("SalesOrders") === undefined) {
							that.createModel('SalesOrders', "SalesOrders");
						}
					}			

					if (index < costCenters.length) {
						costCenters[index].selectedCostObjectDesc = "";
						if (sCostCenterType == "Sales Order") {
							costCenters[index].displaySelectedCostObjectField = true;
							costCenters[index].selectedSalesOrderItem = "";
							costCenters[index].selectedSalesOrderItemDescription = "";
							costCenters[index].orderItemDisplayed = false;
						} else {
							costCenters[index].displaySelectedCostObjectField = false;
							costCenters[index].selectedSalesOrderItem = "";
							costCenters[index].selectedSalesOrderItemDescription = "";
						}
						costCenters[index].selectedCostObjectType = oEvent.getSource().getSelectedKey();
					}

					this.getView().getModel("CostAssignmentsModel").updateBindings();
				}
			},

			_onAddCostAssignment : function(oEvent) {
				var that = this;
				if (this.getView().getModel("CostAssignmentsModel") !== undefined) {
					var costCenters = this.getView().getModel("CostAssignmentsModel").getData();
					var costcenter = {
						"title" : this.oResourceBundle.getText("TRC_LBL_COST_CENTER"),
						"counter" : 1,
						"percentage" : 100,
						"orderItemDisplayed" : false,
						"selectedCostObject" : "",
						"displaySelectedCostObjectField" : false,
						"selectedCostObjectDesc" : "",
						"selectedCostObjectType" : "InternalOrder",
						"removeDisplayed" : true
					};
					costCenters.push(costcenter);
					if (this.getView().getModel("InternalOrders") === undefined) {
						that.createModel('InternalOrders', "InternalOrders");
					}
					this.getView().getModel("CostAssignmentsModel").updateBindings();
				}
			},

			_onRemoveCostAssignment : function(oEvent) {
				if (this.getView().getModel("CostAssignmentsModel") !== undefined) {
					var costCenters = this.getView().getModel("CostAssignmentsModel").getData();
					var sPath = oEvent.getSource().getBindingContext("CostAssignmentsModel").sPath;
					var index = parseInt(sPath.substring(sPath.indexOf("/") + 1, sPath.length));
					costCenters.splice(index, 1);
					this.getView().getModel("CostAssignmentsModel").updateBindings();
				}
			},

			/**
			 * [_handleSubmitTrc description]
			 */
			_handleSubmitTrc : function(oEvent) {
				var formData = this.updateModelByForm(this.viewMode);
				if (formData) {
					if (this.viewMode == this.viewModes.NewTravel) {
						this._handleCreateCall(oEvent);
					} else if (this.viewMode == this.viewModes.EditTravel) {
						this._handleUpdateCall(oEvent);
					}
				}
			},

			/**
			 * [updateModelByForm description]
			 */
			updateModelByForm : function(viewMode) {
				if (!this.validateForm()){
					return false;
				}					

				var PurposeForm = this.byId("Trc_I_Purpose").getValue();
				this.CreateTravelRequestModel.setProperty("/Purpose", PurposeForm);

				var ActivityForm = this.byId("Trc_s_Activity");
				this.CreateTravelRequestModel.setProperty("/TripActivity", ActivityForm.getSelectedKey());

				var DepartureForm = travel.request.create.util.Formatters.formatDateToISOString(new Date(this
						.byId("Trc_D_From").getDateValue()));
				this.CreateTravelRequestModel.setProperty("/Departure", DepartureForm);

				var ArrivalForm = travel.request.create.util.Formatters.formatDateToISOString(new Date(this.byId("Trc_D_To")
						.getDateValue()));
				this.CreateTravelRequestModel.setProperty("/Arrival", ArrivalForm);
				
				var sCountryNameCodeForm = "";
				var sCountryCodeForm = "";
				
				if (this.isPerDiemRegionsEnabled()) {
					sCountryNameCodeForm = this.byId("Trc_SD_Country").getValue();
					sCountryCodeForm = this.getCodeFromFormattedValue(sCountryNameCodeForm);
					this.CreateTravelRequestModel.setProperty("/CountryCode", sCountryCodeForm);
					var oFormPerDiemRegion = this.byId("MB_FORM_PER_DIEM_REGION");
					if (oFormPerDiemRegion && oFormPerDiemRegion.getVisible()) {
						var sPerDiemRegionNameCodeForm = this.byId("Trc_SD_PerDiemRegion").getValue();
						var sPerDiemRegionCodeForm = this.getCodeFromFormattedValue(sPerDiemRegionNameCodeForm);
						this.CreateTravelRequestModel.setProperty("/RegionCode", sPerDiemRegionCodeForm);
					}
				} else {
					sCountryNameCodeForm = this.byId("Trc_SD_Destination").getValue();	
					sCountryCodeForm = this.getCodeFromFormattedValue(sCountryNameCodeForm);
					this.CreateTravelRequestModel.setProperty("/CountryCode", sCountryCodeForm);
					this.CreateTravelRequestModel.setProperty("/RegionCode", undefined); //Avoid request error if RegionCode is not supported
				}

				var LocationForm = this.byId("Trc_E_City").getValue();
				this.CreateTravelRequestModel.setProperty("/Location", LocationForm);

				var EstimatedCostValue = this.byId("Trc_E_Cost").getValue() || "0";
				this.CreateTravelRequestModel.setProperty("/EstimatedCost/Value", EstimatedCostValue);

				var EstimatedCostCurrency = this.byId("Trc_SC_Currency").getValue();
				this.CreateTravelRequestModel.setProperty("/EstimatedCost/Currency", EstimatedCostCurrency);

				var NoteValue = this.byId("Trc_L_Note").getValue();
				this.CreateTravelRequestModel.setProperty("/Note", NoteValue);

				// cost assignments
				var totalPercentage = 0;
				var ODataCostCenters = [];
				if (this.getView().getModel("CostAssignmentsModel") !== undefined) {
					var costCenters = this.getView().getModel("CostAssignmentsModel").getData();
					if (viewMode == this.viewModes.NewTravel) {
					this.CreateTravelRequestModel.oData.CostAssignments = [];
					}
					for ( var i = 0; i < costCenters.length; i++) {
						if (viewMode == this.viewModes.NewTravel) {
							var costassignment = {};
							costassignment.CostObjectId = this.extractKey(costCenters[i].selectedCostObjectDesc);
							costassignment.CostObjectType = costCenters[i].selectedCostObjectType;
							costassignment.Percentage = costCenters[i].percentage.toString();
							if (costCenters[i].selectedSalesOrderItem) {
								costassignment.CostObjectItemId = costCenters[i].selectedSalesOrderItem;
							}
							this.CreateTravelRequestModel.oData.CostAssignments.push(costassignment);
							totalPercentage = totalPercentage + parseInt(costCenters[i].percentage);
						} else if (viewMode == this.viewModes.EditTravel) {
							var costassignment = [];
							costassignment.push(this.extractKey(costCenters[i].selectedCostObjectDesc));
							costassignment.push(costCenters[i].selectedCostObjectType);
							costassignment.push(costCenters[i].percentage.toString());
							costassignment.push(costCenters[i].selectedSalesOrderItem);
							ODataCostCenters.push(costassignment.join(","));
							totalPercentage = totalPercentage + parseInt(costCenters[i].percentage);
						}
					}
				}

				if (viewMode == this.viewModes.EditTravel) {
					this.CreateTravelRequestModel.setProperty("/InlineCostAssignment", ODataCostCenters.join(";"));
				}

				if (totalPercentage !== 100) {
					this.showMessageBox(this.oResourceBundle.getText("ERR_PERCENTAGE"), sap.ca.ui.message.Type.ERROR);
					return false;
				}
				 				
				var UserInfo = this.getUserInfo();
				
				if ( UserInfo.GlobalSettings )
					{
					
					if ( !UserInfo.GlobalSettings.LateApproverDetermination  && UserInfo.Approver.length === 0)  
					{						
						this.showMessageBox(this.oResourceBundle.getText("ERR_MANAGER"), sap.ca.ui.message.Type.ERROR);
						return false;
					}	
					
					}
				
				else 
					{					
									
				
				if (UserInfo.Approver && UserInfo.Approver.length === 0) {
					
					this.showMessageBox(this.oResourceBundle.getText("ERR_MANAGER"), sap.ca.ui.message.Type.ERROR);
					return false;
				}
					}
				

				return true;
			},

			/**
			 * [validateForm description]
			 */
			validateForm : function() {
				var isValid = true;

				// Check trip details
				var oControl = this.byId("Trc_I_Purpose");
				oControl.setValue(oControl.getValue().trim());
				var value = oControl.getValue();
				if (value.length === 0) {
					isValid = false;
					oControl.setValueState(sap.ui.core.ValueState.Error);
				} else {
					oControl.setValueState(sap.ui.core.ValueState.None);
				}

				// no validation needed here
				// oControl = this.byId("Trc_s_Activity");
				// oControl.setValue(oControl.getValue().trim());
				// value = oControl.getItemByKey(oControl.getSelectedKey());
				// if (oControl.getItems().length > 0 || value.length == 0) {
				// isValid = false;
				// oControl.setValueState(sap.ui.core.ValueState.Error);
				// } else {
				// oControl.setValueState(sap.ui.core.ValueState.None);
				// }

				var oControlFromDate = this.byId("Trc_D_From");
				oControlFromDate.setValue(oControlFromDate.getValue().trim());
                var fromDate = oControlFromDate.getDateValue();

                if (fromDate.length==0) {
					isValid = false;
					oControlFromDate.setValueState(sap.ui.core.ValueState.Error);
				} else {
					oControlFromDate.setValueState(sap.ui.core.ValueState.None);
				}

				var oControlToDate = this.byId("Trc_D_To");
				oControlToDate.setValue(oControlToDate.getValue().trim());
                var toDate = oControlToDate.getDateValue();

				if (toDate.length==0) {
					isValid = false;
					oControlToDate.setValueState(sap.ui.core.ValueState.Error);
				} else {
					oControlToDate.setValueState(sap.ui.core.ValueState.None);
				}

				if (new Date(fromDate) > new Date(toDate)) {
					oControlFromDate.setValueState(sap.ui.core.ValueState.Error);
					oControlToDate.setValueState(sap.ui.core.ValueState.Error);
					this.showMessageToast(this.oResourceBundle.getText("ERR_MSG_WRONG_DATE"));
					isValid = false;
				}

				if (this.isPerDiemRegionsEnabled()) {
					oControl = this.byId("Trc_SD_Country");
					oControl.setValue(oControl.getValue().trim());
					value = oControl.getValue();
					if (value.length === 0 || !value.match(".* \(.*\)")) {
						isValid = false;
						oControl.setValueState(sap.ui.core.ValueState.Error);
					} else {
						if (oControl.getValueState() === sap.ui.core.ValueState.Error) {
							isValid = false;
						}
					}
					oControl = this.byId("Trc_SD_PerDiemRegion");
					if (oControl.getValueState() === sap.ui.core.ValueState.Error) {
						isValid = false;
					}
				} else {
					oControl = this.byId("Trc_SD_Destination");
					oControl.setValue(oControl.getValue().trim());
					value = oControl.getValue();
					if (value.length === 0 || !value.match(".* \(.*\)")) {
						isValid = false;
						oControl.setValueState(sap.ui.core.ValueState.Error);
					} else {
						oControl.setValueState(sap.ui.core.ValueState.None);
					}
				}

				// no validation needed here
				// oControl = this.byId("Trc_E_City");
				// oControl.setValue(oControl.getValue().trim());
				// value = oControl.getValue();
				// if (value.length == 0) {
				// isValid = false;
				// oControl.setValueState(sap.ui.core.ValueState.Error);
				// } else {
				// oControl.setValueState(sap.ui.core.ValueState.None);
				// }

				oControl = this.byId("Trc_E_Cost");
				oControl.setValue(oControl.getValue().trim());
				value = oControl.getValue() || "0";
				if (value.length === 0 || isNaN(+value) || value < 0) {
					isValid = false;
					oControl.setValueState(sap.ui.core.ValueState.Error);
				} else {
					oControl.setValueState(sap.ui.core.ValueState.None);
				}

				oControl = this.byId("Trc_SC_Currency");
				oControl.setValue(oControl.getValue().trim());
				value = oControl.getValue();
				oControl.setValueState(sap.ui.core.ValueState.None);
				if (value.length > 0) {
					oControl.setValueState(sap.ui.core.ValueState.None);
					var allCurrencies = this.getView().getModel("Currencies").getData().results;
	                var length = allCurrencies.length,
		                element = null;
	                var fromListedCurrency = false;
		            for (var i = 0; i < length; i++) {
		              element = allCurrencies[i];
		              if(element.Id == value){
		            	  fromListedCurrency = true; 
		              }
		            }	
		            if(!fromListedCurrency){
		            	oControl.setValueState(sap.ui.core.ValueState.Error);
		            	isValid = false;
		            }
				}	

				// no validation needed here
				// oControl = this.byId("Trc_L_Note");
				// oControl.setValue(oControl.getValue().trim());
				// value = oControl.getValue();
				// if (value.length == 0) {
				// isValid = false;
				// oControl.setValueState(sap.ui.core.ValueState.Error);
				// } else {
				// oControl.setValueState(sap.ui.core.ValueState.None);
				// }

				// Check Cost Centers
				if (this.getView().getModel("CostAssignmentsModel") !== undefined) {
					var costCenters = this.getView().getModel("CostAssignmentsModel").getData();
					var totalPercentage = 0;
					var shareControls = [];
					var _grid = "-" + this.byId("oCostAssignment").getContent()[0].sId + "-";
					for ( var i = 0; i < costCenters.length; i++) {
						var costCenter = costCenters[i];

						var id = this.byId("Trc_S_Type_Desc").sId + _grid + i;
						this.byId(id).setValue(this.byId(id).getValue().trim());
						if (costCenter.selectedCostObjectDesc.length === 0) {
							this.byId(id).setValueState(sap.ui.core.ValueState.Error);
							isValid = false;
						} else {
							this.byId(id).setValueState(sap.ui.core.ValueState.None);
						}
						if (costCenter.selectedCostObjectType === "SalesOrder") {
							id = this.byId("Trc_S_OrderItem").sId + _grid + i;
							this.byId(id).setValue(this.byId(id).getValue().trim());
							if (costCenter.selectedSalesOrderItemDescription.length === 0) {
								this.byId(id).setValueState(sap.ui.core.ValueState.Error);
								isValid = false;
							} else {
								this.byId(id).setValueState(sap.ui.core.ValueState.None);
							}
						}
						id = this.byId("Trc_I_Pct").sId + _grid + i;
						this.byId(id).setValue(this.byId(id).getValue().trim());
						shareControls.push(this.byId(id));
						totalPercentage = totalPercentage + parseInt(costCenter.percentage);
					}
					if (totalPercentage !== 100) {
						for ( var i = 0; i < shareControls.length; i++) {
							shareControls[i].setValueState(sap.ui.core.ValueState.Error);
							shareControls[i].setValueStateText(this.oResourceBundle.getText("ERR_PERCENTAGE"));
						}
						isValid = false;
					} else {
						for ( var i = 0; i < shareControls.length; i++) {
							shareControls[i].setValueState(sap.ui.core.ValueState.NONE);
						}
					}
				}
				
				if (this.isPerDiemRegionsEnabled()) {
					if (this.byId("Trc_SD_Country").getValueState === sap.ui.core.ValueState.Error) {
						isValid = false;
					}
					if (this.byId("Trc_SD_PerDiemRegion").getValueState === sap.ui.core.ValueState.Error) {
						isValid = false;
					}
				}

				// the way to fetch dynamic value field is.
				// this.byId("Trc_S_Type").sId
				// the above statement will return "__xmlview3--Trc_S_Type"
				// counter from the costAssignmentsModel Json
				// this.byId(this.byId("Trc_S_Type").sId+"-__grid1-"+counter).getSelectedItem()
				// set the state.
				// 
				return isValid;
			},

			/**
			 * [_handleCreateCall description]
			 */
			_handleCreateCall : function(oEvent) {
				var that = this;
				var UserInfo =  this.getUserInfo();
				this.oDataModel.setRefreshAfterChange(false);
				//this.oDataModel.create('/Travels?sap-server=gm6-https', this.CreateTravelRequestModel.getData(), null,
				this.oDataModel.create('/Travels', this.CreateTravelRequestModel.getData(), null, 
						function(response) {
					var sComponentId = sap.ui.core.Component.getOwnerIdFor(that.oView), oComponent = sap.ui
							.component(sComponentId);
					var fnCallback = function() {
						that.oDataModel.detachRequestCompleted(fnCallback, that);
						
						this.oRouter.navTo("detail", {
							contextPath : "Travels('" + response.results.Id + "')"
						}, true);
					};
					that.oDataModel.attachRequestCompleted(that, fnCallback, that);
					that.oDataModel.setRefreshAfterChange(true);

					that.oDataModel.refresh(true);

					that._setBusyOff();
					
					if(UserInfo.Approver)
					{
						that.showMessageToast(that.oResourceBundle.getText("SUBMITTED_MSG", [UserInfo.Approver]));
					}
					else
					{
						that.showMessageToast(that.oResourceBundle.getText("SUBMITTED_MSG_NO_APPROVER"));
					}					

					// that._handleNavBack();
				}, function(oError) {
					that.oDataModel.setRefreshAfterChange(true);
					if (that.oDataModel.hasPendingChanges()) {
						that.oDataModel.refresh(true);
					}
					that._onRequestFailed(oError);
				});
			},

			/**
			 * [_handleUpdateCall description]
			 */
			_handleUpdateCall : function(oEvent) {
				var that = this;
				var oView = this.getView();
				var UserInfo = this.getUserInfo();
				var oDataObj = oView.getModel().getProperty(oView.getBindingContext().getPath());

				that.oDataModel.setRefreshAfterChange(false);
				this._setBusyOn();
				
				var oBatchOperation;
				var aBatchOperations = [];
				var oModel = this.getView().getModel();
				oModel.clearBatch();
				
				oBatchOperation =  oModel.createBatchOperation("/Travels('" + oDataObj.Id + "')", "MERGE", this.CreateTravelRequestModel.getData(), null, null );
				aBatchOperations.push(oBatchOperation);
				
				oModel.addBatchChangeOperations(aBatchOperations);
				
				oModel.submitBatch(			
						function() {
							var sComponentId = sap.ui.core.Component.getOwnerIdFor(that.oView), oComponent = sap.ui
							.component(sComponentId);
							
							var fnCallback = function() {
								that.oDataModel.detachRequestCompleted(fnCallback, that);
								
								this.oRouter.navTo("detail", {
									contextPath : that.getView().getBindingContext().sPath.substr(1)
								}, true);
							};
							
							that.oDataModel.attachRequestCompleted(that, fnCallback, that);

							that.oDataModel.setRefreshAfterChange(true);

							that.oDataModel.refresh(true);

							that._setBusyOff();
							if(UserInfo.Approver)
							{
								that.showMessageToast(that.oResourceBundle.getText("SUBMITTED_MSG", [UserInfo.Approver]));
							}
							else
							{
								that.showMessageToast(that.oResourceBundle.getText("SUBMITTED_MSG_NO_APPROVER"));
							}

						}, function(oError) {
							that._onRequestFailed(oError);
						}, true );
			},

			/**
			 * [_handleNavBack navigation handler -> detail page]
			 */
			_handleNavBack : function() {
				if (this.viewMode === this.viewModes.NewTravel) {
					window.history.back();
				} else if (this.viewMode === this.viewModes.EditTravel) {
					this.oRouter.navTo("detail", {
						contextPath : this.getView().getBindingContext().sPath.substr(1)
					}, true);
				}
			},

			_setBusyOn : function() {
				if (!this.busyOn) {
					this.busyOn = true;
					sap.ca.ui.utils.busydialog.requireBusyDialog({
						text : this.oResourceBundle.getText("LOADING")
					});
				}
			},

			_setBusyOff : function() {
				if (this.busyOn) {
					this.busyOn = false;
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
				}
			},

			/**
			 * [_onRequestFailed handler for service request failure]
			 */
			_onRequestFailed : function(oError) {
				this._setBusyOff();

				var errMessage = "";
				if (oError !== null && oError.response !== null && oError.response.statusCode == 412) {
					errMessage = this.oResourceBundle.getProperty("ERR_CONCURRENT_ACCESS");
				} else if (oError !== null && oError.response !== null && oError.response.body !== null) {
					var errBody = jQuery.parseJSON(oError.response.body);
					errMessage = errBody.error.message.value;
				} else {
					errMessage = this.oResourceBundle.getText("ERR_VALIDATION");
				}

				this.showMessageBox(errMessage, sap.ca.ui.message.Type.ERROR);
			},

			/**
			 * [showMessageBox show popup message]
			 * 
			 * @param value
			 * @param type
			 */
			showMessageBox : function(value, type) {
				sap.ca.ui.message.showMessageBox({
					type : type,
					message : value
				});

				this._setBusyOff();
			},

			/**
			 * [showMessageToast show success message]
			 * 
			 * @param value
			 */
			showMessageToast : function(value) {
				sap.ca.ui.message.showMessageToast(value, {
					duration : 3000
				});
			},
			
			/**
			 * [getUserInfo handler for read the user info out of the model]
			 * Logic: 
			 * 	either the UserInfo are inside a 'results' table or not
			 * 
			 * @returns {UserInfo}
			 */
			 
			getUserInfo : function() {

				if(this.getView().getModel("UserInfo") )

				 var UserInfo = this.getView().getModel("UserInfo").getData();
		 
					
					if(UserInfo.results )  
						{
						UserInfo =  UserInfo.results;
						return UserInfo;						
						}					
					else
						{
						return UserInfo;
						}					
			},
			
			
			
			/**
			 * [checkGlobalSettingsTripActivity handler for check the values on global settings]
			 * Logic: 
			 * 	since in onPremise there are no GloblalSetting, check first if GlobalSettings are available  
			 * 
			 * @returns {Boolean}
			 */
			 
			checkGlobalSettingsTripActivity : function() {
				 
					var UserInfo = this.getUserInfo();		 
					
					if(UserInfo.GlobalSettings)  
						{
						if(UserInfo.GlobalSettings.TripActivity)
							{
							return true;
							}
						else
							{
							return false;
							}				 					
						}					
					else
						{
						return true;
						}					
			},
			
			/**
			 * [checkGlobalSettingsFixedCurrency handler for check the values on global settings]
			 * Logic: 
			 * 	since in onPremise there are no GloblalSetting, check first if GlobalSettings are available  
			 * 
			 * @returns {Boolean}
			 */
			 
			checkGlobalSettingsFixedCurrency : function() {
				 
					var UserInfo = this.getUserInfo();		 
					
					if(UserInfo.GlobalSettings)  
						{
						if(UserInfo.GlobalSettings.FixedCurrency)
							{
							return true;
							}
						else
							{
							return false;
							}				 					
						}					
					else
						{
						return true;
						}					
			},
			

			/**
			 * [createHeaderFooterOptions handler for header and footer options]
			 * 
			 * @returns {buttons}
			 */
			createHeaderFooterOptions : function() {
				var that = this;
				return {
					sI18NDetailTitle : "DETAIL_TITLE",
					oEditBtn : {
						sI18nBtnTxt : "TRC_SUBMIT",
						onBtnPressed : jQuery.proxy(this._handleSubmitTrc, that)
					},

					buttonList : [{
						sId : "TRC_BTN_CANCEL",
						sI18nBtnTxt : "TRC_CANCEL",
						icon : "sap-icon://decline",
						onBtnPressed : jQuery.proxy(this._handleNavBack, that)
					}],
					oJamOptions : {

					},
					oAddBookmarkSettings : {
						title : that.oResourceBundle.getText("DISPLAY_NAME"),
						icon : "sap-icon://flight"
					},
					onBack : jQuery.proxy(function() {
						var sDir = sap.ui.core.routing.History.getInstance().getDirection(""); // dummy call to identify deep
						// link situation
						if (sDir && sDir !== "Unknown") {
							window.history.go(-1);
						} else {
							if(this.viewMode === that.viewModes.NewTravel)
								{
								window.history.go(-1);
								}
							else
								{
								this.oRouter.navTo("detail", {
									contextPath : this.getView().getBindingContext().sPath.substr(1)
								}, true);
								}
						}
					}, this)
				};
			},

			isMainScreen : function() {
				return false;
			}
		});
