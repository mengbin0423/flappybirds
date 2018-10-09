/*
* 种子随机
*/
var SeedRandom = /** @class */ (function () {
    function SeedRandom() {
        this.seed = 0;
    }
    // 获取整数随机数
    SeedRandom.prototype.randomInt = function (min, max) {
        min = min || 0;
        max = max || 1;
        max += 1;
        var rnd = this.random();
        return Math.floor(min + rnd * (max - min));
    };
    // 获取随机数
    SeedRandom.prototype.random = function () {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    };
    return SeedRandom;
}());
//# sourceMappingURL=SeedRandom.js.map