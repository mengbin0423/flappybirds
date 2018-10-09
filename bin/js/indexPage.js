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
var IndexV = /** @class */ (function (_super) {
    __extends(IndexV, _super);
    function IndexV() {
        var _this = _super.call(this) || this;
        _this.mGameScene = null;
        _this.init();
        mainInst.mWX = new wxMinPro();
        mainInst.mWX.initWX();
        return _this;
    }
    IndexV.prototype.init = function () {
        this.mHonor.visible = false;
        this.bg.visible = true;
        Laya.timer.frameLoop(3, this, this.giftAnimation);
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
        this.bg.y = -(Laya.stage.height - 1334) / 2;
        console.log(Laya.stage.height);
        this.startGame.on(Events.CLICK, this, this.startGameBtn);
    };
    IndexV.prototype.giftAnimation = function () {
        this.giftBg.rotation += 2;
    };
    IndexV.prototype.startGameBtn = function () {
        Laya.stage.removeChild(this);
        if (mainInst.mGameScene == null) {
            this.mGameScene = new GameScene();
            Laya.stage.addChild(this.mGameScene);
            Laya.timer.callLater(this.mGameScene, this.mGameScene.onInit);
        }
    };
    return IndexV;
}(ui.startPageUI));
//# sourceMappingURL=indexPage.js.map