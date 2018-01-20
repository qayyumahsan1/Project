/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("travel.request.create.util.InputHelper");travel.request.create.util.InputHelper={validateValueHelpWithSuggestion:function(e){var I=e.getSource();var n=e.getParameter("newValue");var s;var i;var v=false;I.setValueState(sap.ui.core.ValueState.None);if(n===""){return false}else{s=I.getSuggestionItems();for(i=0;(v===false)&&i<s.length;i++){if((s[i].getText()===n)){v=true}}if(!v){I.setValueState(sap.ui.core.ValueState.Error)}}return v}};
