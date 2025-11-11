sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.rikdiaz.projectui5.projectui5.controller.Main", {
        formatter: formatter,
        onInit() {
            this.oCatalogModel = this.getOwnerComponent().getModel("mCatalog");
            this.getProducts();
        },

        getProducts() {            
            this._readProducts(this);
        },

        onSearchBD: function (oEvent) {
            let aFilters = [];
            let sQuery = oEvent.getSource().getValue();

            if(sQuery && sQuery.length >= 3){
                var that = this;
                let oFilter = new Filter("ProductName", FilterOperator.Contains,sQuery);
                aFilters.push(oFilter);                
                that._readProducts(that,aFilters);                
            }else{
                this.getProducts();
            }
        },

        _readProducts: function(that,aFilters = []){
            const sPath = "/Products";
            const aUrlParameters = { "$select": "ProductName,QuantityPerUnit,UnitsInStock,Discontinued" };
            this.oCatalogModel.read(sPath, {
                urlParameters: aUrlParameters,
                filters: aFilters,
                success: function (oData, response) {
                    const oJSONModel = new JSONModel();
                    oJSONModel.setData(oData.results);
                    that.getView().setModel(oJSONModel, "mListProducts");
                },
                error: function (oError) {
                    console.log("Error al leer Products", oError);
                }
            });
        }

    });
});