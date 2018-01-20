/*
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
