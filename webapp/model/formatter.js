sap.ui.define([], function () {
    "use strict";

    return {
        formatUnitsInStock: function (stock) {
            return stock < 50 ? stock < 20 ? "Error" : "Warning" : "Success";
        },

        colorSchemeStock: function (stock) {
            return stock < 50 ? stock < 20 ? 2 : 1 : 8;
        }
    };
});