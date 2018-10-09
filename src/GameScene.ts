/*
* name;
*/
class GameScene extends ui.mainUI{

    public bird: Bird; //主角
    public seed:number = 1;
    public speed:number=10;
    public score:number=0;
    public nextDis:number = 0;
    public isPlaying:boolean = false;
    public yspeed: number = 0; //下落速度
    public g: number = 0.98;   //重力加速度
    public reportScore:number = 0;

    public replayElse:boolean = false;
    public videoShow:boolean = true;

    public showCloseBtn:boolean = false;

    constructor(){
        super();
        var info = wx.getSystemInfoSync();
        if (info['screenHeight'] * 2 > Laya.stage.height)
        {
          Laya.stage.height = info['screenHeight'] * 2;
        }
        if(info['screenHeight'] * 2  <= 1280){
           this.currentResult.y = this.currentResult.y - 120;
           this.jumpNow.y = this.jumpNow.y - 120;
        }
        console.log(info['screenHeight'])
        this.mScore.y = this.mScore.y + (Laya.stage.height - 1334)/2
        if(info['screenHeight'] >800){
            this.currentResult.y = this.currentResult.y + (Laya.stage.height - 1334)/2
            this.jumpNow.y = this.jumpNow.y + (Laya.stage.height - 1334)/2
        }else{
            this.currentResult.y = this.currentResult.y - (Laya.stage.height - 1334)/2
            this.jumpNow.y = this.jumpNow.y - (Laya.stage.height - 1334)/2
        }

        
        
    }



    public closeBtn():void
    {
        if(this.showCloseBtn) {
            // GameMain.app.mGameScene.btnClose.visible = true;
        }

    }

    public onInit(): void
    {
        this.onResize();
        this.btnReplay.on(Laya.Event.CLICK, this, this.replay);
        this.guide.on(Laya.Event.CLICK, this, this.starGame);
        this.initGame();

        GameMain.app.mWX.showOut = false;
        this.btnClose.visible = false;
        this.nextFriend.visible = false;
        // this.videoRevive.visible = false;
        this.nouse.visible = false;
        this.invincible.visible = false;
        this.jumpNow.visible = false;
        this.currentResult.visible = false;
        this.currentBg.visible = false;
    
        this.videoIcon.visible = false;

        this.jumpNow.on(Events.CLICK,this,this.onJumpoff)
        this.nouseBtn.on(Events.CLICK,this,this.onInvincible)

        this.resumBtn.on(Events.CLICK,this,this.onResumBtn)
        this.toAv.on(Events.CLICK,this,this.showAVGG)
        
        this.btnClose.on(Events.CLICK,this,this.onJumpoff)

    }
    public starGame():void
    {
        this.seed = 10;
        this.guide.visible = false;
        this.btnReplay.visible = false;

        this.isPlaying = true;
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        Laya.timer.frameLoop(1, this, this.loop);
        // if(!GameMain.app.mWX.showOut){
        //      GameMain.app.mIndexV.showBanner()
        // }
        
    }

    public replay():void
    {

        GameMain.app.mIndexV.closeBanner();
        this.btnReplay.visible = false;
        this.bird.visible = true;
        this.timeNum.text = '3'
        this.bird.pos(60, (1334 - 292)/2);
        this.bird.playAction("2");        

        GameMain.app.xuming +=1;
        this.replayElse = true;
        this.timeout.visible = true;
        this.timeout.zOrder = 9999999;

        Laya.timer.loop(1000,this,this.timeOut)

        this.timer.once(3000,this,()=>{
            this.isPlaying = true;
            this.bird.rotation = 0;
            Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
            Laya.timer.frameLoop(1, this, this.loop);
        });
    }

    /**
     * 倒计时
     */
     public timeOut():void
    {
        
        this.timeNum.text = (Number(this.timeNum.text) -1).toString();
        if(this.timeNum.text == '0'){
            Laya.timer.clear(this,this.timeOut)
            this.timeout.visible = false;
        }
    }

