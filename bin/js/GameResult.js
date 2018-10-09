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
        var info = wx.getSystemInfoSync();
        if (info['screenHeight'] * 2 > Laya.stage.height) {
            Laya.stage.height = info['screenHeight'] * 2;
        }
        _this.y = (Laya.stage.height - 1334) / 2;
        _this.resultBg.height = Laya.stage.height;
        _this.resultBg.y = -(Laya.stage.height - 1334) / 2;
        _this.bbb.height = Laya.stage.height;
        _this.bbb.y = -(Laya.stage.height - 1334) / 2;
        if (info['screenHeight'] * 2 <= 1280) {
            _this.giftBg.y = _this.giftBg.y - 80;
            _this.giftBox.y = _this.giftBox.y - 80;
            _this.shareImg.y = _this.shareImg.y - 80;
            _this.gameAgain.y = _this.gameAgain.y - 80;
            _this.saveImage.y = _this.saveImage.y - 80;
            _this.reviveCard.y = _this.reviveCard.y - 80;
            _this.moreGame.y = _this.moreGame.y - 80;
            _this.friendRelay.y = _this.friendRelay.y - 80;
            _this.inviteBtn.y = _this.inviteBtn.y - 80;
        }
        _this.bag.height = Laya.stage.height;
        _this.bag.y = -(Laya.stage.height - 1334) / 2;
        _this.shareImg.y = _this.shareImg.y + (Laya.stage.height - 1334) / 2;
        // this.backIndex.y = this.backIndex.y + (Laya.stage.height - 1334) / 2; 
        if (info['screenHeight'] <= 800) {
            _this.shareImg.y = _this.shareImg.y - (Laya.stage.height - 1334) / 2;
            _this.gameAgain.y = _this.gameAgain.y - (Laya.stage.height - 1334) / 2;
            _this.saveImage.y = _this.saveImage.y - (Laya.stage.height - 1334) / 2;
            _this.reviveCard.y = _this.reviveCard.y - (Laya.stage.height - 1334) / 2;
            _this.moreGame.y = _this.moreGame.y - (Laya.stage.height - 1334) / 2;
            _this.friendRelay.y = _this.friendRelay.y - (Laya.stage.height - 1334) / 2;
            _this.inviteBtn.y = _this.inviteBtn.y - (Laya.stage.height - 1334) / 2;
            _this.giftBox.y = _this.giftBox.y - (Laya.stage.height - 1334) / 2;
            _this.giftBg.y = _this.giftBg.y - (Laya.stage.height - 1334) / 2;
            _this.addToMy.y = _this.addToMy.y - (Laya.stage.height - 1334) / 2;
            // this.backIndex.y = this.backIndex.y - (Laya.stage.height - 1334)/2;
        }
        return _this;
    }
    GameResult.prototype.onInit = function () {
        this.friendRelay.visible = true;
        Laya.timer.frameLoop(3, this, this.giftAnimation);
        if (GameMain.app.mVersion >= '6.7.1') {
            if (laya.wx.mini.MiniLocalStorage.getItem('isShowToMy') == '1') {
                console.log("\u5DF2\u6536\u85CF\u4E0D\u73B0\u5B9E\u624B\u6307");
                this.addToMy.visible = false;
            }
            else {
                console.log("\u663E\u793A\u624B\u6307");
                this.addToMy.visible = true;
                this.addToMyTw1();
            }
        }
        else {
            this.addToMy.visible = false;
        }
        if (Laya.stage.height > 1334) {
            this.backIndex.y = this.backIndex.y + 80;
            this.resultIndex.y = this.backIndex.y - 100;
            this.addToMy.y = this.addToMy.y - 50;
        }
        GameMain.app.mWX.updateCards();
        this.backIndex.on(Events.CLICK, this, this.onBackIndexBtn);
        this.resultIndex.on(Events.CLICK, this, this.onBackIndexBtn);
        this.gameAgain.on(Events.CLICK, this, this.onGameAgain);
        this.saveImage.on(Events.CLICK, this, this.onSaveImage);
        this.inviteBtn.on(Events.CLICK, this, this.onInvitBtn);
        this.friendRelay.on(Events.CLICK, this, this.onFriendRelay);
        this.resultAvart.skin = mainInst.mIndexV.selfAvart.skin;
        this.resultScore.text = mainInst.mScore + '米';
        this.giftBox.on(Events.CLICK, this, this.onGiftBox);
        this.closeBtn.on(Events.CLICK, this, this.onCloseBtn);
        this.giftBagClose.on(Events.CLICK, this, this.onCloseBtn);
        this.shareBag.on(Events.CLICK, this, this.onShareBag);
        this.moreGame.on(Events.CLICK, this, this.onOtherGame);
        this.otherGameUrl.visible = false;
        this.bag.visible = false;
        this.onPrecent();
        this.level();
        this.resultPic();
        if (GameMain.app.mUseCards == true)
            this.cards.text = 'x' + (GameMain.app.mWX.mCards - 1);
        else
            this.cards.text = 'x' + GameMain.app.mWX.mCards;
        console.log(GameMain.app.mWX.mCards);
        if (mainInst.mGameScene != null) {
            Laya.stage.removeChild(mainInst.mGameScene);
        }
        GameMain.app.mIndexV.showBanner();
        if (GameMain.app.mIndexV.gameClub !== null) {
            GameMain.app.mIndexV.gameClub.hide();
        }
    };
    GameResult.prototype.onOtherGame = function () {
        if (GameMain.app.mWX.buttonType) {
            var obj = GameMain.app.mWX.getMoreUrl(GameMain.app.mWX.gameId);
            if (obj == null)
                return;
            // GameMain.app.mWX.reportADHit(btn.name);
            if (GameMain.app.mSDKVersion >= "2.2.0") {
                if (obj['type'] == 0) {
                    console.log("type===0");
                    var url = obj['url'];
                    wx.previewImage({
                        urls: [url] + "&agentid=0&sex=x",
                        success: function (res) {
                            console.log('预览图片成功');
                        }
                    });
                }
                if (obj['type'] == 1) {
                    console.log("type===1");
                    var path = obj['path'] + "&sex=" + String(GameMain.app.mWX.mUser['gender']);
                    ;
                    console.log(path);
                    wx.navigateToMiniProgram({
                        appId: obj['appid'],
                        path: path
                    });
                }
            }
            else {
                var url = obj['url'];
                wx.previewImage({
                    urls: [url] + "&agentid=0&sex=x",
                    success: function (res) {
                        console.log('预览图片成功');
                    }
                });
            }
        }
    };
    // onOtherGameUrl():void
    // {
    //     this.otherGameUrl.visible = false;
    // }
    GameResult.prototype.onBackIndexBtn = function () {
        this.stage.removeChild(this);
        GameMain.app.onInit();
        if (GameMain.app.mIndexV.gameClub !== null) {
            GameMain.app.mIndexV.gameClub.show();
        }
        GameMain.app.mIndexV.closeBanner();
    };
    GameResult.prototype.giftAnimation = function () {
        this.giftBg.rotation += 2;
    };
    GameResult.prototype.onShareBag = function () {
        wx.shareAppMessage({
            title: "【笨鸟飞飞礼包：10张复活卡】先到先得，抢完为止",
            imageUrl: 'res/share.png',
            query: "uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + mainInst.mScore + "&client=0&type=0&gift=" + mainInst.mWX.mUID,
            success: function (res) {
                console.log('分享成功');
            },
            fail: function (res) {
            }
        });
    };
    GameResult.prototype.onCloseBtn = function () {
        this.bag.visible = false;
        GameMain.app.mIndexV.closeBanner();
        GameMain.app.mIndexV.showBanner();
    };
    GameResult.prototype.onGiftBox = function () {
        GameMain.app.mIndexV.closeBanner();
        this.bag.visible = true;
        GameMain.app.mIndexV.showBanner();
    };
    GameResult.prototype.onGameAgain = function () {
        mainInst.mGameresult.visible = false;
        GameMain.app.mIndexV.closeBanner();
        console.log(mainInst.mGameScene);
        if (mainInst.mGameScene == null) {
            mainInst.mGameScene = new GameScene();
            Laya.stage.addChild(mainInst.mGameScene);
            Laya.timer.callLater(mainInst.mGameScene, mainInst.mGameScene.onInit);
        }
        else {
            Laya.stage.removeChild(mainInst.mGameScene);
            mainInst.mGameScene = null;
            this.onGameAgain();
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
            query: 'uid=' + mainInst.mWX.mUID + '&id=0&map=0&invit=9',
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
        if (score >= 0 && score <= 30) {
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
        var LevelScore = Math.floor(GameMain.app.mScore);
        var mlevel = GameMain.app.mLevel;
        var mLevelName = GameMain.app.levelArr;
        for (var m = 0; m < mlevel.length; m++) {
            if (LevelScore <= mlevel[m]) {
                this.levelText.text = 'Lv' + (m + 1) + '' + mLevelName[m];
                return;
            }
        }
    };
    GameResult.prototype.resultPic = function () {
        var LevelScore = Math.floor(GameMain.app.mScore);
        var mlevel = GameMain.app.mLevel;
        var mLevelName = GameMain.app.levelArr;
        for (var m = 0; m < mlevel.length; m++) {
            if (LevelScore <= mlevel[m]) {
                this.resultImg.skin = 'res/' + (m + 1) + '.png';
                return;
            }
        }
    };
    GameResult.prototype.addToMyTw1 = function () {
        Laya.Tween.to(this.addToMy, { x: 220 }, 250, null, Laya.Handler.create(this, this.addToMyTw2));
    };
    GameResult.prototype.addToMyTw2 = function () {
        Laya.Tween.to(this.addToMy, { x: 190 }, 250, null, Laya.Handler.create(this, this.addToMyTw3));
    };
    GameResult.prototype.addToMyTw3 = function () {
        Laya.Tween.to(this.addToMy, { x: 220 }, 250, null, Laya.Handler.create(this, this.addToMyTw2), 1000);
    };
    return GameResult;
}(ui.resultPageUI));
//# sourceMappingURL=GameResult.js.map