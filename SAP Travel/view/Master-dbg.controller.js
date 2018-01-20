/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
//jQuery.sap.require("sap.ca.scfld.md.controller.BaseMasterController");
jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");
jQuery.sap.require("travel.request.create.util.Formatters");

sap.ca.scfld.md.controller.ScfldMasterController.extend("travel.request.create.view.Master", {

	/**
	 * [onInit is loaded when Master View Master.view.app.xml is loaded]
	 * 
	 * @return {[type]} [description]
	 */
	onInit : function() {
		// sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit.call(this);
		this.oDataModel = this.oApplicationFacade.getODataModel();
		this.oBundle = this.oApplicationFacade.getResourceBundle();
		this.getList().setNoDataText(this.oBundle.getText("LOADING"));
		this.registerMasterListBind(this.getList());
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		var oComponent = sap.ui.component(sComponentId);
		oComponent.oEventBus.subscribe("travel.request.create", "RefreshUpdateDelete", this._handleRefreshUpdateDelete,
				this);

		this.oRouter.attachRoutePatternMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "detail") {
				var sBindingContextPath = this.getBindingContextPathFor(oEvent.getParameter("arguments"));
				var oItem = this.findItemByContextPath(sBindingContextPath);
				var oList = this.getList();
				var iIndex = oList.indexOfItem(oItem);
				var oNextItem = oList.getItems()[iIndex + 1];
				this._sNextDetailPath = oNextItem && oNextItem.getBindingContext(this.sModelName).getPath();
			}
		}, this);

		/*
		 * var masterList = this.byId("list"); if (masterList) { this.byId("list").addEventDelegate({ onAfterRendering :
		 * this.processMasterRefreshAfterCreate }, this); }
		 */
	},

	/**
	 * @public [onDataLoaded On master list loaded]
	 */
	onDataLoaded : function() {
		this.getList().setNoDataText(this.oBundle.getText("NO_ITEMS_AVAILABLE"));
		if (this.getList().getItems().length < 1) {
			if (!sap.ui.Device.system.phone) {
				this.showEmptyView("DETAIL_TITLE", "NO_ITEMS_AVAILABLE");
			}
		}
	},


	_handleRefreshUpdateDelete : function(channelId, eventId, data) {
		"use strict";

		var i;
		for (i=this.oDataModel.aBindings.length -1; i >=0; i--) {
			if (this.oDataModel.aBindings[i].sPath === data.param) {
				this.oDataModel.aBindings.splice(i, 1);
				break;
			}
		}
		
		if (!jQuery.device.is.phone) {
			var aListItems = this.getList().getItems();
			
			if (aListItems.length > 1) { // the deleted entry is still in the list
				for (i=0; i< aListItems.length; i++) {
					// find first item that is not the deleted item
					var sPath = aListItems[i].getBindingContext().sPath;
					if (sPath !== data.param) {
						var oItem = this.findItemByContextPath(sPath);
						this.setListItem(oItem);
						break;
					}
				}
			} else {
				this.showEmptyView("DETAIL_TITLE", "NO_ITEMS_AVAILABLE");
			}
		}
		
		setTimeout(jQuery.proxy(function() {
			this.oDataModel.refresh(true);
		}, this),  800);
	},

	processMasterRefreshAfterCreate : function() {

		if (this.createdContextPath !== null) {
			var oList = this.getList(), aItems = oList.getItems(), oBindingContext, i, len;
			for (i = 0, len = aItems.length; i < len; i += 1) {
				oBindingContext = aItems[i].getBindingContext();
				if (oBindingContext && oBindingContext.sPath === this.createdContextPath) {
					this.contextPath = undefined;
					this.setListItem(aItems[i], jQuery.device.is.phone);
					this.createdContextPath = null;
					return;
				}
			}
		}
	},

	/**
	 * [_handleNew description]
	 * 
	 */
	_handleNew : function() {
		this.oRouter.navTo("new", {

		}, !jQuery.device.is.phone);
	},

	/**
	 * @public [getHeaderFooterOptions Define header & footer options]
	 */
	getHeaderFooterOptions : function() {
		var that = this;
		return {
			sI18NMasterTitle : "MASTER_TITLE",
			oAddOptions : {
				sI18nBtnTxt : "TRC_NEW",
				icon : "sap-icon://add",
				onBtnPressed : jQuery.proxy(this._handleNew, that),
				enabled : true
			}
		};
	}

});
