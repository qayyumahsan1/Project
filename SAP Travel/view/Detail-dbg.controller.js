/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("travel.request.create.util.Formatters");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.m.MessageBox");

sap.ca.scfld.md.controller.BaseDetailController.extend("travel.request.create.view.Detail",
		{

			/**
			 * [onInit is loaded when Master View Detail.view.app.xml is loaded]
			 * 
			 * @return {[type]} [description]
			 */
			onInit : function() {
				// sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit.call(this);

				this.oResourceBundle = this.oApplicationFacade.getResourceBundle();
				this.oDataModel = this.oApplicationFacade.getODataModel();

				var view = this.getView();
				this.oRouter.attachRouteMatched(
						function(oEvent) {
							if (oEvent.getParameter("name") === "detail") {
								var contextPath = oEvent.getParameter("arguments").contextPath;
								
								jQuery.sap.delayedCall(0, this, function(sContextPath) {
									this.getView().bindElement('/' + sContextPath);
								}, [contextPath]);

								
								if (this.byId("TabContainer").getSelectedKey() !== "Information") {
									this.byId("TabContainer").setSelectedKey("Information");
								}

								this.createModel('UserInfo', "UserInfo", null);
							
								if ( this.isMultiCommentEnabled() ) 
								{									
									this.createModel( 'Notes', contextPath + "/Notes", null, jQuery.proxy(this.handleNotes, this) );				 				
								}
								
								/**    
								 * @ControllerHook [short text describing the hook]    
								 * Hook is called when route is matched. It enables enhancing the view with  
								 * additional data requests.   
								 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookOnDataRequest    
								 * @param {String} Context Path    
								 * @return {void}  ...
								 */
								if (this.extHookOnDataRequest) { // check whether any extension has implemented the hook...
									this.extHookOnDataRequest(contextPath); // ...and call it
								}
							}
						}, this);

				var oCostAssignmentList = this.byId("TRC_COSTASSIGNMENTS_TABLE");
				if (oCostAssignmentList) {
					// update cost assignment header
					oCostAssignmentList.addEventDelegate({
						onAfterRendering : this.updateCostAssignmentHeader
					}, this); 
				}				
			},
			
			handleNotes : function() {
			
			if (this.getView().getModel("Notes") !== undefined) 
			{
				var oNotesItem = new sap.m.FeedListItem(
							{
								senderActive : true,
								showIcon : true,
								text : "{Content}",
								sender : "{AuthorName}",
								senderPress : jQuery.proxy(this._handlelinkToNoteAuthorPress, this),								 
								timestamp : "{path:'NoteDate', formatter:'travel.request.create.util.Formatters.formatDate'}", 
								maxLines : 3
							});
					var oList = this.byId("notesList");
					oList.bindAggregation("items", {
						path : "Notes",
						template : oNotesItem
					});
					var oMultiNotes = this.byId("MultiNotesTab");
					oMultiNotes.setCount(this.getCommentCount());
					if(this.getCommentCount()<= 0)
						{
						oMultiNotes.setVisible(false);
						}
					else
						{
						oMultiNotes.setVisible(true);
						}
						
				}
			},
			

			createModel : function(modelName, sParam, sFilter, fnProxy ) {
				
				var onRequestSuccess = function(oData, oResponse) {
					var oModel = new sap.ui.model.json.JSONModel(oData);
					oModel.setSizeLimit(500);
					this.getView().setModel(oModel, modelName);
					this._setBusyOff();
					if(fnProxy )
						{
							fnProxy();
						}
				};
				this._setBusyOn();
				this.oDataModel.read(sParam, null, sFilter, true, jQuery.proxy(onRequestSuccess, this), jQuery.proxy(
						this._onRequestFailed, this));
				return modelName;
			},

 
			/**
			 * [updateCostAssignemntHeader update cost assignment header]
			 * 
			 * @param {[type]}
			 *          oEvent [description]
			 */
			updateCostAssignmentHeader : function(oEvent) {
				this.updateHeaderText(oEvent, "TRC_LBL_COST_CENTER_WITH_COUNT");
			},

			updateHeaderText : function(oEvent, sTextProperty) {
				var oSrcControl = oEvent.srcControl;
				if (oSrcControl) {
					setTimeout(jQuery.proxy(function() {
						var oItems = oSrcControl.getItems();
						var sHeaderText = this.oResourceBundle.getText(sTextProperty, [(oItems) ? oItems.length : "0"]);
						oSrcControl.setHeaderText(sHeaderText);
					}, this), 300);
				}
			},

			/**
			 * [_handlelinkToNoteAuthorPress handler for linkToNoteAuthorPress link press]
			 */
			_handlelinkToNoteAuthorPress : function(oEvent) {
				jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
				var oView = this.getView();
				
				var personalNumber = oEvent.getSource().getBindingContext().getProperty("AuthorID");
		
				if(personalNumber)
					{
						var oControl = oEvent.getParameters().domRef;
						this.employeeModelReader(oControl, personalNumber);
					}
			},			
			
			
			/**
			 * [_handleApproverPress handler for approver link press]
			 */
			_handleApproverPress : function() {
				jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
				var oView = this.getView();
				if (this.getView().getModel("UserInfo") !== undefined) {
					
					var UserInfo = this.getUserInfo();
					
					if(UserInfo.GlobalSettings &&  UserInfo.GlobalSettings.LateApproverDetermination )
					{			 						 
							var oModel = oView.getModel();
							var oBindingContext = oView.getBindingContext();
							var ApproverPersonalNumber = oModel.getProperty("ApproverPersonalNumber", oBindingContext);							
							var employeeId = ApproverPersonalNumber;
						}
					else
						{
						    employeeId = UserInfo.ApproverPersonalNumber;
						}
					
					var oControl = oView.byId("EmpLink");

					this.employeeModelReader(oControl, employeeId);
				}
			},

			/**
			 * [_handleSenderPress handler for sender link press]
			 */
			_handleSenderPress : function(oEvent) {
				var that = this;
				jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
				var oView = this.getView();
				if (this.getView().getModel("UserInfo") !== undefined) {
					var UserInfo = this.getUserInfo();
					var employeeId =  UserInfo.Id;     
					var oControl = oEvent.getParameters().domRef;

					that.employeeModelReader(oControl, employeeId);
				}
			},

			employeeModelReader : function(oControl, employeeId) {

				var filters = [];
				var idFilter = "$filter=Id eq '" + employeeId + "'";
				filters.push(idFilter);

				this.oDataModel.read("Contacts", null, filters, false, function(oData) {
					var oEmployee = {
						title : oData.results[0].Name,
						name : oData.results[0].Name,
						imgurl : "",
						department : oData.results[0].Department,
						contactmobile : oData.results[0].Mobile,
						contactphone : oData.results[0].Phone,
						contactemail : oData.results[0].Email,
						contactemailsubj : "for you",
						companyname : oData.results[0].Company,
						companyaddress : oData.results[0].Address
					};

					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(oEmployee);
					oEmployeeLaunch.openBy(oControl);

				}, function(oError) {
					sap.ca.ui.message.showMessageBox({
						type : sap.ca.ui.message.Type.ERROR,
						message : oError.message,
						details : oError.response.body
					});
				});
			},

			/**
			 * [_handleEdit handler for edit travel request]
			 * 
			 * @param {[type]}
			 *          oEvent [description]
			 */
			_handleEdit : function() {
				this.oRouter.navTo("edit", {
					contextPath : this.getView().getBindingContext().sPath.substr(1)
				}, true);
			},

			/**
			 * [_handleDelete handler for delete travel request]
			 * 
			 * @param {[type]}
			 *          oEvent [description]
			 */
			_handleDelete : function() {
				var oView = this.getView();
				var oModel = oView.getModel();
				var oBindingContext = oView.getBindingContext();
				var sObjectIdentifier = oModel.getProperty("Purpose", oBindingContext);
				var sDeleteMessage = this.oResourceBundle.getText("CONFIRMATION_DELETE", [sObjectIdentifier]);

				sap.ca.ui.dialog.confirmation.open({
					question : sDeleteMessage,
					showNote : false,
					title : this.oResourceBundle.getText("TRC_DELETE"),
					confirmButtonLabel : this.oResourceBundle.getText("TRC_DELETE")
				}, jQuery.proxy(function(oResult) {
					var oDataObj = oModel.getProperty(oBindingContext.getPath());
					this._handleDeleteCall(oResult, oDataObj);
				}, this));
			},

			_handleDeleteCall : function(oResult, oDataObj) {
				var that = this;
				if (oResult.isConfirmed) {
					var oParams = {};
					oParams.fnSuccess = function() {
						var sComponentId = sap.ui.core.Component.getOwnerIdFor(that.oView), oComponent = sap.ui
								.component(sComponentId);
						sap.ca.ui.message.showMessageToast(that.oResourceBundle.getText("DELETE_OK"));
						that.oDataModel.setRefreshAfterChange(true);
						that._setBusyOff();
						
						oComponent.oEventBus.publish("travel.request.create", "RefreshUpdateDelete", { param: "/Travels('" + oDataObj.Id + "')" });
						if (jQuery.device.is.phone) {
							that._goBack();
						}
					};
					oParams.fnError = function(oError) {
						that.oDataModel.setRefreshAfterChange(true);
						if (that.oDataModel.hasPendingChanges()) {
							that.oDataModel.refresh(true);
						}
						that._onRequestFailed(oError);
					};

					this.oDataModel.setRefreshAfterChange(false);
					that._setBusyOn();
					// this.oDataModel.remove("Travels('" + oDataObj.Id + "')?sap-server=gm6-https", oParams);
					this.oDataModel.remove("Travels('" + oDataObj.Id + "')", oParams);
				}
			},

			_setBusyOn : function() {
				if (!this.busyOn) {
					this.busyOn = true;
					sap.ca.ui.utils.busydialog.requireBusyDialog({
						text : this.oResourceBundle.getText("LOADING")
					// text is optional
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
			 * 
			 * @param {[type]}
			 *          oError [description]
			 */
			_onRequestFailed : function(oError) {
				this._setBusyOff();

				sap.ca.ui.message.showMessageBox({
					type : sap.ca.ui.message.Type.ERROR,
					message : oError.message,
					details : oError.response.body
				});
			},

			/**
			 * [getCommentCount handler for read the number of Comments]			  
			 * 
			 * @returns {number}
			 */
			 
			getCommentCount : function() {

				if(this.getView().getModel("Notes") )

				 var notes = this.getView().getModel("Notes").getData();		 
				 var count = 0;
				 if(notes)
					 {
					 for(var i = 0; i < notes.results.length; i++ )
						 {
						 count++;
						 }				 	
					 	}					 
				 return count;
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
			 * [isMultiCommentEnabled handler for checking if multi comment is enabled in backend]
			 * 
			 * @returns {boolean}
			 */
			 
			isMultiCommentEnabled : function() {

						var oModel = this.oApplicationFacade.getODataModel();
						var note = oModel.oMetadata._getEntityTypeName("Notes");

						if (note) {
							return true;
						} else {						 
							return false;							 
						}
					},
			
			
			/**
			 * [isSingleCommentEnabled handler for
			 * checking if single comment is enabled
			 * in backend]
			 * 
			 * @returns {boolean}
			 */

			isSingleCommentEnabled : function(noteText) {

						if (noteText && !this.isMultiCommentEnabled() ) {
							return true;
						} else {
							return false;
						}
					},				
					
			
			/**
			 * [getHeaderFooterOptions handler for header and footer options]
			 */
			getHeaderFooterOptions : function() {
				var that = this;
				var AdditionalbuttonList = new Array();
				AdditionalbuttonList.push({
					sI18nBtnTxt : "TRC_DELETE",
					icon : "sap-icon://delete",
					onBtnPressed : jQuery.proxy(this._handleDelete, that),
					enabled : true
				});
				/**    
				 * @ControllerHook [short text describing the hook]    
				 * Hook is called when header and footer options need to be set  
				 * @callback sap.ca.scfld.md.controller.BaseDetailController~Additionalbuttons    
				 * @return {Array} Additional Buttons
				 */
				if (this.Additionalbuttons) {
					AdditionalbuttonList = AdditionalbuttonList.concat(this.Additionalbuttons());
				}
				return {
					sI18NDetailTitle : "DETAIL_TITLE",
					oEditBtn : {
						sI18nBtnTxt : "TRC_EDIT",
						onBtnPressed : jQuery.proxy(this._handleEdit, that)
					},
					buttonList : AdditionalbuttonList,
					oJamOptions : {

					},
					oAddBookmarkSettings : {
						title : that.oResourceBundle.getText("DISPLAY_NAME"),
						icon : "sap-icon://flight"
					},
					onBack : jQuery.proxy(this._goBack, this)
				};
			},

			isMainScreen : function() {
				return true;
			},
			
			_goBack : function() {
				var sDir = sap.ui.core.routing.History.getInstance().getDirection(""); // dummy call to identify deep link
				// situation
				if (sDir && sDir !== "Unknown") {
					window.history.go(-1);
				} else {
					this.oRouter.navTo("master", {}, true);								
				}
			}

		});
