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
        _this.level = 1;
        _this.showLevel = 0;
        _this.wRankData = [];
        _this.dataPage = 0;
        _this.cWRankPage = 1;
        _this.mType = 0;
        _this.type = false;
        _this.music_btn_type = true;
        _this.banner = null; //广告
        _this.gameClub = null; //论坛
        _this.init();
        _this.tween1(_this.moreGame);
        return _this;
    }
    IndexV.prototype.init = function () {
        this.mHonor.visible = false;
        this.bg.visible = true;
        Laya.timer.frameLoop(3, this, this.giftAnimation);
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
        this.bg.y = -(Laya.stage.height - 1334) / 2;
        this.moreGamePic.visible = false;
        this.revive.visible = false;
        this.relay.visible = false;
        this.music_btn.visible = true;
        this.startGame.on(Events.CLICK, this, this.startGameBtn);
        this.friendRank.on(Events.CLICK, this, this.onFriendRank);
        this.worldRank.on(Events.CLICK, this, this.onWorldRank);
        // this.moreGamePic.on(Events.CLICK,this,this.onMoreGamePic)
        this.music_btn.on(Events.CLICK, this, this.onMusicBtn);
        this.moreGame.on(Events.CLICK, this, this.onMoreGame);
        this.giftBtn.on(Events.CLICK, this, this.onGiftBtn);
        this.closeBtn.on(Events.CLICK, this, this.onCloseBtn);
        this.reviveClose.on(Events.CLICK, this, this.onCloseBtn);
        this.invitBtn.on(Events.CLICK, this, this.onInvitBtn);
        this.groupRank.on(Events.CLICK, this, this.onGroupRank);
        this.honorBtn.on(Events.CLICK, this, this.onHonorBtn);
        this.leftBtn.on(Events.CLICK, this, this.onLeftBtn);
        this.rightBtn.on(Events.CLICK, this, this.onRightBtn);
        this.backBtn.on(Events.CLICK, this, this.onBackBtn);
        this.relayBack.on(Events.CLICK, this, this.onBackBtn);
        this.startRelay.on(Events.CLICK, this, this.onStartRelay);
        this.backIndex.on(Events.CLICK, this, this.onBackIndex);
        this.backOff.on(Events.CLICK, this, this.onBackIndex);
        var info = wx.getSystemInfoSync();
        GameMain.app.mScreenHeight = Number(info['screenHeight']);
        GameMain.app.mScreenWidth = Number(info['screenWidth']);
        GameMain.app.mSDKVersion = info['SDKVersion'];
        if (GameMain.app.mGameRank == null) {
            GameMain.app.mGameRank = new GameRank();
            Laya.stage.addChild(GameMain.app.mGameRank);
        }
        else
            GameMain.app.mGameRank.visible = true;
        var top;
        var h = GameMain.app.mScreenHeight / 1334;
        var w = GameMain.app.mScreenWidth / 750;
        if (GameMain.app.mScreenHeight < 800) {
            this.bg.width = Laya.stage.width;
            this.bg.height = Laya.stage.height;
            this.music_btn.x = 60 / w;
            this.music_btn.y = 20 / h - (Laya.stage.height - 1334) / 2.3;
            this.music_btn.width = 36 / w;
            this.music_btn.height = 36 / w;
            console.log(GameMain.app.mSDKVersion);
            if (GameMain.app.mSDKVersion > '2.0.3') {
                this.gameClub = wx.createGameClubButton({
                    icon: 'dark',
                    style: {
                        left: 20,
                        top: 25,
                        width: 30,
                        height: 30
                    }
                });
                console.log(this.gameClub);
            }
        }
        else if (GameMain.app.mScreenHeight > 800) {
            this.bg.height = Laya.stage.height;
            this.music_btn.x = 60 / w;
            this.music_btn.y = 90 - (Laya.stage.height - 1334) / 2;
            this.music_btn.width = 36 / w;
            this.music_btn.height = 36 / w;
            if (GameMain.app.mSDKVersion > '2.0.3') {
                this.gameClub = wx.createGameClubButton({
                    icon: 'dark',
                    style: {
                        left: 20,
                        top: 48,
                        width: 30,
                        height: 30
                    }
                });
            }
            console.log(this.gameClub);
        }
        if (this.gameClub != null)
            this.gameClub.show();
    };
    IndexV.prototype.giftAnimation = function () {
        this.giftBg.rotation += 2;
    };
    IndexV.prototype.onBackBtn = function () {
        GameMain.app.mIndexV.index.visible = true;
        GameMain.app.mIndexV.relay.visible = false;
        GameMain.app.mIndexV.revive.visible = false;
        GameMain.app.mIndexV.mHonor.visible = false;
        GameMain.app.mIndexV.init();
        GameMain.app.mWX.getIcon();
        if (this.gameClub !== null) {
            this.gameClub.show();
        }
        GameMain.app.mIndexV.music_btn.visible = true;
    };
    IndexV.prototype.onMusicBtn = function () {
        this.music_btn_type ? this.music_btn_type = false : this.music_btn_type = true;
        this.music_btn_type ? this.music_btn.skin = "res/sound_on.png" : this.music_btn.skin = "res/sound_off.png";
    };
    IndexV.prototype.startGameBtn = function () {
        GameMain.app.mIndexV.visible = false;
        if (GameMain.app.mGameRank != null) {
            GameMain.app.mGameRank.visible = false;
        }
        var assets = [];
        assets.push({ url: "res/atlas/bird.json", type: Laya.Loader.JSON });
        assets.push({ url: "res/atlas/bird.atlas", type: Laya.Loader.ATLAS });
        Laya.loader.load(assets, Laya.Handler.create(this, this.onShowGame), null);
        mainInst.mWX.closeBtn = true;
        mainInst.mUseCards = false;
        this.closeBanner();
    };
    IndexV.prototype.showBanner = function () {
        var _this = this;
        if (GameMain.app.mSDKVersion >= "2.0.4") {
            console.log(GameMain.app.mSDKVersion);
            if (this.banner == null) {
                this.banner = wx.createBannerAd({
                    adUnitId: 'adunit-c4aa7a8be9aab47b',
                    style: {
                        left: 0,
                        top: GameMain.app.mScreenHeight - 107,
                        width: GameMain.app.mScreenWidth
                    }
                });
                var top_1 = GameMain.app.mScreenHeight == 812 ? 20 : 0;
                this.banner.onResize(function (res) {
                    _this.banner.style.top = GameMain.app.mScreenHeight - _this.banner.style.realHeight - top_1;
                });
                this.banner.onLoad(function () {
                    console.log('banner 广告加载成功2');
                    GameMain.app.mWX.reportData(0);
                });
                this.banner.show();
            }
        }
    };
    IndexV.prototype.onShowGame = function () {
        mainInst.mGameScene = new GameScene();
        Laya.stage.addChild(mainInst.mGameScene);
        Laya.timer.callLater(mainInst.mGameScene, mainInst.mGameScene.onInit);
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
    };
    IndexV.prototype.relayReste = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.pos(0, 0, true);
        this.visible = false;
        this.mlist.vScrollBarSkin = "";
        this.mlist.selectEnable = false;
        this.mlist.visible = false;
        this.mlist.renderHandler = new Laya.Handler(this, this.updateUser);
        // this.btnReturn.on(Events.CLICK,this,this.back2Home);
        // this.btnRelay.on(Events.CLICK,this,this.startRelay);
        this.stage.addChild(this);
        // if (mainInst.mWX.gameClub != null) mainInst.mWX.gameClub.hide();
    };
    IndexV.prototype.onRelay = function () {
        mainInst.mWX.showRelay();
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
        this.music_btn.visible = false;
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
        this.bg.y = -(Laya.stage.height - 1334) / 2;
    };
    IndexV.prototype.onHonorBtn = function () {
        this.mHonor.visible = true;
        this.index.visible = false;
        if (GameMain.app.mGameRank != null) {
            GameMain.app.mGameRank.visible = false;
        }
        this.honorLevel();
        this.showLevelInfo();
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
    };
    IndexV.prototype.onBackIndex = function () {
        this.index.visible = true;
        this.mHonor.visible = false;
        mainInst.mWX.getIcon();
        if (this.gameClub !== null) {
            this.gameClub.show();
        }
    };
    IndexV.prototype.onGiftBtn = function () {
        this.revive.visible = true;
        mainInst.mWX.updateCards();
        this.showBanner();
    };
    IndexV.prototype.onCloseBtn = function () {
        this.revive.visible = false;
        this.closeBanner();
    };
    IndexV.prototype.closeBanner = function () {
        if (this.banner != null) {
            this.banner.hide();
            this.banner.destroy();
            this.banner = null;
        }
    };
    IndexV.prototype.onInvitBtn = function () {
        wx.shareAppMessage({
            title: "老铁帮帮我，让我飞的更远吧",
            imageUrl: "res/share.png",
            query: "gift=" + mainInst.mWX.mUID + '&uid=' + mainInst.mWX.mUID + '&id=0&type=8&map=0',
            success: function (res) {
                console.log('分享成功');
                // this.revive.visible = false;
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                });
                console.log(mainInst.mWX.mUID);
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    };
    IndexV.prototype.onGroupRank = function () {
        console.log('uid=' + mainInst.mWX.mUID + '&id=0&type=8&map=0');
        wx.shareAppMessage({
            title: "你在群里排第几名？",
            imageUrl: "res/share.png",
            query: 'uid=' + mainInst.mWX.mUID + '&id=0&type=8&map=0',
            success: function (res) {
                console.log(res);
                wx.showToast({ title: "可入群看排名",
                    icon: "success",
                    image: "",
                    duration: 2000
                });
            },
            fail: function (res) {
            }
        });
    };
    IndexV.prototype.onWorldRank = function () {
        // Laya.stage.removeChild(this)
        mainInst.mWX.initGame();
        mainInst.mIndexV.visible = false;
        if (mainInst.mGameRank == null) {
            mainInst.mGameRank = new GameRank();
            Laya.stage.addChild(mainInst.mGameRank);
            mainInst.mGameRank.rankTitle.skin = 'res/rank_world.png';
        }
        else {
            mainInst.mGameRank.visible = true;
        }
        mainInst.mGameRank.onShowWorldRank();
        mainInst.mGameRank.rankTitle.skin = 'res/rank_world.png';
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
    };
    IndexV.prototype.onMoreGame = function () {
        if (GameMain.app.mWX.buttonType) {
            var obj = GameMain.app.mWX.getMoreUrl(GameMain.app.mIndexV.moreGame.name);
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
    IndexV.prototype.honorLevel = function () {
        var level = mainInst.mWX.msmark;
        if (level >= 0 && level <= 5) {
            this.level = 1;
        }
        else if (level > 5 && level <= 15) {
            this.level = 2;
        }
        else if (level > 15 && level <= 30) {
            this.level = 3;
        }
        else if (level > 30 && level <= 50) {
            this.level = 4;
        }
        else if (level > 50 && level <= 80) {
            this.level = 5;
        }
        else if (level > 80 && level <= 110) {
            this.level = 6;
        }
        else if (level > 110 && level <= 150) {
            this.level = 7;
        }
        else if (level > 150 && level <= 200) {
            this.level = 8;
        }
        else {
            return;
        }
        this.showLevel = this.level;
    };
    //荣誉殿堂
    IndexV.prototype.showLevelInfo = function () {
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
        this.levelNum.text = this.showLevel.toString();
        if (this.showLevel <= this.level) {
            this.levelImg.skin = 'res/' + this.showLevel + '.png';
            this.honorText.text = 'Lv' + this.showLevel + '' + GameMain.app.levelArr[this.showLevel - 1] + ' | 已点亮';
        }
        else {
            this.levelImg.skin = 'res/none.png';
            this.honorText.text = '需要到达' + this.showLevel + '才能点亮';
        }
    };
    IndexV.prototype.onLeftBtn = function () {
        if (this.showLevel > 1) {
            this.showLevel--;
            this.showLevelInfo();
        }
    };
    IndexV.prototype.onRightBtn = function () {
        if (this.showLevel < 14) {
            this.showLevel++;
            this.showLevelInfo();
        }
    };
    IndexV.prototype.onStartRelay = function () {
        if (this.type) {
            GameMain.app.mGameresult.onFriendRelay();
        }
        else {
            this.startGameBtn();
        }
    };
    IndexV.prototype.showRelayData = function (master, mData) {
        this.closeBanner();
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
        this.master_uid = master['uid'];
        if (this.master_uid == mainInst.mWX.mUID) {
            this.startRelay.skin = "res/btn_relay_3.png";
            this.type = true;
        }
        else {
            this.startRelay.skin = "res/btn_relay_4.png";
            this.type = false;
        }
        this.visible = true;
        this.mlist.visible = true;
        this.myface.skin = master["avatar"];
        this.myName.text = master['name'];
        this.master_mark = Math.floor(master["mark"] / 100);
        console.log(master["mark"] + '--' + master["friend_base"]);
        this.master_id = Number(master["id"]);
        var bestNum = Math.floor((Number(master["mark"] / 100) + Number(master["friend_base"] / 100)));
        console.log('jieli' + master);
        this.indexScore.text = Math.floor(master["mark"] / 100) + "米";
        this.bestRelay.text = Math.floor(master["friend_base"] / 100) + "米";
        this.finalScore.text = bestNum + "米";
        this.wRankData = mData;
        this.parseRankData();
    };
    IndexV.prototype.parseRankData = function () {
        console.log(this.wRankData);
        this.mlist.repeatX = 1;
        this.mlist.repeatY = this.wRankData.length;
        this.mlist.array = this.wRankData;
    };
    IndexV.prototype.updateUser = function (cell, index) {
        var face = cell.getChildByName("face");
        var name = cell.getChildByName("name");
        var rank = cell.getChildByName("rk").getChildByName("rank");
        var level = cell.getChildByName("ll").getChildByName("level");
        var mark = cell.getChildByName("mk");
        var rk = cell.getChildByName("rk");
        var ll = cell.getChildByName("ll");
        rk.visible = false;
        ll.visible = false;
        name.visible = false;
        face.visible = false;
        rank.visible = false;
        level.visible = false;
        mark.visible = false;
        if (cell.dataSource['uid']) {
            name.changeText(cell.dataSource['name']);
            face.skin = cell.dataSource['avatar'];
            rank.text = cell.dataSource['rank'];
            level.text = cell.dataSource['level'];
            mark.text = Math.floor(cell.dataSource['mark'] / 100) + "米";
            name.visible = true;
            face.visible = true;
            rank.visible = true;
            level.visible = true;
            mark.visible = true;
            rk.visible = true;
            ll.visible = true;
        }
    };
    // 进入好友排行
    IndexV.prototype.onFriendRank = function () {
        console.log("query friend rank!!");
        mainInst.mWX.initGame();
        if (this.gameClub !== null) {
            this.gameClub.hide();
        }
        // mainInst.mWX.initWX();
        mainInst.mIndexV.visible = false;
        if (mainInst.mGameRank == null) {
            mainInst.mGameRank = new GameRank();
            Laya.stage.addChild(mainInst.mGameRank);
        }
        else {
            mainInst.mGameRank.visible = true;
        }
        GameMain.app.mGameRank.showRank();
    };
    // 进入群排行
    // public onGroupRank():void{
    //     console.log("query group rank!!");
    //     GameMain.app.mGameRank.showGroupRank();
    // }
    IndexV.prototype.tween1 = function (btn, delay) {
        if (delay === void 0) { delay = 0; }
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
    };
    IndexV.prototype.tween2 = function (btn) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
    };
    IndexV.prototype.tween3 = function (btn) {
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
    };
    IndexV.prototype.tween4 = function (btn) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
    };
    return IndexV;
}(ui.startPageUI));
//# sourceMappingURL=GameIndex.js.map