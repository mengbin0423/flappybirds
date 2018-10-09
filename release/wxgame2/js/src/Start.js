var Events = Laya.Event;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.mGameScene = null;
        this.mIndexV = null;
        this.mLand = null;
        this.mUseCards = false;
        this.mGameRank = null;
        // public mGameCurrent:GameCurrent = null;
        this.mGameresult = null;
        this.mSDKVersion = "";
        this.mScore = 0;
        this.mServerTime = 0;
        this.mWX = null;
        this.mLevel = [5, 15, 30, 50, 80, 110, 150, 200, 300, 400, 600, 1000, 10000, 100001];
        this.levelArr = ['倒立鸟蛋', '学飞菜鸟', '呆萌小鸟', '尬舞小鸟', '搞怪小鸟', '勤奋小鸟', '眩晕麻雀', '蹦迪鸽子', '绅士天鹅', '求知孔雀', '卖萌大鹏', '傲娇玄鸟', '自信凤凰', '传奇智慧鸟'];
        GameMain.app = this;
        Laya.init(750, 1334);
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.frameRate = "slow";
        Laya.stage.bgColor = "#FFFFFF";
        this.onInit();
        this.mWX = new wxMinPro();
        this.mWX.initWX();
    }
    GameMain.prototype.onStartGame = function () {
        var assets = [];
        assets.push({ url: "res/atlas/bird.json", type: Laya.Loader.JSON });
        assets.push({ url: "res/atlas/bird.atlas", type: Laya.Loader.ATLAS });
        Laya.loader.load(assets, Laya.Handler.create(this, this.onShowGame), null);
    };
    GameMain.prototype.onShowGame = function () {
        this.mGameScene = new GameScene();
        Laya.stage.addChild(this.mGameScene);
        Laya.timer.callLater(this.mGameScene, this.mGameScene.onInit);
    };
    GameMain.prototype.onInit = function () {
        if (this.mIndexV == null) {
            this.mIndexV = new IndexV();
            Laya.stage.addChild(this.mIndexV);
        }
        else
            this.mIndexV.visible = true;
    };
    GameMain.prototype.showRelay = function () {
        console.log('接力首页');
        if (this.mIndexV == null) {
            this.mIndexV = new IndexV();
            this.mIndexV.relay.visible = true;
        }
        else {
            this.mIndexV.relay.visible = true;
            this.mIndexV.relayReste();
        }
        if (this.mGameRank != null) {
            this.mGameRank.visible = false;
        }
        this.mIndexV.onRelay();
    };
    GameMain.prototype.queryGroupRank = function () {
        console.log('qunpaihangshouye');
        if (this.mGameRank != null) {
            this.mGameRank.visible = true;
            this.mGameRank.rankTitle.skin = 'res/rank_crowd.png';
        }
        else {
            this.mGameRank = new GameRank();
            Laya.stage.addChild(this.mGameRank);
        }
        if (this.mIndexV != null) {
            this.mIndexV.visible = false;
        }
        GameMain.app.mGameRank.showGroupRank();
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
        return this.mServerTime + Math.floor(date.getTime() / 1000);
    };
    GameMain.prototype.setServerTime = function (tick) {
        var date = new Date();
        this.mServerTime = tick - Math.floor(date.getTime() / 1000);
    };
    GameMain.prototype.getCDN = function () {
        return util.getCDN();
    };
    GameMain.prototype.close = function () {
        wx.postMessage({
            type: "rank", show: 0
        });
        wx.postMessage({
            type: "group", show: 0
        });
        if (this.mIndexV != null) {
            Laya.stage.removeChild(this.mIndexV);
        }
        // if(this.mGameCurrent!=null)
        // {
        //     Laya.stage.removeChild(this.mGameCurrent)
        // }
        if (this.mGameRank != null) {
            Laya.stage.removeChild(this.mGameRank);
        }
        if (this.mGameresult != null) {
            Laya.stage.removeChild(this.mGameresult);
        }
        if (this.mGameScene != null) {
            Laya.stage.removeChild(this.mGameScene);
        }
    };
    GameMain.app = null;
    return GameMain;
}());
// new GameMain();
Laya.MiniAdpter.init(true);
var mainInst = new GameMain();
//# sourceMappingURL=Start.js.map