/*
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