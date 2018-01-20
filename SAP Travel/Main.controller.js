/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("travel.request.create.Main",{onInit:function(){jQuery.sap.require("sap.ca.scfld.md.Startup");sap.ca.scfld.md.Startup.init("travel.request.create",this)},onExit:function(){if(sap.m.InstanceManager.hasOpenPopover()){sap.m.InstanceManager.closeAllPopovers()}if(sap.m.InstanceManager.hasOpenDialog()){sap.m.InstanceManager.closeAllDialogs()}}});
