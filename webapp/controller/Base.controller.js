sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  
], (Controller,UIComponent,JSONModel) => {
  "use strict";

  return Controller.extend("com.rikdiaz.projectui5.projectui5.controller.Base", {   

    getRouter: function () {
      return UIComponent.getRouterFor(this);
    },

  });
});