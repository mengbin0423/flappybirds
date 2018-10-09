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
var GameRank = /** @class */ (function (_super) {
    __extends(GameRank, _super);
    function GameRank() {
        var _this = _super.call(this) || this;
        _this.wRankData = [];
        _this.dataPage = 0;
        _this.cWRankPage = 1;
        _this.mType = 0;
        _this.onInit();
        return _this;
    }
    GameRank.prototype.onInit = function () {
        this.visible = true;
        this.pos(0, 0, true);
        this.mlist.renderHandler = new Laya.Handler(this, this.updateUser);
        this.startChallenge.visible = false;
        this.backBtn.on(Events.CLICK, this, this.onBackBtn);
        this.lastPage.on(Events.CLICK, this, this.onLastpage);
        this.nextPage.on(Events.CLICK, this, this.onNextPage);
    };
    GameRank.prototype.onShowWorldRank = function () {
        GameMain.app.mWX.showWorldRank(this.dataPage);
    };
    GameRank.prototype.parseRankData = function (rData) {
        this.wRankData = rData;
        console.log('排行数据' + this.wRankData);
        this.rankList();
    };
    GameRank.prototype.rankList = function () {
        var mDate = [];
        var starIndex = (this.cWRankPage - 1) * 5;
        for (var i = starIndex; i < starIndex + 5; i++) {
            var mInfo = this.wRankData[i];
            if (mInfo == null || mInfo == undefined)
                break;
            mDate.push(mInfo);
        }
        console.log(mDate);
        this.mlist.repeatX = 1;
        this.mlist.repeatY = mDate.length;
        this.mlist.array = mDate;
    };
    GameRank.prototype.onLastpage = function () {
        if (this.cWRankPage > 1) {
            this.cWRankPage--;
            this.rankList();
        }
    };
    GameRank.prototype.onNextPage = function () {
        if (this.mlist.length == 5) {
            this.cWRankPage++;
        }
        this.rankList();
    };
    GameRank.prototype.onBackBtn = function () {
        mainInst.mGameRank.visible = false;
        mainInst.mIndexV.visible = true;
    };
    GameRank.prototype.updateUser = function (cell, index) {
        var face = cell.getChildByName("face");
        var name = cell.getChildByName("name");
        var rank = cell.getChildByName("rk").getChildByName("rank");
        var level = cell.getChildByName("ll").getChildByName("otherLevel");
        var mark = cell.getChildByName("mk");
        name.changeText(cell.dataSource['name']);
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        level.text = cell.dataSource['level'];
        mark.text = cell.dataSource['mark'] + "米";
    };
    GameRank.prototype.showRank = function () {
        // this.close();
        // this.show();
        // this.listBK.visible = false;
        this.rankTitle.visible = true;
        this.rankTitle.skin = "pngs/flip/rank_friend.png";
        this.mType = 1;
        this.rankbk.visible = false;
        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.text = "未上榜";
        }
        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mRank.changeText("暂无成绩");
        else
            this.mRank.changeText(Math.floor(GameMain.app.mWX.mMarks[0]).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */
        wx.postMessage({
            type: "rank", show: 1, level: 0, info: GameMain.app.mWX.mUser, dir: "none"
        });
        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";
        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    };
    // 群排行
    GameRank.prototype.showGroupRank = function () {
        wx.showLoading({
            title: "",
            mask: true
        });
        Laya.timer.once(2000, this, function () {
            wx.hideLoading({});
        });
        // this.close();
        // this.show();
        // this.listBK.visible = false;
        this.startChallenge.visible = true;
        // if (GameMain.app.mWX.gameClub != null) {
        //     GameMain.app.mWX.gameClub.hide();
        // }
        this.rankTitle.visible = true;
        this.rankTitle.skin = "";
        this.mType = 2;
        wx.postMessage({
            type: "group", show: 1, "groupid": GameMain.app.mWX.mLaunch['shareTicket'], level: 0, openid: GameMain.app.mWX.mUser['openid'], dir: "none"
        });
        this.rankbk.visible = false;
        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.text = "未上榜";
        }
        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mScore.changeText("暂无成绩");
        else
            this.mScore.changeText(Math.floor(GameMain.app.mWX.mMarks[0]).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */
        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";
        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    };
    return GameRank;
}(ui.rankPageUI));
//# sourceMappingURL=GameRank.js.map