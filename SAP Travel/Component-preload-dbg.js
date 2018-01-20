jQuery.sap.registerPreloadedModules({
"name":"travel/request/create/Component-preload",
"version":"2.0",
"modules":{
	"travel/request/create/Component.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
// define a root UIComponent which exposes the main view
jQuery.sap.declare("travel.request.create.Component");
jQuery.sap.require("travel.request.create.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// new Component
sap.ca.scfld.md.ComponentBase
		.extend(
				"travel.request.create.Component",
				{
					metadata : sap.ca.scfld.md.ComponentBase
							.createMetaData(
									"MD",
									{
										"name" : "Travel Request Create Component",
										"version" : "1.5.4",
										"library" : "travel.request.create",
										"includes" : [],
										"dependencies" : {
											"libs" : ["sap.m", "sap.me"],
											"components" : []
										},

										"config" : {
											"resourceBundle" : "i18n/i18n.properties",
											"titleResource" : "DISPLAY_NAME",
											"icon" : "sap-icon://flight",
											"favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/My_Travel_Requests.ico",
											"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Travel_Requests/57_iPhone_Desktop_Launch.png",
											"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Travel_Requests/114_iPhone-Retina_Web_Clip.png",
											"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Travel_Requests/72_iPad_Desktop_Launch.png",
											"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Travel_Requests/144_iPad_Retina_Web_Clip.png"
										},

										viewPath : "travel.request.create.view",

										masterPageRoutes : {
											"master" : {
												pattern : "",
												view : "Master"
											},
											"created" : {
												pattern : "created/{Id}",
												view : "Master"
											}
										},

										detailPageRoutes : {
											"detail" : {
												pattern : "detail/{contextPath}",
												view : "Detail"
											},

											"new" : {
												pattern : "newTravel",
												view : "DetailForm"
											},

											"edit" : {
												pattern : "editTravel/{contextPath}",
												view : "DetailForm"
											}
										}
									}),

					/**
					 * Initialize the application
					 * 
					 * @returns {sap.ui.core.Control} the content
					 */
					createContent : function() {
						var oViewData = {
							component : this
						};

						var oView = sap.ui.view({
							viewName : "travel.request.create.Main",
							type : sap.ui.core.mvc.ViewType.XML,
							viewData : oViewData
						});

						var sPrefix = oView.getId() + "--";
						var oEventBus = sap.ui.getCore().getEventBus();

						this.oEventBus = {
							publish : function(channelId, eventId, data) {
								channelId = sPrefix + channelId;
								oEventBus.publish(channelId, eventId, data);
							},
							subscribe : function(channelId, eventId, data, oListener) {
								channelId = sPrefix + channelId;
								oEventBus.subscribe(channelId, eventId, data, oListener);
							},
							unsubscribe : function(channelId, eventId, data, oListener) {
								channelId = sPrefix + channelId;
								oEventBus.unsubscribe(channelId, eventId, data, oListener);
							}
						};

						return oView;
					}
				});
},
	"travel/request/create/Configuration.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("travel.request.create.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("travel.request.create.Configuration", {

	oServiceParams : {
		serviceList : [{
			name : "SRA004_SRV",
			masterCollection : "Travels",
			// The 'useODataPrefix' is relevant for FLP on HCP.
			serviceUrl : (typeof window["useODataPrefix"] !== "undefined" ? jQuery.sap.getModulePath("travel.request.create") : "") + "/sap/opu/odata/sap/SRA004_SRV/",
			isDefault : true,
			mockedDataSource : "/travel.request.create/model/metadata.xml"
		}]
	},

	getServiceParams : function() {
		return this.oServiceParams;
	},

	/**
	 * @inherit
	 */
	getServiceList : function() {
		return this.oServiceParams.serviceList;
	},

	getMasterKeyAttributes : function() {
		return ["Id"];
	}

});

},
	"travel/request/create/Main.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("travel.request.create.Main", {

	onInit : function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		sap.ca.scfld.md.Startup.init("travel.request.create", this);
	},

    onExit : function() {
        // close open popovers
        if (sap.m.InstanceManager.hasOpenPopover()) {
        	sap.m.InstanceManager.closeAllPopovers();
 	   	}
        // close open dialogs
        if (sap.m.InstanceManager.hasOpenDialog()) {
        	sap.m.InstanceManager.closeAllDialogs();
        }
    }
});
},
	"travel/request/create/Main.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View controllerName="travel.request.create.Main"\n\txmlns:core="sap.ui.core"\n\txmlns="sap.m"\n\tdisplayBlock="true"\n\theight="100%">\n\t<NavContainer id="fioriContent">\n\t</NavContainer>\n</core:View>',
	"travel/request/create/i18n/i18n.properties":'# My Travel Requests\n# __ldi.translation.uuid=d62009a0-2852-11e3-8224-0800200c9a66\n# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n# XTIT: Application Name\nDISPLAY_NAME=My Travel Requests\n# XTIT: Title of Master\nMASTER_TITLE=Travel Requests ({0})\n# XTIT: Title of Detail\nDETAIL_TITLE=Travel Request\n# XTIT: Title of new TR on panel\nTRC_NEW_PAGE=New Travel Request\n# XTIT: Title of edit TR on panel\nTRC_EDIT_PAGE=Edit Travel Request\n# XTIT: Title of TR detail in edit\nTRC_TRIP_DETAIL=Trip Detail\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\nMSGBOX_TITLE_CANCEL=Unsaved Changes\n\n\n# XFLD: No items are currently available\nNO_ITEMS_AVAILABLE=No items are currently available\n# XFLD : Loading data text\nLOADING=Loading..\n# XFLD : Label duration\nTRC_DURATION=Duration\n# XFLD : Label Declined\nDECLINED=Rejected\n# XFLD : Label Approved\nAPPROVED=Approved\n# XFLD : Label Pending\nPENDING=Pending\n# XFLD: Label Submission date\nSUBMISSION=Submission date\n# XFLD : Label purpose\nTRC_PURPOSE=Purpose\n# XFLD : Label Trip Activity\nTRC_ACTIVITY=Trip Activity\n# XFLD : Label From date\nFROM=From\n# XFLD : Label To date\nTO=To\n# XFLD : Label destination\nTRC_DESTINATION=Destination\n# XFLD : Label city\nTRC_CITY=City\n# XFLD : Label approver\nTRC_LBL_APPROVER=Approver\n# XFLD : Label estimated cost\nTRC_LBL_COST=Estimated Cost\n# XFLD : Label currency\nTRC_CURRENCY=Currency\n# XFLD : Label for Note\nTRC_LBL_NOTE=Note to Approver\n# XFLD : Label for Category\nTRC_TYPE=Category\n# XFLD: Label for Type\nTYPE=Type\n# XFLD: Label for Description\nDESCRIPTION=Description\n# XFLD,10 : Label Share\nTRC_PERCENTAGE=Share\n# XFLD : Label cost assignment\nTRC_LBL_COST_CENTER=Cost Assignment\n# XFLD : Label cost assignments with count\nTRC_LBL_COST_CENTER_WITH_COUNT=Cost Assignments ({0})\n# XFLD : Label cost assignment sales order\nTRC_SALES_ORDER=Sales Order\n# XFLD : Label cost assignment sales order item\nTRC_LBL_SALES_ORDER_ITEM=Order Items\n# XFLD : Label Cost Center\nTRC_COST_CENTER=Cost Center\n# XFLD : Label Internal Order\nTRC_INTERNAL_ORDER=Internal Order\n\n# XFLD : Label Sales Order Item\nTRC_SALES_ORDER_ITEM=Sales Order Item\n\n# XFLD : Label Network\nTRC_NETWORK=Network\n\n# XFLD : Label Network Activity\nTRC_NETWORK_ACTIVITY=Network Activity\n\n# XFLD : Label Project\nTRC_PROJECT=Project\n\n#XFLD: List: No data available\nLIST_NO_DATA=No Data Available\n\n# XMSG: Delete message\nDELETE_OK=Travel request deleted\n# XMSG : Submission message, {0} is the approver\nSUBMITTED_MSG=Your travel request has been submitted to your approver {0}\n# XMSG : Submission message without approver\nSUBMITTED_MSG_NO_APPROVER=Your travel request has been submitted\n# XMSG : Submission message without submit (Save only)\nSUBMITTED_MSG_SAVE_ONLY=Your travel request has been saved\n# XMSG : Message for Delete confirmation event\nCONFIRMATION_DELETE=Delete {0}?\n# XMSG : Message for Cancel confirmation event\nCONFIRMATION_CANCEL=Any unsaved data will be discarded. Are you sure you want to proceed?\n# XMSG : Message for wrong dates\nERR_MSG_WRONG_DATE=Start date must be before end date.\n# XMSG : Warning message for missing approver\nERR_MANAGER=No approver defined; contact your administrator\n# XMSG : Warning message for cost center total\nERR_PERCENTAGE=The total of cost assignments must be 100%\n# XMSG : Message for error during validation\nERR_VALIDATION=Error during Validation\n# XMSG : Message for concurrent access error\nERR_CONCURRENT_ACCESS=The travel request has been modified by someone else. Please refresh the list.\n\n# XBUT : Label for button New\nTRC_NEW=New\n# XBUT : Label for button Delete\nTRC_DELETE=Delete\n# XBUT : Label for button Edit\nTRC_EDIT=Edit\n# XBUT : Label for button Submit\nTRC_SUBMIT=Submit\n# XBUT : Label for button Cancel\nTRC_CANCEL=Cancel\n# XBUT : Label for button Add\nTRC_ADD=Add\n# XBUT : Label for button Remove\nTRC_REMOVE=Remove\n# XBUT : Label for button Ok\nTRC_OK=OK\n# XFLD : Label Country\nTRC_COUNTRY=Country\n# XFLD : Label Per Diem Region\nTRC_PER_DIEM_REGION=Per Diem Region\n# XFLD : Label Open for Request status\nOPEN=Open\n# XFLD : Label Save for Saving Requests\nSAVE=Save\n\n#XBUT,30: Add New Cost Object\nTRC_ADD_NEW_COST_ASSIGNMENT=Add Cost Assignment\n\n#XFLD,30: Cost assignment value select helper dialog title\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Cost Assignment',
	"travel/request/create/i18n/i18n_ar.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u0637\\u0644\\u0628\\u0627\\u062A \\u0627\\u0644\\u0633\\u0641\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635\\u0629 \\u0628\\u064A\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u0637\\u0644\\u0628\\u0627\\u062A \\u0627\\u0644\\u0633\\u0641\\u0631 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u0637\\u0644\\u0628 \\u0633\\u0641\\u0631 - \\u0631\\u062D\\u0644\\u0629 \\u0641\\u0631\\u062F\\u064A\\u0629\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u0637\\u0644\\u0628 \\u0633\\u0641\\u0631 \\u062C\\u062F\\u064A\\u062F\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0631\\u062D\\u0644\\u0629\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0645\\u062D\\u0641\\u0648\\u0638\\u0629\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A\\u0629 \\u0639\\u0646\\u0627\\u0635\\u0631 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\r\n# XFLD : Loading data text\r\nLOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u0627\\u0644\\u0645\\u062F\\u0629\r\n# XFLD : Label Declined\r\nDECLINED=\\u0645\\u0631\\u0641\\u0648\\u0636\r\n# XFLD : Label Approved\r\nAPPROVED=\\u0645\\u0639\\u062A\\u0645\\u064E\\u062F\r\n# XFLD : Label Pending\r\nPENDING=\\u0645\\u0639\\u0644\\u0642\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u0627\\u0644\\u063A\\u0631\\u0636\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u0646\\u0634\\u0627\\u0637 \\u0627\\u0644\\u0631\\u062D\\u0644\\u0629\r\n# XFLD : Label From date\r\nFROM=\\u0645\\u0646\r\n# XFLD : Label To date\r\nTO=\\u0625\\u0644\\u0649\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u0627\\u0644\\u0648\\u062C\\u0647\\u0629\r\n# XFLD : Label city\r\nTRC_CITY=\\u0627\\u0644\\u0645\\u062F\\u064A\\u0646\\u0629\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u0650\\u062F\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629 \\u0627\\u0644\\u0645\\u0642\\u062F\\u0631\\u0629\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u0627\\u0644\\u0639\\u0645\\u0644\\u0629\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u0625\\u0634\\u0639\\u0627\\u0631 \\u0625\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u0650\\u062F\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u0627\\u0644\\u0646\\u0648\\u0639\r\n# XFLD: Label for Type\r\nTYPE=\\u0627\\u0644\\u0646\\u0648\\u0639\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u0627\\u0644\\u0648\\u0635\\u0641\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u0645\\u0634\\u0627\\u0631\\u0643\\u0629\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629 ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u0623\\u0645\\u0631 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u0628\\u0646\\u0648\\u062F \\u0627\\u0644\\u0623\\u0645\\u0631\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u0645\\u0631\\u0643\\u0632 \\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u0623\\u0645\\u0631 \\u062F\\u0627\\u062E\\u0644\\u064A\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u0628\\u0646\\u062F \\u0623\\u0645\\u0631 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u0627\\u0644\\u0634\\u0628\\u0643\\u0629\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u0646\\u0634\\u0627\\u0637 \\u0627\\u0644\\u0634\\u0628\\u0643\\u0629\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u0627\\u0644\\u0645\\u0634\\u0631\\u0648\\u0639\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0628\\u064A\\u0627\\u0646\\u0627\\u062A\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u062A\\u0645 \\u0625\\u0631\\u0633\\u0627\\u0644 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631 \\u0625\\u0644\\u0649 {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u062A\\u0645 \\u062A\\u0642\\u062F\\u064A\\u0645 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635 \\u0628\\u0643\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635 \\u0628\\u0643\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u062D\\u0630\\u0641 {0}\\u061F\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u0633\\u064A\\u062A\\u0645 \\u0641\\u0642\\u062F \\u0627\\u0644\\u0628\\u064A\\u0627\\u0646\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0627\\u0644\\u0645\\u062D\\u0641\\u0648\\u0638\\u0629. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629\\u061F\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u064A\\u062C\\u0628 \\u0623\\u0646 \\u064A\\u0642\\u0639 \\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0628\\u062F\\u0627\\u064A\\u0629 \\u0642\\u0628\\u0644 \\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u0644\\u0645 \\u064A\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062F \\u0645\\u0639\\u062A\\u0645\\u0650\\u062F\\u061B \\u0627\\u062A\\u0635\\u0644 \\u0628\\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u064A\\u062C\\u0628 \\u0623\\u0646 \\u064A\\u0643\\u0648\\u0646 \\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629 \\u0628\\u0646\\u0633\\u0628\\u0629 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u062D\\u062F\\u062B \\u062E\\u0637\\u0623 \\u0623\\u062B\\u0646\\u0627\\u0621 \\u0627\\u0644\\u062A\\u062D\\u0642\\u0642 \\u0645\\u0646 \\u0627\\u0644\\u0635\\u062D\\u0629\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u062A\\u0645 \\u062A\\u0639\\u062F\\u064A\\u0644 \\u0637\\u0644\\u0628 \\u0627\\u0644\\u0633\\u0641\\u0631 \\u0628\\u0648\\u0627\\u0633\\u0637\\u0629 \\u0634\\u062E\\u0635 \\u0622\\u062E\\u0631\\u061B \\u0642\\u0645 \\u0628\\u062A\\u062D\\u062F\\u064A\\u062B \\u0627\\u0644\\u0642\\u0627\\u0626\\u0645\\u0629\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u062C\\u062F\\u064A\\u062F\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u062D\\u0630\\u0641\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u062A\\u062D\\u0631\\u064A\\u0631\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u062A\\u0642\\u062F\\u064A\\u0645\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u0625\\u0636\\u0627\\u0641\\u0629\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u0625\\u0632\\u0627\\u0644\\u0629\r\n# XBUT : Label for button Ok\r\nTRC_OK=\\u0645\\u0648\\u0627\\u0641\\u0642\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u0627\\u0644\\u062F\\u0648\\u0644\\u0629\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u0645\\u0646\\u0637\\u0642\\u0629 \\u0627\\u0644\\u0628\\u062F\\u0644\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u0641\\u062A\\u062D\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u062D\\u0641\\u0638\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u062A\\u0643\\u0644\\u0641\\u0629\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u062A\\u0643\\u0644\\u0641\\u0629\r\n',
	"travel/request/create/i18n/i18n_bg.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u041C\\u043E\\u0438\\u0442\\u0435 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0438 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u0417\\u0430\\u044F\\u043A\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 - \\u0435\\u0434\\u0438\\u043D\\u0438\\u0447\\u043D\\u0430\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u041D\\u043E\\u0432\\u0430 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438 \\u043F\\u0440\\u043E\\u043C\\u0435\\u043D\\u0438\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u0412 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442\\u0430 \\u043D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u043D\\u0438 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438\r\n# XFLD : Loading data text\r\nLOADING=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u041F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442\r\n# XFLD : Label Declined\r\nDECLINED=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\r\n# XFLD : Label Approved\r\nAPPROVED=\\u041E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\r\n# XFLD : Label Pending\r\nPENDING=\\u0417\\u0430 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0430\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u0414\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u0426\\u0435\\u043B\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u0414\\u0435\\u0439\\u043D\\u043E\\u0441\\u0442 \\u0432 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XFLD : Label From date\r\nFROM=\\u041E\\u0442\r\n# XFLD : Label To date\r\nTO=\\u0434\\u043E\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u0414\\u0435\\u0441\\u0442\\u0438\\u043D\\u0430\\u0446\\u0438\\u044F\r\n# XFLD : Label city\r\nTRC_CITY=\\u0413\\u0440\\u0430\\u0434\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u041E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u0449\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u041E\\u0446\\u0435\\u043D\\u0435\\u043D\\u0438 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u0412\\u0430\\u043B\\u0443\\u0442\\u0430\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u0411\\u0435\\u043B\\u0435\\u0436\\u043A\\u0430 \\u043A\\u044A\\u043C \\u043E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u0449\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u0412\\u0438\\u0434\r\n# XFLD: Label for Type\r\nTYPE=\\u0412\\u0438\\u0434\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u0421\\u043F\\u043E\\u0434\\u0435\\u043B\\u044F\\u043D\\u0435\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434 ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u041A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0441\\u043A\\u0430 \\u043F\\u043E\\u0440\\u044A\\u0447\\u043A\\u0430\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438 \\u043D\\u0430 \\u043F\\u043E\\u0440\\u044A\\u0447\\u043A\\u0430\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u0420\\u0430\\u0437\\u0445\\u043E\\u0434\\u0435\\u043D \\u0446\\u0435\\u043D\\u0442\\u044A\\u0440\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u0412\\u044A\\u0442\\u0440\\u0435\\u0448\\u043D\\u0430 \\u043F\\u043E\\u0440\\u044A\\u0447\\u043A\\u0430\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F \\u043D\\u0430 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0441\\u043A\\u0430 \\u043F\\u043E\\u0440\\u044A\\u0447\\u043A\\u0430\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u041C\\u0440\\u0435\\u0436\\u0430\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u0414\\u0435\\u0439\\u043D\\u043E\\u0441\\u0442 \\u0432 \\u043C\\u0440\\u0435\\u0436\\u0430\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u041F\\u0440\\u043E\\u0435\\u043A\\u0442\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u041D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 \\u0435 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0442\\u0430\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u0412\\u0430\\u0448\\u0430\\u0442\\u0430 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 \\u0435 \\u043F\\u043E\\u0434\\u0430\\u0434\\u0435\\u043D\\u0430 \\u043A\\u044A\\u043C {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0432\\u0438 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 \\u0435 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0442\\u0435\\u043D\\u0430\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u0412\\u0430\\u0448\\u0438\\u0442\\u0435 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0438 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 \\u0441\\u0430 \\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435 {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0449\\u0435 \\u0431\\u044A\\u0434\\u0430\\u0442 \\u0438\\u0437\\u0433\\u0443\\u0431\\u0435\\u043D\\u0438. \\u0416\\u0435\\u043B\\u0430\\u0435\\u0442\\u0435 \\u043B\\u0438 \\u0434\\u0430 \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u041D\\u0430\\u0447\\u0430\\u043B\\u043D\\u0430\\u0442\\u0430 \\u0434\\u0430\\u0442\\u0430 \\u0442\\u0440\\u044F\\u0431\\u0432\\u0430 \\u0434\\u0430 \\u0435 \\u043F\\u0440\\u0435\\u0434\\u0438 \\u043A\\u0440\\u0430\\u0439\\u043D\\u0430\\u0442\\u0430 \\u0434\\u0430\\u0442\\u0430.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u041D\\u044F\\u043C\\u0430 \\u043E\\u043F\\u0440\\u0435\\u0434\\u0435\\u043B\\u0435\\u043D\\u043E \\u043E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u0449\\u043E \\u043B\\u0438\\u0446\\u0435; \\u0441\\u0432\\u044A\\u0440\\u0436\\u0435\\u0442\\u0435 \\u0441\\u0435 \\u0441 \\u0432\\u0430\\u0448\\u0438\\u044F \\u0430\\u0434\\u043C\\u0438\\u043D\\u0438\\u0441\\u0442\\u0440\\u0430\\u0442\\u043E\\u0440\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u0421\\u0443\\u043C\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F\\u0442\\u0430 \\u043D\\u0430 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438 \\u0442\\u0440\\u044F\\u0431\\u0432\\u0430 \\u0434\\u0430 \\u0435 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u0413\\u0440\\u0435\\u0448\\u043A\\u0430 \\u043F\\u0440\\u0438 \\u043F\\u0440\\u043E\\u0432\\u0435\\u0440\\u043A\\u0430\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u041D\\u044F\\u043A\\u043E\\u0439 \\u0434\\u0440\\u0443\\u0433 \\u0435 \\u043F\\u0440\\u043E\\u043C\\u0435\\u043D\\u0438\\u043B \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0437\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430; \\u043E\\u043F\\u0440\\u0435\\u0441\\u043D\\u0435\\u0442\\u0435 \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\\u0430\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u041D\\u043E\\u0432\\u0438\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u0418\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u041E\\u0442\\u043A\\u0430\\u0437\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u0414\\u044A\\u0440\\u0436\\u0430\\u0432\\u0430\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u0420\\u0435\\u0433\\u0438\\u043E\\u043D \\u043D\\u0430 \\u0434\\u043D\\u0435\\u0432\\u043D\\u0438 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u041E\\u0442\\u0432\\u043E\\u0440\\u0435\\u043D\\u0438\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432. \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0440\\u0430\\u0437\\u0445\\u043E\\u0434\\u0438\r\n',
	"travel/request/create/i18n/i18n_cs.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moje \\u017E\\u00E1dosti o dovolenou\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u017D\\u00E1dosti o slu\\u017Eebn\\u00ED cestu ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u017D\\u00E1dost o slu\\u017Eebn\\u00ED cestu - jedna cesta\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nov\\u00E1 \\u017E\\u00E1dost o slu\\u017Eebn\\u00ED cestu\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u00DAprava \\u017E\\u00E1dosti o slu\\u017Eebn\\u00ED cestu\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detaily cesty\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Neulo\\u017Een\\u00E9 zm\\u011Bny\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=V sou\\u010Dasn\\u00E9 dob\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00E9 polo\\u017Eky\r\n# XFLD : Loading data text\r\nLOADING=Zav\\u00E1d\\u00ED se...\r\n# XFLD : Label duration\r\nTRC_DURATION=Trv\\u00E1n\\u00ED\r\n# XFLD : Label Declined\r\nDECLINED=Zam\\u00EDtnuto\r\n# XFLD : Label Approved\r\nAPPROVED=Schv\\u00E1leno\r\n# XFLD : Label Pending\r\nPENDING=\\u010Cek\\u00E1 na vy\\u0159\\u00EDzen\\u00ED\r\n# XFLD: Label Submission date\r\nSUBMISSION=Datum odesl\\u00E1n\\u00ED\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u00DA\\u010Del\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Cestovn\\u00ED \\u010Dinnost\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=Do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=C\\u00EDl\r\n# XFLD : Label city\r\nTRC_CITY=M\\u011Bsto\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Schvalovatel\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Odhadovan\\u00E9 n\\u00E1klady\r\n# XFLD : Label currency\r\nTRC_CURRENCY=M\\u011Bna\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Pozn\\u00E1mka pro schvalovatele\r\n# XFLD : Label for Category\r\nTRC_TYPE=Typ\r\n# XFLD: Label for Type\r\nTYPE=Typ\r\n# XFLD: Label for Description\r\nDESCRIPTION=Popis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Pod\\u00EDl\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=P\\u0159i\\u0159azen\\u00ED n\\u00E1klad\\u016F\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=P\\u0159i\\u0159azen\\u00ED n\\u00E1klad\\u016F ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Zak\\u00E1zka odb\\u011Bratele\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Polo\\u017Eky zak\\u00E1zky\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=N\\u00E1kladov\\u00E9 st\\u0159edisko\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Intern\\u00ED zak\\u00E1zka\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Polo\\u017Eka zak\\u00E1zky odb\\u011Bratele\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=S\\u00ED\\u0165\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=S\\u00ED\\u0165ov\\u00E1 \\u010Dinnost\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Nejsou k dispozici data\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u017D\\u00E1dost o slu\\u017Eebn\\u00ED cestu byla vymaz\\u00E1na\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Va\\u0161e \\u017E\\u00E1dost o cestu byla zasl\\u00E1na {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Va\\u0161e \\u017E\\u00E1dost o cestu byla odesl\\u00E1na\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Va\\u0161e \\u017E\\u00E1dost o slu\\u017Eebn\\u00ED cestu byla ulo\\u017Eena\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Vymazat {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Neulo\\u017Een\\u00E1 data budou ztracena. Chcete pokra\\u010Dovat?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Po\\u010D\\u00E1te\\u010Dn\\u00ED datum mus\\u00ED le\\u017Eet p\\u0159ed koncov\\u00FDm datem.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Nebyl definov\\u00E1n \\u017E\\u00E1dn\\u00FD schvalovatel; obra\\u0165te se na spr\\u00E1vce\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Celkov\\u00E1 p\\u0159i\\u0159azen\\u00ED n\\u00E1klad\\u016F mus\\u00ED b\\u00FDt 100 %\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Chyba p\\u0159i ov\\u011B\\u0159ov\\u00E1n\\u00ED\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u017D\\u00E1dost o slu\\u017Eebn\\u00ED cestu modifikoval n\\u011Bkdo jin\\u00FD; aktualizuje seznam\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nov\\u00FD\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Smazat\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Upravit\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Odeslat\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Zru\\u0161it\r\n# XBUT : Label for button Add\r\nTRC_ADD=P\\u0159idat\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Odstranit\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=St\\u00E1t\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Region stravn\\u00E9ho\r\n# XFLD : Label Open for Request status\r\nOPEN=Otev\\u0159eno\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Ulo\\u017Eit\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=P\\u0159idat p\\u0159i\\u0159azen\\u00ED n\\u00E1klad\\u016F\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=P\\u0159i\\u0159azen\\u00ED n\\u00E1klad\\u016F\r\n',
	"travel/request/create/i18n/i18n_de.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Meine Reiseantr\\u00E4ge\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Reiseantr\\u00E4ge ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Reiseantrag - Einzelreise\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Neuer Reiseantrag\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Reiseantrag bearbeiten\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Reisedetails\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Ungesicherte \\u00C4nderungen\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Derzeit sind keine Positionen verf\\u00FCgbar\r\n# XFLD : Loading data text\r\nLOADING=Laden...\r\n# XFLD : Label duration\r\nTRC_DURATION=Dauer\r\n# XFLD : Label Declined\r\nDECLINED=Abgelehnt\r\n# XFLD : Label Approved\r\nAPPROVED=Genehmigt\r\n# XFLD : Label Pending\r\nPENDING=Offen\r\n# XFLD: Label Submission date\r\nSUBMISSION=Datum der Einreichung\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Grund\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Reiset\\u00E4tigkeit\r\n# XFLD : Label From date\r\nFROM=Von\r\n# XFLD : Label To date\r\nTO=bis\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Reiseziel\r\n# XFLD : Label city\r\nTRC_CITY=Ort\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Genehmigung durch\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Gesch\\u00E4tzte Kosten\r\n# XFLD : Label currency\r\nTRC_CURRENCY=W\\u00E4hrung\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Notiz an Genehmigenden\r\n# XFLD : Label for Category\r\nTRC_TYPE=Art\r\n# XFLD: Label for Type\r\nTYPE=Typ\r\n# XFLD: Label for Description\r\nDESCRIPTION=Beschreibung\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Anteil\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Kostenzuordnung\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Kostenzuordnung ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Kundenauftrag\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Auftragspositionen\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Kostenstelle\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Interne Reihenfolge\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Kundenauftragsposition\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Netzplan\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Netzplanvorgang\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Keine Daten verf\\u00FCgbar\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Reiseantrag gel\\u00F6scht\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Ihr Reiseantrag wurde an {0} gesendet\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Ihr Reiseantrag wurde eingereicht\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Ihr Reiseantrag wurde gesichert\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE={0} l\\u00F6schen?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Ungesicherte Daten gehen verloren. M\\u00F6chten Sie fortfahren?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Das Beginndatum muss vor dem Enddatum liegen.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Kein Genehmigender festgelegt. Wenden Sie sich an Ihren Administrator.\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Summe der Kostenzuordnungen muss 100 % ergeben\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Fehler bei der Validierung\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Der Reiseantrag wurde ge\\u00E4ndert. Aktualisieren Sie Ihre Liste.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Neu\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=L\\u00F6schen\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Bearbeiten\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Einreichen\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Abbrechen\r\n# XBUT : Label for button Add\r\nTRC_ADD=Hinzuf\\u00FCgen\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Entfernen\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Land\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Pauschalenregion\r\n# XFLD : Label Open for Request status\r\nOPEN=Offen\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Sichern\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Kostenzuordnung hinzuf\\u00FCgen\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Kostenzuordnung\r\n',
	"travel/request/create/i18n/i18n_en.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=My Travel Requests\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Travel Requests ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Travel Request - Single Trip\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=New Travel Request\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Edit Travel Request\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Trip Details\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Unsaved Changes\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=No items are currently available\r\n# XFLD : Loading data text\r\nLOADING=Loading...\r\n# XFLD : Label duration\r\nTRC_DURATION=Duration\r\n# XFLD : Label Declined\r\nDECLINED=Rejected\r\n# XFLD : Label Approved\r\nAPPROVED=Approved\r\n# XFLD : Label Pending\r\nPENDING=Pending\r\n# XFLD: Label Submission date\r\nSUBMISSION=Submission Date\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Purpose\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Trip Activity\r\n# XFLD : Label From date\r\nFROM=From\r\n# XFLD : Label To date\r\nTO=to\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destination\r\n# XFLD : Label city\r\nTRC_CITY=City\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Approver\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Estimated Cost\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Currency\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Note to Approver\r\n# XFLD : Label for Category\r\nTRC_TYPE=Type\r\n# XFLD: Label for Type\r\nTYPE=Type\r\n# XFLD: Label for Description\r\nDESCRIPTION=Description\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Share\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Cost Assignment\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Cost Assignment ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Sales Order\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Order Items\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Cost Center\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Internal order\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Sales Order Item\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Network\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Network Activity\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Project\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=No data available\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Travel request deleted\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Your travel request has been submitted to {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Your travel request has been submitted\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Your travel request has been saved\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Delete {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Unsaved data will be lost. Do you want to proceed?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Start date must be before end date.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=No approver defined; contact your administrator\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=The total of cost assignments must be 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Error during validation\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=The travel request has been modified by someone else; refresh the list\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=New\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Delete\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Edit\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Submit\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Cancel\r\n# XBUT : Label for button Add\r\nTRC_ADD=Add\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Remove\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Country\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Per Diem Region\r\n# XFLD : Label Open for Request status\r\nOPEN=Open\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Save\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Add Cost Assignment\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Cost Assignment\r\n',
	"travel/request/create/i18n/i18n_en_US_sappsd.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=[[[\\u039C\\u0177 \\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163\\u015F]]]\r\n# XTIT: Title of Master\r\nMASTER_TITLE=[[[\\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163\\u015F ({0})]]]\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=[[[\\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163]]]\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=[[[\\u0143\\u0113\\u0175 \\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163]]]\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=[[[\\u0114\\u018C\\u012F\\u0163 \\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163]]]\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=[[[\\u0162\\u0157\\u012F\\u03C1 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A]]]\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=[[[\\u016E\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F]]]\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=[[[\\u0143\\u014F \\u012F\\u0163\\u0113\\u0271\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\r\n# XFLD : Loading data text\r\nLOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F..]]]\r\n# XFLD : Label duration\r\nTRC_DURATION=[[[\\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B]]]\r\n# XFLD : Label Declined\r\nDECLINED=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\r\n# XFLD : Label Approved\r\nAPPROVED=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C]]]\r\n# XFLD : Label Pending\r\nPENDING=[[[\\u01A4\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F]]]\r\n# XFLD: Label Submission date\r\nSUBMISSION=[[[\\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B \\u018C\\u0105\\u0163\\u0113]]]\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=[[[\\u01A4\\u0171\\u0157\\u03C1\\u014F\\u015F\\u0113]]]\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=[[[\\u0162\\u0157\\u012F\\u03C1 \\u0100\\u010B\\u0163\\u012F\\u028B\\u012F\\u0163\\u0177]]]\r\n# XFLD : Label From date\r\nFROM=[[[\\u0191\\u0157\\u014F\\u0271]]]\r\n# XFLD : Label To date\r\nTO=[[[\\u0162\\u014F]]]\r\n# XFLD : Label destination\r\nTRC_DESTINATION=[[[\\u010E\\u0113\\u015F\\u0163\\u012F\\u014B\\u0105\\u0163\\u012F\\u014F\\u014B]]]\r\n# XFLD : Label city\r\nTRC_CITY=[[[\\u0108\\u012F\\u0163\\u0177]]]\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157]]]\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=[[[\\u0114\\u015F\\u0163\\u012F\\u0271\\u0105\\u0163\\u0113\\u018C \\u0108\\u014F\\u015F\\u0163]]]\r\n# XFLD : Label currency\r\nTRC_CURRENCY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177]]]\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=[[[\\u0143\\u014F\\u0163\\u0113 \\u0163\\u014F \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157]]]\r\n# XFLD : Label for Category\r\nTRC_TYPE=[[[\\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177]]]\r\n# XFLD: Label for Type\r\nTYPE=[[[\\u0162\\u0177\\u03C1\\u0113]]]\r\n# XFLD: Label for Description\r\nDESCRIPTION=[[[\\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B]]]\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=[[[\\u015C\\u0125\\u0105\\u0157\\u0113]]]\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=[[[\\u0108\\u014F\\u015F\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163]]]\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=[[[\\u0108\\u014F\\u015F\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F ({0})]]]\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=[[[\\u015C\\u0105\\u013A\\u0113\\u015F \\u014E\\u0157\\u018C\\u0113\\u0157]]]\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=[[[\\u014E\\u0157\\u018C\\u0113\\u0157 \\u012C\\u0163\\u0113\\u0271\\u015F]]]\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=[[[\\u0108\\u014F\\u015F\\u0163 \\u0108\\u0113\\u014B\\u0163\\u0113\\u0157]]]\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=[[[\\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u014E\\u0157\\u018C\\u0113\\u0157]]]\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=[[[\\u015C\\u0105\\u013A\\u0113\\u015F \\u014E\\u0157\\u018C\\u0113\\u0157 \\u012C\\u0163\\u0113\\u0271]]]\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=[[[\\u0143\\u0113\\u0163\\u0175\\u014F\\u0157\\u0137]]]\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=[[[\\u0143\\u0113\\u0163\\u0175\\u014F\\u0157\\u0137 \\u0100\\u010B\\u0163\\u012F\\u028B\\u012F\\u0163\\u0177]]]\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=[[[\\u01A4\\u0157\\u014F\\u0135\\u0113\\u010B\\u0163]]]\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=[[[\\u0143\\u014F \\u010E\\u0105\\u0163\\u0105 \\u0100\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=[[[\\u0162\\u0157\\u0105\\u028B\\u0113\\u013A \\u0157\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u018C\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C]]]\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=[[[\\u0176\\u014F\\u0171\\u0157 \\u0163\\u0157\\u0105\\u028B\\u0113\\u013A \\u0157\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u0125\\u0105\\u015F \\u0183\\u0113\\u0113\\u014B \\u015F\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C \\u0163\\u014F \\u0177\\u014F\\u0171\\u0157 \\u0105\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157 ]]]{0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=[[[\\u0176\\u014F\\u0171\\u0157 \\u0163\\u0157\\u0105\\u028B\\u0113\\u013A \\u0157\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u0125\\u0105\\u015F \\u0183\\u0113\\u0113\\u014B \\u015F\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C]]]\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=[[[\\u0176\\u014F\\u0171\\u0157 \\u0163\\u0157\\u0105\\u028B\\u0113\\u013A \\u0157\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u0125\\u0105\\u015F \\u0183\\u0113\\u0113\\u014B \\u015F\\u0105\\u028B\\u0113\\u018C]]]\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 {0}?]]]\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=[[[\\u0100\\u014B\\u0177 \\u0171\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u018C\\u0105\\u0163\\u0105 \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u018C\\u012F\\u015F\\u010B\\u0105\\u0157\\u018C\\u0113\\u018C. \\u0100\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u015F\\u0171\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u03C1\\u0157\\u014F\\u010B\\u0113\\u0113\\u018C?]]]\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=[[[\\u015C\\u0163\\u0105\\u0157\\u0163 \\u018C\\u0105\\u0163\\u0113 \\u0271\\u0171\\u015F\\u0163 \\u0183\\u0113 \\u0183\\u0113\\u0192\\u014F\\u0157\\u0113 \\u0113\\u014B\\u018C \\u018C\\u0105\\u0163\\u0113.]]]\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=[[[\\u0143\\u014F \\u0105\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157 \\u018C\\u0113\\u0192\\u012F\\u014B\\u0113\\u018C; \\u010B\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163 \\u0177\\u014F\\u0171\\u0157 \\u0105\\u018C\\u0271\\u012F\\u014B\\u012F\\u015F\\u0163\\u0157\\u0105\\u0163\\u014F\\u0157]]]\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=[[[\\u0162\\u0125\\u0113 \\u0163\\u014F\\u0163\\u0105\\u013A \\u014F\\u0192 \\u010B\\u014F\\u015F\\u0163 \\u0105\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F \\u0271\\u0171\\u015F\\u0163 \\u0183\\u0113 100%]]]\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=[[[\\u0114\\u0157\\u0157\\u014F\\u0157 \\u018C\\u0171\\u0157\\u012F\\u014B\\u011F \\u01B2\\u0105\\u013A\\u012F\\u018C\\u0105\\u0163\\u012F\\u014F\\u014B]]]\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=[[[\\u0162\\u0125\\u0113 \\u0163\\u0157\\u0105\\u028B\\u0113\\u013A \\u0157\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u0125\\u0105\\u015F \\u0183\\u0113\\u0113\\u014B \\u0271\\u014F\\u018C\\u012F\\u0192\\u012F\\u0113\\u018C \\u0183\\u0177 \\u015F\\u014F\\u0271\\u0113\\u014F\\u014B\\u0113 \\u0113\\u013A\\u015F\\u0113. \\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0157\\u0113\\u0192\\u0157\\u0113\\u015F\\u0125 \\u0163\\u0125\\u0113 \\u013A\\u012F\\u015F\\u0163.]]]\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=[[[\\u0143\\u0113\\u0175]]]\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113]]]\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=[[[\\u0114\\u018C\\u012F\\u0163]]]\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=[[[\\u015C\\u0171\\u0183\\u0271\\u012F\\u0163]]]\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A]]]\r\n# XBUT : Label for button Add\r\nTRC_ADD=[[[\\u0100\\u018C\\u018C]]]\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=[[[\\u0158\\u0113\\u0271\\u014F\\u028B\\u0113]]]\r\n# XBUT : Label for button Ok\r\nTRC_OK=[[[\\u014E\\u0136]]]\r\n# XFLD : Label Country\r\nTRC_COUNTRY=[[[\\u0108\\u014F\\u0171\\u014B\\u0163\\u0157\\u0177]]]\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=[[[\\u01A4\\u0113\\u0157 \\u010E\\u012F\\u0113\\u0271 \\u0158\\u0113\\u011F\\u012F\\u014F\\u014B]]]\r\n# XFLD : Label Open for Request status\r\nOPEN=[[[\\u014E\\u03C1\\u0113\\u014B]]]\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=[[[\\u015C\\u0105\\u028B\\u0113]]]\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=[[[\\u0100\\u018C\\u018C \\u0108\\u014F\\u015F\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163]]]\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=[[[\\u0108\\u014F\\u015F\\u0163 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163]]]\r\n',
	"travel/request/create/i18n/i18n_en_US_saptrc.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=pOZDX69w1Ual6shkDB4x5A_My Travel Requests\r\n# XTIT: Title of Master\r\nMASTER_TITLE=o06qd/uSjMUtXbXlYqtlcQ_Travel Requests ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=CrNR36s4WSPaP0GjKBZIWA_Travel Request\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=f3K9gyrcDvgZm7zV9Ihvzg_New Travel Request\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=4UdiCRF0+ZMi6naVZhLZxA_Edit Travel Request\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=nm2wm3Ri5FkZc4DUVtGIOQ_Trip Detail\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=ClnfmLaDv+TEpZ38zl4gqw_Unsaved Changes\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=b0g0ewbffrYi14i0cJXVBA_No items are currently available\r\n# XFLD : Loading data text\r\nLOADING=H9F0sV9GXPvy3zxXtNfv+A_Loading..\r\n# XFLD : Label duration\r\nTRC_DURATION=GZeSZ1NRwIdHLfJ5OdhmbQ_Duration\r\n# XFLD : Label Declined\r\nDECLINED=v3dzk57V2CTXMCiw1Jmg9w_Rejected\r\n# XFLD : Label Approved\r\nAPPROVED=Wii6W8Yhc/LRQqttye7wiQ_Approved\r\n# XFLD : Label Pending\r\nPENDING=r1jVQWpSSDbGMRvDw2t6yQ_Pending\r\n# XFLD: Label Submission date\r\nSUBMISSION=OBCGAulH161XL3XhFk5yuw_Submission date\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=XVDcHoyhpMMOCnLHPwlNdg_Purpose\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=bvXc15gWDLpgZBfaBF9yAA_Trip Activity\r\n# XFLD : Label From date\r\nFROM=xjMSlAzm9Zc+ZkinDnoCuA_From\r\n# XFLD : Label To date\r\nTO=P31vV6KXB6jpvwqoN83JGg_To\r\n# XFLD : Label destination\r\nTRC_DESTINATION=dLqFuAmc92HepnRky5pxSw_Destination\r\n# XFLD : Label city\r\nTRC_CITY=YQbXQmxKnK4x0V35T5c7vQ_City\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=X85BI8+ONJ9urm+7kQaVMg_Approver\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=5t9ukh0LpyrQ3GIbO0ogtQ_Estimated Cost\r\n# XFLD : Label currency\r\nTRC_CURRENCY=qwgPoHALxkLcMco7Y145Cg_Currency\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=QjgP8ifmR6b4ohLwYfWgTQ_Note to Approver\r\n# XFLD : Label for Category\r\nTRC_TYPE=B9KUNh6BvtdASZEHKloiAQ_Category\r\n# XFLD: Label for Type\r\nTYPE=CMKOKWQT1bYFWQJFhxOp6w_Type\r\n# XFLD: Label for Description\r\nDESCRIPTION=fhUC4s+7LGFoYyjVZ4/IAw_Description\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=RfG1/cxTguPRD8sL0zrVwQ_Share\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=KAGB8Tx0UWUKG4DxZ6swXw_Cost Assignment\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=D7XobazFaoRke+dt8SL3og_Cost Assignments ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Q2MDpQgaAf1DEA+tCNtEeA_Sales Order\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=+546Bw8UbCOzrlz11pf51A_Order Items\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=gJHSwYFMUpH3290OISFi5A_Cost Center\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=0TNbaTePkc1jtdbIGvdVWg_Internal Order\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=qNmqzVHPHRt7cug92GvmFg_Sales Order Item\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=ZZGKl7jh3pz4K+Of0YLwyA_Network\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=kN76YuHVr0/CLLbp+Kb8AQ_Network Activity\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=hK3PGwU64lKnL/SNSO7X5w_Project\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=4Mch/M7crHq+oTeaDqtcnQ_No Data Available\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=BUrtBDNIjDsP8sl3+Vq0NQ_Travel request deleted\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=DEskjcvlT13eOD3nN4gZ1w_Your travel request has been submitted to your approver {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=gWA+TfdRejoB6ClYUB778g_Your travel request has been submitted\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=XMN/oMfwolLG40EEEcCXhA_Your travel request has been saved\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=O6XFoQFvG7HVi+M1M0MeeA_Delete {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=PTyW3oN9K/Jc9zwSXvsY2w_Any unsaved data will be discarded. Are you sure you want to proceed?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=YPHkjhA1pQM54PgUF/ob/w_Start date must be before end date.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=10ohNUof7M0mZ6Wd3J2zkw_No approver defined; contact your administrator\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=f10vIfyeYz72A7h8wI9XIg_The total of cost assignments must be 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=GnNJmgiGA8y2z0Jmb7LMEA_Error during Validation\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=n79gsBztqGddGPqY1EzDOQ_The travel request has been modified by someone else. Please refresh the list.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=1ElvjxVGuRiM+Wail2Yz9A_New\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=mvvXZbweRi/8nNiNhSajqQ_Delete\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=sPfnFvTTNyglPBDv2b3jLw_Edit\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=KqDjw5qOoD0CakmFJIce/w_Submit\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=D+R1PA+US4Oc40RKwRFbJA_Cancel\r\n# XBUT : Label for button Add\r\nTRC_ADD=rp//ugufr4ki448/viHhWg_Add\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=wb0zvKTc0l/Fi35HDhevCg_Remove\r\n# XBUT : Label for button Ok\r\nTRC_OK=KUloaCMQamwEtqlFjNRhAg_OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=V43eAgVqkbnAeNPw2QVR5w_Country\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=vCRRPwc5OHhyELRpiCQprg_Per Diem Region\r\n# XFLD : Label Open for Request status\r\nOPEN=O1MJR8qNnUlHfOC9BXNpoA_Open\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=KIkZci0nVLED0dFRi/wuNA_Save\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=1yrCPAWydtb3PEWTfwZXSQ_Add Cost Assignment\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=jU3OTXIeAlzXbfvFXz07Mg_Cost Assignment\r\n',
	"travel/request/create/i18n/i18n_es.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Mis solicitudes de viaje\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Solicitudes de viaje ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Solicitud de viaje - Viaje individual\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Solicitud de viaje nueva\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Editar solicitud de viaje\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detalles del viaje\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Modificaciones no guardadas\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Actualmente no hay posiciones disponibles\r\n# XFLD : Loading data text\r\nLOADING=Cargando...\r\n# XFLD : Label duration\r\nTRC_DURATION=Duraci\\u00F3n\r\n# XFLD : Label Declined\r\nDECLINED=Rechazado\r\n# XFLD : Label Approved\r\nAPPROVED=Aprobado\r\n# XFLD : Label Pending\r\nPENDING=Pendiente\r\n# XFLD: Label Submission date\r\nSUBMISSION=Fecha de env\\u00EDo\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Finalidad\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Actividad de viaje\r\n# XFLD : Label From date\r\nFROM=De\r\n# XFLD : Label To date\r\nTO=a\\:\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destino\r\n# XFLD : Label city\r\nTRC_CITY=Ciudad\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Autorizador\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Coste estimado\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Moneda\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Nota para el autorizador\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tipo\r\n# XFLD: Label for Type\r\nTYPE=Tipo\r\n# XFLD: Label for Description\r\nDESCRIPTION=Descripci\\u00F3n\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Compartir\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Asignaci\\u00F3n de costes\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Asignaci\\u00F3n de costes ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Pedido de cliente\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Posiciones de pedido\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Centro de coste\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Pedido interno\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Posici\\u00F3n de pedido de cliente\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Red\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Actividad de grafo\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Proyecto\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=No hay datos disponibles\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Solicitud de viaje borrada\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Su solicitud de viaje se ha enviado a {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Se ha enviado su solicitud de viaje\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Se ha guardado su solicitud de viaje\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u00BFEliminar {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Se perder\\u00E1n los datos no guardados. \\u00BFDesea continuar?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=La fecha de inicio debe ser anterior a la fecha de fin.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Autorizador no definido; contacte a su administrador\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=El total de asignaci\\u00F3n de costes debe ser 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Error en la validaci\\u00F3n\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Otro usuario ha modificado la solicitud de viaje; actualice la lista.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nuevo\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Borrar\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Editar\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Enviar\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Cancelar\r\n# XBUT : Label for button Add\r\nTRC_ADD=A\\u00F1adir\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Borrar\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Pa\\u00EDs\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regi\\u00F3n de reembolso diario\r\n# XFLD : Label Open for Request status\r\nOPEN=Pendiente\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Guardar\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=A\\u00F1adir asignaci\\u00F3n de costes\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Asignaci\\u00F3n de costes\r\n',
	"travel/request/create/i18n/i18n_fr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Mes demandes de d\\u00E9placement\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Demandes de d\\u00E9placement ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Demande de d\\u00E9placement - d\\u00E9placement unique\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nouvelle demande de d\\u00E9placement\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Modifier la demande de d\\u00E9placement\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=D\\u00E9tails de d\\u00E9placement\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Modifications non sauvegard\\u00E9es\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Aucun poste disponible actuellement\r\n# XFLD : Loading data text\r\nLOADING=Chargement...\r\n# XFLD : Label duration\r\nTRC_DURATION=Dur\\u00E9e\r\n# XFLD : Label Declined\r\nDECLINED=Refus\\u00E9\r\n# XFLD : Label Approved\r\nAPPROVED=Approuv\\u00E9\r\n# XFLD : Label Pending\r\nPENDING=En attente\r\n# XFLD: Label Submission date\r\nSUBMISSION=Date d\'envoi\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Motif\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Activit\\u00E9 du d\\u00E9placement\r\n# XFLD : Label From date\r\nFROM=du\r\n# XFLD : Label To date\r\nTO=au\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destination\r\n# XFLD : Label city\r\nTRC_CITY=Ville\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Approbateur\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Co\\u00FBts estim\\u00E9s\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Devise\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Note pour l\'approbateur\r\n# XFLD : Label for Category\r\nTRC_TYPE=Type\r\n# XFLD: Label for Type\r\nTYPE=Type\r\n# XFLD: Label for Description\r\nDESCRIPTION=Description\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Partager\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Affectation des co\\u00FBts\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Affectation des co\\u00FBts ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Commande client\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Postes de commande\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Centre de co\\u00FBts\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Ordre interne\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Poste de commande client\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=R\\u00E9seau\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Activit\\u00E9 de r\\u00E9seau\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projet\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Aucune donn\\u00E9e n\'est disponible.\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Demande de d\\u00E9placement supprim\\u00E9e\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Votre demande de d\\u00E9placement a \\u00E9t\\u00E9 envoy\\u00E9e \\u00E0 {0}.\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Votre demande de d\\u00E9placement a \\u00E9t\\u00E9 envoy\\u00E9e.\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Votre demande de d\\u00E9placement a \\u00E9t\\u00E9 sauvegard\\u00E9e.\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Supprimer {0}\\u00A0?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Les donn\\u00E9es non sauvegard\\u00E9es seront perdues. Voulez-vous poursuivre ?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=La date de d\\u00E9but doit \\u00EAtre ant\\u00E9rieure \\u00E0 la date de fin.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Aucun approbateur n\'est d\\u00E9fini. Contactez l\'administrateur.\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Le total des affectations des co\\u00FBts doit atteindre 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Erreur lors de la validation\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=La demande de d\\u00E9placement a \\u00E9t\\u00E9 modifi\\u00E9e par une autre personne. Actualisez la liste.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nouv.\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Supprimer\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Modifier\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Envoyer\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Interrompre\r\n# XBUT : Label for button Add\r\nTRC_ADD=Ajouter\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Supprimer\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Pays\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=R\\u00E9gion forfait\r\n# XFLD : Label Open for Request status\r\nOPEN=En cours\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Sauvegarder\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Ajouter affectation co\\u00FBts\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Affectation des co\\u00FBts\r\n',
	"travel/request/create/i18n/i18n_hr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moji zahtjevi za putovanje\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Zahtjevi za putovanje ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Zahtjev za putovanje \\u2013 jedno putovanje\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Novi zahtjev za putovanje\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Uredi zahtjev za putovanje\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detalji putovanja\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Nesnimljene promjene\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Stavke trenutno nisu raspolo\\u017Eive\r\n# XFLD : Loading data text\r\nLOADING=U\\u010Ditavanje...\r\n# XFLD : Label duration\r\nTRC_DURATION=Trajanje\r\n# XFLD : Label Declined\r\nDECLINED=Odbijeno\r\n# XFLD : Label Approved\r\nAPPROVED=Odobreno\r\n# XFLD : Label Pending\r\nPENDING=Na \\u010Dekanju\r\n# XFLD: Label Submission date\r\nSUBMISSION=Datum podno\\u0161enja\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Svrha\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Aktivnost putovanja\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Odredi\\u0161te\r\n# XFLD : Label city\r\nTRC_CITY=Grad\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Odobravatelj\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Procijenjeni tro\\u0161ak\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Valuta\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Bilje\\u0161ka odobravatelju\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tip\r\n# XFLD: Label for Type\r\nTYPE=Tip\r\n# XFLD: Label for Description\r\nDESCRIPTION=Opis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Otpusti\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Dodjela tro\\u0161kova\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Dodjela tro\\u0161kova ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Prodajni nalog\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Stavke Naloga\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Mjesto tro\\u0161ka\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Interni nalog\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Stavka prodajnog naloga\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Mre\\u017Ea\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Mre\\u017Ena aktivnost\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Podaci nisu raspolo\\u017Eivi\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Zahtjev za putovanje izbrisan\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Va\\u0161 zahtjev za putovanje je podnesen {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Va\\u0161 zahtjev za putovanje je podnesen\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Va\\u0161 zahtjev za putovanje je snimljen\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Izbrisati {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Nesnimljeni podaci \\u0107e se izgubiti. \\u017Delite li nastaviti?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Po\\u010Detni datum mora biti prije zavr\\u0161nog datuma.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Odobravatelj nije definiran; kontaktirajte svog admnistratora\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Ukupni iznos dodjela tro\\u0161kova mora biti 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Gre\\u0161ka tijekom validacije\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Zahtjev za putovanje preina\\u010Dio je netko drugi; obnovite listu\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Novo\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Izbri\\u0161i\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Uredi\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Podnesi\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Otka\\u017Ei\r\n# XBUT : Label for button Add\r\nTRC_ADD=Dodaj\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Ukloni\r\n# XBUT : Label for button Ok\r\nTRC_OK=U redu\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Dr\\u017Eava\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regija pau\\u0161ala\r\n# XFLD : Label Open for Request status\r\nOPEN=Otvori\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Snimi\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Dodaj dodjelu tro\\u0161kova\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Dodjela tro\\u0161kova\r\n',
	"travel/request/create/i18n/i18n_hu.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Saj\\u00E1t utaz\\u00E1si k\\u00E9relmek\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Utaz\\u00E1si k\\u00E9relmek ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Utaz\\u00E1si k\\u00E9relmek - egy utaz\\u00E1s\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u00DAj utaz\\u00E1si k\\u00E9relem\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Utaz\\u00E1si k\\u00E9relem feldolgoz\\u00E1sa\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u00DAt r\\u00E9szletei\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Nem mentett m\\u00F3dos\\u00EDt\\u00E1sok\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Jelenleg nem \\u00E1ll rendelkez\\u00E9sre t\\u00E9tel\r\n# XFLD : Loading data text\r\nLOADING=Bet\\u00F6lt\\u00E9s...\r\n# XFLD : Label duration\r\nTRC_DURATION=Id\\u0151tartam\r\n# XFLD : Label Declined\r\nDECLINED=Elutas\\u00EDtva\r\n# XFLD : Label Approved\r\nAPPROVED=Enged\\u00E9lyezve\r\n# XFLD : Label Pending\r\nPENDING=F\\u00FCgg\\u0151ben\r\n# XFLD: Label Submission date\r\nSUBMISSION=Beny\\u00FAjt\\u00E1s d\\u00E1tuma\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=C\\u00E9l\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u00DAti tev\\u00E9kenys\\u00E9g\r\n# XFLD : Label From date\r\nFROM=Kezd\\u00E9s\\:\r\n# XFLD : Label To date\r\nTO=v\\u00E9ge\\:\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u00DAti c\\u00E9l\r\n# XFLD : Label city\r\nTRC_CITY=V\\u00E1ros\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Enged\\u00E9lyez\\u0151\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Becs\\u00FClt k\\u00F6lts\\u00E9gek\r\n# XFLD : Label currency\r\nTRC_CURRENCY=P\\u00E9nznem\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Megjegyz\\u00E9s az enged\\u00E9lyez\\u0151nek\r\n# XFLD : Label for Category\r\nTRC_TYPE=T\\u00EDpus\r\n# XFLD: Label for Type\r\nTYPE=T\\u00EDpus\r\n# XFLD: Label for Description\r\nDESCRIPTION=Le\\u00EDr\\u00E1s\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Sz\\u00E1zal\\u00E9k\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=K\\u00F6lts\\u00E9g-hozz\\u00E1rendel\\u00E9s\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=K\\u00F6lts\\u00E9g-hozz\\u00E1rendel\\u00E9s ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Vev\\u0151i rendel\\u00E9s\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Rendel\\u00E9st\\u00E9telek\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=K\\u00F6lts\\u00E9ghely\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Bels\\u0151 rendel\\u00E9s\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Vev\\u0151i rendel\\u00E9s t\\u00E9tele\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=H\\u00E1l\\u00F3zat\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=H\\u00E1l\\u00F3tervi m\\u0171velet\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Nem \\u00E1ll rendelkez\\u00E9sre adat\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Utaz\\u00E1si k\\u00E9relem t\\u00F6r\\u00F6lve\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Utaz\\u00E1si k\\u00E9relme el lett k\\u00FCldve a k\\u00F6vetkez\\u0151nek\\: {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Utaz\\u00E1si k\\u00E9relme tov\\u00E1bb\\u00EDtva\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Utaz\\u00E1si k\\u00E9relme elmentve\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=T\\u00F6rli a k\\u00F6vetkez\\u0151t\\: {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=A nem mentett adatok el fognak veszni. Folytatja?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=A kezd\\u0151 d\\u00E1tumnak a z\\u00E1r\\u00F3 d\\u00E1tum el\\u0151tt kell \\u00E1llnia\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Nincs megadva enged\\u00E9lyez\\u0151; \\u00E9rtes\\u00EDtse az adminisztr\\u00E1tort\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=A k\\u00F6lts\\u00E9g-hozz\\u00E1rendel\\u00E9sek \\u00F6sszege 100% legyen\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Hiba t\\u00F6rt\\u00E9nt az \\u00E9rv\\u00E9nyes\\u00EDt\\u00E9sn\\u00E9l\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Az utaz\\u00E1si k\\u00E9relmet valaki m\\u00F3dos\\u00EDtotta; friss\\u00EDtse a list\\u00E1t\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u00DAj\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=T\\u00F6rl\\u00E9s\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Feldolgoz\\u00E1s\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Elk\\u00FCld\\u00E9s\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=M\\u00E9gse\r\n# XBUT : Label for button Add\r\nTRC_ADD=Hozz\\u00E1ad\\u00E1s\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Elt\\u00E1vol\\u00EDt\\u00E1s\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Orsz\\u00E1g\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u00C1tal\\u00E1nyr\\u00E9gi\\u00F3\r\n# XFLD : Label Open for Request status\r\nOPEN=Megnyit\\u00E1s\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Ment\\u00E9s\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Ktg.-hozz\\u00E1r. hozz\\u00E1a.\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=K\\u00F6lts\\u00E9g-hozz\\u00E1rendel\\u00E9s\r\n',
	"travel/request/create/i18n/i18n_it.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Le mie richieste di trasferta\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Richieste di trasferta ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Richiesta di trasferta - trasferta singola\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nuova richiesta di trasferta\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Elabora richiesta di trasferta\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Dettagli trasferta\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Modifiche non salvate\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Nessuna posizione attualmente disponibile\r\n# XFLD : Loading data text\r\nLOADING=In caricamento...\r\n# XFLD : Label duration\r\nTRC_DURATION=Durata\r\n# XFLD : Label Declined\r\nDECLINED=Rifiutato\r\n# XFLD : Label Approved\r\nAPPROVED=Approvato\r\n# XFLD : Label Pending\r\nPENDING=In sospeso\r\n# XFLD: Label Submission date\r\nSUBMISSION=Data di invio\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Scopo\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Attivit\\u00E0 trasferta\r\n# XFLD : Label From date\r\nFROM=Da\r\n# XFLD : Label To date\r\nTO=A\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destinazione\r\n# XFLD : Label city\r\nTRC_CITY=Citt\\u00E0\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Approvatore\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Costi stimati\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Divisa\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Nota all\'approvatore\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tipo\r\n# XFLD: Label for Type\r\nTYPE=Tipo\r\n# XFLD: Label for Description\r\nDESCRIPTION=Descrizione\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Percent.\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Attribuzione costi\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Attribuzione costi ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Ordine di vendita\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Posizioni ordine\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Centro di costo\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Ordine interno\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Posizione ordine di vendita\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Network\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Attivit\\u00E0 di rete\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Progetto\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Nessun dato disponibile\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Richiesta di trasferta eliminata\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=La tua richiesta di trasferta \\u00E8 stata inviata a {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=La richiesta di trasferta \\u00E8 stata inviata\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=La tua richiesta di trasferta \\u00E8 stata salvata\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Eliminare {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=I dati non salvati andranno persi. Proseguire?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=La data di inizio deve essere anteriore alla data di fine\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Nessun approvatore definito; contatta l\'amministratore\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Il totale delle attribuzioni costi deve essere 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Errore durante la validazione\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=La richiesta di trasferta \\u00E8 stata modificata da un altro utente; aggiorna la lista\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nuovo\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Elimina\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Elabora\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Invia\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Annulla\r\n# XBUT : Label for button Add\r\nTRC_ADD=Aggiungi\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Rimuovi\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Paese\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regione ind. giorn.\r\n# XFLD : Label Open for Request status\r\nOPEN=Apri\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Salva\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Aggiungi attribuzione costi\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Attribuzione costi\r\n',
	"travel/request/create/i18n/i18n_iw.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u05D1\\u05E7\\u05E9\\u05D5\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E9\\u05DC\\u05D9\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u05D1\\u05E7\\u05E9\\u05D5\\u05EA \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u05D1\\u05E7\\u05E9\\u05EA \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 - \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05D9\\u05D7\\u05D9\\u05D3\\u05D4\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u05D1\\u05E7\\u05E9\\u05EA \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05D7\\u05D3\\u05E9\\u05D4\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u05E2\\u05E8\\u05D5\\u05DA \\u05D1\\u05E7\\u05E9\\u05EA \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\r\n# XFLD : Loading data text\r\nLOADING=\\u05D8\\u05D5\\u05E2\\u05DF...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF\r\n# XFLD : Label Declined\r\nDECLINED=\\u05E0\\u05D3\\u05D7\\u05D4\r\n# XFLD : Label Approved\r\nAPPROVED=\\u05D0\\u05D5\\u05E9\\u05E8\r\n# XFLD : Label Pending\r\nPENDING=\\u05D1\\u05D4\\u05DE\\u05EA\\u05E0\\u05D4\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05D2\\u05E9\\u05D4\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u05DE\\u05D8\\u05E8\\u05D4\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u05E4\\u05E2\\u05D9\\u05DC\\u05D5\\u05EA \\u05E0\\u05E1\\u05D9\\u05E2\\u05D4\r\n# XFLD : Label From date\r\nFROM=\\u05DE-\r\n# XFLD : Label To date\r\nTO=\\u05E2\\u05D3\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u05D9\\u05E2\\u05D3\r\n# XFLD : Label city\r\nTRC_CITY=\\u05E2\\u05D9\\u05E8\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u05DE\\u05D0\\u05E9\\u05E8\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u05E2\\u05DC\\u05D5\\u05EA \\u05DE\\u05D5\\u05E2\\u05E8\\u05DB\\u05EA\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u05DE\\u05D8\\u05D1\\u05E2\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u05D4\\u05E2\\u05E8\\u05D4 \\u05DC\\u05DE\\u05D0\\u05E9\\u05E8\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u05E1\\u05D5\\u05D2\r\n# XFLD: Label for Type\r\nTYPE=\\u05E1\\u05D5\\u05D2\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u05EA\\u05D9\\u05D0\\u05D5\\u05E8\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u05E9\\u05EA\\u05E3\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05DC\\u05D5\\u05D9\\u05D5\\u05EA\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05DC\\u05D5\\u05EA ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u05D4\\u05D6\\u05DE\\u05E0\\u05EA \\u05DC\\u05E7\\u05D5\\u05D7\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9 \\u05D4\\u05D6\\u05DE\\u05E0\\u05D4\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u05DE\\u05E8\\u05DB\\u05D6 \\u05E2\\u05DC\\u05D5\\u05EA\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u05D4\\u05D6\\u05DE\\u05E0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u05E4\\u05E8\\u05D9\\u05D8 \\u05E9\\u05DC \\u05D4\\u05D6\\u05DE\\u05E0\\u05EA \\u05DC\\u05E7\\u05D5\\u05D7\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u05E8\\u05E9\\u05EA\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u05E4\\u05E2\\u05D9\\u05DC\\u05D5\\u05EA \\u05E8\\u05E9\\u05EA\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u05E4\\u05E8\\u05D5\\u05D9\\u05E7\\u05D8\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u05D0\\u05D9\\u05DF \\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u05D1\\u05E7\\u05E9\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E0\\u05DE\\u05D7\\u05E7\\u05D4\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u05D1\\u05E7\\u05E9\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E9\\u05DC\\u05DA \\u05D4\\u05D5\\u05D2\\u05E9\\u05D4 \\u05DC-{0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u05D1\\u05E7\\u05E9\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E9\\u05DC\\u05DA \\u05D4\\u05D5\\u05D2\\u05E9\\u05D4\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u05D1\\u05E7\\u05E9\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E9\\u05DC\\u05DA \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u05D4\\u05D0\\u05DD \\u05DC\\u05DE\\u05D7\\u05D5\\u05E7 \\u05D0\\u05EA {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D0\\u05D1\\u05D3\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05D4\\u05EA\\u05D7\\u05DC\\u05D4 \\u05D7\\u05D9\\u05D9\\u05D1 \\u05DC\\u05D7\\u05D5\\u05DC \\u05DC\\u05E4\\u05E0\\u05D9 \\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05E1\\u05D9\\u05D5\\u05DD.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u05DC\\u05D0 \\u05D4\\u05D5\\u05D2\\u05D3\\u05E8 \\u05DE\\u05D0\\u05E9\\u05E8; \\u05E6\\u05D5\\u05E8 \\u05E7\\u05E9\\u05E8 \\u05E2\\u05DD \\u05D4\\u05DE\\u05E0\\u05D4\\u05DC \\u05E9\\u05DC\\u05DA\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05D4\\u05E2\\u05DC\\u05D5\\u05D9\\u05D5\\u05EA \\u05D7\\u05D9\\u05D9\\u05D1 \\u05DC\\u05D4\\u05D9\\u05D5\\u05EA 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05D1\\u05DE\\u05D4\\u05DC\\u05DA \\u05D1\\u05D3\\u05D9\\u05E7\\u05EA \\u05EA\\u05E7\\u05D9\\u05E0\\u05D5\\u05EA\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u05D1\\u05E7\\u05E9\\u05EA \\u05D4\\u05E0\\u05E1\\u05D9\\u05E2\\u05D4 \\u05E9\\u05D5\\u05E0\\u05EA\\u05D4 \\u05E2\\u05DC-\\u05D9\\u05D3\\u05D9 \\u05DE\\u05D9\\u05E9\\u05D4\\u05D5 \\u05D0\\u05D7\\u05E8; \\u05E8\\u05E2\\u05E0\\u05DF \\u05D0\\u05EA \\u05D4\\u05E8\\u05E9\\u05D9\\u05DE\\u05D4\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u05D7\\u05D3\\u05E9\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u05DE\\u05D7\\u05E7\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u05E2\\u05E8\\u05D5\\u05DA\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u05D4\\u05D2\\u05E9\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u05D1\\u05D8\\u05DC\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u05D4\\u05D5\\u05E1\\u05E3\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u05D4\\u05E1\\u05E8\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u05DE\\u05D3\\u05D9\\u05E0\\u05D4\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u05D0\\u05D6\\u05D5\\u05E8 \\u05DC\\u05E1\\u05DB\\u05D5\\u05DD \\u05E7\\u05D1\\u05D5\\u05E2 \\u05DC\\u05D9\\u05D5\\u05DD\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u05E4\\u05EA\\u05D5\\u05D7\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u05E9\\u05DE\\u05D5\\u05E8\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05DC\\u05D5\\u05D9\\u05D5\\u05EA\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05DC\\u05D5\\u05D9\\u05D5\\u05EA\r\n',
	"travel/request/create/i18n/i18n_ja.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u51FA\\u5F35\\u7533\\u8ACB\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u51FA\\u5F35\\u7533\\u8ACB ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u51FA\\u5F35\\u7533\\u8ACB - \\u500B\\u5225\\u51FA\\u5F35\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u65B0\\u898F\\u51FA\\u5F35\\u7533\\u8ACB\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u51FA\\u5F35\\u7533\\u8ACB\\u7DE8\\u96C6\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u51FA\\u5F35\\u8A73\\u7D30\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u30A2\\u30A4\\u30C6\\u30E0\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n# XFLD : Loading data text\r\nLOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u671F\\u9593\r\n# XFLD : Label Declined\r\nDECLINED=\\u5374\\u4E0B\\u6E08\r\n# XFLD : Label Approved\r\nAPPROVED=\\u627F\\u8A8D\\u6E08\r\n# XFLD : Label Pending\r\nPENDING=\\u4FDD\\u7559\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u9001\\u4FE1\\u65E5\\u4ED8\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u76EE\\u7684\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u51FA\\u5F35\\u76EE\\u7684\r\n# XFLD : Label From date\r\nFROM=\\u958B\\u59CB\r\n# XFLD : Label To date\r\nTO=\\u7D42\\u4E86\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u51FA\\u5F35\\u5148\r\n# XFLD : Label city\r\nTRC_CITY=\\u90FD\\u5E02\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u627F\\u8A8D\\u8005\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u898B\\u7A4D\\u539F\\u4FA1\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u901A\\u8CA8\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u627F\\u8A8D\\u8005\\u3078\\u306E\\u30E1\\u30E2\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u30BF\\u30A4\\u30D7\r\n# XFLD: Label for Type\r\nTYPE=\\u30BF\\u30A4\\u30D7\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u30C6\\u30AD\\u30B9\\u30C8\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u30B7\\u30A7\\u30A2\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u539F\\u4FA1\\u8CA0\\u62C5\\u914D\\u5206\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u539F\\u4FA1\\u8CA0\\u62C5\\u914D\\u5206 ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u53D7\\u6CE8\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u53D7\\u6CE8\\u660E\\u7D30\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u539F\\u4FA1\\u30BB\\u30F3\\u30BF\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u5185\\u90E8\\u6307\\u56F3\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u53D7\\u6CE8\\u660E\\u7D30\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u30CD\\u30C3\\u30C8\\u30EF\\u30FC\\u30AF\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u30CD\\u30C3\\u30C8\\u30EF\\u30FC\\u30AF\\u6D3B\\u52D5\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u30D7\\u30ED\\u30B8\\u30A7\\u30AF\\u30C8\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u30C7\\u30FC\\u30BF\\u3092\\u5229\\u7528\\u3067\\u304D\\u307E\\u305B\\u3093\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u51FA\\u5F35\\u7533\\u8ACB\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u51FA\\u5F35\\u7533\\u8ACB\\u304C {0} \\u306B\\u9001\\u4FE1\\u3055\\u308C\\u307E\\u3057\\u305F\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u51FA\\u5F35\\u7533\\u8ACB\\u304C\\u9001\\u4FE1\\u3055\\u308C\\u307E\\u3057\\u305F\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u51FA\\u5F35\\u7533\\u8ACB\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE={0} \\u3092\\u524A\\u9664\\u3057\\u307E\\u3059\\u304B\\u3002\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u672A\\u4FDD\\u5B58\\u306E\\u30C7\\u30FC\\u30BF\\u306F\\u5931\\u308F\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u958B\\u59CB\\u65E5\\u4ED8\\u306F\\u7D42\\u4E86\\u65E5\\u4ED8\\u3088\\u308A\\u524D\\u3067\\u3042\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\\u3002\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u627F\\u8A8D\\u8005\\u304C\\u5B9A\\u7FA9\\u3055\\u308C\\u3066\\u3044\\u307E\\u305B\\u3093\\u3002\\u7BA1\\u7406\\u8005\\u306B\\u9023\\u7D61\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u539F\\u4FA1\\u8CA0\\u62C5\\u914D\\u5206\\u306E\\u5408\\u8A08\\u306F 100% \\u3067\\u306A\\u3051\\u308C\\u3070\\u306A\\u308A\\u307E\\u305B\\u3093\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u30C1\\u30A7\\u30C3\\u30AF\\u4E2D\\u306B\\u30A8\\u30E9\\u30FC\\u304C\\u767A\\u751F\\u3057\\u307E\\u3057\\u305F\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u51FA\\u5F35\\u7533\\u8ACB\\u306F\\u4ED6\\u306E\\u30E6\\u30FC\\u30B6\\u306B\\u3088\\u3063\\u3066\\u5909\\u66F4\\u3055\\u308C\\u3066\\u3044\\u307E\\u3059\\u3002\\u4E00\\u89A7\\u3092\\u30EA\\u30D5\\u30EC\\u30C3\\u30B7\\u30E5\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u65B0\\u898F\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u524A\\u9664\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u7DE8\\u96C6\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u9001\\u4FE1\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u4E2D\\u6B62\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u8FFD\\u52A0\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u524A\\u9664\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u56FD\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u624B\\u5F53\\u5730\\u57DF\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u672A\\u51E6\\u7406\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u539F\\u4FA1\\u8CA0\\u62C5\\u914D\\u5206\\u8FFD\\u52A0\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u539F\\u4FA1\\u8CA0\\u62C5\\u914D\\u5206\r\n',
	"travel/request/create/i18n/i18n_no.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Mine reises\\u00F8knader\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Reises\\u00F8knader ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Reises\\u00F8knad - enkeltreise\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Ny reises\\u00F8knad\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Rediger reises\\u00F8knad\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Reisedetaljer\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Ulagrede endringer\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Ingen elementer er for \\u00F8yeblikket tilgjengelige\r\n# XFLD : Loading data text\r\nLOADING=Laster ...\r\n# XFLD : Label duration\r\nTRC_DURATION=Varighet\r\n# XFLD : Label Declined\r\nDECLINED=Avvist\r\n# XFLD : Label Approved\r\nAPPROVED=Godkjent\r\n# XFLD : Label Pending\r\nPENDING=\\u00C5pen\r\n# XFLD: Label Submission date\r\nSUBMISSION=Sendt dato\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Form\\u00E5l\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Reiseform\\u00E5l\r\n# XFLD : Label From date\r\nFROM=Fra\r\n# XFLD : Label To date\r\nTO=til\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Reisem\\u00E5l\r\n# XFLD : Label city\r\nTRC_CITY=Sted\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Godkjenner\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Estimerte kostnader\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Valuta\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Merknad til godkjenner\r\n# XFLD : Label for Category\r\nTRC_TYPE=Type\r\n# XFLD: Label for Type\r\nTYPE=Type\r\n# XFLD: Label for Description\r\nDESCRIPTION=Beskrivelse\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Andel\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Kostnadstilordning\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Kostnadstilordning ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Kundeordre\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Ordrepos.\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Kostnadssted\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Intern rekkef\\u00F8lge\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Kundeordreposisjon\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Nettverk\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Nettverksaktivitet\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Prosjekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Ingen tilgjengelige data\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Reises\\u00F8knad slettet\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Reises\\u00F8knaden din er sendt til {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Reises\\u00F8knaden din er sendt\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Reises\\u00F8knaden din er lagret\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Slette {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Du vil miste data som ikke er lagret. Vil du fortsette?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Startdato m\\u00E5 komme f\\u00F8r sluttdato\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Ingen godkjenner er fastsatt, kontakt administrator\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Sum av kostnadstilordninger m\\u00E5 v\\u00E6re 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Feil ved validering\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Reises\\u00F8knaden er endret av en annen, oppdater listen\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Ny\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Slett\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Rediger\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Send\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Avbryt\r\n# XBUT : Label for button Add\r\nTRC_ADD=Tilf\\u00F8y\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Fjern\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Land\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Region for sats\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u00C5pen\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Lagre\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Tilf\\u00F8y kostnadstilordning\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Kostnadstilordning\r\n',
	"travel/request/create/i18n/i18n_pl.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moje wnioski o wyjazd\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Wnioski o podr\\u00F3\\u017C ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Wniosek o wyjazd - pojedyncza podr\\u00F3\\u017C\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nowy wniosek o wyjazd\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Edycja wniosku o wyjazd\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Szczeg\\u00F3\\u0142y wyjazdu\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Niezapami\\u0119tane zmiany\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Obecnie brak dost\\u0119pnych pozycji\r\n# XFLD : Loading data text\r\nLOADING=Wczytywanie...\r\n# XFLD : Label duration\r\nTRC_DURATION=Czas trwania\r\n# XFLD : Label Declined\r\nDECLINED=Odrzucone\r\n# XFLD : Label Approved\r\nAPPROVED=Zatwierdzone\r\n# XFLD : Label Pending\r\nPENDING=Oczekuj\\u0105ce\r\n# XFLD: Label Submission date\r\nSUBMISSION=Data wys\\u0142ania\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Cel\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Dzia\\u0142alno\\u015B\\u0107 podczas podr\\u00F3\\u017Cy\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=Do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Cel\r\n# XFLD : Label city\r\nTRC_CITY=Miasto\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Osoba zatwierdzaj\\u0105ca\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Szacowane koszty\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Waluta\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Notatka dla zatwierdzaj\\u0105cego\r\n# XFLD : Label for Category\r\nTRC_TYPE=Typ\r\n# XFLD: Label for Type\r\nTYPE=Typ\r\n# XFLD: Label for Description\r\nDESCRIPTION=Opis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Udzia\\u0142\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Przypisanie koszt\\u00F3w\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Przypisanie koszt\\u00F3w ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Zlecenie klienta\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Pozycje zlecenia\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Miejsce powstawania koszt\\u00F3w\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Kolejno\\u015B\\u0107 wewn\\u0119trzna\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Pozycja zlecenia klienta\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Sie\\u0107\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Czynno\\u015B\\u0107 sieciowa\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Brak danych\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Usuni\\u0119to wniosek o podr\\u00F3\\u017C\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Przes\\u0142ano wniosek o podr\\u00F3\\u017C do {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Wniosek o wyjazd zosta\\u0142 wys\\u0142any\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Wniosek o wyjazd zosta\\u0142 zapisany\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Usun\\u0105\\u0107 {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Niezapisane dane zostan\\u0105 utracone. Czy chcesz kontynuowa\\u0107?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Data pocz\\u0105tkowa musi wypada\\u0107 przed dat\\u0105 ko\\u0144cow\\u0105.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Nie zdefiniowano zatwierdzaj\\u0105cego; skontaktuj si\\u0119 z administratorem\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Ca\\u0142kowity koszt przypisa\\u0144 musi by\\u0107 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=B\\u0142\\u0105d podczas walidacji\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Wniosek o wyjazd zosta\\u0142 zmieniony przez inn\\u0105 osob\\u0119; od\\u015Bwie\\u017C list\\u0119\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nowe\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Usu\\u0144\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Edytuj\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Prze\\u015Blij\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Anuluj\r\n# XBUT : Label for button Add\r\nTRC_ADD=Dodaj\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Usu\\u0144\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Kraj\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Region obowi\\u0105zywania rycza\\u0142tu\r\n# XFLD : Label Open for Request status\r\nOPEN=Otw\\u00F3rz\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Zapisz\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Dodaj przypisanie koszt\\u00F3w\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Przypisanie koszt\\u00F3w\r\n',
	"travel/request/create/i18n/i18n_pt.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Minhas solicita\\u00E7\\u00F5es de viagem\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Solicita\\u00E7\\u00F5es de viagem ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Solicita\\u00E7\\u00E3o de viagem - viagem individual\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nova solicita\\u00E7\\u00E3o de viagem\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Processar solicita\\u00E7\\u00E3o de viagem\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detalhes da viagem\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Modifica\\u00E7\\u00F5es n\\u00E3o gravadas\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Nenhum item atualmente dispon\\u00EDvel\r\n# XFLD : Loading data text\r\nLOADING=Carregando...\r\n# XFLD : Label duration\r\nTRC_DURATION=Dura\\u00E7\\u00E3o\r\n# XFLD : Label Declined\r\nDECLINED=Rejeitadas\r\n# XFLD : Label Approved\r\nAPPROVED=Autorizadas\r\n# XFLD : Label Pending\r\nPENDING=Pendentes\r\n# XFLD: Label Submission date\r\nSUBMISSION=Data de emiss\\u00E3o\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Objetivo\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Atividade de viagem\r\n# XFLD : Label From date\r\nFROM=De\r\n# XFLD : Label To date\r\nTO=at\\u00E9\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destino\r\n# XFLD : Label city\r\nTRC_CITY=Cidade\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Autorizador\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Custos estimados\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Moeda\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Nota ao aprovador\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tipo\r\n# XFLD: Label for Type\r\nTYPE=Tipo\r\n# XFLD: Label for Description\r\nDESCRIPTION=Descri\\u00E7\\u00E3o\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Comp.\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Atribui\\u00E7\\u00E3o de custos\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Atribui\\u00E7\\u00E3o de custos ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Ordem do cliente\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Itens da ordem\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Centro de custo\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Ordem interna\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Item do pedido do cliente\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Rede\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Tarefa do diagrama de rede\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projeto\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Dados n\\u00E3o dispon\\u00EDveis\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Solicita\\u00E7\\u00E3o de viagem exclu\\u00EDda\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Sua solicita\\u00E7\\u00E3o de viagem foi enviada a {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Sua solicita\\u00E7\\u00E3o de viagem foi enviada\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Sua solicita\\u00E7\\u00E3o de viagem foi gravada\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Excluir {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Os dados n\\u00E3o gravados se perder\\u00E3o. Continuar?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=A data de in\\u00EDcio deve ser anterior a de fim.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Nenhum autorizador definido; contate seu administrador\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=O total de atribui\\u00E7\\u00F5es de custos deve ser 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Erro durante valida\\u00E7\\u00E3o\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=A solicita\\u00E7\\u00E3o de viagem foi modificada por algu\\u00E9m; atualize a lista\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nova\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Excluir\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Editar\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Enviar\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Anular\r\n# XBUT : Label for button Add\r\nTRC_ADD=Adicionar\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Remover\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Pa\\u00EDs\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regi\\u00E3o da di\\u00E1ria\r\n# XFLD : Label Open for Request status\r\nOPEN=Em aberto\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Gravar\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Inserir atribui\\u00E7\\u00E3o de custos\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Atribui\\u00E7\\u00E3o de custos\r\n',
	"travel/request/create/i18n/i18n_ro.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Cererile mele de deplasare\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Cereri de deplasare ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Cerere deplasare - deplasare individual\\u0103\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Cerere de deplasare nou\\u0103\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Editare cerere de deplasare\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detalii deplasare\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Modific\\u0103ri nesalvate\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u00CEn prezent nu sunt disponibile pozi\\u0163ii\r\n# XFLD : Loading data text\r\nLOADING=\\u00CEnc\\u0103rcare ...\r\n# XFLD : Label duration\r\nTRC_DURATION=Durat\\u0103\r\n# XFLD : Label Declined\r\nDECLINED=Respins\r\n# XFLD : Label Approved\r\nAPPROVED=Aprobat\r\n# XFLD : Label Pending\r\nPENDING=\\u00CEn a\\u015Fteptare\r\n# XFLD: Label Submission date\r\nSUBMISSION=Dat\\u0103 transmitere\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Scop\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Activitate deplasare\r\n# XFLD : Label From date\r\nFROM=De la\r\n# XFLD : Label To date\r\nTO=p\\u00E2n\\u0103 la\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Destina\\u0163ie\r\n# XFLD : Label city\r\nTRC_CITY=Localitate\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Aprobator\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Costuri estimate\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Moned\\u0103\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Not\\u0103 la aprobator\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tip\r\n# XFLD: Label for Type\r\nTYPE=Tip\r\n# XFLD: Label for Description\r\nDESCRIPTION=Descriere\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Partajare\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Alocare costuri\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Alocare costuri ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Comand\\u0103 de v\\u00E2nz\\u0103ri\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Pozi\\u0163ii comand\\u0103\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Centru de cost\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Comand\\u0103 intern\\u0103\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Pozi\\u0163ie comand\\u0103 de v\\u00E2nz\\u0103ri\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Re\\u0163ea\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Activitate de re\\u0163ea\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Proiect\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=F\\u0103r\\u0103 date disponibile\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Cerere de deplasare \\u015Ftears\\u0103\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Cererea dvs. de deplasare a fost transmis\\u0103 la {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Cererea dvs.de deplasare a fost transmis\\u0103\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Cererea dvs.de deplasare a fost salvat\\u0103\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u015Eterge\\u0163i {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Datele nesalvate vor fi pierdute. Dori\\u0163i s\\u0103 continua\\u0163i?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Data de \\u00EEnceput trebuie s\\u0103 fie \\u00EEnainte de data de sf\\u00E2r\\u015Fit.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Niciun aprobator definit; contacta\\u0163i administratorul dvs.\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Totalul de aloc\\u0103ri de costuri trebuie s\\u0103 fie de 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Eroare la validare\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Cererea de deplasare a fost modificat\\u0103 de altcineva; \\u00EEmprosp\\u0103ta\\u0163i lista\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nou\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u015Etergere\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Editare\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Transmitere\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Anulare\r\n# XBUT : Label for button Add\r\nTRC_ADD=Ad\\u0103ugare\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Eliminare\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u0162ar\\u0103\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regiune diurn\\u0103\r\n# XFLD : Label Open for Request status\r\nOPEN=Deschis\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Salvare\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Ad\\u0103ugare alocare costuri\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Alocare costuri\r\n',
	"travel/request/create/i18n/i18n_ru.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u041C\\u043E\\u0438 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0438 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0438\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0438 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0438 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 - \\u043E\\u0442\\u0434\\u0435\\u043B\\u044C\\u043D\\u0430\\u044F \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u041D\\u043E\\u0432\\u0430\\u044F \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0443\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0437\\u0430\\u044F\\u0432\\u043A\\u0443\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F \\u043D\\u0435 \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u044B\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u0412 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0442 \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\\u0445 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0439\r\n# XFLD : Loading data text\r\nLOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u0414\\u043B\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\r\n# XFLD : Label Declined\r\nDECLINED=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\r\n# XFLD : Label Approved\r\nAPPROVED=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043E\r\n# XFLD : Label Pending\r\nPENDING=\\u0412 \\u043E\\u0436\\u0438\\u0434\\u0430\\u043D\\u0438\\u0438\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u0414\\u0430\\u0442\\u0430 \\u043F\\u043E\\u0434\\u0430\\u0447\\u0438\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u0426\\u0435\\u043B\\u044C\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u0414\\u0435\\u044F\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C \\u0432 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0435\r\n# XFLD : Label From date\r\nFROM=\\u0421\r\n# XFLD : Label To date\r\nTO=\\u043F\\u043E\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u0410\\u0434\\u0440\\u0435\\u0441\\u0430\\u0442\r\n# XFLD : Label city\r\nTRC_CITY=\\u0413\\u043E\\u0440\\u043E\\u0434\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u0423\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0438\\u0439\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u044B\\u0435 \\u0440\\u0430\\u0441\\u0445\\u043E\\u0434\\u044B\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u0412\\u0430\\u043B\\u044E\\u0442\\u0430\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0435\\u0433\\u043E\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u0422\\u0438\\u043F\r\n# XFLD: Label for Type\r\nTYPE=\\u0412\\u0438\\u0434\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u041F\\u043E\\u0434\\u0435\\u043B\\u0438\\u0442\\u044C\\u0441\\u044F\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442 ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u0417\\u0430\\u043A\\u0430\\u0437 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0438 \\u0437\\u0430\\u043A\\u0430\\u0437\\u0430\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u041C\\u0435\\u0441\\u0442\\u043E \\u0432\\u043E\\u0437\\u043D\\u0438\\u043A\\u043D\\u043E\\u0432\\u0435\\u043D\\u0438\\u044F \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u0412\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u0438\\u0439 \\u0437\\u0430\\u043A\\u0430\\u0437\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F \\u0437\\u0430\\u043A\\u0430\\u0437\\u0430 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u0421\\u0435\\u0442\\u0435\\u0432\\u043E\\u0439 \\u0433\\u0440\\u0430\\u0444\\u0438\\u043A\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u041E\\u043F\\u0435\\u0440\\u0430\\u0446\\u0438\\u044F \\u0441\\u0435\\u0442\\u0435\\u0432\\u043E\\u0433\\u043E \\u0433\\u0440\\u0430\\u0444\\u0438\\u043A\\u0430\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u041F\\u0440\\u043E\\u0435\\u043A\\u0442\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u041D\\u0435\\u0442 \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\\u0445 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0445\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0430\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0443 \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0430 {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u0412\\u0430\\u0448\\u0430 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0443 \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0430\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u0412\\u0430\\u0448\\u0430 \\u0437\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0443 \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0430\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u041D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435 \\u0431\\u0443\\u0434\\u0443\\u0442 \\u043F\\u043E\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u0414\\u0430\\u0442\\u0430 \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430 \\u0434\\u043E\\u043B\\u0436\\u043D\\u0430 \\u0431\\u044B\\u0442\\u044C \\u0440\\u0430\\u043D\\u044C\\u0448\\u0435 \\u0434\\u0430\\u0442\\u044B \\u043A\\u043E\\u043D\\u0446\\u0430.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u041D\\u0435 \\u043E\\u043F\\u0440\\u0435\\u0434\\u0435\\u043B\\u0435\\u043D \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0438\\u0439. \\u0421\\u0432\\u044F\\u0436\\u0438\\u0442\\u0435\\u0441\\u044C \\u0441 \\u0430\\u0434\\u043C\\u0438\\u043D\\u0438\\u0441\\u0442\\u0440\\u0430\\u0442\\u043E\\u0440\\u043E\\u043C\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u0421\\u0443\\u043C\\u043C\\u0430 \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0439 \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442 \\u0434\\u043E\\u043B\\u0436\\u043D\\u0430 \\u0431\\u044B\\u0442\\u044C 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043F\\u0440\\u0438 \\u043F\\u0440\\u043E\\u0432\\u0435\\u0440\\u043A\\u0435\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0438\\u0440\\u043E\\u0432\\u043A\\u0443 \\u0431\\u044B\\u043B\\u0430 \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0430 \\u043A\\u0435\\u043C-\\u0442\\u043E \\u0434\\u0440\\u0443\\u0433\\u0438\\u043C. \\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u0435 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C\r\n# XBUT : Label for button Ok\r\nTRC_OK=\\u041E\\u041A\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u0421\\u0442\\u0440\\u0430\\u043D\\u0430\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u0420\\u0435\\u0433\\u0438\\u043E\\u043D \\u043F\\u0430\\u0443\\u0448\\u0430\\u043B\\u044C\\u043D\\u043E\\u0439 \\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u041E\\u0442\\u043A\\u0440\\u044B\\u0442\\u043E\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0437\\u0430\\u0442\\u0440\\u0430\\u0442\r\n',
	"travel/request/create/i18n/i18n_sh.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moji zahtevi za putovanje\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Zahtevi za putovanje ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Zahtev za putovanje - pojedina\\u010Dno putovanje\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Novi zahtev za putovanje\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Uredi zahtev za putovanje\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detalji putovanja\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Nesa\\u010Duvane promene\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Stavke trenutno nisu dostupne\r\n# XFLD : Loading data text\r\nLOADING=U\\u010Ditavanje...\r\n# XFLD : Label duration\r\nTRC_DURATION=Trajanje\r\n# XFLD : Label Declined\r\nDECLINED=Odbijeno\r\n# XFLD : Label Approved\r\nAPPROVED=Odobreno\r\n# XFLD : Label Pending\r\nPENDING=Nerealizovano\r\n# XFLD: Label Submission date\r\nSUBMISSION=Datum podno\\u0161enja\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Svrha\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Aktivnost putovanja\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Odredi\\u0161te\r\n# XFLD : Label city\r\nTRC_CITY=Grad\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Davalac odobrenja\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Procenjeni tro\\u0161kovi\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Valuta\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Bele\\u0161ka za davaoca odobrenja\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tip\r\n# XFLD: Label for Type\r\nTYPE=Tip\r\n# XFLD: Label for Description\r\nDESCRIPTION=Opis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Podeli\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Dodela tro\\u0161kova\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Dodela tro\\u0161kova ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Prodajni nalog\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Stavke naloga\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Mesto tro\\u0161ka\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Interni nalog\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Stavka prodajnog naloga\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Mre\\u017Ea\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Aktivnost mre\\u017Ee\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekat\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Podaci nisu dostupni\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Zahtev za putovanje izbrisan\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Va\\u0161 zahtev za putovanje je podnet {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Va\\u0161 zahtev za putovanje je podnet\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Va\\u0161 zahtev za putovanje je sa\\u010Duvan\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Izbrisati {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Nesa\\u010Duvani podaci \\u0107e biti izgubljeni. Da li \\u017Eelite da nastavite?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Datum po\\u010Detka mora biti pre datuma zavr\\u0161etka.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Davalac odobrenja nije definisan; obavestite sistemskog administratora\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Ukupni iznos dodele tro\\u0161kova mora biti 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Gre\\u0161ka pri validaciji\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Ovaj zahtev za putovanje je izmenio neko drugi; osve\\u017Eite listu\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Novo\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Izbri\\u0161i\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Uredi\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Podnesi\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Odustani\r\n# XBUT : Label for button Add\r\nTRC_ADD=Dodaj\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Ukloni\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Zemlja\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regija pau\\u0161ala\r\n# XFLD : Label Open for Request status\r\nOPEN=Otvori\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Sa\\u010Duvaj\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Dodaj dodelu tro\\u0161kova\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Dodela tro\\u0161kova\r\n',
	"travel/request/create/i18n/i18n_sk.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moje \\u017Eiadosti o cestu\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u017Diadosti o cestu ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u017Diados\\u0165 o cestu - jedna cesta\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nov\\u00E1 \\u017Eiados\\u0165 o cestu\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Upravi\\u0165 \\u017Eiados\\u0165 o cestu\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detaily cesty\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Neulo\\u017Een\\u00E9 zmeny\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Aktu\\u00E1lne nie s\\u00FA k dispoz\\u00EDcii \\u017Eiadne polo\\u017Eky\r\n# XFLD : Loading data text\r\nLOADING=Na\\u010D\\u00EDtava sa...\r\n# XFLD : Label duration\r\nTRC_DURATION=Trvanie\r\n# XFLD : Label Declined\r\nDECLINED=Zamietnut\\u00E9\r\n# XFLD : Label Approved\r\nAPPROVED=Schv\\u00E1len\\u00E9\r\n# XFLD : Label Pending\r\nPENDING=Nevybaven\\u00E9\r\n# XFLD: Label Submission date\r\nSUBMISSION=D\\u00E1tum odoslania\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u00DA\\u010Del\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Pracovn\\u00E1 \\u010Dinnos\\u0165 na ceste\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=Do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Cie\\u013E\r\n# XFLD : Label city\r\nTRC_CITY=Mesto\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Schva\\u013Eovate\\u013E\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Odhadovan\\u00E9 n\\u00E1klady\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Mena\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Pozn\\u00E1mka pre schva\\u013Eovate\\u013Ea\r\n# XFLD : Label for Category\r\nTRC_TYPE=Typ\r\n# XFLD: Label for Type\r\nTYPE=Typ\r\n# XFLD: Label for Description\r\nDESCRIPTION=Popis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Zdie\\u013Ea\\u0165\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Priradenie n\\u00E1kladov\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Priradenie n\\u00E1kladov ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Z\\u00E1kazka odberate\\u013Ea\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Polo\\u017Eky z\\u00E1kazky\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=N\\u00E1kladov\\u00E9 stredisko\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Intern\\u00E1 z\\u00E1kazka\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Polo\\u017Eka z\\u00E1kazky odberate\\u013Ea\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Sie\\u0165\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Oper\\u00E1cia sie\\u0165ov\\u00E9ho diagramu\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=D\\u00E1ta nie s\\u00FA k dispoz\\u00EDcii\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u017Diados\\u0165 o cestu odstr\\u00E1nen\\u00E1\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Va\\u0161a \\u017Eiados\\u0165 o cestu bola odoslan\\u00E1 {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Va\\u0161a \\u017Eiados\\u0165 o cestu bola odoslan\\u00E1\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Va\\u0161a \\u017Eiados\\u0165 o cestu bola ulo\\u017Een\\u00E1\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Odstr\\u00E1ni\\u0165 {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Neulo\\u017Een\\u00E9 d\\u00E1ta sa stratia. Chcete pokra\\u010Dova\\u0165?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Po\\u010Diato\\u010Dn\\u00FD d\\u00E1tum mus\\u00ED by\\u0165 skor\\u0161\\u00ED ako koncov\\u00FD d\\u00E1tum.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Schva\\u013Eovate\\u013E nie je definovan\\u00FD; obr\\u00E1\\u0165te sa na spr\\u00E1vcu syst\\u00E9mu\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Celkov\\u00E9 priradenia n\\u00E1kladov musia by\\u0165 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Po\\u010Das overovania sa vyskytla chyba\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u017Diados\\u0165 o cestu zmenil niekto in\\u00FD. Aktualizujte zoznam.\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Nov\\u00E9\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Odstr\\u00E1ni\\u0165\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Spracova\\u0165\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Odosla\\u0165\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Zru\\u0161i\\u0165\r\n# XBUT : Label for button Add\r\nTRC_ADD=Prida\\u0165\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Odstr\\u00E1ni\\u0165\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u0160t\\u00E1t\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Regi\\u00F3n pau\\u0161\\u00E1lu\r\n# XFLD : Label Open for Request status\r\nOPEN=Otvoren\\u00E1\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Ulo\\u017Ei\\u0165\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Prida\\u0165 priradenie n\\u00E1kladov\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Priradenie n\\u00E1kladov\r\n',
	"travel/request/create/i18n/i18n_sl.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Moje zahteve za potovanje\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Zahteve za potovanje ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Zahteva za potovanje - eno potovanje\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Nova zahteva za potovanje\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Urejanje zahteve za potovanje\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Detajli potovanja\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Neshranjene spremembe\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=Trenutno ni razpolo\\u017Eljivih postavk\r\n# XFLD : Loading data text\r\nLOADING=Nalaganje poteka ...\r\n# XFLD : Label duration\r\nTRC_DURATION=Trajanje\r\n# XFLD : Label Declined\r\nDECLINED=Zavrnjeno\r\n# XFLD : Label Approved\r\nAPPROVED=Odobreno\r\n# XFLD : Label Pending\r\nPENDING=\\u010Caka\r\n# XFLD: Label Submission date\r\nSUBMISSION=Datum predlo\\u017Eitve\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Namen\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Aktivnost potovanja\r\n# XFLD : Label From date\r\nFROM=Od\r\n# XFLD : Label To date\r\nTO=Do\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Cilj\r\n# XFLD : Label city\r\nTRC_CITY=Mesto\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Odobritelj\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Ocenjeni stro\\u0161ki\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Valuta\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Zabele\\u017Eka za odobritelja\r\n# XFLD : Label for Category\r\nTRC_TYPE=Tip\r\n# XFLD: Label for Type\r\nTYPE=Tip\r\n# XFLD: Label for Description\r\nDESCRIPTION=Opis\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Dele\\u017E\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Dodelitev stro\\u0161kov\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Dodelitev stro\\u0161kov ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Prodajni nalog\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Postavke naloga\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Stro\\u0161kovno mesto\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=Interni nalog\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Postavka prodajnega naloga\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=Mre\\u017Eni plan\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=Aktivnost mre\\u017Enega plana\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Projekt\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Ni podatkov\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Zahteva za potovanje izbrisana\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Va\\u0161a zahteva za potovanje je bila poslana {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Va\\u0161a zahteva za potovanje je bila poslana\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Va\\u0161a zahteva za potovanje je bila shranjena\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u017Delite izbrisati {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Neshranjeni podatki bodo izgubljeni. \\u017Delite nadaljevati?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Datum za\\u010Detka mora biti pred datumom konca.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Odobritelj ni definiran; obrnite se na administratorja\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Vsota dodelitev stro\\u0161kov mora biti 100 %\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Napaka pri validaciji\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Zahtevo za potovanje je spremenil nekdo drug; osve\\u017Eite seznam\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Novo\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Brisanje\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=Obdelava\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=Po\\u0161iljanje\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=Prekinitev\r\n# XBUT : Label for button Add\r\nTRC_ADD=Dodajanje\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Odstranitev\r\n# XBUT : Label for button Ok\r\nTRC_OK=OK\r\n# XFLD : Label Country\r\nTRC_COUNTRY=Dr\\u017Eava\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Podro\\u010Dje pav\\u0161ala\r\n# XFLD : Label Open for Request status\r\nOPEN=Odpiranje\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Shranjevanje\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Dodajanje dodelitve stro\\u0161kov\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Dodelitev stro\\u0161kov\r\n',
	"travel/request/create/i18n/i18n_tr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=Seyahat taleplerim\r\n# XTIT: Title of Master\r\nMASTER_TITLE=Seyahat talepleri ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=Seyahat talebi - tek seyahat\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=Yeni seyahat talebi\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=Seyahat talebini d\\u00FCzenle\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=Seyahat ayr\\u0131nt\\u0131lar\\u0131\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=Kaydedilmeyen de\\u011Fi\\u015Fiklikler\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u015Eu anda kalem yok\r\n# XFLD : Loading data text\r\nLOADING=Y\\u00FCkleniyor...\r\n# XFLD : Label duration\r\nTRC_DURATION=S\\u00FCre\r\n# XFLD : Label Declined\r\nDECLINED=Reddedildi\r\n# XFLD : Label Approved\r\nAPPROVED=Onayland\\u0131\r\n# XFLD : Label Pending\r\nPENDING=Beklemede\r\n# XFLD: Label Submission date\r\nSUBMISSION=G\\u00F6nderme tarihi\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=Ama\\u00E7\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=Seyahat amac\\u0131\r\n# XFLD : Label From date\r\nFROM=Ba\\u015Flang\\u0131\\u00E7\r\n# XFLD : Label To date\r\nTO=Biti\\u015F\r\n# XFLD : Label destination\r\nTRC_DESTINATION=Hedef\r\n# XFLD : Label city\r\nTRC_CITY=\\u015Eehir\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=Onaylayan\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=Tahmini masraf\r\n# XFLD : Label currency\r\nTRC_CURRENCY=Para birimi\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=Onaylayana not\r\n# XFLD : Label for Category\r\nTRC_TYPE=T\\u00FCr\r\n# XFLD: Label for Type\r\nTYPE=T\\u00FCr\r\n# XFLD: Label for Description\r\nDESCRIPTION=Tan\\u0131m\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=Oran\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=Masraf tayini\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=Masraf tayini ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=Sat\\u0131\\u015F sipari\\u015Fi\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=Kalemleri sipari\\u015F et\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=Masraf yeri\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u0130\\u00E7 sipari\\u015F\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=Sat\\u0131\\u015F sipari\\u015Fi kalemi\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=A\\u011F\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=A\\u011F plan\\u0131 i\\u015Flemi\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=Proje\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=Veri mevcut de\\u011Fil\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=Seyahat talebi silindi\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=Seyahat talebiniz g\\u00F6nderildi\\: {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=Seyahat talebiniz g\\u00F6nderildi\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=Seyahat talebiniz kaydedildi\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=Sil {0}?\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=Kaydedilmeyen veriler kaybolacak. Devam etmek istiyor musunuz?\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=Ba\\u015Flang\\u0131\\u00E7 tarihi biti\\u015F tarihinden \\u00F6nce olmal\\u0131.\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=Onaylayan tan\\u0131mlanmad\\u0131; y\\u00F6neticinizle irtibata ge\\u00E7in\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=Masraf tayinlerinin toplam\\u0131 %100 olmal\\u0131\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=Do\\u011Frulama s\\u0131ras\\u0131nda hata\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=Seyahat talebi ba\\u015Fka biri taraf\\u0131ndan de\\u011Fi\\u015Ftirildi; listeyi yenileyin\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=Yeni\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=Sil\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=D\\u00FCzenle\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=G\\u00F6nder\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u0130ptal\r\n# XBUT : Label for button Add\r\nTRC_ADD=Ekle\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=Kald\\u0131r\r\n# XBUT : Label for button Ok\r\nTRC_OK=Tamam\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u00DClke\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=Harc\\u0131rah b\\u00F6lgesi\r\n# XFLD : Label Open for Request status\r\nOPEN=A\\u00E7\\u0131k\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=Kaydet\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=Masraf tayini ekle\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=Masraf tayini\r\n',
	"travel/request/create/i18n/i18n_zh_CN.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u6211\\u7684\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u5DEE\\u65C5\\u7533\\u8BF7 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u5DEE\\u65C5\\u7533\\u8BF7 - \\u5355\\u4E2A\\u884C\\u7A0B\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u65B0\\u5EFA\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u7F16\\u8F91\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u884C\\u7A0B\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u9879\\u76EE\r\n# XFLD : Loading data text\r\nLOADING=\\u6B63\\u5728\\u52A0\\u8F7D...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u6301\\u7EED\\u65F6\\u95F4\r\n# XFLD : Label Declined\r\nDECLINED=\\u5DF2\\u62D2\\u7EDD\r\n# XFLD : Label Approved\r\nAPPROVED=\\u5DF2\\u6279\\u51C6\r\n# XFLD : Label Pending\r\nPENDING=\\u5F85\\u5B9A\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u63D0\\u4EA4\\u65E5\\u671F\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u76EE\\u7684\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u884C\\u7A0B\\u6D3B\\u52A8\r\n# XFLD : Label From date\r\nFROM=\\u81EA\r\n# XFLD : Label To date\r\nTO=\\u81F3\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u76EE\\u7684\\u5730\r\n# XFLD : Label city\r\nTRC_CITY=\\u57CE\\u5E02\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u5BA1\\u6279\\u4EBA\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u9884\\u8BA1\\u6210\\u672C\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u8D27\\u5E01\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u5BA1\\u6279\\u4EBA\\u987B\\u77E5\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u7C7B\\u578B\r\n# XFLD: Label for Type\r\nTYPE=\\u7C7B\\u578B\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u63CF\\u8FF0\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u5171\\u4EAB\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u6210\\u672C\\u5206\\u914D\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u6210\\u672C\\u5206\\u914D ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u9500\\u552E\\u8BA2\\u5355\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u8BA2\\u5355\\u9879\\u76EE\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u6210\\u672C\\u4E2D\\u5FC3\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u5185\\u90E8\\u8BA2\\u5355\r\n\r\n# XFLD : Label Sales Order Item\r\nTRC_SALES_ORDER_ITEM=\\u9500\\u552E\\u8BA2\\u5355\\u9879\\u76EE\r\n\r\n# XFLD : Label Network\r\nTRC_NETWORK=\\u7F51\\u7EDC\r\n\r\n# XFLD : Label Network Activity\r\nTRC_NETWORK_ACTIVITY=\\u7F51\\u7EDC\\u6D3B\\u52A8\r\n\r\n# XFLD : Label Project\r\nTRC_PROJECT=\\u9879\\u76EE\r\n\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u65E0\\u53EF\\u7528\\u6570\\u636E\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u5DF2\\u5220\\u9664\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u60A8\\u7684\\u5DEE\\u65C5\\u7533\\u8BF7\\u5DF2\\u63D0\\u4EA4\\u81F3 {0}\r\n# XMSG : Submission message without approver\r\nSUBMITTED_MSG_NO_APPROVER=\\u5DF2\\u63D0\\u4EA4\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XMSG : Submission message without submit (Save only)\r\nSUBMITTED_MSG_SAVE_ONLY=\\u5DF2\\u4FDD\\u5B58\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u662F\\u5426\\u5220\\u9664 {0}\\uFF1F\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u672A\\u4FDD\\u5B58\\u7684\\u6570\\u636E\\u5C06\\u4E22\\u5931\\u3002\\u662F\\u5426\\u7EE7\\u7EED\\uFF1F\r\n# XMSG : Message for wrong dates\r\nERR_MSG_WRONG_DATE=\\u5F00\\u59CB\\u65E5\\u671F\\u5FC5\\u987B\\u65E9\\u4E8E\\u7ED3\\u675F\\u65E5\\u671F\\u3002\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u672A\\u5B9A\\u4E49\\u5BA1\\u6279\\u4EBA\\uFF1B\\u8BF7\\u8054\\u7CFB\\u7BA1\\u7406\\u5458\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u6210\\u672C\\u5206\\u914D\\u7684\\u603B\\u8BA1\\u5FC5\\u987B\\u4E3A 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u9A8C\\u8BC1\\u671F\\u95F4\\u51FA\\u9519\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u5DEE\\u65C5\\u7533\\u8BF7\\u5DF2\\u7531\\u5176\\u4ED6\\u4EBA\\u5458\\u4FEE\\u6539\\uFF1B\\u8BF7\\u5237\\u65B0\\u5217\\u8868\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u65B0\\u5EFA\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u5220\\u9664\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u7F16\\u8F91\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u63D0\\u4EA4\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u53D6\\u6D88\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u6DFB\\u52A0\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u79FB\\u9664\r\n# XBUT : Label for button Ok\r\nTRC_OK=\\u786E\\u5B9A\r\n# XFLD : Label Country\r\nTRC_COUNTRY=\\u56FD\\u5BB6\r\n# XFLD : Label Per Diem Region\r\nTRC_PER_DIEM_REGION=\\u65E5\\u8865\\u8D34\\u9002\\u7528\\u5730\\u533A\r\n# XFLD : Label Open for Request status\r\nOPEN=\\u672A\\u5B8C\\u6210\r\n# XFLD : Label Save for Saving Requests\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT,30: Add New Cost Object\r\nTRC_ADD_NEW_COST_ASSIGNMENT=\\u6DFB\\u52A0\\u6210\\u672C\\u5206\\u914D\r\n\r\n#XFLD,30: Cost assignment value select helper dialog title\r\nTRC_EXPENSE_COST_ASSIGNMENT_SELECT_DIALOG_TITLE=\\u6210\\u672C\\u5206\\u914D\r\n',
	"travel/request/create/i18n/i18n_zh_CN_.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n# XTIT: Application Name\r\nDISPLAY_NAME=\\u6211\\u7684\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of Master\r\nMASTER_TITLE=\\u5DEE\\u65C5\\u7533\\u8BF7 ({0})\r\n# XTIT: Title of Detail\r\nDETAIL_TITLE=\\u5DEE\\u65C5\\u7533\\u8BF7 - \\u5355\\u4E2A\\u884C\\u7A0B\r\n# XTIT: Title of new TR on panel\r\nTRC_NEW_PAGE=\\u65B0\\u5EFA\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of edit TR on panel\r\nTRC_EDIT_PAGE=\\u7F16\\u8F91\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XTIT: Title of TR detail in edit\r\nTRC_TRIP_DETAIL=\\u884C\\u7A0B\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n# XTIT : Title for the Confirmation popup appearing after pressing the Cancel button\r\nMSGBOX_TITLE_CANCEL=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\r\n\r\n\r\n# XFLD: No items are currently available\r\nNO_ITEMS_AVAILABLE=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u9879\\u76EE\r\n# XFLD : Loading data text\r\nLOADING=\\u52A0\\u8F7D\\u4E2D...\r\n# XFLD : Label duration\r\nTRC_DURATION=\\u6301\\u7EED\\u65F6\\u95F4\r\n# XFLD : Label Declined\r\nDECLINED=\\u5DF2\\u62D2\\u7EDD\r\n# XFLD : Label Approved\r\nAPPROVED=\\u5DF2\\u6279\\u51C6\r\n# XFLD : Label Pending\r\nPENDING=\\u5F85\\u5B9A\r\n# XFLD: Label Submission date\r\nSUBMISSION=\\u63D0\\u4EA4\\u65E5\\u671F\r\n# XFLD : Label purpose\r\nTRC_PURPOSE=\\u76EE\\u7684\r\n# XFLD : Label Trip Activity\r\nTRC_ACTIVITY=\\u884C\\u7A0B\\u6D3B\\u52A8\r\n# XFLD : Label From date\r\nFROM=\\u81EA\r\n# XFLD : Label To date\r\nTO=\\u81F3\r\n# XFLD : Label destination\r\nTRC_DESTINATION=\\u76EE\\u6807\r\n# XFLD : Label city\r\nTRC_CITY=\\u57CE\\u5E02\r\n# XFLD : Label approver\r\nTRC_LBL_APPROVER=\\u5BA1\\u6279\\u4EBA\r\n# XFLD : Label estimated cost\r\nTRC_LBL_COST=\\u9884\\u8BA1\\u6210\\u672C\r\n# XFLD : Label currency\r\nTRC_CURRENCY=\\u8D27\\u5E01\r\n# XFLD : Label for Note\r\nTRC_LBL_NOTE=\\u5BA1\\u6279\\u4EBA\\u987B\\u77E5\r\n# XFLD : Label for Category\r\nTRC_TYPE=\\u7C7B\\u578B\r\n# XFLD: Label for Type\r\nTYPE=\\u7C7B\\u578B\r\n# XFLD: Label for Description\r\nDESCRIPTION=\\u63CF\\u8FF0\r\n# XFLD,10 : Label Share\r\nTRC_PERCENTAGE=\\u5171\\u4EAB\r\n# XFLD : Label cost assignment\r\nTRC_LBL_COST_CENTER=\\u6210\\u672C\\u5206\\u914D\r\n# XFLD : Label cost assignments with count\r\nTRC_LBL_COST_CENTER_WITH_COUNT=\\u6210\\u672C\\u5206\\u914D ({0})\r\n# XFLD : Label cost assignment sales order\r\nTRC_SALES_ORDER=\\u9500\\u552E\\u8BA2\\u5355\r\n# XFLD : Label cost assignment sales order item\r\nTRC_LBL_SALES_ORDER_ITEM=\\u8BA2\\u5355\\u9879\\u76EE\r\n# XFLD : Label Cost Center\r\nTRC_COST_CENTER=\\u6210\\u672C\\u4E2D\\u5FC3\r\n# XFLD : Label Internal Order\r\nTRC_INTERNAL_ORDER=\\u5185\\u90E8\\u8BA2\\u5355\r\n#XFLD: List: No data available\r\nLIST_NO_DATA=\\u65E0\\u53EF\\u7528\\u6570\\u636E\r\n\r\n# XMSG: Delete message\r\nDELETE_OK=\\u5DF2\\u5220\\u9664\\u5DEE\\u65C5\\u7533\\u8BF7\r\n# XMSG : Submission message, {0} is the approver\r\nSUBMITTED_MSG=\\u60A8\\u7684\\u5DEE\\u65C5\\u7533\\u8BF7\\u5DF2\\u63D0\\u4EA4\\u81F3 {0}\r\n# XMSG : Message for Delete confirmation event\r\nCONFIRMATION_DELETE=\\u662F\\u5426\\u5220\\u9664 {0}\\uFF1F\r\n# XMSG : Message for Cancel confirmation event\r\nCONFIRMATION_CANCEL=\\u672A\\u4FDD\\u5B58\\u7684\\u6570\\u636E\\u5C06\\u4E22\\u5931\\u3002\\u662F\\u5426\\u7EE7\\u7EED\\uFF1F\r\n\r\n# XMSG : Warning message for missing approver\r\nERR_MANAGER=\\u672A\\u5B9A\\u4E49\\u5BA1\\u6279\\u4EBA\\uFF1B\\u8BF7\\u8054\\u7CFB\\u7BA1\\u7406\\u5458\r\n# XMSG : Warning message for cost center total\r\nERR_PERCENTAGE=\\u6210\\u672C\\u5206\\u914D\\u7684\\u603B\\u8BA1\\u5FC5\\u987B\\u4E3A 100%\r\n# XMSG : Message for error during validation\r\nERR_VALIDATION=\\u9A8C\\u8BC1\\u671F\\u95F4\\u51FA\\u9519\r\n# XMSG : Message for concurrent access error\r\nERR_CONCURRENT_ACCESS=\\u5DEE\\u65C5\\u7533\\u8BF7\\u5DF2\\u7531\\u5176\\u4ED6\\u4EBA\\u5458\\u4FEE\\u6539\\uFF1B\\u8BF7\\u5237\\u65B0\\u5217\\u8868\r\n\r\n# XBUT : Label for button New\r\nTRC_NEW=\\u65B0\\u5EFA\r\n# XBUT : Label for button Delete\r\nTRC_DELETE=\\u5220\\u9664\r\n# XBUT : Label for button Edit\r\nTRC_EDIT=\\u7F16\\u8F91\r\n# XBUT : Label for button Submit\r\nTRC_SUBMIT=\\u63D0\\u4EA4\r\n# XBUT : Label for button Cancel\r\nTRC_CANCEL=\\u53D6\\u6D88\r\n# XBUT : Label for button Add\r\nTRC_ADD=\\u6DFB\\u52A0\r\n# XBUT : Label for button Remove\r\nTRC_REMOVE=\\u79FB\\u9664\r\n# XBUT : Label for button Ok\r\nTRC_OK=\\u786E\\u5B9A\r\n',
	"travel/request/create/util/Formatters.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("travel.request.create.util.Formatters");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");

