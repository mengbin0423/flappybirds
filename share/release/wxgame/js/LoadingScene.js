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
/*
* 加载场景
*/
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this) || this;
        _this.mHttpCall = null;
        return _this;
    }
    LoadingScene.prototype.onInit = function () {
        config.cJS = new js_call();
        config.cJS.onRegistInit();
        this.onResize();
        config.uid = 1;
        config.username = "test";
        config.userface = "";
        config.mRoomID = 1;
        this.onAssetLoaded();
    };
    LoadingScene.prototype.onResultApp = function (e) {
        var ret = this.getJSON(this.mHttpCall.data);
        if (ret['ret'] == 0) {
            config.uid = Number(ret["uid"]);
            config.mSession = ret['session'];
            config.mRoomID = Number(ret['roomid']);
            config.mWSSUrl = ret["game_url"];
            this.onLoginBack(0, "获取登录信息成功");
        }
        else {
            this.onLoginBack(ret['ret'], ret["error"]);
        }
        this.mHttpCall = null;
    };
    LoadingScene.prototype.onHttpRequestError = function (e) {
        this.onLoginBack(-2, "网络链接失败");
    };
    LoadingScene.prototype.getJSON = function (str) {
        var len = str.indexOf("{", 0);
        str = str.substr(len, str.length - len);
        try {
            return JSON.parse(str);
        }
        catch (e) {
            // console.log(str) ;
            var obj = new Object;
            obj["ret"] = -1;
            obj["error"] = "接口返回错误";
            return obj;
        }
    };
    LoadingScene.prototype.onLoginBack = function (bCode, mess) {
        if (bCode == 0) {
            this.onAssetLoaded();
        }
        else {
            console.log(bCode + " : " + mess);
            config.cJS.closePage(0, mess);
        }
    };
    LoadingScene.prototype.onAssetLoaded = function () {
        var assets = [];
        // 打包的资源
        assets.push({ url: util.getCDNUrl() + "res/atlas/main.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "res/atlas/main.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: util.getCDNUrl() + "main/bg.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/finger.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/best_line.png", type: Laya.Loader.IMAGE });
        assets.push({ url: util.getCDNUrl() + "main/stage.json", type: Laya.Loader.JSON });
        Laya.loader.on(Laya.Event.ERROR, this, this.LoadError);
        Laya.loader.load(assets, Laya.Handler.create(this, this.onLoadOver), Laya.Handler.create(this, this.onLoading, null, false));
    };
    LoadingScene.prototype.LoadError = function (errurl) {
        console.log(errurl);
    };
    LoadingScene.prototype.onLoading = function (progress) {
        this.loadingLabel.text = "努力加载中..." + Math.floor(progress.valueOf() * 100).toString() + "%";
        // console.log("努力加载中..." + Math.floor(progress.valueOf() * 100).toString() + "%");
    };
    LoadingScene.prototype.onLoadOver = function () {
        var _this = this;
        console.log("页面资源加载完成");
        var mGameScene = new GameScene();
        Laya.stage.addChild(mGameScene);
        mGameScene.visible = false;
        Laya.timer.callLater(this, function () {
            _this.destroy();
            mGameScene.onInit();
        });
    };
    LoadingScene.prototype.onResize = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.pos(0, 0, true);
        console.log("Set mGame width = " + this.width + " , height = " + this.height);
    };
    return LoadingScene;
}(ui.loadingUI));
//# sourceMappingURL=LoadingScene.js.map