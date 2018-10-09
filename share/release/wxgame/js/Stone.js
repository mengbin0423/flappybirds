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
* 石头路障
*/
var Stone = /** @class */ (function (_super) {
    __extends(Stone, _super);
    function Stone(track, type) {
        var _this = _super.call(this) || this;
        _this.init(track, type);
        return _this;
    }
    Stone.prototype.init = function (track, type) {
        this.skin = 'main/stone_' + type + '.png';
        this.anchorX = .5;
        this.anchorY = .5;
        this.x = Laya.stage.width * (2 * track - 1) / 8;
        this.y = Laya.stage.height - Stone.yFromBottom;
        // this.hitRadius = Math.sqrt(Math.pow(this.width/2, 2) + Math.pow(this.height/2, 2));
        this.hitRadius = Math.max(this.width / 2, this.height / 2) * .9;
        // this.showCollisionBox();
    };
    Stone.prototype.move = function (step) {
        this.y += step;
    };
    Stone.prototype.showCollisionBox = function () {
        var r = new Laya.Sprite();
        r.alpha = 0.3;
        r.graphics.drawCircle(this.width / 2, this.height / 2, this.hitRadius, '#990000');
        this.addChild(r);
    };
    // 出生地距页底
    Stone.yFromBottom = 2500;
    return Stone;
}(Laya.Image));
//# sourceMappingURL=Stone.js.map