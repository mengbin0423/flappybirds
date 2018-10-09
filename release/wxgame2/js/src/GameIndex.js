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
        _this.init();
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
        this.startGame.on(Events.CLICK, this, this.startGameBtn);
        this.friendRank.on(Events.CLICK, this, this.onFriendRank);
        this.worldRank.on(Events.CLICK, this, this.onWorldRank);
        this.moreGamePic.on(Events.CLICK, this, this.onMoreGamePic);
        this.moreGame.on(Events.CLICK, this, this.onMoreGame);
        this.giftBtn.on(Events.CLICK, this, this.onGiftBtn);
        this.closeBtn.on(Events.CLICK, this, this.onCloseBtn);
        this.invitBtn.on(Events.CLICK, this, this.onInvitBtn);
        this.groupRank.on(Events.CLICK, this, this.onGroupRank);
        this.honorBtn.on(Events.CLICK, this, this.onHonorBtn);
        this.leftBtn.on(Events.CLICK, this, this.onLeftBtn);
        this.rightBtn.on(Events.CLICK, this, this.onRightBtn);
        this.backBtn.on(Events.CLICK, this, this.onBackBtn);
        this.startRelay.on(Events.CLICK, this, this.onStartRelay);
        this.backIndex.on(Events.CLICK, this, this.onBackIndex);
        this.backOff.on(Events.CLICK, this, this.onBackIndex);
        if (GameMain.app.mGameRank == null) {
            GameMain.app.mGameRank = new GameRank();
            Laya.stage.addChild(GameMain.app.mGameRank);
        }
        else
            GameMain.app.mGameRank.visible = true;
    };
    IndexV.prototype.giftAnimation = function () {
        this.giftBg.rotation += 2;
    };
    IndexV.prototype.onBackBtn = function () {
        GameMain.app.mIndexV.index.visible = true;
        GameMain.app.mIndexV.relay.visible = false;
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
    };
    IndexV.prototype.onShowGame = function () {
        this.mGameScene = new GameScene();
        Laya.stage.addChild(this.mGameScene);
        Laya.timer.callLater(this.mGameScene, this.mGameScene.onInit);
    };
    IndexV.prototype.relayReste = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.pos(0, 0, true);
        this.visible = false;
        this.mlist.vScrollBarSkin = "";
        this.mlist.selectEnable = false;
        this.mlist.visible = false;
        this.mlist.renderHandler = new Laya.Handler(this, GameMain.app.mGameRank.updateUser);
        // this.btnReturn.on(Events.CLICK,this,this.back2Home);
        // this.btnRelay.on(Events.CLICK,this,this.startRelay);
        this.stage.addChild(this);
        // if (mainInst.mWX.gameClub != null) mainInst.mWX.gameClub.hide();
    };
    IndexV.prototype.onRelay = function () {
        mainInst.mWX.showRelay();
    };
    IndexV.prototype.onHonorBtn = function () {
        this.mHonor.visible = true;
        this.index.visible = false;
        if (GameMain.app.mGameRank != null) {
            GameMain.app.mGameRank.visible = false;
        }
        this.honorLevel();
        this.showLevelInfo();
    };
    IndexV.prototype.onBackIndex = function () {
        this.index.visible = true;
        this.mHonor.visible = false;
        ;
    };
    IndexV.prototype.onGiftBtn = function () {
        this.revive.visible = true;
        mainInst.mWX.updateCards();
    };
    IndexV.prototype.onCloseBtn = function () {
        this.revive.visible = false;
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
                if (res.shareTickets != undefined) {
                    wx.showToast({ title: "可入群看排名",
                        icon: "success",
                        image: "",
                        duration: 2000
                    });
                }
                else {
                    wx.showToast({ title: "需转发到群",
                        icon: "success",
                        image: "",
                        duration: 2000
                    });
                }
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    };
    // onFriendRank():void
    // {
    //     mainInst.mIndexV.visible = false;
    // if(mainInst.mGameRank == null)
    // {
    //     mainInst.mGameRank = new GameRank();
    //     Laya.stage.addChild(mainInst.mGameRank) ;
    //     mainInst.mGameRank.rankTitle.skin = 'res/rank_friend.png'
    // }
    // else
    // {
    //     mainInst.mGameRank.visible = true;
    // }
    // mainInst.mGameRank.rankTitle.skin = 'res/rank_friend.png'
    // mainInst.mGameRank.onShowWorldRank();
    // }
    IndexV.prototype.onWorldRank = function () {
        // Laya.stage.removeChild(this)
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
    };
    IndexV.prototype.onMoreGamePic = function () {
        this.moreGamePic.visible = false;
    };
    IndexV.prototype.onMoreGame = function () {
        this.moreGamePic.visible = true;
    };
    IndexV.prototype.honorLevel = function () {
        var level = Number(mainInst.mWX.mMarks[0]);
        if (level > 0 && level <= 5) {
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
        this.master_mark = Number(master["mark"]);
        this.master_id = Number(master["id"]);
        var bestNum = Number(master["mark"]) + Number(master["friend_base"]);
        console.log(master);
        this.indexScore.text = master["mark"] + "米";
        this.bestRelay.text = master["friend_base"] + "米";
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
            mark.text = cell.dataSource['mark'] + "分";
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
        mainInst.mIndexV.visible = false;
        GameMain.app.mGameRank.showRank();
    };
    return IndexV;
}(ui.startPageUI));
//# sourceMappingURL=GameIndex.js.map