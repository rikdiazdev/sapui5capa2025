sap.ui.define([
  "./Base.controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/BusyIndicator"
], (Basecontroller,JSONModel,BusyIndicator) => {
  "use strict";

  return Basecontroller.extend("com.rikdiaz.projectui5.projectui5.controller.ProductDetail", {
    onInit() {      
      this.getRouter().getRoute("RouteProDet").attachMatched(this._onRouteMatched,this);
      this.oCatalogModel = this.getOwnerComponent().getModel("mCatalog");
      BusyIndicator.show();
    },   

    _onRouteMatched: function(oEvent){
      let oArgs = oEvent.getParameter("arguments");
      let sProductID = oArgs.productId;
      this._readProducts(this,sProductID);
    },

    _readProducts: function(that, sProductID){
            const sPath = "/Products("+sProductID+")";
            this.oCatalogModel.read(sPath, {
                success: function (oData, response) {
                    const oJSONModel = new JSONModel();
                    oJSONModel.setData(oData);
                    that.getView().setModel(oJSONModel, "mProductDetail");
                    BusyIndicator.hide();
                },
                error: function (oError) {
                    console.log("Error al leer Products", oError);
                }
            });
        },   


  });
});