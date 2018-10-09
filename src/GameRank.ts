class GameRank extends ui.rankPageUI{
    public wRankData:Array<Object> = [];
    private dataPage:number = 0;
    private cWRankPage:number = 1;
    public mType:number = 0;
    constructor(){
        super();
        this.onInit()
        var info = wx.getSystemInfoSync();
        if (info['screenHeight'] * 2 > Laya.stage.height)
        {
          Laya.stage.height = info['screenHeight'] * 2;
        }
        this.y = (Laya.stage.height - 1334) / 2;
        this.rankBg.height = Laya.stage.height; 
        this.rankBg.y = -(Laya.stage.height - 1334) / 2; 
    }

    onInit():void
    {
        this.visible = true;
        this.pos(0,0,true)
        this.mlist.renderHandler = new Laya.Handler(this, this.updateUser);
        this.startChallenge.visible = false;
        this.backBtn.on(Events.CLICK, this, this.onBackBtn)  
        this.rankBack.on(Events.CLICK, this, this.onBackBtn) 
        this.lastPage.on(Events.CLICK,this,this.onchangePage,["previous"])
        this.nextPage.on(Events.CLICK,this,this.onchangePage,["next"]) 
    }

    onShowWorldRank():void
    {
        GameMain.app.mWX.showWorldRank(this.dataPage);
        this.rankbg.visible = true;
        this.rankSprite.visible = false;
        this.startChallenge.visible = false;
        this.rankTitle.skin = 'res/rank_world.png'
        this.mType = 4;
    }

    parseRankData(rData: Array<Object>): void 
    {
        this.wRankData = rData;
        this.rankList();
    }

    rankList():void
    {
        let mDate: Array<Object> = [];
        let starIndex: number = (this.cWRankPage - 1) * 5;
        for (let i: number = starIndex; i < starIndex + 5; i++) {
            let mInfo: Object = this.wRankData[i];
            if (mInfo == null || mInfo == undefined) break;
            mDate.push(mInfo);
        }
        if (mDate.length) {
            this.mlist.repeatX = 1;
            this.mlist.repeatY = mDate.length;
            this.mlist.array = mDate;
        } else {
            this.dataPage--;
            this.cWRankPage--;
        }




    }

    onchangePage(dir:string):void
    {
       if (this.mType == 1) {
            wx.postMessage({
                type: "rank", show: 1, level: 0, info: GameMain.app.mWX.mUser, dir: dir
            });
            return;
        }
        // 群
        if (this.mType == 2) {
            wx.postMessage({
                type: "group", show: 1, "groupid": GameMain.app.mWX.mLaunch['shareTicket'], level: 0, openid: GameMain.app.mWX.mUser['openid'], dir: dir
            });
            return;
        }


        if (dir === "previous") this.cWRankPage--;
        else if (dir === "next") this.cWRankPage++;
       
        let pages: number = Math.floor(this.wRankData.length / 5) + 1;
        if (this.wRankData.length % 50 == 0)
            pages--;
        if (this.cWRankPage < 1) {
            this.cWRankPage = 1;
            return;
        }
       
        if (this.cWRankPage >= pages) {
            if (pages % 10 == 0) {
                this.dataPage++;
                GameMain.app.mWX.showWorldRank(this.dataPage);
            } else {
                this.cWRankPage--;
            }
            return;
        }
        this.rankList()  
    }



    onBackBtn():void
    {
         mainInst.mGameRank.visible = false;
         mainInst.mIndexV.visible = true;
         mainInst.mIndexV.index.visible = true;
         mainInst.mIndexV.revive.visible = false;
         mainInst.mIndexV.mHonor.visible = false;
         mainInst.mIndexV.relay.visible = false;
         mainInst.mIndexV.init();
         mainInst.mWX.getIcon();
         if(GameMain.app.mIndexV.gameClub !== null){
            GameMain.app.mIndexV.gameClub.show()
         }
         
         GameMain.app.mIndexV.music_btn.visible = true;
         this.wRankData = [];
         this.dataPage = 0;
         this.cWRankPage = 1;
         this.mType = 0;
    }

    updateUser(cell: Laya.Box, index: number) {
        var face: Laya.Image = cell.getChildByName("face") as Laya.Image;
        var name: Laya.Label = cell.getChildByName("name") as Laya.Label;
        var rank: Laya.Label = cell.getChildByName("rk").getChildByName("rank") as Laya.Label;
        var level:Laya.Label = cell.getChildByName("ll").getChildByName("otherLevel") as Laya.Label;   
        var mark: Laya.Label = cell.getChildByName("mk") as Laya.Label;

        name.changeText(cell.dataSource['name']);
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        level.text = cell.dataSource['level'];
        mark.text = Math.floor(cell.dataSource['mark']/100)  + "米";
        
    }


    public showRank(): void {
        this.rankSprite.visible=true;
        this.rankTitle.visible = true;
        this.rankTitle.skin = "res/rank_friend.png";
        this.mType = 1;

        console.log('好友排行')
        this.rankbg.visible = false;
        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.text = "未上榜";
        }else{
            this.rankbk.visible = false;
        }


        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mRank.text="暂无成绩";
        else
            this.mRank.changeText(Math.floor(GameMain.app.mWX.mMarks[0]/100).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */


        wx.postMessage({
            type: "rank", show: 1, level: 0, info: GameMain.app.mWX.mUser, dir: "none"
        });

        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";

        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    }


    // 群排行
    public showGroupRank(): void {
        console.log('显示群排行')
        if(GameMain.app.mIndexV.gameClub !== null){
            GameMain.app.mIndexV.gameClub.hide()
        }
        if(GameMain.app.mIndexV.banner !== null){
            GameMain.app.mIndexV.closeBanner()
        }
        wx.showLoading({
            title: "",
            mask: true
        });
        Laya.timer.once(2000, this, () => {
            wx.hideLoading({});
        });

        this.rankbg.visible = false;
       
        this.rankTitle.skin = 'res/rank_crowd.png'
        this.rankTitle.visible = true;
        this.rankTitle.skin = "";
        this.mType = 2;

        wx.postMessage({
            type: "group", show: 1, "groupid": GameMain.app.mWX.mLaunch['shareTicket'], level: 0, openid: GameMain.app.mWX.mUser['openid'], dir: "none"
        });

        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.visible = false;
        }else{
            this.rankbk.visible = false;
        }

        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mScore.changeText("暂无成绩");
        else
            this.mScore.changeText(Math.floor(GameMain.app.mWX.mMarks[0]/100).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */
        this.rankSprite.visible = true;
        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";

        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    }
}