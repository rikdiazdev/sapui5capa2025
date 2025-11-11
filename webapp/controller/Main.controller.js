sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.rikdiaz.projectui5.projectui5.controller.Main", {
        onInit() {
            console.log("entró en el controller Main");
        }
    });
});