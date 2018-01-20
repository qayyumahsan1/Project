/*
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
