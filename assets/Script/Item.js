const UIHelper = require('UIHelper');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        tmplID: 0,
        itemID: 0,
    },
    
    onLoad: function () {
        this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
            this.ctrl && this.ctrl.showShader(this.itemID);
        }, this);
    },

    initItem: function (ctrl, tmplID, itemID) {
        this.ctrl = ctrl;
        this.tmplID = tmplID;
        this.itemID = itemID;
        this.label.string = UIHelper.getString(itemID);
    },

    updateItem: function(ctrl, itemID) {
        this.ctrl = ctrl;
        this.itemID = itemID;
        this.label.string = UIHelper.getString(itemID);
    },
});
