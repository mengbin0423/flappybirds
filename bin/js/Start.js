var Events = Laya.Event;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.mGameScene = null;
        this.mIndexV = null;
        this.mLand = null;
        this.mUseCards = false;
        this.mGameRank = null;
        this.mGameresult = null;
        this.mSDKVersion = "";
        this.mScore = 0;
        this.mVersion = '';
        this.mServerTime = 0;
        this.mWX = null;
        this.mScreenHeight = 0;
        this.mScreenWidth = 0;
        this.xuming = 1;
        this.videoAd = null;
        this.mLevel = [5, 15, 30, 50, 80, 110, 150, 200, 300, 400, 600, 1000, 10000, 100001];
        this.levelArr = ['倒立鸟蛋', '学飞菜鸟', '呆萌小鸟', '尬舞小鸟', '搞怪小鸟', '勤奋小鸟', '眩晕麻雀', '蹦迪鸽子', '绅士天鹅', '求知孔雀', '卖萌大鹏', '傲娇玄鸟', '自信凤凰', '传奇智慧鸟'];
        GameMain.app = this;
        Laya.init(750, 1334);
        wx.postMessage({
            type: "init", width: Laya.stage.width, height: Laya.stage.height
        });
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.frameRate = "slow";
        Laya.stage.bgColor = "#FFFFFF";
        this.onInit();
        this.mWX = new wxMinPro();
        this.mWX.initWX();
        var info = wx.getSystemInfoSync();
        this.mVersion = info['version'];
        this.mSDKVersion = info['SDKVersion'];
        console.log(info['screenHeight']);
        this.mScreenHeight = Number(info['screenHeight']);
        this.mScreenWidth = Number(info['screenWidth']);
        console.log(this.mScreenHeight);
        if (info['screenHeight'] * 2 > Laya.stage.height) {
            Laya.stage.height = info['screenHeight'] * 2;
        }
        this.mIndexV.y = (Laya.stage.height - 1334) / 2;
        this.mIndexV.bg.height = Laya.stage.height;
        this.mIndexV.bg.y = -(Laya.stage.height - 1334) / 2;
        if (GameMain.app.mSDKVersion >= "2.0.4") {
            try {
                GameMain.app.videoAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-554f8d25272f3aa2'
                });
                GameMain.app.videoAd.onError(function (res) {
                    console.log(res.errMsg);
                    GameMain.app.videoAd = null;
                });
                GameMain.app.videoAd.load();
            }
            catch (err) {
                console.log("读取广告失败");
                GameMain.app.videoAd = null;
            }
        }
    }
    GameMain.prototype.onInit = function () {
        if (this.mIndexV == null) {
            this.mIndexV = new IndexV();
            Laya.stage.addChild(this.mIndexV);
            this.mIndexV.relay.visible = false;
        }
        else
            this.mIndexV.visible = true;
        this.mIndexV.relay.visible = false;
    };
    GameMain.prototype.showRelay = function () {
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
            this.mGameRank.rankTitle.skin = 'res/rank_crowd.png';
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