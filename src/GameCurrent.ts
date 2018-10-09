class GameCurrent extends ui.currentScoreUI{
    constructor(){
        super();
        this.onInit()
    }


    onInit():void
    {
        this.nextFriend.visible = false;
        this.videoRevive.visible = false;
        this.nouseBtn.visible = false;
        this.jumpNow.visible = true;

        
    }

    
}