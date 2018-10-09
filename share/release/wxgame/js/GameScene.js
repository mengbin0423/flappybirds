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
* 游戏场景
*/
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        //高亮
        _this.lightFilter = new ColorFilter([
            1, 0, 0, 0, 20,
            0, 1, 0, 0, 20,
            0, 0, 1, 0, 20,
            0, 0, 0, 1, 0,
        ]);
        // 石头缓动时长
        _this.stoneMoveTween = 50;
        _this.bestScore = 0;
        _this.mUserTable = new NetTable();
        return _this;
    }
    GameScene.prototype.onInit = function () {
        this.onResize();
        //this.registerNet();
        this.seedRandom = new SeedRandom();
        //this.processStageConfig();
        this.playerL = new Player('left');
        this.addChild(this.playerL);
        this.playerR = new Player('right');
        this.addChild(this.playerR);
        this.playerL.onReady();
        this.playerR.onReady();
        this.playerL.visible = false;
        this.playerR.visible = false;
        this.overFingerLeft.y = this.height;
        this.overFingerRight.y = this.height;
        this.overFingerLeft.visible = false;
        this.overFingerRight.visible = false;
        this.overFingerLeft.zOrder = 8;
        this.overFingerRight.zOrder = 8;
        this.bestLine.zOrder = 4;
        this.playerL.zOrder = 5;
        this.playerR.zOrder = 5;
        this.fingerLeft.zOrder = 5;
        this.fingerRight.zOrder = 5;
        this.readyLabel.zOrder = 10;
        this.scoreBox.zOrder = 10;
        this.visible = true;
        // this.readyLabel.on(Events.MOUSE_DOWN, this, this.onStart);
        this.fingerLeft.on(Events.MOUSE_DOWN, this, this.onFinger, ['left', 'down']);
        this.fingerLeft.on(Events.MOUSE_OVER, this, this.onFinger, ['left', 'down']);
        this.fingerLeft.on(Events.MOUSE_UP, this, this.onFinger, ['left', 'up']);
        this.fingerLeft.on(Events.MOUSE_OUT, this, this.onFinger, ['left', 'up']);
        this.fingerRight.on(Events.MOUSE_DOWN, this, this.onFinger, ['right', 'down']);
        this.fingerRight.on(Events.MOUSE_OVER, this, this.onFinger, ['right', 'down']);
        this.fingerRight.on(Events.MOUSE_UP, this, this.onFinger, ['right', 'up']);
        this.fingerRight.on(Events.MOUSE_OUT, this, this.onFinger, ['right', 'up']);
        //fatality
        this.fingerLeft.visible = false;
        this.fingerRight.visible = false;
        this.scoreBox.visible = false;
        this.readyLabel.visible = false;
        this.btnAgain.visible = false;
        this.btnShare.visible = false;
        this.theEnd.visible = false;
        this.btnStart.zOrder = 19;
        this.btnRank.zOrder = 19;
        this.playGuide.zOrder = 19;
        this.btnAgain.zOrder = 19;
        this.btnShare.zOrder = 19;
        this.theEnd.zOrder = 19;
        this.btnStart.on(Events.CLICK, this, this.startGame);
        this.btnStart.on(Events.MOUSE_DOWN, this, this.onBtnMouseDown, [this.btnStart]);
        this.btnStart.on(Events.MOUSE_OUT, this, this.onBtnMouseOut, [this.btnStart]);
        this.btnStart.on(Events.MOUSE_UP, this, this.onBtnMouseOut, [this.btnStart]);
        this.btnRank.on(Events.CLICK, this, this.showRank);
        this.btnRank.on(Events.MOUSE_DOWN, this, this.onBtnMouseDown, [this.btnRank]);
        this.btnRank.on(Events.MOUSE_OUT, this, this.onBtnMouseOut, [this.btnRank]);
        this.btnRank.on(Events.MOUSE_UP, this, this.onBtnMouseOut, [this.btnRank]);
        this.btnAgain.on(Events.CLICK, this, this.playAgain);
        this.btnAgain.on(Events.MOUSE_DOWN, this, this.onBtnMouseDown, [this.btnAgain]);
        this.btnAgain.on(Events.MOUSE_OUT, this, this.onBtnMouseOut, [this.btnAgain]);
        this.btnAgain.on(Events.MOUSE_UP, this, this.onBtnMouseOut, [this.btnAgain]);
        this.btnShare.on(Events.CLICK, this, this.onShare);
        this.btnShare.on(Events.MOUSE_DOWN, this, this.onBtnMouseDown, [this.btnShare]);
        this.btnShare.on(Events.MOUSE_OUT, this, this.onBtnMouseOut, [this.btnShare]);
        this.btnShare.on(Events.MOUSE_UP, this, this.onBtnMouseOut, [this.btnShare]);
        console.log("here..");
        if (Laya.Browser.onMiniGame == true) {
            var wx = new wxMinPro();
            wx.initWX();
        }
    };
    GameScene.prototype.playAgain = function () {
        this.btnAgain.visible = false;
        this.btnShare.visible = false;
        this.theEnd.visible = false;
        this.processStageConfig();
        this.onStart();
    };
    GameScene.prototype.onShare = function () {
    };
    GameScene.prototype.startGame = function () {
        this.playerL.visible = true;
        this.playerR.visible = true;
        this.btnStart.visible = false;
        this.btnRank.visible = false;
        Laya.Tween.to(this.playGuide, { y: -500, alpha: 0 }, 2000, Laya.Ease.expoOut, Laya.Handler.create(this, this.onStart));
        this.processStageConfig();
    };
    GameScene.prototype.showRank = function () {
    };
    GameScene.prototype.onBtnMouseDown = function (btn) {
        btn.scale(1.02, 1.02, true);
        btn.filters = [this.lightFilter];
    };
    GameScene.prototype.onBtnMouseOut = function (btn) {
        btn.scale(1.0, 1.0, true);
        btn.filters = [];
    };
    // 处理关卡配置
    GameScene.prototype.processStageConfig = function () {
        var _this = this;
        this.stageData = [];
        var s = Laya.loader.getRes('main/stage.json');
        this.meterPerFrame = parseFloat(s['meterPerFrame']);
        this.pixelPerMeter = parseFloat(s['pixelPerMeter']);
        this.pixelPerFrame = this.meterPerFrame * this.pixelPerMeter;
        s['stages'].forEach(function (one) {
            var oneLevel = one.split(';');
            var stoneDistances = oneLevel[3].split(',');
            var percents = [];
            for (var i = 0; i < stoneDistances.length; i += 2) {
                percents.push({
                    distance: parseFloat(stoneDistances[i]),
                    percent: parseFloat(stoneDistances[i + 1])
                });
            }
            var result = {
                level: parseInt(oneLevel[0]),
                distance: parseFloat(oneLevel[1]),
                speed: parseFloat(oneLevel[2]),
                percents: percents
            };
            _this.stageData.push(result);
        });
        console.log(this.stageData);
    };
    // 游戏开始
    GameScene.prototype.onStart = function () {
        Laya.SoundManager.playMusic('sounds/BGM_InGame.mp3');
        this.distance = 0;
        this.score = 0;
        this.scoreLabel.text = '0m';
        this.nextDis = 0;
        this.level = 1;
        this.playerSpeed = 0;
        this.playerL.x = this.width * 3 / 8;
        this.playerR.x = this.width * 5 / 8;
        this.playerL.onStart();
        this.playerR.onStart();
        this.fingerLeft.visible = true;
        this.fingerRight.visible = true;
        this.overFingerLeft.visible = false;
        this.overFingerRight.visible = false;
        // 显示最佳纪录线
        if (this.bestScore > 0) {
            this.bestLine.visible = true;
            this.bestLine.y = this.height - Player.yFromBottom - (this.bestScore * this.pixelPerMeter);
        }
        else {
            this.bestLine.visible = false;
        }
        // 用房间号做随机数种子
        this.seedRandom.seed = config.mRoomID;
        // console.log('房间号', config.mRoomID);
        this.clearStones();
        this.readyLabel.visible = false;
        this.playGuide.visible = false;
        // Laya.timer.loop(1000/60, this, this.onLoop, null, true, true);
        Laya.timer.frameLoop(1, this, this.onLoop);
        this.isPlaying = true;
    };
    // 清除石头障碍
    GameScene.prototype.clearStones = function () {
        if (this.stones) {
            this.stones.forEach(function (one) {
                one.destroy();
            });
        }
        this.stones = [];
    };
    // 游戏结束
    GameScene.prototype.onStop = function () {
        var _this = this;
        // Laya.SoundManager.playSound('sounds/SE_Break.mp3');
        if (!this.isPlaying) {
            return;
        }
        Laya.SoundManager.stopMusic();
        Laya.SoundManager.playSound('sounds/SE_GameOver.mp3');
        Laya.timer.once(2000, this, function () {
            Laya.SoundManager.playMusic('sounds/BGM_Result.mp3');
        });
        Laya.Tween.clearAll(this.playerL);
        Laya.Tween.clearAll(this.playerR);
        this.isPlaying = false;
        console.log('结束');
        this.bestScore = Math.max(this.score, this.bestScore);
        this.fingerLeft.visible = false;
        this.fingerRight.visible = false;
        this.overFingerLeft.visible = true;
        this.overFingerRight.visible = true;
        this.overFingerLeft.play(0, false);
        this.overFingerRight.play(0, false);
        Laya.timer.clear(this, this.onLoop);
        Laya.timer.once(2000, this, function () {
            _this.btnAgain.visible = true;
            _this.btnShare.visible = true;
            _this.theEnd.visible = true;
        });
    };
    // 手指事件处理
    GameScene.prototype.onFinger = function (leftright, updown) {
        if (!this.isPlaying) {
            return;
        }
        var stone = leftright === 'left' ? this.playerL : this.playerR;
        var td = (updown === 'down' ? 1 : 3);
        var x = (leftright === 'left' ? td : (8 - td)) / 8 * this.width;
        Laya.Tween.to(stone, { x: x }, this.stoneMoveTween, null, null, 0, false);
    };
    // 主循环
    GameScene.prototype.onLoop = function () {
        this.updateLevel();
        this.checkHit();
        this.stoneCreate();
        this.stoneStep();
        this.bgStep();
        this.bestLineStep();
        this.distance += this.playerSpeed * this.meterPerFrame;
        var score = Math.floor(this.distance);
        if (score > this.score) {
            this.score = score;
            this.scoreLabel.text = this.score + 'm';
        }
    };
    // 检测碰撞
    GameScene.prototype.checkHit = function () {
        var _this = this;
        var over = false;
        var isCrackedL = false;
        var isCrackedR = false;
        this.stones.forEach(function (one) {
            if (_this.checkOneHit(_this.playerL, one)) {
                over = true;
                isCrackedL = true;
                _this.playerL.onCracked();
            }
            if (_this.checkOneHit(_this.playerR, one)) {
                over = true;
                isCrackedR = true;
                _this.playerR.onCracked();
            }
        });
        if (!isCrackedL && !isCrackedR) {
            return;
        }
        if (isCrackedL) {
            this.playerL.onCracked();
        }
        else {
            this.playerL.onReady();
        }
        if (isCrackedR) {
            this.playerR.onCracked();
        }
        else {
            this.playerR.onReady();
        }
        this.onStop();
    };
    // 计算单对碰撞
    GameScene.prototype.checkOneHit = function (pl, st) {
        if (Math.abs(pl.x - st.x) > st.hitRadius || Math.abs(pl.y - st.y) > st.hitRadius) {
            return false;
        }
        if (this.calcDistance(pl, st) <= st.hitRadius) {
            return true;
        }
        return false;
    };
    // 计算距离
    GameScene.prototype.calcDistance = function (sp1, sp2) {
        return Math.sqrt(Math.pow(sp1.x - sp2.x, 2) + Math.pow(sp1.y - sp2.y, 2));
    };
    // 生成石头
    GameScene.prototype.stoneCreate = function () {
        if (this.distance >= this.nextDis) {
            var stoneL = new Stone(this.seedRandom.randomInt(1, 2), this.seedRandom.randomInt(1, 3));
            this.addChild(stoneL);
            this.stones.push(stoneL);
            var stoneR = new Stone(this.seedRandom.randomInt(3, 4), this.seedRandom.randomInt(1, 3));
            this.addChild(stoneR);
            this.stones.push(stoneR);
            var rand = this.seedRandom.random();
            var totalPercent = 0.0;
            var percents = this.stageData[this.level - 1]['percents'];
            for (var i = 0; i < percents.length; i++) {
                totalPercent += percents[i]['percent'];
                if (rand <= totalPercent) {
                    this.nextDis += percents[i]['distance'] / this.pixelPerMeter;
                    // console.log('下一个石头', this.nextDis);
                    break;
                }
            }
        }
    };
    // 更新等级
    GameScene.prototype.updateLevel = function () {
        if (this.playerSpeed == 0) {
            this.level = 1;
            this.playerSpeed = this.stageData[this.level - 1]['speed'];
        }
        if (this.stageData[this.level] === undefined) {
            return;
        }
        if (this.distance >= this.stageData[this.level]['distance']) {
            this.playerSpeed = this.stageData[this.level]['speed'];
            this.level++;
        }
    };
    // 石头移动 石头销毁
    GameScene.prototype.stoneStep = function () {
        var _this = this;
        this.stones = this.stones.filter(function (one) {
            one.move(_this.playerSpeed * _this.pixelPerFrame);
            if (_this.isOutsideWindow(one)) {
                one.destroy();
                return false;
            }
            return true;
        });
    };
    // 背景移动
    GameScene.prototype.bgStep = function () {
        this.bg1.y += this.playerSpeed * this.pixelPerFrame;
        this.bg2.y += this.playerSpeed * this.pixelPerFrame;
        this.bg3.y += this.playerSpeed * this.pixelPerFrame;
        if (this.isOutsideWindow(this.bg3)) {
            this.bg3.y -= 3 * 1920;
        }
        if (this.isOutsideWindow(this.bg2)) {
            this.bg2.y -= 3 * 1920;
        }
        if (this.isOutsideWindow(this.bg1)) {
            this.bg1.y -= 3 * 1920;
        }
    };
    // 最佳纪录移动
    GameScene.prototype.bestLineStep = function () {
        this.bestLine.y += this.playerSpeed * this.pixelPerFrame;
    };
    GameScene.prototype.isOutsideWindow = function (sprite) {
        return sprite.y > this.height + 100;
    };
    GameScene.prototype.onResize = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.pos(0, 0, true);
        console.log("Set mGame width = " + this.width + " , height = " + this.height);
    };
    GameScene.prototype.getUserString = function (uid, key) {
        for (var row = 1; row <= this.mUserTable.rowCount(); ++row) {
            if (uid == this.mUserTable.getLong(row, "uid")) {
                return this.mUserTable.getString(row, key);
            }
        }
        return "";
    };
    GameScene.prototype.getUserNumber = function (uid, key) {
        for (var row = 1; row <= this.mUserTable.rowCount(); ++row) {
            if (uid == this.mUserTable.getLong(row, "uid")) {
                return this.mUserTable.getLong(row, key);
            }
        }
        return 0;
    };
    GameScene.prototype.initUser = function (user) {
        this.mUserTable = user;
        for (var row = 1; row <= user.rowCount(); ++row) {
            var src_name = user.getString(row, "name");
            if (GameMain.app.isBase64(src_name)) {
                user.setString(row, "name", base64.Base64.decode(src_name));
            }
            var src_face = user.getString(row, "face");
            if (GameMain.app.isBase64(src_face)) {
                user.setString(row, "face", base64.Base64.decode(src_face));
            }
        }
        user.printTable();
        for (var row = 1; row <= user.rowCount(); ++row) {
            var uid = user.getLong(row, "uid");
            console.log(user.getString(row, "face"));
            user.setString(row, "face", user.getString(row, "face").replace("http://", "https://"));
            if (uid == config.uid) {
                // 自己
                // console.log("设置自己头像" + user.getString(row , "face")) ;
                // console.log("设置自己名称" + user.getString(row , "name")) ;
                this.bestScore = user.getLong(row, "score");
            }
            else {
                // 对方
                // console.log("设置对手头像" + user.getString(row , "face")) ;
                // console.log("设置对手名称" + user.getString(row , "name")) ;
                config.rivalUid = uid;
                this.rivalUid = user.getLong(row, "uid");
            }
        }
        if (user.rowCount() == 1) {
            console.log("等待用户进入...");
        }
        else {
            console.log("用户全部进入");
        }
    };
    return GameScene;
}(ui.gameUI));
//# sourceMappingURL=GameScene.js.map