sap.ui.define([
  "./Base.controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
], (Basecontroller, JSONModel, MessageBox) => {
  "use strict";

  return Basecontroller.extend("com.rikdiaz.projectui5.projectui5.controller.ProductCreate", {
    onInit() {
      this.getRouter().getRoute("RouteProDet").attachMatched(this._onRouteMatched, this);
      this.oCatalogModel = this.getOwnerComponent().getModel("mCatalog");
      this.mNewProduct = new JSONModel();

      let objProduct = {
        ProductName: "",
        QuantityPerUnit: "",
        ReorderLevel: null,
        SupplierID: null,
        UnitPrice: null,
        UnitsInStock: null,
        UnitsOnOrder: null,
        Discontinued: false,
        Category_CategoryID: null,
      }

      this.mNewProduct.setData(objProduct);

      this.getView().setModel(this.mNewProduct, "mNewProduct");

      this._readCategories();

    },

    _readCategories: function () {
      const sPath = "/Categories";
      const aUrlParameters = { "$select": "CategoryID,CategoryName" }
      const that = this;
      this.oCatalogModel.read(sPath, {
        urlParameters: aUrlParameters,
        success: function (oData, response) {
          const oJSONModel = new JSONModel();
          oJSONModel.setData(oData.results);
          that.getView().setModel(oJSONModel, "mListCategories");
        },
        error: function (oError) {
          console.log("Error al leer Products", oError);
        }
      });
    },

    onSaveProduct: function () {

      let bValidated = this.validateForm();

      if (bValidated) {

        let mNewProduct = this.getView().getModel("mNewProduct").getData();
        let that = this;
        mNewProduct.Category_CategoryID = this.byId("CategoryInput").getSelectedKey();

        const sPath = "/Products";
        this.oCatalogModel.create(sPath, mNewProduct, {
          success: function (oData, response) {
            MessageBox.success(`El producto ${oData.ProductName} se registró exitosamente.`);
            let objProduct = {
              ProductName: null,
              QuantityPerUnit: null,
              ReorderLevel: null,
              SupplierID: null,
              UnitPrice: null,
              UnitsInStock: null,
              UnitsOnOrder: null,
              QuantityPerUnit: null,
              Category_CategoryID: null,
              Discontinued: false,
            }
            that.getView().getModel("mNewProduct").setData(objProduct);
          },
          error: function (oError) {
            console.log("Error al leer Products", oError);
          }
        });
      }
    },

    onCancel: function () {
      let viewRoute = "RouteMain";
      this.getRouter().navTo(viewRoute, {})
    },

    validateForm: function () {
      const oForm = this.getView().byId("productForm");
      const aControls = oForm.getContent();

      const aInputs = aControls.filter(control => control.isA("sap.m.Input"));

      let bValid = true;

      aInputs.forEach(oInput => {
        if (!oInput.getValue()) {
          oInput.setValueState("Error");
          oInput.setValueStateText("Ingrese el dato correspondiente");
          bValid;
        } else {
          oInput.setValueState("None");
        }
      });
      return bValid;
    }


  })

});