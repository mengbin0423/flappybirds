var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var newRankUI = /** @class */ (function (_super) {
        __extends(newRankUI, _super);
        function newRankUI() {
            return _super.call(this) || this;
        }
        newRankUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.newRankUI.uiView);
        };
        newRankUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 170, "x": 375, "width": 666, "skin": "res/flip/rank_bg.png", "height": 842, "anchorX": 0.5 }, "child": [{ "type": "List", "props": { "y": 24, "x": 23, "width": 620, "var": "lists", "repeatY": 5, "repeatX": 1, "height": 650 }, "child": [{ "type": "Box", "props": { "width": 620, "name": "render", "height": 130 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "res/flip/rank_other_rank_bg.png" } }, { "type": "Label", "props": { "y": 3, "x": 3, "width": 50, "text": "1", "overflow": "hidden", "name": "rk", "fontSize": 20, "color": "#ffffff", "anchorX": 0, "align": "center" } }, { "type": "Image", "props": { "y": 26, "x": 50, "width": 80, "name": "fb", "height": 80, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": -1, "x": -1, "width": 82, "skin": "res/flip/rank_other_bg.png", "height": 82, "anchorY": 0, "anchorX": 0 } }] }, { "type": "Label", "props": { "y": 34, "x": 159, "text": "测试用户", "overflow": "hidden", "name": "ne", "fontSize": 22, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 70, "x": 150, "skin": "res/flip/rank_level_bg2.png", "name": "ll" } }, { "type": "Label", "props": { "y": 87, "x": 220, "text": "灵犀一指", "name": "lv", "fontSize": 22, "color": "#000000", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 60, "x": 590, "width": 120, "text": "999分", "strokeColor": "#18171A", "stroke": 4, "overflow": "hidden", "name": "mk", "fontSize": 30, "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 1, "align": "right" } }, { "type": "Image", "props": { "y": 130, "x": 160, "width": 420, "skin": "res/flip/rank_line.png" } }] }] }, { "type": "Box", "props": { "y": 700, "x": 333, "width": 620, "var": "mSelf", "height": 130, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": -10, "x": -20, "skin": "res/flip/rank_my_rank_bg.png" }, "child": [{ "type": "Label", "props": { "y": 14, "x": 20, "width": 30, "var": "mRank", "text": 99, "overflow": "hidden", "fontSize": 24, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0, "align": "center" } }] }, { "type": "Image", "props": { "y": 24, "x": 50, "width": 80, "var": "mFace", "height": 80, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": -1, "x": -1, "width": 82, "skin": "res/flip/rank_head_self.png", "height": 82, "anchorY": 0, "anchorX": 0 } }] }, { "type": "Label", "props": { "y": 34, "x": 160, "var": "mName", "text": "测试用户", "overflow": "hidden", "fontSize": 22, "color": "#000000", "bold": true, "align": "left" } }, { "type": "Image", "props": { "y": 69, "x": 150, "skin": "res/flip/rank_level_bg2.png" } }, { "type": "Label", "props": { "y": 60, "x": 590, "width": 120, "var": "mMark", "text": "999分", "strokeColor": "#18171A", "stroke": 4, "overflow": "hidden", "fontSize": 30, "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 1, "align": "right" } }, { "type": "Label", "props": { "y": 87, "x": 220, "var": "myLevel", "text": "灵犀一指", "fontSize": 22, "color": "#000000", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }] }] };
        return newRankUI;
    }(View));
    ui.newRankUI = newRankUI;
})(ui || (ui = {}));
(function (ui) {
    var nextPlayerUI = /** @class */ (function (_super) {
        __extends(nextPlayerUI, _super);
        function nextPlayerUI() {
            return _super.call(this) || this;
        }
        nextPlayerUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.nextPlayerUI.uiView);
        };
        nextPlayerUI.uiView = { "type": "View", "props": { "width": 750, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 60, "x": 375, "skin": "res/flip/nextbg.png", "sizeGrid": "0,0,0,0", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 60, "x": 387, "width": 74, "var": "face", "height": 74, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 60, "x": 52, "skin": "res/flip/nextby.png", "anchorY": 0.5, "anchorX": 0 } }, { "type": "Label", "props": { "y": 60, "x": 526, "var": "mark", "text": "90米", "fontSize": 36, "color": "#FFEA80", "bold": true, "anchorY": 0.5, "align": "left" } }] }] };
        return nextPlayerUI;
    }(View));
    ui.nextPlayerUI = nextPlayerUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map