    public initGame():void
    {
        //战场固定高度
        //1134 - 292
        for(var i=0;i<this.game._childs.length;i++)
        {
            var item:Laya.Sprite = this.game._childs[i] as Laya.Sprite;
            if(item != null)
            {
                item.visible = false;
                item.removeSelf();
                Laya.Pool.recover(item.name,item);
            }
        }


        this.timeout.visible = false;        

        this.mScore.visible = true;
        this.mScore.text = "0";

        this.score = 0;
        this.speed = 8;
        this.nextDis = 300;
        this.game.pos(0,0);

        this.btnReplay.visible = false;

        this.updateLevel();
        this.stoneCreate();
         GameMain.app.mWX.updateCards()
        //初始化角色
        if(this.bird == null)
        {
            this.bird = new Bird("2");  //有3个外形的小鸟， 0 1 2
            this.bird.zOrder = 3;
            Laya.stage.addChild(this.bird);
        }
        else
        {
            console.log('xiaoniao'+this.bird)
        }
        this.bird.pos(60, (1334 - 292)/2);
        this.bird.visible = true;    
        this.timeNum.text = '3'
    }

    public onClick(): void 
    {
        if(this.isPlaying == false)
            return;

        this.yspeed = -12;      //向上蹦多少
        this.bird.rotation = -45;//向上旋转一下

        Laya.SoundManager.playSound("sound/sfx_wing.wav", 1);
    }

    // 获取整数随机数
    public randomInt(min?: number, max?: number): number
    {
        min = min || 0;
        max = max || 1;
        max += 1;
        var rnd = this.random();
        return Math.floor(min + rnd * (max - min));
    }

    // 获取随机数
    public random(): number
    {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }

    public loop():void
    {
        this.updateBird();
        this.moveLand();
        this.updateLevel();
        this.stoneCreate();
        this.stoneStep();
        this.hitCheck();
        this.score = Math.floor(-this.game.x/200);
        this.reportScore = Math.floor(-this.game.x/200)
        this.mScore.changeText(this.score + "米");
        GameMain.app.mScore = this.score;
       
    }

    public updateBird():void
    {
        // if(this.replayElse){
        //     // this.bird.graphics.drawCircle(0,0,32,null,"#ff0000",2);
        //     Laya.timer.once(3000,this,()=>{
        //         this.replayElse = false;
        //         this.bird.graphics.drawCircle(0,0,32,null,"#ff0000",0);
        //     });
        // }else{
        //     this.bird.y += this.yspeed;
        //     this.yspeed += this.g;  
        // }
        
        this.bird.y += this.yspeed;
        this.yspeed += this.g;  


        //旋转主角
        if (this.bird.rotation <= 45) {
            this.bird.rotation += 3;
        }
    }

    public updateLevel():void
    {

    }


    public stoneCreate():void
    {
        while(true)
        {
            if(this.game.x + this.nextDis < 850)
            {
                var yy1:number = this.randomInt(160,260);
                var yy2:number = this.randomInt(160,320);
                
                var item:Laya.Sprite = Laya.Pool.getItemByClass("item_down",Laya.Sprite);
                item.loadImage("bird/pipe_down.png");
                item.scale(2,2);
                item.name = "item_down";
                item.pos(this.nextDis,yy1 * 2 - 640);
                this.game.addChild(item);

                var item2:Laya.Sprite = Laya.Pool.getItemByClass("item_up",Laya.Sprite);
                item2.loadImage("bird/pipe_up.png");
                item2.scale(2,3);
                item2.name = "item_up";
                item2.pos(this.nextDis,yy1 * 2 + yy2);
                this.game.addChild(item2); 
                this.nextDis += 320;
                
            }
            else
                break;
        }
    }

    public stoneStep():void
    {
        this.game.x -= this.speed;
        for(var i=0;i<this.game._childs.length;i++)
        {
            var sp:Laya.Sprite = this.game._childs[i] as Laya.Sprite;
            if(sp != null && (sp.name == "item_down" || sp.name == "item_up"))
            {
                if(sp.x + 120 <= 0)
                {
                    sp.removeSelf();
                    sp.visible = false;
                    Laya.Pool.recover(sp.name,sp);
                }
            }
        }
        
    }

