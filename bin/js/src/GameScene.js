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
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.seed = 1;
        _this.speed = 2;
        _this.score = 0;
        _this.nextDis = 0;
        _this.isPlaying = false;
        _this.yspeed = 0; //下落速度
        _this.g = 0.98; //重力加速度
        return _this;
    }
    GameScene.prototype.onInit = function () {
        this.onResize();
        this.btnReplay.on(Laya.Event.CLICK, this, this.replay);
        this.guide.on(Laya.Event.CLICK, this, this.starGame);
        this.initGame();
        this.nextFriend.visible = false;
        // this.videoRevive.visible = false;
        this.nouse.visible = false;
        this.invincible.visible = false;
        this.jumpNow.visible = false;
        this.currentResult.visible = false;
        this.currentBg.visible = false;
        this.jumpNow.on(Events.CLICK, this, this.onJumpoff);
        this.nouseBtn.on(Events.CLICK, this, this.onInvincible);
    };
    GameScene.prototype.starGame = function () {
        this.seed = 10;
        this.guide.visible = false;
        this.btnReplay.visible = false;
        this.isPlaying = true;
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        Laya.timer.frameLoop(1, this, this.loop);
    };
    GameScene.prototype.replay = function () {
        var _this = this;
        this.btnReplay.visible = false;
        this.bird.visible = true;
        this.bird.pos(60, (1334 - 292) / 2);
        this.bird.playAction("2");
        this.timer.once(3000, this, function () {
            _this.isPlaying = true;
            _this.bird.rotation = 0;
            Laya.stage.on(Laya.Event.CLICK, _this, _this.onClick);
            Laya.timer.frameLoop(1, _this, _this.loop);
        });
    };
    GameScene.prototype.initGame = function () {
        //战场固定高度
        //1134 - 292
        for (var i = 0; i < this.game._childs.length; i++) {
            var item = this.game._childs[i];
            if (item != null) {
                item.visible = false;
                item.removeSelf();
                Laya.Pool.recover(item.name, item);
            }
        }
        this.mScore.visible = true;
        this.mScore.text = "0";
        this.score = 0;
        this.speed = 2;
        this.nextDis = 300;
        this.game.pos(0, 0);
        this.btnReplay.visible = false;
        this.updateLevel();
        this.stoneCreate();
        //初始化角色
        if (this.bird == null) {
            this.bird = new Bird("2"); //有3个外形的小鸟， 0 1 2
            this.bird.zOrder = 3;
            Laya.stage.addChild(this.bird);
        }
        this.bird.pos(60, (1334 - 292) / 2);
        this.bird.visible = true;
    };
    GameScene.prototype.onClick = function () {
        if (this.isPlaying == false)
            return;
        this.yspeed = -12; //向上蹦多少
        this.bird.rotation = -45; //向上旋转一下
        Laya.SoundManager.playSound("sound/sfx_wing.wav", 1);
    };
    // 获取整数随机数
    GameScene.prototype.randomInt = function (min, max) {
        min = min || 0;
        max = max || 1;
        max += 1;
        var rnd = this.random();
        return Math.floor(min + rnd * (max - min));
    };
    // 获取随机数
    GameScene.prototype.random = function () {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    };
    GameScene.prototype.loop = function () {
        this.updateBird();
        this.moveLand();
        this.updateLevel();
        this.stoneCreate();
        this.stoneStep();
        this.hitCheck();
        this.score = Math.floor(-this.game.x / 200);
        this.mScore.changeText(this.score + "米");
        GameMain.app.mScore = this.score;
    };
    GameScene.prototype.updateBird = function () {
        this.bird.y += this.yspeed;
        this.yspeed += this.g;
        //旋转主角
        if (this.bird.rotation <= 45) {
            this.bird.rotation += 3;
        }
    };
    GameScene.prototype.updateLevel = function () {
    };
    GameScene.prototype.stoneCreate = function () {
        while (true) {
            if (this.game.x + this.nextDis < 850) {
                var yy1 = this.randomInt(160, 260);
                var yy2 = this.randomInt(160, 320);
                var item = Laya.Pool.getItemByClass("item_down", Laya.Sprite);
                item.loadImage("bird/pipe_down.png");
                item.scale(2, 2);
                item.name = "item_down";
                item.pos(this.nextDis, yy1 * 2 - 640);
                this.game.addChild(item);
                var item2 = Laya.Pool.getItemByClass("item_up", Laya.Sprite);
                item2.loadImage("bird/pipe_up.png");
                item2.scale(2, 2);
                item2.name = "item_up";
                item2.pos(this.nextDis, yy1 * 2 + yy2);
                this.game.addChild(item2);
                this.nextDis += 320;
            }
            else
                break;
        }
    };
    GameScene.prototype.stoneStep = function () {
        this.game.x -= this.speed;
        for (var i = 0; i < this.game._childs.length; i++) {
            var sp = this.game._childs[i];
            if (sp != null && (sp.name == "item_down" || sp.name == "item_up")) {
                if (sp.x + 120 <= 0) {
                    sp.removeSelf();
                    sp.visible = false;
                    Laya.Pool.recover(sp.name, sp);
                }
            }
        }
    };
    GameScene.prototype.hitCheck = function () {
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
        for (var i = 0; i < this.game._childs.length; i++) {
            var sp = this.game._childs[i];
            if (sp != null && (sp.name == "item_down" || sp.name == "item_up")) {
                if (Math.abs(this.game.x) + 60 + 32 >= sp.x && Math.abs(this.game.x) + 60 - 32 <= sp.x + 104) {
                    if (sp.name == "item_down") {
                        if (this.bird.y < 640 + sp.y) {
                            this.onStop();
                            return;
                        }
                    }
                    if (sp.name == "item_up") {
                        if (this.bird.y > sp.y) {
                            this.onStop();
                            return;
                        }
                    }
                }
            }
        }
    };
    GameScene.prototype.onStop = function () {
        Laya.stage.off(Laya.Event.CLICK, this, this.onClick);
        Laya.timer.clear(this, this.loop);
        this.bird.stopAction();
        this.isPlaying = false;
        this.btnReplay.visible = false;
        Laya.timer.once(2000, this, this.showCurrentScore);
    };
    GameScene.prototype.showCurrentScore = function () {
        GameMain.app.mWX.reportMark(Number(this.score));
        GameMain.app.mWX.updateCards();
        console.log(GameMain.app.mWX.mCards);
        this.cards.text = 'x' + GameMain.app.mWX.mCards;
        if (GameMain.app.mWX.mCards <= 0) {
            this.nouseBtn.skin = 'res/btn_nocards.png';
        }
        if (GameMain.app.mUseCards) {
            this.onJumpoff();
        }
        else {
            this.currentBg.visible = true;
            this.currentResult.visible = true;
            this.jumpNow.visible = true;
            this.curentScore.text = this.score + "米";
            this.currentResult.zOrder = 99;
            this.jumpNow.zOrder = 99;
            this.currentBg.zOrder = 99;
        }
    };
    GameScene.prototype.moveLand = function () {
        this.s1.x -= this.speed;
        this.s2.x -= this.speed;
        this.s3.x -= this.speed;
        this.s4.x -= this.speed;
        if (this.s1.x <= -336)
            this.s1.x = 1008;
        if (this.s2.x <= -336)
            this.s2.x = 1008;
        if (this.s3.x <= -336)
            this.s3.x = 1008;
        if (this.s4.x <= -336)
            this.s4.x = 1008;
    };
    GameScene.prototype.onResize = function () {
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
        this.s1.height = this.height - (1334 - 292);
        this.s2.height = this.height - (1334 - 292);
        this.s3.height = this.height - (1334 - 292);
        this.s4.height = this.height - (1334 - 292);
        this.land.zOrder = 10;
        this.land.y = this.height - this.s1.height;
    };
    GameScene.prototype.onJumpoff = function () {
        this.bird.visible = false;
        if (mainInst.mGameresult == null) {
            mainInst.mGameresult = new GameResult();
            Laya.stage.addChild(mainInst.mGameresult);
        }
        else {
            mainInst.mGameresult.visible = true;
        }
        GameMain.app.mUseCards = false;
        mainInst.mWX.queryCards();
        this.stage.removeChild(this);
    };
    GameScene.prototype.onInvincible = function () {
        GameMain.app.mWX.updateCards();
        if (mainInst.mWX.mCards > 0) {
            GameMain.app.mUseCards = true;
            this.currentBg.visible = false;
            this.currentResult.visible = false;
            this.jumpNow.visible = false;
            this.replay();
        }
        else {
            // this.onJumpoff();
            wx.showToast({
                title: '您没有卡',
                icon: 'success',
                duration: 2000
            });
        }
    };
    return GameScene;
}(ui.mainUI));
//# sourceMappingURL=GameScene.js.map