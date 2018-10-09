var netCore = /** @class */ (function () {
    function netCore() {
        this.mSession = 0;
        this.mToken = "";
        this.mLastUpdate = 0;
        this.mLastCall = 0;
        this.onOpen = null;
        this.onClose = null;
        this.onError = null;
        this.onDeal = null;
        this.onMask = null;
        this.mLock = false;
        this.mMessage = [];
        this.mConnect = false;
    }
    netCore.prototype.init = function (open, close, error, deal, mask) {
        if (mask === void 0) { mask = null; }
        this.socket = new Laya.Socket();
        this.mSession = 1;
        this.onOpen = open;
        this.onError = error;
        this.onClose = close;
        this.onDeal = deal;
        this.onMask = mask;
    };
    netCore.prototype.connect = function (ip, port) {
        this.socket.connect(ip, port);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    };
    netCore.prototype.connectWSS = function (url) {
        this.socket.connectByUrl(url);
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
    };
    netCore.prototype.reConnect = function (ip, port) {
        this.mMessage = [];
        if (port == 0) {
            this.socket.connectByUrl(ip);
        }
        else {
            this.socket.connect(ip, port);
        }
    };
    netCore.prototype.onStar = function () {
        console.log("star deal message");
        this.mLock = false;
        Laya.timer.loop(100, this, this.dealMessage);
    };
    netCore.prototype.onStop = function () {
        console.log("stop deal message");
        this.mLock = true;
        Laya.timer.clear(this, this.dealMessage);
    };
    netCore.prototype.onSocketOpen = function () {
        console.log("连接成功");
        this.mConnect = true;
        this.output = this.socket.output;
        if (this.onOpen != null)
            this.onOpen.run();
        this.onStar();
        var date = new Date();
        this.mLastUpdate = date.getTime();
        Laya.timer.loop(5000, this, this.keepLive);
    };
    //报活，5分钟一次
    netCore.prototype.keepLive = function () {
        if (this.socket.connected == false) {
            this.testclose();
            return;
        }
        var date = new Date();
        if (this.mLastUpdate + 2 * 60 * 1000 <= date.getTime()) {
            var message = this.createMessage();
            message.addCmd(0x00000999);
            message.addLong(1);
            this.postMessage(message);
        }
    };
    netCore.prototype.onSocketClose = function () {
        this.mConnect = false;
        this.onStop();
        Laya.timer.clear(this, this.keepLive);
        if (this.onClose != null)
            this.onClose.run();
        console.log("连接关闭");
    };
    netCore.prototype.onMessageReveived = function (message) {
        if (typeof message == "string") {
            console.log(message);
        }
        else if (message instanceof ArrayBuffer) {
            var msg = new NetMessage();
            var bufs = new Laya.Byte(message);
            bufs.endian = Laya.Socket.BIG_ENDIAN;
            msg.decodec(bufs);
            bufs.clear();
            this.socket.input.clear();
            this.mMessage.push(msg);
            var date = new Date();
            this.mLastUpdate = date.getTime();
        }
        this.socket.input.clear();
    };
    netCore.prototype.onConnectError = function () {
        this.mConnect = false;
        if (this.onError != null) {
            this.onError.args = ["网络连接失败"];
            this.onError.run();
        }
    };
    netCore.prototype.setSession = function (value) {
        this.mSession = value;
    };
    netCore.prototype.createMessage = function () {
        var message = new NetMessage();
        message.setSession(this.mSession);
        return message;
    };
    netCore.prototype.postMessage = function (message) {
        if (this.mConnect == true) {
            var bufs = message.encodec(this.mSession);
            this.output.writeArrayBuffer(bufs.buffer, 0, bufs.buffer.byteLength);
            this.socket.flush();
            message.clear();
            var date = new Date();
            this.mLastUpdate = date.getTime();
            return true;
        }
        else {
            this.testclose();
        }
        return false;
    };
    netCore.prototype.rpc = function (message) {
        //显示mask挡住所有输入
        this.mLastCall = message.getCmd();
        if (this.onMask != null) {
            this.onMask.args = [true];
            this.onMask.run();
        }
        return this.postMessage(message);
    };
    netCore.prototype.dealMessage = function () {
        if (this.socket.connected == false)
            return;
        if (this.mLock == true)
            return;
        if (this.mMessage.length <= 0)
            return;
        var message = this.mMessage.shift();
        if (this.onDeal != null) {
            this.onDeal.args = [message];
            this.onDeal.run();
        }
        if (this.mLastCall > 0) {
            if (this.mLastCall + 0x1000 == message.getCmd()) {
                if (this.onMask != null) {
                    this.onMask.args = [false];
                    this.onMask.run();
                }
            }
        }
        message.clear();
    };
    netCore.prototype.close = function () {
        if (this.onError != null)
            this.onError.clear();
        if (this.onDeal != null)
            this.onDeal.clear();
        if (this.onMask != null)
            this.onMask.clear();
        Laya.timer.clearAll(this);
        this.socket.off(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.off(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.off(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.off(Laya.Event.ERROR, this, this.onConnectError);
        this.socket.close();
    };
    netCore.prototype.testclose = function () {
        this.socket.close();
        this.onSocketClose();
    };
    return netCore;
}());
//# sourceMappingURL=netCore.js.map