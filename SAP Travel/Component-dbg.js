/*
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