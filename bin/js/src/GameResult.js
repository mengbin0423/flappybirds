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
var GameResult = /** @class */ (function (_super) {
    __extends(GameResult, _super);
    function GameResult() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    GameResult.prototype.onInit = function () {
        this.friendRelay.visible = true;
        Laya.timer.frameLoop(3, this, this.giftAnimation);
        this.backIndex.on(Events.CLICK, this, this.onBackIndexBtn);
        this.gameAgain.on(Events.CLICK, this, this.onGameAgain);
        this.saveImage.on(Events.CLICK, this, this.onSaveImage);
        this.inviteBtn.on(Events.CLICK, this, this.onInvitBtn);
        this.friendRelay.on(Events.CLICK, this, this.onFriendRelay);
        this.resultAvart.skin = mainInst.mIndexV.selfAvart.skin;
        this.resultScore.text = mainInst.mScore + '米';
        this.giftBox.on(Events.CLICK, this, this.onGiftBox);
        this.closeBtn.on(Events.CLICK, this, this.onCloseBtn);
        this.shareBag.on(Events.CLICK, this, this.onShareBag);
        this.othergame.on(Events.CLICK, this, this.onOtherGame);
        this.otherGameUrl.on(Events.CLICK, this, this.onOtherGameUrl);
        this.otherGameUrl.visible = false;
        this.bag.visible = false;
        this.onPrecent();
        this.level();
        this.resultPic();
        this.cards.text = 'x' + GameMain.app.mWX.mCards;
        this.othergame.skin = GameMain.app.mWX.otherGame;
        this.otherGameUrl.skin = GameMain.app.mWX.otherGameUrl;
        if (mainInst.mGameScene != null) {
            Laya.stage.removeChild(mainInst.mGameScene);
        }
    };
    GameResult.prototype.onOtherGame = function () {
        this.otherGameUrl.visible = true;
    };
    GameResult.prototype.onOtherGameUrl = function () {
        this.otherGameUrl.visible = false;
    };
    GameResult.prototype.onBackIndexBtn = function () {
        this.stage.removeChild(this);
        GameMain.app.onInit();
    };
    GameResult.prototype.giftAnimation = function () {
        this.giftBg.rotation += 2;
    };
    GameResult.prototype.onShareBag = function () {
        console.log("uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + mainInst.mScore + "&client=0&type=0&gift=" + mainInst.mWX.mUID);
        wx.shareAppMessage({
            title: "【笨鸟飞飞礼包：10张复活卡】先到先得，抢完为止",
            imageUrl: 'res/share.png',
            query: "uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + mainInst.mScore + "&client=0&type=0&gift=" + mainInst.mWX.mUID,
            success: function (res) {
                console.log('分享成功');
                wx.showToast({
                    title: '赠送成功',
                    icon: 'success',
                    duration: 2000
                });
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    };
    GameResult.prototype.onCloseBtn = function () {
        this.bag.visible = false;
    };
    GameResult.prototype.onGiftBox = function () {
        this.bag.visible = true;
    };
    GameResult.prototype.onGameAgain = function () {
        mainInst.mGameresult.visible = false;
        console.log(mainInst.mGameScene);
        if (mainInst.mGameScene == null) {
            mainInst.mGameScene = new GameScene();
            Laya.stage.addChild(mainInst.mGameScene);
            Laya.timer.callLater(mainInst.mGameScene, mainInst.mGameScene.onInit);
        }
        else {
            mainInst.mGameScene.visible = true;
        }
    };
    GameResult.prototype.onSaveImage = function () {
        var file = canvas.toTempFilePathSync({
            x: this.shareImg.x,
            y: this.shareImg.y,
            width: 600,
            height: 500,
            destWidth: 750,
            destHeight: 600,
            fileType: "jpg",
            quality: 0.8
        });
        wx.saveImageToPhotosAlbum({
            filePath: file,
            success: function (res) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    };
    GameResult.prototype.onInvitBtn = function () {
        var file = canvas.toTempFilePathSync({
            x: this.shareImg.x,
            y: this.shareImg.y,
            width: 600,
            height: 490,
            destWidth: 750,
            destHeight: 600,
            fileType: "jpg",
            quality: 0.8
        });
        wx.shareAppMessage({
            title: "是小鸟蛋还是传奇鸟，比比看就知道了！",
            imageUrl: file,
            query: 'uid=' + mainInst.mWX.mUID + '&id=0&type=8&map=0',
            success: function (res) {
                console.log('分享成功');
                // this.revive.visible = false;
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                });
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    };
    GameResult.prototype.onFriendRelay = function () {
        console.log("uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + mainInst.mScore + "&client=0&type=0");
        wx.shareAppMessage({
            title: '笨鸟飞飞' + mainInst.mScore + '米，帮我冲上榜首吧',
            imageUrl: 'res/share.png',
            query: "uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + mainInst.mScore + "&client=0&type=0",
            success: function (res) {
                console.log('分享成功');
                // this.revive.visible = false;
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                });
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    };
    GameResult.prototype.onPrecent = function () {
        var score = GameMain.app.mScore;
        if (score > 0 && score <= 30) {
            this.precent.text = '已超越85%的玩家';
        }
        else if (score > 30 && score <= 110) {
            this.precent.text = '已超越92%的玩家';
        }
        else if (score > 110 && score <= 300) {
            this.precent.text = '已超越95%的玩家';
        }
        else if (score > 300 && score <= 1000) {
            this.precent.text = '已超越97%的玩家';
        }
        else if (score > 1000) {
            this.precent.text = '已超越99%的玩家';
        }
    };
    GameResult.prototype.level = function () {
        var LevelScore = GameMain.app.mScore;
        var mlevel = GameMain.app.mLevel;
        var mLevelName = GameMain.app.levelArr;
        for (var m = 0; m < mlevel.length; m++) {
            if (LevelScore < mlevel[m]) {
                this.levelText.text = 'Lv' + (m + 1) + '' + mLevelName[m];
                return;
            }
        }
    };
    GameResult.prototype.resultPic = function () {
        var LevelScore = GameMain.app.mScore;
        var mlevel = GameMain.app.mLevel;
        var mLevelName = GameMain.app.levelArr;
        for (var m = 0; m < mlevel.length; m++) {
            if (LevelScore < mlevel[m]) {
                this.resultImg.skin = 'res/' + (m + 1) + '.png';
                return;
            }
        }
    };
    return GameResult;
}(ui.resultPageUI));
//# sourceMappingURL=GameResult.js.map