travel.request.create.util.Formatters = {

    formatDate : function(formatdate) {
	    var oDateCreatedOn = "";
	    var oType = new sap.ui.model.type.Date({
	        style: "medium"
	        //pattern: "MMM dd, yyyy"
	    });
	    //oDateCreatedOn = oType.formatValue(formatdate , "string");
	    // true = we want to display UTC date, not localized date
	    if (formatdate) {
	    	oDateCreatedOn = oType.oOutputFormat.format(formatdate, true);
	    }
	    return oDateCreatedOn;
    },
    
    formatDateToISOString : function(formatdate){
    	var oDepartureDateUTC = new Date();
        oDepartureDateUTC.setUTCDate(formatdate.getDate());
        oDepartureDateUTC.setUTCMonth(formatdate.getMonth());
        oDepartureDateUTC.setUTCFullYear(formatdate.getFullYear());
        oDepartureDateUTC.setUTCHours(formatdate.getHours());
        oDepartureDateUTC.setUTCMinutes(formatdate.getMinutes());
        oDepartureDateUTC.setUTCSeconds(formatdate.getSeconds());
        oDepartureDateUTC.setUTCMilliseconds(0);
    	return oDepartureDateUTC.toISOString().substr(0, 22);
    },
    
	formatDepartureArrival : function(dDeparture, dArrival) {
		var sFormatted = "";
		if (dDeparture && dArrival) {
			sFormatted = travel.request.create.util.Formatters.formatDate(dDeparture) + " - "
					+ travel.request.create.util.Formatters.formatDate(dArrival);
		}

		return sFormatted;
	},

	formatDestination : function(sDestination, sCountry) {
		var sFormattedDestination = sDestination;
		if (sDestination && sCountry) {
			sFormattedDestination += ",  " + sCountry;
		} else if (!sDestination && sCountry) {
			sFormattedDestination = sCountry;
		}

		return sFormattedDestination;
	},

	formatNameWithId : function(sName, sId) {
		var sFormatted = "";
		if (sName && sId) {
			sFormatted = sName + " (" + sId + ")";
		}

		return sFormatted;
	},
	
	formatFirstNameLastName : function(sFirstName, sLastName) {
		var sFormatted = "";
		if (sFirstName && sLastName) {
			sFormatted = sFirstName + " " + sLastName;
		}

		return sFormatted;
	},

	formatCostDescription : function(CostObjectName, CostObjectId, CostObjectItemName, CostObjectItemId, CostObjectType) {
		var label = '';

		if (CostObjectType == 'SalesOrder') {
			label = CostObjectName + " (" + CostObjectId + ")\n" + CostObjectItemName + " (" + CostObjectItemId + ")";
		} else {
			label = CostObjectName + " (" + CostObjectId + ")";
		}

		return label;
	},

	formatAmount : function(oValue, sCurrency) {
		var formatter = sap.ca.ui.model.format.AmountFormat.getInstance(sCurrency, {
			style : "standard",
			decimals : "2"
		});
		return formatter.format(oValue);
	},
	
    formatAmountWithCurrency : function(oValue, sCurrency) {
        return sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency(oValue,sCurrency);
    },

	formatPercentage : function(oValue) {
		return oValue + " %";
	},

	formatStatus : function(status) {
		switch (status) {
			case "1" :
				status = "Warning";
				break;
			case "2" :
				status = "Success";
				break;
			case "3" :
				status = "Error";
				break;
			default :
				status = "None";
				break;
		}

		return status;
	},

	translateStatus : function(status) {
		var oApplication = sap.ca.scfld.md.app.Application.getImpl();
		var oResourceBundle = oApplication.getResourceBundle();

		switch (status) {
			case "1" :
				status = oResourceBundle.getText("PENDING");
				break;
			case "2" :
				status = oResourceBundle.getText("APPROVED");
				break;
			case "3" :
				status = oResourceBundle.getText("DECLINED");
				break;
			case "A" :
				status = oResourceBundle.getText("OPEN");
				break;
			default :
				break;
		}

		return status;
	},

	isListNotEmpty : function(iVal) {
		if (!iVal)
			return false;

		return true;
	},

	toBool : function(value) {
		return Boolean(value);
	},
	getTodayDate : function() {
	    	var oToday = new Date();
	    	return this.formatDate(oToday);
	},
	
    fieldVisible : function(sFieldContent) {
    	if (!sFieldContent || /^\s*$/.test(sFieldContent)) {
			return false;
		}
		return true;
	}	

};

},
	"travel/request/create/util/InputHelper.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("travel.request.create.util.InputHelper"); 

