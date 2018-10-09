/*
* name;
*/
class Bird extends Laya.Sprite {

    public bird: Laya.Animation;
    constructor(type: string) {
        super();
        //创建3个 动画，这不用解释吧。。
        Laya.Animation.createFrames(["bird/bird0_0.png", "bird/bird0_1.png", "bird/bird0_2.png"], "bird0");
        Laya.Animation.createFrames(["bird/bird1_0.png", "bird/bird1_1.png", "bird/bird1_2.png"], "bird1");
        Laya.Animation.createFrames(["bird/bird2_0.png", "bird/bird2_1.png", "bird/bird2_2.png"], "bird2");

        this.bird = new Laya.Animation();
        this.bird.pivot(24, 24);
        this.bird.scale(2,2);
        this.addChild(this.bird);

        // this.graphics.drawCircle(0,0,32,null,"#ff0000",2);
        this.playAction(type);
    }

    public playAction(type: string): void {
        this.bird.play(0, true, "bird" + type);
    }
    public stopAction():void
    {
        this.bird.stop();
    }
}