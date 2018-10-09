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
* 玩家石头
*/
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(position) {
        var _this = _super.call(this) || this;
        // 碰撞半径
        _this.hitRadius = 5;
        _this.body = new Laya.Animation();
        _this.body.loadAnimation('stoneRun.ani');
        // this.body.interval = 150;
        _this.addChild(_this.body);
        _this.x = Laya.stage.width * (position === 'left' ? 3 : 5) / 8;
        _this.y = Laya.stage.height - Player.yFromBottom;
        return _this;
        // this.showCollisionBox();
    }
    // 准备
    Player.prototype.onReady = function () {
        this.body.play(0, false, 'normal');
    };
    // 开始动
    Player.prototype.onStart = function () {
        this.body.play(0, true, 'run');
    };
    // 撞掉了
    Player.prototype.onCracked = function () {
        this.body.play(0, false, 'crack');
    };
    Player.prototype.showCollisionBox = function () {
        var r = new Laya.Sprite();
        r.alpha = 0.3;
        r.graphics.drawCircle(this.width / 2, this.height / 2, this.hitRadius, '#990000');
        this.addChild(r);
    };
    // 动画已缓存
    Player.cached = false;
    // 出生地距页底
    Player.yFromBottom = 660;
    return Player;
}(Laya.Sprite));
//# sourceMappingURL=Player.js.map