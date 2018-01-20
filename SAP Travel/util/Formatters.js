/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("travel.request.create.util.Formatters");jQuery.sap.require("sap.ca.ui.model.format.DateFormat");jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");travel.request.create.util.Formatters={formatDate:function(f){var d="";var t=new sap.ui.model.type.Date({style:"medium"});if(f){d=t.oOutputFormat.format(f,true)}return d},formatDateToISOString:function(f){var d=new Date();d.setUTCDate(f.getDate());d.setUTCMonth(f.getMonth());d.setUTCFullYear(f.getFullYear());d.setUTCHours(f.getHours());d.setUTCMinutes(f.getMinutes());d.setUTCSeconds(f.getSeconds());d.setUTCMilliseconds(0);return d.toISOString().substr(0,22)},formatDepartureArrival:function(d,a){var f="";if(d&&a){f=travel.request.create.util.Formatters.formatDate(d)+" - "+travel.request.create.util.Formatters.formatDate(a)}return f},formatDestination:function(d,c){var f=d;if(d&&c){f+=",  "+c}else if(!d&&c){f=c}return f},formatNameWithId:function(n,i){var f="";if(n&&i){f=n+" ("+i+")"}return f},formatFirstNameLastName:function(f,l){var F="";if(f&&l){F=f+" "+l}return F},formatCostDescription:function(C,a,b,c,d){var l='';if(d=='SalesOrder'){l=C+" ("+a+")\n"+b+" ("+c+")"}else{l=C+" ("+a+")"}return l},formatAmount:function(v,c){var f=sap.ca.ui.model.format.AmountFormat.getInstance(c,{style:"standard",decimals:"2"});return f.format(v)},formatAmountWithCurrency:function(v,c){return sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency(v,c)},formatPercentage:function(v){return v+" %"},formatStatus:function(s){switch(s){case"1":s="Warning";break;case"2":s="Success";break;case"3":s="Error";break;default:s="None";break}return s},translateStatus:function(s){var a=sap.ca.scfld.md.app.Application.getImpl();var r=a.getResourceBundle();switch(s){case"1":s=r.getText("PENDING");break;case"2":s=r.getText("APPROVED");break;case"3":s=r.getText("DECLINED");break;case"A":s=r.getText("OPEN");break;default:break}return s},isListNotEmpty:function(v){if(!v)return false;return true},toBool:function(v){return Boolean(v)},getTodayDate:function(){var t=new Date();return this.formatDate(t)},fieldVisible:function(f){if(!f||/^\s*$/.test(f)){return false}return true}};
