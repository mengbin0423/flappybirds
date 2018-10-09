/*
* name;
*/
var js_call = /** @class */ (function () {
    function js_call() {
        this.bInitIsOK = false;
        this.gm = null;
    }
    js_call.prototype.setGameMain = function (gm) {
        this.gm = gm;
    };
    js_call.prototype.onRegistInit = function () {
        var signature = "";
        var apilists = ["closePage", "userPage", "gameReady", "showAppBtn", "onKeyDown",
            "downloadSound", "playSound", "onBackBtn", "setMic", "onAgain",
            "closeAgain", "createText", "getAppKey"];
        if (Laya.Browser.onPC) {
            this.bInitIsOK = false;
            return;
        }
        var ret = wz.onInit({ "appid": config.mAPPID, "signature": signature, "apilists": apilists });
        if (ret == null) {
            this.gameReady(1, "初始化失败");
            this.bInitIsOK = false;
            return;
        }
        if (Number(ret['code']) != 0) {
            this.gameReady(1, "初始化返回失败");
            this.bInitIsOK = false;
        }
        else {
            this.bInitIsOK = true;
            this.onBackBtn();
            this.onKeyDown();
            this.showAppBtn();
        }
    };
    js_call.prototype.closePage = function (gold, error) {
        if (gold === void 0) { gold = 0; }
        if (error === void 0) { error = ""; }
        if (this.bInitIsOK == false)
            return;
    };
    js_call.prototype.userPage = function (openid) {
        if (this.bInitIsOK == false)
            return;
        var callParam = { "appid": config.mAPPID, "id": openid };
        wz.userPage(callParam);
    };
    js_call.prototype.gameReady = function (code, Error) {
        if (code === void 0) { code = 0; }
        if (Error === void 0) { Error = ""; }
        if (this.bInitIsOK == false)
            return;
        if (Laya.Browser.onPC) {
            this.bInitIsOK = false;
            return;
        }
        wz.gameReady({ "appid": config.mAPPID, "code": code, "error": Error });
    };
    js_call.prototype.showAppBtn = function () {
        if (this.bInitIsOK == false)
            return;
        var callParam = { "appid": config.mAPPID, "return": 0, "mic": 1, "voice": 1, "effect": 1, "emoji": 1, "gifts": 0 };
        wz.showAppBtn(callParam);
    };
    js_call.prototype.onKeyDown = function () {
        if (this.bInitIsOK == false)
            return;
        var app = this;
        wz.onKeyDown(function (json) {
            alert("onKeyDownCallBack:" + json);
        });
    };
    js_call.prototype.downloadSound = function (urlarray) {
        if (this.bInitIsOK == false)
            return;
        var param = {
            "appid": config.mAPPID,
            "domain": util.getCDNUrl(),
            "url": urlarray
        };
        wz.downloadSound(param);
        return;
    };
    js_call.prototype.playSound = function (url, filename) {
        if (filename === void 0) { filename = ""; }
        if (this.bInitIsOK == false)
            return;
        wz.playSound({ "appid": config.mAPPID, "url": url, "filename": filename });
    };
    js_call.prototype.onBackBtn = function () {
        if (this.bInitIsOK == false)
            return;
        var app = this;
    };
    js_call.prototype.onAgain = function (bJump) {
        if (this.bInitIsOK == false)
            return;
        var param = { "appid": config.mAPPID,
            "win": 1,
            "session": 2232321,
            "resultShowType": 2,
            "gameScore": 0,
            "gameShowInfo1": "",
            "gameShowInfo2": "",
            "roomid": config.mRoomID,
            "gamename": "名字",
            "gametip": "",
            "requestagain": 1,
            "agreeagain": 0,
            "changegame": 0,
            "jump": bJump
        };
        var app = this;
        wz.onAgain(param, function (data) {
            var datas = JSON.parse(data);
            if (datas.changegame == 1) {
                app.closePage();
            }
            else if (datas.requestagain == 1) {
                app.gm.cNet.send_StartGame();
            }
            else if (datas.agreeagain == 1) {
                app.gm.cNet.send_StartGame();
            }
        });
    };
    js_call.prototype.closeAgain = function () {
        if (this.bInitIsOK == false)
            return;
        wz.closeAgain({ "appid": config.mAPPID });
    };
    js_call.prototype.createText = function (name, size, color) {
        if (this.bInitIsOK == false)
            return;
        var ret = wz.createText({ "appid": config.mAPPID, "name": name, "size": size, "color": color });
        if (ret == null) {
            return "";
        }
        var datas = JSON.parse(ret);
        return datas['address'];
    };
    js_call.prototype.getAppKey = function () {
        if (this.bInitIsOK == false)
            return 0;
        var ret = wz.getAppKey({ "appid": config.mAPPID });
        if (ret == null) {
            return 0;
        }
        var datas = JSON.parse(ret);
        return Number(datas['key']);
    };
    return js_call;
}());
//# sourceMappingURL=js_call.js.map