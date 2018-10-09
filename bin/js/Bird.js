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
/*
* name;
*/
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(type) {
        var _this = _super.call(this) || this;
        //创建3个 动画，这不用解释吧。。
        Laya.Animation.createFrames(["bird/bird0_0.png", "bird/bird0_1.png", "bird/bird0_2.png"], "bird0");
        Laya.Animation.createFrames(["bird/bird1_0.png", "bird/bird1_1.png", "bird/bird1_2.png"], "bird1");
        Laya.Animation.createFrames(["bird/bird2_0.png", "bird/bird2_1.png", "bird/bird2_2.png"], "bird2");
        _this.bird = new Laya.Animation();
        _this.bird.pivot(24, 24);
        _this.bird.scale(2, 2);
        _this.addChild(_this.bird);
        // this.graphics.drawCircle(0,0,32,null,"#ff0000",2);
        _this.playAction(type);
        return _this;
    }
    Bird.prototype.playAction = function (type) {
        this.bird.play(0, true, "bird" + type);
    };
    Bird.prototype.stopAction = function () {
        this.bird.stop();
    };
    return Bird;
}(Laya.Sprite));
//# sourceMappingURL=Bird.js.map