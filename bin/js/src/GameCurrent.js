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
var GameCurrent = /** @class */ (function (_super) {
    __extends(GameCurrent, _super);
    function GameCurrent() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    GameCurrent.prototype.onInit = function () {
        this.nextFriend.visible = false;
        this.videoRevive.visible = false;
        this.nouseBtn.visible = false;
        this.jumpNow.visible = true;
    };
    return GameCurrent;
}(ui.currentScoreUI));
//# sourceMappingURL=GameCurrent.js.map