    public hitCheck():void
    {
        
        if (this.bird.y >= this.land.y - 56) {
            this.bird.y = this.land.y - 56;
            this.yspeed = 0;
            this.onStop();
        }
        if (this.bird.y <= 0) {
            this.bird.y = 0;
            this.yspeed = 0;
            this.onStop();
        }

        for(var i=0;i<this.game._childs.length;i++)
        {
            var sp:Laya.Sprite = this.game._childs[i] as Laya.Sprite;
            if(sp != null && (sp.name == "item_down" || sp.name == "item_up"))
            {
                if(Math.abs(this.game.x) + 60 + 32 >= sp.x && Math.abs(this.game.x) + 60 - 32 <= sp.x + 104)
                {
                    if(sp.name == "item_down")
                    {
                        if(this.bird.y < 640 + sp.y)
                        {
                            this.onStop();
                            return;
                        }
                    }
                    if(sp.name == "item_up")
                    {
                        if(this.bird.y > sp.y)
                        {
                            this.onStop();
                            
                            return;
                        }
                    }
                }
            }
        }
    }

    public showVideoBtn():void
    {
        console.log('广告按钮'+this.videoShow)
        if(!this.videoShow){
            this.toAv.visible = false;
            this.nouseBtn.x = 198;
        }
    }

    public showAVGG(): void {
        let that = this
        GameMain.app.mIndexV.closeBanner()
        GameMain.app.mWX.reportData(1);
        if (GameMain.app.mSDKVersion >= "2.0.4" && GameMain.app.videoAd != null) {
            try {
                GameMain.app.videoAd.show(() => {
                    console.log("广告播放成功");
                }).catch(err => function () {
                    console.log("广告播放失败");

                });
            }
            catch (err) {
                console.log("广告播放失败");

            }
            GameMain.app.videoAd.onError(() => {
                console.log("广告播放失败");
            });

            GameMain.app.videoAd.onClose((res) => {
                console.log(res);
                console.log("sdk:" + GameMain.app.mSDKVersion);
                if (GameMain.app.mSDKVersion >= "2.1.0") {
                    if (res['isEnded'] == true) {
                        console.log(`看完广告`);
                        this.currentBg.visible = false;
                        mainInst.mGameScene.replay();  
                        this.videoShow = false;  
                        GameMain.app.mUseCards = false;
                        GameMain.app.videoAd.offClose()
                    }
                    else {
                        console.log(`中途退出`);
                        GameMain.app.videoAd.offClose()
                    }
                }
                else {
                    console.log(`低版本`);
                    this.currentBg.visible = false;
                    mainInst.mGameScene.replay();  
                    this.videoShow = false;  
                    GameMain.app.mUseCards = false;
                    GameMain.app.videoAd.offClose()
                }
            });
        }
    }

    public onStop():void
    {
        Laya.stage.off(Laya.Event.CLICK, this, this.onClick);
        Laya.timer.clear(this,this.loop);
        
        this.bird.stopAction();
        GameMain.app.mIndexV.closeBanner();
        this.isPlaying = false;
        this.btnReplay.visible = false;
        if(GameMain.app.videoAd !==null && GameMain.app.mSDKVersion >= "2.0.4"){
            this.showVideoBtn();
        }else{
            this.videoShow = false;
            this.showVideoBtn();
        }


        if(mainInst.mWX.closeBtn)
        {
            GameMain.app.mWX.reportMark( Number(this.reportScore)*100); 
             mainInst.mWX.queryCards()
            
            if(GameMain.app.xuming >=3){
               
                Laya.timer.once(2000,this,this.onJumpoff)
            }else{
                Laya.timer.once(2000,this,this.showCurrentScore)
            }
            
        }
        
    }

