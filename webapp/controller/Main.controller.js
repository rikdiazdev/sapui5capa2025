sap.ui.define([
    "./Base.controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
], (Basecontroller, JSONModel, formatter, Filter, FilterOperator,UIComponent) => {
    "use strict";

    return Basecontroller.extend("com.rikdiaz.projectui5.projectui5.controller.Main", {
        formatter: formatter,
        onInit() {
            console.log("Main Controller")
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

        onSearchProductsBinding: function(oEvent){
            let aFilters = [];
            let sQuery = oEvent.getSource().getValue();

            if (sQuery && sQuery.length > 0) {
                let oFilter = new Filter("ProductName", FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }

            let oList = this.byId("listProducts");
            let oBinding = oList.getBinding("items");
            oBinding.filter(aFilters);

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
        },        

        onPressButton: function(oEvent){
            let viewRoute = "RouteProDet";
            this.getRouter().navTo(viewRoute,{});
        },

        onPressProduct: function(oEvent){
            let sProductID = oEvent.getSource().getSelectedItem().getBindingContext("mListProducts").getObject().ProductID;
            
            let viewRoute = "RouteProDet";
            this.getRouter().navTo(viewRoute,{
                productId: sProductID
            })
        }

    });
});