travel.request.create.util.InputHelper = {

    /**
    *
    * @param {Event} oEvent
    * @param {string} sModelName Name of the named model
    * @returns true, if valid value. Note: no value is not valid, but clears the error state.
    */
   validateValueHelpWithSuggestion: function (oEvent) {
	   
       var oInput = oEvent.getSource();
       var sNewValue = oEvent.getParameter("newValue");
       var aSuggestionItems;
       var i;
       var bValid = false;
       
       oInput.setValueState(sap.ui.core.ValueState.None);

       if (sNewValue === "") { //not valid, but no error state
    	   return false;
       } else {
    	   //validation step: check if the value belongs to the suggestion items
    	   aSuggestionItems = oInput.getSuggestionItems();

           for (i = 0; (bValid === false) && i < aSuggestionItems.length; i++) {
        	   if ((aSuggestionItems[i].getText() === sNewValue)) {
        		   bValid = true;
        	   }
           }
           if (!bValid) {
        	   oInput.setValueState(sap.ui.core.ValueState.Error);
           }
       }
       return bValid;
   }
    
};
},
	"travel/request/create/view/Detail.controller.js":function(){/*
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

},
	"travel/request/create/view/Detail.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View\n\tcontrollerName="travel.request.create.view.Detail"\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"\n   \txmlns:form="sap.ui.layout.form"\n\txmlns:ui="sap.ca.ui" \n\txmlns:f="sap.ui.layout.form">\n\t<Page\n\t\ttitle="{i18n>DETAIL_TITLE}"\n\t\tclass="sapUiFioriObjectPage">\n\t\t<content>\n\t\t\t<ObjectHeader\n\t\t\t\ttitle="{Purpose}"\n\t\t\t\tnumber="{path:\'EstimatedCost/Value\', type:\'sap.ui.model.type.Float\', formatOptions:{groupingEnabled:true}}"\n\t\t\t\tnumberUnit="{EstimatedCost/Currency}"\n\t\t\t\tinfo="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.translateStatus\'}"\n\t\t\t\tstate="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.formatStatus\'}">\n\t\t\t\t<firstStatus>\n\t\t\t\t\t<ObjectStatus\n\t\t\t\t\t\ttext="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.translateStatus\'}"\n\t\t\t\t\t\tstate="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.formatStatus\'}">\n\t\t\t\t\t</ObjectStatus>\n\t\t\t\t</firstStatus>\n\t\t\t\t<attributes>\n\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\tid="ATTR1"\n\t\t\t\t\t\ttext="{parts:[{path:\'Location\'},{path:\'CountryName\'}], formatter:\'travel.request.create.util.Formatters.formatDestination\'}" />\n\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\tid="ATTR2"\n\t\t\t\t\t\ttext="{parts:[{path:\'Departure\'},{path:\'Arrival\'}], formatter:\'travel.request.create.util.Formatters.formatDepartureArrival\'}" />\n\t\t\t\t</attributes>\n\t\t\t</ObjectHeader>\n\n\t\t\t<IconTabBar\n\t\t\t\texpandable="true"\n\t\t\t\tid="TabContainer">\n\t\t\t\t<items>\n\t\t\t\t\t<IconTabFilter\n\t\t\t\t\t\ticon="sap-icon://hint"\n\t\t\t\t\t\ticonColor="Default"\n\t\t\t\t\t\tkey="Information">\n\t\t\t\t\t\t<f:SimpleForm\n\t\t\t\t\t\t\tid="bcTravelContainer"\n\t\t\t\t\t\t\tmaxContainerCols="1"\n\t\t\t\t\t\t\teditable="false">\n\t\t\t\t\t\t\t<f:content>\n\t\t\t\t\t\t\t\t<Label text="{i18n>TRC_DURATION}"></Label>\n\t\t\t\t\t\t\t\t<Label text="{i18n>TRC_ACTIVITY}"></Label>\n\t\t\t\t\t\t\t\t<Text\n\t\t\t\t\t\t\t\t\tid="TRC_TXT_ACTIVITY"\n\t\t\t\t\t\t\t\t\tvisible="{path : \'TripActivityName\', formatter : \'travel.request.create.util.Formatters.fieldVisible\'}"\n\t\t\t\t\t\t\t\t\ttext="{TripActivityName}" />\n\n\t\t\t\t\t\t\t\t<Label text="{i18n>TRC_LBL_COST}" />\n\t\t\t\t\t\t\t\t<Text\n\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'EstimatedCost/Value\'}, {path:\'EstimatedCost/Currency\'}], \n\t\t\t\t\t\t\t\t\tformatter:\'travel.request.create.util.Formatters.formatAmountWithCurrency\'}" />\n\t\t\t\t\t\t\t\t<Label text="{i18n>TRC_LBL_APPROVER}" />\n\t\t\t\t\t\t\t\t<Link\n\t\t\t\t\t\t\t\t\tid="EmpLink"\n\t\t\t\t\t\t\t\t\ttext="{Approver}"\n\t\t\t\t\t\t\t\t\tvisible="{path : \'Approver\', formatter : \'travel.request.create.util.Formatters.fieldVisible\'}"\n\t\t\t\t\t\t\t\t\tpress="_handleApproverPress" />\n\t\t\t\t\t\t\t\t<!-- Extension below the additional data -->\n\t\t\t\t\t\t\t\t<core:ExtensionPoint name="extInfoAdditionalData"></core:ExtensionPoint>\n\t\t\t\t\t\t\t</f:content>\n\t\t\t\t\t\t</f:SimpleForm>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t\t<IconTabFilter\t\t\t\t\t\t\n\t\t\t\t\t\tid="MultiNotesTab"\n\t\t\t\t\t\ticon="sap-icon://notes"\n\t\t\t\t\t\ticonColor="Default"\n\t\t\t\t\t\tvisible="{path : \'Note\', formatter : \'.isMultiCommentEnabled\'}"\n\t\t\t\t\t\tkey="multiNotes">\t\t\t\t\t\t\n\t\t\t\t\t\t<form:SimpleForm editable="true"\n                                         layout="ResponsiveGridLayout"\n                                         labelSpanL="1"\n                                         labelSpanM="1"\n                                         emptySpanL="1"\n                                         emptySpanM="1"\n                                         columnsL="1"\n                                         columnsM="1"\n                                         id="notesForm"\n                                         class="tecFormFullWidthPhone"                                      \n                                         >\n                            <form:content>\n                                <ui:Notes showNoData="false" showNoteInput="false" growing="true" growingThreshold="5"  id="notesList" >\n                                </ui:Notes>\n                            </form:content>\n                        </form:SimpleForm>\t\t\t\t\t\n\t \t\t\t\t\t</IconTabFilter>\t\t\t\t\t\n\t\t\t\t\t<IconTabFilter\n\t\t\t\t\t\tid="NotesTab"\n\t\t\t\t\t\ticon="sap-icon://notes"\n\t\t\t\t\t\ticonColor="Default"\n\t\t\t\t\t\tvisible="{path : \'Note\', formatter : \'.isSingleCommentEnabled\'}"\n\t\t\t\t\t\tcount = "1"\n\t\t\t\t\t\tkey="Notes">\n\t\t\t\t\t\t<FeedListItem\n\t\t\t\t\t\t\tid="NoteTemplate"\n\t\t\t\t\t\t\ticon="sap-icon://person-placeholder"\n\t\t\t\t\t\t\ttext="{Note}"\n\t\t\t\t\t\t\tinfo="{i18n>SUBMISSION}"\n\t\t\t\t\t\t\ttimestamp="{path:\'LastChangeDate\', formatter:\'travel.request.create.util.Formatters.formatDate\'}"\n\t\t\t\t\t\t\tsender="{parts:[{path:\'UserInfo>/FirstName\'},{path:\'UserInfo>/LastName\'}], formatter:\'travel.request.create.util.Formatters.formatFirstNameLastName\'}"\n\t\t\t\t\t\t\ticonPress="_handleSenderPress"\n\t\t\t\t\t\t\tsenderPress="_handleSenderPress">\n\t\t\t\t\t\t</FeedListItem>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<!-- Extension for additional tabs -->\n\t\t\t\t\t<core:ExtensionPoint name="extTabs"></core:ExtensionPoint>\n\t\t\t\t</items>\n\t\t\t</IconTabBar>\n\n\t\t\t<!-- Additional Travel Request Information -->\n\t\t\t<core:ExtensionPoint name="extAdditionalTravelRequestInformation"></core:ExtensionPoint>\n\t\t\t\n\t\t\t<!-- Cost assignments -->\n\t\t\t<Table\n\t\t\t\tid="TRC_COSTASSIGNMENTS_TABLE"\n\t\t\t\titems="{CostAssignments}"\n\t\t\t\tnoDataText="{i18n>LIST_NO_DATA}">\n\t\t\t\t<columns>\n\t\t\t\t\t<Column\n\t\t\t\t\t\thAlign="Left"\n\t\t\t\t\t\twidth="50%">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}" />\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column\n\t\t\t\t\t\thAlign="Left"\n\t\t\t\t\t\tdemandPopin="true"\n\t\t\t\t\t\tminScreenWidth="Tablet">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>TRC_TYPE}" />\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t<Column\n\t\t\t\t\t\thAlign="Right"\n\t\t\t\t\t\twidth="20%">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label text="{i18n>TRC_PERCENTAGE}" />\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t</columns>\n\t\t\t\t<items>\n\t\t\t\t\t<ColumnListItem>\n\t\t\t\t\t\t<cells>\n\t\t\t\t\t\t\t<ObjectIdentifier\n\t\t\t\t\t\t\t\tid="TRC_TXT_COSTCENTER"\n\t\t\t\t\t\t\t\ttitle="{parts:[{path:\'CostObjectName\'},{path:\'CostObjectId\'}], formatter:\'travel.request.create.util.Formatters.formatCostDescription\'}"\n\t\t\t\t\t\t\t\tmaxLines="0"></ObjectIdentifier>\n\n\t\t\t\t\t\t\t<Text\n\t\t\t\t\t\t\t\tid="TRC_TXT_COSTCOBJECT_TYPE"\n\t\t\t\t\t\t\t\ttext="{CostObjectType}"></Text>\n\n\t\t\t\t\t\t\t<ObjectNumber\n\t\t\t\t\t\t\t\tid="TRC_TXT_PERCENTAGE"\n\t\t\t\t\t\t\t\tnumber="{Percentage}"\n\t\t\t\t\t\t\t\tunit="%" />\n\t\t\t\t\t\t</cells>\n\t\t\t\t\t</ColumnListItem>\n\t\t\t\t</items>\n\t\t\t</Table>\n\t\t</content>\n\n\t\t<footer>\n\t\t\t<Bar id="TRA_BAR_DETAIL">\n\t\t\t</Bar>\n\t\t</footer>\n\t</Page>\n</core:View>',
	"travel/request/create/view/DetailForm.controller.js":function(){/*
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

},
	"travel/request/create/view/DetailForm.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View\n\tcontrollerName="travel.request.create.view.DetailForm"\n\txmlns:core="sap.ui.core"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:f="sap.ui.layout.form"\n\txmlns:caui="sap.ca.ui">\n\t<Page\n\t\tid="TRC_NEW_PAGE"\n\t\tclass="sapUiFioriObjectPage">\n\t\t<content>\n\t\t\t<l:Grid\n\t\t\t\tdefaultSpan="L12 M12 S12"\n\t\t\t\twidth="auto">\n\t\t\t\t<l:content>\n\t\t\t\t\t<f:SimpleForm\n\t\t\t\t\t\tid="oTravelSimpleForm"\n\t\t\t\t\t\tmaxContainerCols="1"\n\t\t\t\t\t\teditable="true"\n\t\t\t\t\t\tlayout="ResponsiveGridLayout"\n\t\t\t\t\t\ttitle="{i18n>TRC_TRIP_DETAIL}"\n\t\t\t\t\t\tclass="editableForm">\n\t\t\t\t\t\t<f:content>\n\t\t\t\t\t\t\t<l:Grid\n\t\t\t\t\t\t\t\tdefaultSpan="L12 M12 S12"\n\t\t\t\t\t\t\t\tminWidth="1024">\n\t\t\t\t\t\t\t\t<l:content>\n\t\t\t\t\t\t\t\t\t<f:Form\n\t\t\t\t\t\t\t\t\t\tid="oTravelForm"\n\t\t\t\t\t\t\t\t\t\tclass="editableForm">\n\t\t\t\t\t\t\t\t\t\t<f:layout>\n\t\t\t\t\t\t\t\t\t\t\t<f:ResponsiveGridLayout\n\t\t\t\t\t\t\t\t\t\t\t\tlabelSpanL="3"\n\t\t\t\t\t\t\t\t\t\t\t\tlabelSpanM="3"\n\t\t\t\t\t\t\t\t\t\t\t\temptySpanL="4"\n\t\t\t\t\t\t\t\t\t\t\t\temptySpanM="4"\n\t\t\t\t\t\t\t\t\t\t\t\tcolumnsL="1"\n\t\t\t\t\t\t\t\t\t\t\t\tcolumnsM="1" />\n\t\t\t\t\t\t\t\t\t\t</f:layout>\n\t\t\t\t\t\t\t\t\t\t<f:formContainers>\n\n\t\t\t\t\t\t\t\t\t\t\t<f:FormContainer expandable="false">\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_PURPOSE"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Purpose"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_PURPOSE}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_I_Purpose"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype="Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="false"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{Purpose}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_ACTIVITY"\t\t\t\t\t\t\t\t\t\t\t\t\t \t\n\t\t\t\t\t\t\t\t\t\t\t \t\tvisible="{ parts:[{path:\'UserInfo>/GlobalSettings>/TripActivity\'}] , formatter : \'.checkGlobalSettingsTripActivity\'}" >  \t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Activity"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_ACTIVITY}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Select\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\titems="{TripActivities>/results}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_s_Activity"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tselectedKey="{TripActivity}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{TripActivities>Description}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey="{TripActivities>ID}"></core:Item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Select>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_DATEFROM"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_From"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>FROM}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<caui:DatePicker\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_D_From"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{path: \'Departure\', type:\'sap.ca.ui.model.type.Date\', formatOptions: { style: \'medium\'} }"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdateValue="{Departure}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</caui:DatePicker>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_DATETO"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_To"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TO}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<caui:DatePicker\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_D_To"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{path: \'Arrival\', type:\'sap.ca.ui.model.type.Date\', formatOptions: { style: \'medium\'}}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdateValue="{Arrival}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</caui:DatePicker>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_DESTINATION"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Destination"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_DESTINATION}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_SD_Destination"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{parts:[{path:\'CountryName\'},{path:\'CountryCode\'}], formatter:\'travel.request.create.util.Formatters.formatNameWithId\'}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowSuggestion="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItems="{Destination>/results}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onDestinationValueHelpRequest"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected="onDestinationSuggestionItemSelected">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'Destination>Name\'},{path:\'Destination>Id\'}], formatter:\'travel.request.create.util.Formatters.formatNameWithId\'}"></core:Item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_COUNTRY"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Country"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_COUNTRY}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_SD_Country"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{parts:[{path:\'CountryName\'},{path:\'CountryCode\'}], formatter:\'travel.request.create.util.Formatters.formatNameWithId\'}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowSuggestion="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItems="{Destination>/results}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tchange="onCountryChange"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tliveChange="onCountryLiveChange"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected="onCountrySuggestionItemSelected"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onCountryValueHelpRequest">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'Destination>Name\'},{path:\'Destination>Id\'}], formatter:\'travel.request.create.util.Formatters.formatNameWithId\'}"></core:Item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_PER_DIEM_REGION"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Per_Diem_Region"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_PER_DIEM_REGION}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_SD_PerDiemRegion"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{parts:[{path:\'RegionName\'},{path:\'RegionCode\'}], formatter:\'travel.request.create.util.Formatters.formatNameWithId\'}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowSuggestion="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tchange="onPerDiemRegionChange"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tliveChange="onPerDiemRegionLiveChange"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected="onPerDiemRegionSuggestionItemSelected"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggest="onPerDiemRegionSuggest"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onPerDiemRegionValueHelpRequest">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_CITY"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_City"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_CITY}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_E_City"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype="Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="false"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{Location}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_COSTCURR"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Cost"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_LBL_COST}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_E_Cost"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype="Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="false"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{EstimatedCost/Value}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_SC_Currency"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{EstimatedCost/Currency}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teditable="{ parts:[{path:\'UserInfo>/GlobalSettings>/FixedCurrency\'}] , formatter : \'.checkGlobalSettingsFixedCurrency\'}" \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowSuggestion="true"\t\t\t\t\t\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItems="{Currencies>/result}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onCurrencyValueHelpRequest">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Item text="{Currencies>Id}"></core:Item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</suggestionItems>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_APPROVER"\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="{path : \'UserInfo>/Approver\', formatter : \'travel.request.create.util.Formatters.fieldVisible\'}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Manager"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_LBL_APPROVER}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_L_Manager"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype="Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="false"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{UserInfo>/Approver}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teditable="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_NOTE"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Note"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_LBL_NOTE}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<TextArea\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_L_Note"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{Note}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twrapping="None">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</TextArea>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\n\t\t\t\t\t\t\t\t\t\t\t</f:FormContainer>\n\t\t\t\t\t\t\t\t\t\t</f:formContainers>\n\t\t\t\t\t\t\t\t\t</f:Form>\n\t\t\t\t\t\t\t\t</l:content>\n\t\t\t\t\t\t\t</l:Grid>\n\t\t\t\t\t\t</f:content>\n\t\t\t\t\t</f:SimpleForm>\n\t\t\t\t\t\n\t\t\t\t\t<!-- Additional Travel Request Form Data -->\n\t\t\t\t\t<core:ExtensionPoint name="extAdditionalTravelRequestFormData"></core:ExtensionPoint>\n\t\t\t\t\t\n\t\t\t\t\t<f:SimpleForm\n\t\t\t\t\t\tid="oCostAssignment"\n\t\t\t\t\t\tmaxContainerCols="1"\n\t\t\t\t\t\teditable="true"\n\t\t\t\t\t\tlayout="ResponsiveGridLayout"\n\t\t\t\t\t\ttitle="{i18n>TRC_LBL_COST_CENTER}"\n\t\t\t\t\t\tclass="editableForm">\n\t\t\t\t\t\t<f:content>\n\t\t\t\t\t\t\t<l:Grid\n\t\t\t\t\t\t\t\tcontent="{CostAssignmentsModel>/}"\n\t\t\t\t\t\t\t\tdefaultSpan="L12 M12 S12"\n\t\t\t\t\t\t\t\tminWidth="1024">\n\t\t\t\t\t\t\t\t<l:content>\n\t\t\t\t\t\t\t\t\t<f:Form\n\t\t\t\t\t\t\t\t\t\tid="informationForm"\n\t\t\t\t\t\t\t\t\t\tclass="editableForm">\n\t\t\t\t\t\t\t\t\t\t<f:layout>\n\t\t\t\t\t\t\t\t\t\t\t<f:ResponsiveGridLayout\n\t\t\t\t\t\t\t\t\t\t\t\tlabelSpanL="3"\n\t\t\t\t\t\t\t\t\t\t\t\tlabelSpanM="3"\n\t\t\t\t\t\t\t\t\t\t\t\temptySpanL="4"\n\t\t\t\t\t\t\t\t\t\t\t\temptySpanM="4"\n\t\t\t\t\t\t\t\t\t\t\t\tcolumnsL="1"\n\t\t\t\t\t\t\t\t\t\t\t\tcolumnsM="1" />\n\t\t\t\t\t\t\t\t\t\t</f:layout>\n\t\t\t\t\t\t\t\t\t\t<f:formContainers title="{i18n>MB_INFORMATION}">\n\n\t\t\t\t\t\t\t\t\t\t\t<f:FormContainer id="MB_LABEL_INFORMATION">\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_TYPE"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Type"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TYPE}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Select\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\titems="{costObjects>/}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_S_Type"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tselectedKey="{CostAssignmentsModel>selectedCostObjectType}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tchange="_onUpdateCostAssigment">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{costObjects>name}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey="{costObjects>key}" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Select>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_TYPE_DESC"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Type_Desc"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlabelFor="Trc_S_Type_Desc"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>DESCRIPTION}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_S_Type_Desc"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{CostAssignmentsModel>selectedCostObjectDesc}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onCADescValueHelpRequest"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tenabled="{CostAssignmentsModel>supported}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_ORDERITEM"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="{CostAssignmentsModel>displaySelectedCostObjectField}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_OrderItem"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlabelFor="Trc_S_OrderItem"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_LBL_SALES_ORDER_ITEM}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_S_OrderItem"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{CostAssignmentsModel>selectedSalesOrderItemDescription}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalueHelpRequest="onOrderItemsValueHelpRequest">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_PCT"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_l_Pct"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlabelFor="Trc_I_Pct"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_PERCENTAGE}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trequired="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="Trc_I_Pct"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype="Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{CostAssignmentsModel>percentage}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="false">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<f:FormElement\n\t\t\t\t\t\t\t\t\t\t\t\t\tid="MB_FORM_BUTTON"\n\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="true">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="TRC_BTN_ADD_COST_CENTER"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_ADD}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttap="_onAddCostAssignment">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid="TRC_BTN_REMOVE_COST_CENTER"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>TRC_REMOVE}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttap="_onRemoveCostAssignment"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvisible="{CostAssignmentsModel>removeDisplayed}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</f:fields>\n\t\t\t\t\t\t\t\t\t\t\t\t</f:FormElement>\n\n\t\t\t\t\t\t\t\t\t\t\t</f:FormContainer>\n\t\t\t\t\t\t\t\t\t\t</f:formContainers>\n\t\t\t\t\t\t\t\t\t</f:Form>\n\t\t\t\t\t\t\t\t</l:content>\n\t\t\t\t\t\t\t</l:Grid>\n\t\t\t\t\t\t</f:content>\n\t\t\t\t\t</f:SimpleForm>\n\t\t\t\t</l:content>\n\t\t\t</l:Grid>\n\t\t\t<!-- <core:Title text="{i18n>TRC_COST_CENTER}"></core:Title> -->\n\n\t\t</content>\n\n\t\t<footer>\n\t\t\t<Bar>\n\n\t\t\t</Bar>\n\t\t</footer>\n\n\t</Page>\n</core:View>',
	"travel/request/create/view/Master.controller.js":function(){/*
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

},
	"travel/request/create/view/Master.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View\n\tcontrollerName="travel.request.create.view.Master"\n\txmlns:core="sap.ui.core"\n\txmlns="sap.m">\n\t<Page\n\t\tid="page"\n\t\ttitle="{i18n>MASTER_TITLE}">\n\t\t<content>\n\t\t\t<List\n\t\t\t\tid="list"\t\t\t\t\n\t\t\t\tmode="{device>/listMode}"\n\t\t\t\tselect="_handleSelect"\n\t\t\t\tgrowing="true"\n\t\t\t\titems="{path:\'/Travels\', sorter:[{path:\'LastChangeDate\', descending : true}]}"\n\t\t\t\tgrowingThreshold="20">\n\t\t\t\t<ObjectListItem\n\t\t\t\t\tid="MAIN_LIST_ITEM"\n\t\t\t\t\ttype="{device>/listItemType}"\n\t\t\t\t\ttitle="{Purpose}"\n\t\t\t\t\tnumber="{path:\'EstimatedCost/Value\', type:\'sap.ui.model.type.Float\', formatOptions:{groupingEnabled:true}}"\n\t\t\t\t\tnumberUnit="{EstimatedCost/Currency}"\n\t\t\t\t\tpress="_handleItemPress">\n\t\t\t\t\t<attributes>\n\t\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\t\tid="ATTR1"\n\t\t\t\t\t\t\ttext="{parts:[{path:\'Location\'},{path:\'CountryName\'}], formatter:\'travel.request.create.util.Formatters.formatDestination\'}" />\n\t\t\t\t\t\t<ObjectAttribute\n\t\t\t\t\t\t\tid="ATTR2"\n\t\t\t\t\t\t\ttext="{parts:[{path:\'Departure\'},{path:\'Arrival\'}], formatter:\'travel.request.create.util.Formatters.formatDepartureArrival\'}" />\n\t\t\t\t\t</attributes>\n\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t<ObjectStatus\n\t\t\t\t\t\t\ttext="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.translateStatus\'}"\n\t\t\t\t\t\t\tstate="{path:\'Status\', formatter:\'travel.request.create.util.Formatters.formatStatus\'}"></ObjectStatus>\n\t\t\t\t\t</firstStatus>\n\t\t\t\t</ObjectListItem>\n\t\t\t</List>\n\t\t</content>\n\n\t\t<footer>\n\t\t\t<Bar id="footer">\n\n\t\t\t</Bar>\n\t\t</footer>\n\t</Page>\n</core:View>',
	"travel/request/create/view/destinationDialog.fragment.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<SelectDialog\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"\n\tid="AddressSelectDialog"\n\ttitle="{i18n>CONTACT_ADDRESS}"\n\tnoDataText=""\n\tmultiSelect=""\n\titems="{/Countries}"\n\tsearch="searchAddress"\n\tconfirm="closeAddressSelectDialog">\n\t<StandardListItem title="{Name}">\n\t\t<core:customData>\n\t\t\t<core:CustomData\n\t\t\t\tkey="Id"\n\t\t\t\tvalue="Name" />\n\t\t</core:customData>\n\t</StandardListItem>\n</SelectDialog>'
}});