    public showCurrentScore():void
    {

        if(!GameMain.app.mWX.showOut){
             GameMain.app.mIndexV.showBanner()
        }
       console.log('首页为空')
       console.log(GameMain.app.mWX.showOut)
        // this.showVideoBtn();
        this.closeBtn()
        this.cards.text = 'x'+ GameMain.app.mWX.mCards
        this.bird.visible = false;
        if(GameMain.app.mWX.mCards <= 0)
        {
            this.nouseBtn.skin ='res/btn_nocards.png' 
        }
        else
        {
           this.nouseBtn.skin ='res/btn_use.png' 
            
        }

        this.currentBg.visible = true;
        this.currentResult.visible = true;
        this.jumpNow.visible = true;
        this.curentScore.text = this.score + "米"
        this.currentResult.zOrder = 99;
        this.jumpNow.zOrder = 99;
        this.currentBg.zOrder = 99;

        if(mainInst.mWX.fnOff)
        {
            this.isRevive.visible = true;
            this.nouseBtn.visible = true;
            this.heart.visible = true;
            this.cards.visible = true;
            this.resumText.visible = false;
            this.resumBtn.visible = false;
            this.useCard();
        }else{
            this.isRevive.visible = false;
            this.nouseBtn.visible = false;
            this.heart.visible = false;
            this.cards.visible = false;
            this.toAv.visible = false;
            this.resumText.visible = true;
            this.resumBtn.visible = true; 
        }
        
        
    }


    public onResumBtn():void
    {   
        wx.shareAppMessage({
            title: "比愤怒的小鸟更刺激的游戏，快来试试吧",
            imageUrl: "res/share.png",
            query: 'uid='+mainInst.mWX.mUID+'&id=0&map=0&invit=9',
            success: function (res) {
                console.log('转发到群'+res.shareTickets);
                mainInst.mUseCards = true;
                mainInst.mGameScene.currentBg.visible = false;
                mainInst.mGameScene.currentResult.visible = false;
                mainInst.mGameScene.jumpNow.visible = false;
                mainInst.mGameScene.bird.visible = true;
                mainInst.mGameScene.replay();    
            },
            fail: function (res) {
            }
        });
    }


    public moveLand():void
    {
        this.s1.x -= this.speed;
        this.s2.x -= this.speed;
        this.s3.x -= this.speed;
        this.s4.x -= this.speed;
        if(this.s1.x <= -336)
            this.s1.x = 1008;
        if(this.s2.x <= -336)
            this.s2.x = 1008;
        if(this.s3.x <= -336)
            this.s3.x = 1008;
        if(this.s4.x <= -336)
            this.s4.x = 1008;
    }

    public onResize():void
    {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.bk1.y = 0;
        this.bk2.y = 0;

        this.bk1.height = this.height;
        this.bk2.height = this.height;

        this.game.zOrder = 2;

        this.guide.height = this.height;
        this.guide.zOrder = 21;
        this.btnReplay.zOrder = 20;

        this.mScore.zOrder = 5;

        // this.s1.height = this.height - (1334 - 292);
        // this.s2.height = this.height - (1334 - 292);
        // this.s3.height = this.height - (1334 - 292);
        // this.s4.height = this.height - (1334 - 292);

        this.land.zOrder = 10;
        this.land.y = this.height - this.s1.height;
    } 


    useCard():void
    {
        console.log(GameMain.app.mUseCards)
        if(GameMain.app.mUseCards)
        {   
            if(GameMain.app.videoAd !== null){
                this.nouseBtn.visible = false;
                this.heart.visible = false;
                this.cards.visible = false;
                this.videoIcon.visible = true;
                this.toAv.x = 185;
            }
        }   
    }


    onJumpoff():void
    {
        GameMain.app.mIndexV.closeBanner();
        this.bird.visible = false;
        GameMain.app.xuming = 1;
        if(mainInst.mGameresult == null)
        {
            mainInst.mGameresult = new GameResult();
            Laya.stage.addChild(mainInst.mGameresult) ;
        }
        else
        {
           mainInst.mGameresult = null;
           this.onJumpoff();
        }
        GameMain.app.mUseCards = false;
        mainInst.mWX.queryCards()
        this.stage.removeChild(this)
        mainInst.mGameScene = null
        
    }

    onInvincible():void
    {
         GameMain.app.mWX.updateCards()
        if (mainInst.mWX.mCards > 0 ) {
            GameMain.app.mUseCards = true;
            GameMain.app.mWX.updateCards()
            this.currentBg.visible = false;
            this.currentResult.visible = false;
            this.jumpNow.visible = false;
            this.bird.visible = true;
            this.timeNum.text = '3'
            this.replay();
        }
        else
        {
            wx.showToast({
                title: '您没有卡',
                icon: 'success',
                duration: 2000
            })
        }
       
    }   
}