var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Events = Laya.Event;
var ColorFilter = Laya.ColorFilter;
var Socket = Laya.Socket;
var Byte = Laya.Byte;
var Handler = Laya.Handler;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        // 是否通过微信有程序进入
        this.mXCX_Login = true;
        this.mXCX_Matching_UID = 0;
        GameMain.app = this;
        Laya.init(1080, 0, WebGL);
        Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
        Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
        this.onStartGame();
    }
    GameMain.prototype.onStartGame = function () {
        config.uid = 1;
        config.username = "test";
        config.userface = "";
        config.mRoomID = 1;
        var assets = [];
        assets.push({ url: util.getCDNUrl() + "res/atlas/main.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "res/atlas/main.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: util.getCDNUrl() + "main/bg.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/finger.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/best_line.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/stage.json", type: Laya.Loader.JSON });
        assets.push({ url: util.getCDNUrl() + "stoneRun.ani", type: Laya.Loader.JSON });
        Laya.loader.load(assets, Laya.Handler.create(this, this.onShowGame), null);
    };
    GameMain.prototype.onShowGame = function () {
        var mGameScene = new GameScene();
        //mGameScene.visible = false;
        Laya.stage.addChild(mGameScene);
        Laya.timer.callLater(mGameScene, mGameScene.onInit);
    };
    GameMain.prototype.isBase64 = function (str) {
        try {
            return base64.Base64.encode(base64.Base64.decode(str)) == str;
        }
        catch (e) {
            return false;
        }
    };
    GameMain.prototype.MD5 = function (str) {
        var ff = md5.create();
        var cc = ff.update(str);
        return cc;
    };
    GameMain.prototype.getServerTime = function () {
        var date = new Date();
        return config.mServerTime + Math.floor(date.getTime() / 1000);
    };
    GameMain.prototype.setServerTime = function (tick) {
        var date = new Date();
        config.mServerTime = tick - Math.floor(date.getTime() / 1000);
    };
    GameMain.app = null;
    return GameMain;
}());
Laya.MiniAdpter.init();
new GameMain();
//# sourceMappingURL=main.js.map