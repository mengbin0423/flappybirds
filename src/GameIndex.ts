class IndexV extends ui.startPageUI{
    public mGameScene:GameScene = null;
    public level:number = 1;
    public showLevel:number = 0;
    private master_uid:number;
    private master_mark:number;
    private master_id:number;
    public wRankData:Array<Object> = [];
    private dataPage:number = 0;
    private cWRankPage:number = 1;
    public mType:number = 0;
    public type:boolean = false;

    public music_btn_type = true;

    public banner = null;//广告

    public gameClub = null;//论坛
    constructor() {
        super();
        this.init();
        this.tween1(this.moreGame)
    }


    init():void
    {
        this.mHonor.visible = false;
        this.bg.visible = true;
        Laya.timer.frameLoop(3,this,this.giftAnimation)
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
        this.bg.y = - (Laya.stage.height - 1334) / 2
        this.moreGamePic.visible = false;
        this.revive.visible = false;
        this.relay.visible = false;
        this.music_btn.visible = true;
        this.startGame.on(Events.CLICK,this, this.startGameBtn)
        this.friendRank.on(Events.CLICK,this,this.onFriendRank)
        this.worldRank.on(Events.CLICK,this,this.onWorldRank)
        // this.moreGamePic.on(Events.CLICK,this,this.onMoreGamePic)

        this.music_btn.on(Events.CLICK,this,this.onMusicBtn)
        this.moreGame.on(Events.CLICK,this, this.onMoreGame);
        this.giftBtn.on(Events.CLICK,this,this.onGiftBtn)
        this.closeBtn.on(Events.CLICK,this,this.onCloseBtn)
        this.reviveClose.on(Events.CLICK,this,this.onCloseBtn)
        this.invitBtn.on(Events.CLICK,this,this.onInvitBtn)
        this.groupRank.on(Events.CLICK,this,this.onGroupRank)
        this.honorBtn.on(Events.CLICK,this,this.onHonorBtn)
        this.leftBtn.on(Events.CLICK,this,this.onLeftBtn)
        this.rightBtn.on(Events.CLICK,this,this.onRightBtn)

        this.backBtn.on(Events.CLICK,this,this.onBackBtn)
        this.relayBack.on(Events.CLICK,this,this.onBackBtn)

        this.startRelay.on(Events.CLICK,this,this.onStartRelay)
        this.backIndex.on(Events.CLICK,this,this.onBackIndex)
        this.backOff.on(Events.CLICK,this,this.onBackIndex)

        var info = wx.getSystemInfoSync();
        GameMain.app.mScreenHeight = Number(info['screenHeight']);
        GameMain.app.mScreenWidth = Number(info['screenWidth']);

        GameMain.app.mSDKVersion = info['SDKVersion']

        if (GameMain.app.mGameRank == null) {
            GameMain.app.mGameRank = new GameRank();
            Laya.stage.addChild(GameMain.app.mGameRank);
        } else
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
            console.log(GameMain.app.mSDKVersion)
            if (GameMain.app.mSDKVersion > '2.0.3') {
                this.gameClub = wx.createGameClubButton({
                    icon: 'dark',
                    style: {
                        left: 20,
                        top:  25 ,
                        width: 30,
                        height: 30
                    }
                });
                console.log(this.gameClub)
             }
             
        } else if (GameMain.app.mScreenHeight > 800) {
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
            console.log(this.gameClub)
        }
        
        if (this.gameClub != null) this.gameClub.show()
        
    }

    giftAnimation():void
    {
        this.giftBg.rotation +=2;
    }


    onBackBtn():void
    {
        GameMain.app.mIndexV.index.visible = true;
        GameMain.app.mIndexV.relay.visible = false;
        GameMain.app.mIndexV.revive.visible = false;
        GameMain.app.mIndexV.mHonor.visible = false;
        GameMain.app.mIndexV.init();
        GameMain.app.mWX.getIcon();
        if(this.gameClub !== null){
            this.gameClub.show()
        }
        GameMain.app.mIndexV.music_btn.visible = true;
        
    }

    onMusicBtn():void
    {
        this.music_btn_type ? this.music_btn_type = false : this.music_btn_type = true
        this.music_btn_type ? this.music_btn.skin = `res/sound_on.png` : this.music_btn.skin = `res/sound_off.png`
    }


    startGameBtn():void
    {
        GameMain.app.mIndexV.visible = false;
        if(GameMain.app.mGameRank !=null){
            GameMain.app.mGameRank.visible = false;
        }
        var assets: Array<any> = [];
        assets.push({ url: "res/atlas/bird.json", type: Laya.Loader.JSON });
        assets.push({ url: "res/atlas/bird.atlas", type: Laya.Loader.ATLAS });
        Laya.loader.load(assets, Laya.Handler.create(this, this.onShowGame), null);
        mainInst.mWX.closeBtn = true;
        mainInst.mUseCards =  false;
        this.closeBanner();
    }


    showBanner():void
    {
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
                let top = GameMain.app.mScreenHeight == 812 ? 20 : 0
                this.banner.onResize(res => {
                    this.banner.style.top = GameMain.app.mScreenHeight - this.banner.style.realHeight - top;
                });

                this.banner.onLoad(() => {
                    console.log('banner 广告加载成功2');
                    GameMain.app.mWX.reportData(0);
                });
                this.banner.show();
            }
        }
    }

    onShowGame():void
    {
        mainInst.mGameScene = new GameScene();
        Laya.stage.addChild(mainInst.mGameScene) ;
        Laya.timer.callLater(mainInst.mGameScene, mainInst.mGameScene.onInit);  
        if(this.gameClub !== null){
            this.gameClub.hide()
        }
        
    }

    relayReste():void
    {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.pos(0, 0, true);
        this.visible = false;

        this.mlist.vScrollBarSkin = "";
        this.mlist.selectEnable = false;
        this.mlist.visible = false;
        this.mlist.renderHandler = new Laya.Handler(this,this.updateUser);

        // this.btnReturn.on(Events.CLICK,this,this.back2Home);
        // this.btnRelay.on(Events.CLICK,this,this.startRelay);
        this.stage.addChild(this);

        // if (mainInst.mWX.gameClub != null) mainInst.mWX.gameClub.hide();
    }

    onRelay():void {
        mainInst.mWX.showRelay();
        if(this.gameClub !== null){
            this.gameClub.hide()
        }

        this.music_btn.visible = false;
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
        this.bg.y = - (Laya.stage.height - 1334) / 2
    }

    onHonorBtn():void
    {
        this.mHonor.visible = true;
        this.index.visible = false;
        if(GameMain.app.mGameRank != null)
        {
            GameMain.app.mGameRank.visible = false;
        }
        
        this.honorLevel();
        this.showLevelInfo();
        if(this.gameClub !== null){
            this.gameClub.hide()
        }
    }

    onBackIndex():void
    {
        this.index.visible = true;
        this.mHonor.visible = false;
        mainInst.mWX.getIcon();
        if(this.gameClub !== null){
            this.gameClub.show()
        }
    }

    onGiftBtn():void
    {
        this.revive.visible = true;
        mainInst.mWX.updateCards()
        this.showBanner()
    }

    onCloseBtn():void
    {
        this.revive.visible = false;
        this.closeBanner();
    }


    closeBanner():void
    {
        if (this.banner != null) {
            this.banner.hide();
            this.banner.destroy();
            this.banner = null;
        }
    }

    onInvitBtn():void
    {
        wx.shareAppMessage({
            title: "老铁帮帮我，让我飞的更远吧",
            imageUrl: "res/share.png",
            query: "gift=" + mainInst.mWX.mUID +'&uid='+mainInst.mWX.mUID+'&id=0&type=8&map=0',
            success: function (res) {
                console.log('分享成功')
                // this.revive.visible = false;
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })
                console.log(mainInst.mWX.mUID)
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    }

    onGroupRank():void
    {
        console.log('uid='+mainInst.mWX.mUID+'&id=0&type=8&map=0')
        wx.shareAppMessage({
            title: "你在群里排第几名？",
            imageUrl: "res/share.png",
            query: 'uid='+mainInst.mWX.mUID+'&id=0&type=8&map=0',
            success: function (res) {
                console.log(res);
                wx.showToast({title:"可入群看排名",
                    icon:"success",
                    image:"",
                    duration:2000
                });
            },
            fail: function (res) {
            }
            
        });

    }

    

    onWorldRank():void
    {
        // Laya.stage.removeChild(this)
        mainInst.mWX.initGame();
        mainInst.mIndexV.visible = false;
        if(mainInst.mGameRank == null)
        {
            mainInst.mGameRank = new GameRank();
            Laya.stage.addChild(mainInst.mGameRank) ;
            mainInst.mGameRank.rankTitle.skin = 'res/rank_world.png'
        }
        else
        {
             mainInst.mGameRank.visible = true;
        }
       mainInst.mGameRank.onShowWorldRank();
       mainInst.mGameRank.rankTitle.skin = 'res/rank_world.png'
       if(this.gameClub !== null){
            this.gameClub.hide()
        }
    }

    onMoreGame():void
    {
      if (GameMain.app.mWX.buttonType) {
            var obj: Object = GameMain.app.mWX.getMoreUrl(GameMain.app.mIndexV.moreGame.name);
            if (obj == null)
                return;
            // GameMain.app.mWX.reportADHit(btn.name);

            if (GameMain.app.mSDKVersion >= "2.2.0") {
                if (obj['type'] == 0) {
                    console.log("type===0");
                    var url: string = obj['url'];
                    wx.previewImage({
                        urls: [url] + "&agentid=0&sex=x",
                        success: (res) => {
                            console.log('预览图片成功');
                        }
                    });
                }
                if (obj['type'] == 1) {
                    console.log("type===1");
                    var path: string = obj['path'] + "&sex=" + String(GameMain.app.mWX.mUser['gender']);
                     console.log(path);
                    wx.navigateToMiniProgram({
                        appId: obj['appid'],
                        path: path 
                    });
                }
            } else {
                var url: string = obj['url'];
                wx.previewImage({
                    urls: [url] + "&agentid=0&sex=x" ,
                    success: (res) => {
                        console.log('预览图片成功');
                    }
                });
            }
        }
    }


    honorLevel():void
    {
        let level = mainInst.mWX.msmark;
        if( level >=0 && level <= 5)
        {
            this.level = 1
            
        }

        else if ( level >5 && level <= 15 )
        {
            this.level = 2
        }
        else if ( level >15 && level <= 30 )
        {
            
            this.level = 3
        }
        else if ( level >30 && level <= 50 )
        {
            this.level = 4
        }

        else if ( level > 50 && level <= 80 )
        {
            this.level = 5
        }

        else if ( level > 80 && level <= 110 )
        {
            this.level= 6
        }

        else if ( level > 110 && level <= 150 )
        {
            this.level = 7
        }
        else if ( level > 150 && level <= 200 )
        {
            this.level= 8
        }
        else
        {
            return
        }

       this.showLevel = this.level
       
        
    }

    //荣誉殿堂
    showLevelInfo():void
    {   
        if(this.gameClub !== null){
            this.gameClub.hide()
        }
        this.levelNum.text = this.showLevel.toString(); 
        if (this.showLevel <= this.level) {
           this.levelImg.skin = 'res/' + this.showLevel + '.png';
            this.honorText.text = 'Lv' + this.showLevel + '' + GameMain.app.levelArr[this.showLevel - 1] + ' | 已点亮';
        }else{
            this.levelImg.skin = 'res/none.png'
            this.honorText.text = '需要到达'+this.showLevel+'才能点亮'
        }
    }

    onLeftBtn():void
    {
        if(this.showLevel > 1){
            this.showLevel --
            this.showLevelInfo()
        }
    }

    onRightBtn():void
    {
        if(this.showLevel < 14){
            this.showLevel ++
            this.showLevelInfo()
        }
    }

    onStartRelay():void
    {
        if(this.type)
        {
            GameMain.app.mGameresult.onFriendRelay();
        }
        else
        {
            this.startGameBtn() 
        }
        
       
    }


    showRelayData(master:any, mData:any):void
    {
        this.closeBanner();
        if(this.gameClub !== null){
            this.gameClub.hide()
        }
        
        this.master_uid = master['uid'];
        if (this.master_uid == mainInst.mWX.mUID) {
            this.startRelay.skin = "res/btn_relay_3.png"
            this.type = true;
        } else {
            this.startRelay.skin = "res/btn_relay_4.png"
            this.type = false;
        }
        
        this.visible = true;
        this.mlist.visible = true;

        this.myface.skin = master["avatar"];
        this.myName.text = master['name'];
        this.master_mark = Math.floor(master["mark"]/100);
        console.log(master["mark"]+'--'+master["friend_base"] )
        this.master_id = Number(master["id"]);
        let bestNum = Math.floor( (Number(master["mark"]/100) + Number(master["friend_base"]/100))) 

        console.log('jieli'+ master);
        this.indexScore.text =  Math.floor(master["mark"]/100) + "米";
        this.bestRelay.text = Math.floor(master["friend_base"]/100) + "米";
        this.finalScore.text = bestNum + "米";
        this.wRankData = mData;
       
        this.parseRankData();
    }

    public parseRankData():void
    {
        console.log(this.wRankData);
        this.mlist.repeatX = 1;
        this.mlist.repeatY = this.wRankData.length;
        this.mlist.array = this.wRankData;
        
    }

    public updateUser(cell:Laya.Box,index:number)
    {
        var face:Laya.Image = cell.getChildByName("face") as Laya.Image;
        var name:Laya.Label = cell.getChildByName("name") as Laya.Label;        
        var rank:Laya.Label = cell.getChildByName("rk").getChildByName("rank") as Laya.Label;
        var level:Laya.Label = cell.getChildByName("ll").getChildByName("level") as Laya.Label;
        var mark:Laya.Label = cell.getChildByName("mk") as Laya.Label;

        var rk:Laya.Image = cell.getChildByName("rk") as Laya.Image;
        var ll:Laya.Image = cell.getChildByName("ll") as Laya.Image;
        

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
            mark.text = Math.floor(cell.dataSource['mark']/100) + "米";

            name.visible = true;
            face.visible = true;
            rank.visible = true;
            level.visible = true;
            mark.visible = true;
            rk.visible = true;
            ll.visible = true;
        }
    }


    // 进入好友排行
    public onFriendRank():void{
        console.log("query friend rank!!");
        mainInst.mWX.initGame();
        if(this.gameClub !== null){
            this.gameClub.hide()
        }
        // mainInst.mWX.initWX();
        mainInst.mIndexV.visible = false;
        
        if(mainInst.mGameRank == null)
        {
            mainInst.mGameRank = new GameRank();
            Laya.stage.addChild(mainInst.mGameRank)
        }
        else
        {
            mainInst.mGameRank.visible = true;
        }
        GameMain.app.mGameRank.showRank() ;
        
    }
    // 进入群排行
    // public onGroupRank():void{
    //     console.log("query group rank!!");
        
    //     GameMain.app.mGameRank.showGroupRank();
    // }

    public tween1(btn: Laya.Image, delay: number = 0) {
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
    }
    public tween2(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
    }
    public tween3(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
    }
    public tween4(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
    }

 }

