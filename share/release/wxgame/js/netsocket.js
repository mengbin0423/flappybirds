/*
* name;
*/
var netsocket = /** @class */ (function () {
    function netsocket() {
        this.net = null;
        this.mURL = "";
        this.gm = null;
        this.mReConnectCount = 0;
        this.mAutoConnect = false; // 断线后是否自动重连。
        this.mCallReadyJs = false;
        this.RPC_JOINROOM = 0x00001501; // 登陆
        this.RPC_JOINROOMWEB = 0x00001502; // 登陆
        this.RPC_SET_VALUE = 0x00001100; // 设置游戏需要服务器记录的值
        this.RPC_GET_VALUE = 0x00001101; // 读取游戏在服务器上记录的值
        this.RPC_CLS_VALUE_ALL = 0x00001102; // 清除所有游戏在服务器上记录的值
        this.RPC_SEND_MESSAGE = 0x00001103; // 通过服务器转发消息给其他客户端
        this.RPC_SCORE = 0x00001104; // 报告记录游戏当前分数
        this.RPC_END_GAME = 0x00001105; // 报告游戏结束
        this.RPC_START_GAME = 0x00001106; // 报告游戏开始
        this.PUSH_PLAY_JOINROOM = 0x10000001; // 玩家进入
        this.PUSH_PLAY_ONLINE = 0x10000002; // 断线重连
        this.PUSH_PLAY_OUTLINE = 0x10000003; // 断线
        this.PUSH_GAME_START = 0x10000004; // 游戏开始
        this.PUSH_MATCHING = 0x10000005; // 等待匹配用户中
    }
    netsocket.prototype.setGameMain = function (gm) {
        this.gm = gm;
    };
    netsocket.prototype.onConnect = function (url) {
        console.log("开始链接网络." + url);
        this.mURL = url;
        this.net = new netCore();
        this.net.init(Laya.Handler.create(this, this.loginGame, null, false), Laya.Handler.create(this, this.dealClose, null, false), Laya.Handler.create(this, this.errorMess, null, false), Laya.Handler.create(this, this.dealMessage, null, false), Laya.Handler.create(this, this.showMask, null, false));
        this.net.connectWSS(this.mURL);
        // this.net.connect("127.0.0.1",7201) ;
    };
    netsocket.prototype.onClose = function () {
        if (this.net != null) {
            this.net.close();
        }
        delete this.net;
        this.net = null;
    };
    netsocket.prototype.StartMessage = function () {
        if (this.net != null) {
            this.net.onStar();
        }
    };
    netsocket.prototype.StopMessage = function () {
        if (this.net != null) {
            this.net.onStop();
        }
    };
    netsocket.prototype.loginGame = function () {
        console.log("连接游戏服务器成功");
        var loginmess = util.initMessage(0x00000501, config.uid, config.mRoomID, config.mSession);
        this.net.postMessage(loginmess);
    };
    netsocket.prototype.quitErrAppGame = function (err) {
        if (!this.mCallReadyJs) {
            config.cJS.gameReady(1, err);
            this.mCallReadyJs = true;
        }
        else {
            config.cJS.closePage(1, err);
        }
        alert(err);
    };
    netsocket.prototype.readyOK = function () {
        config.cJS.gameReady();
        this.mCallReadyJs = true;
    };
    netsocket.prototype.dealClose = function () {
        if (this.mAutoConnect) {
            this.mReConnectCount += 1;
            console.log("网络中断 ， 正在重连 -- " + this.mReConnectCount + " : " + this.mURL);
            if (this.mReConnectCount < 5) {
                Laya.timer.once(1000, this.net, this.net.reConnect, [this.mURL, 0]);
                console.log("您已经断线,正在重连...");
            }
            else {
                this.quitErrAppGame("网络链接中断");
            }
        }
        else {
            console.log("网络中断");
            this.quitErrAppGame("服务器连接失败,请退出重进");
        }
    };
    netsocket.prototype.errorMess = function (errMess) {
        console.log(errMess);
        this.quitErrAppGame("服务器连接失败,请检查网络");
    };
    netsocket.prototype.dealMessage = function (message) {
        var cmd = message.getCmd();
        console.log("cmd : " + cmd.toString(16));
        if (cmd == this.RPC_JOINROOM)
            this.rpc_onLogin(message);
        else if (cmd == this.RPC_JOINROOMWEB)
            this.rpc_onLogin(message);
        else if (cmd == this.RPC_SET_VALUE)
            this.rpc_SetValue(message); // 设置游戏需要服务器记录的值
        else if (cmd == this.RPC_GET_VALUE)
            this.rpc_GetValue(message); // 读取游戏在服务器上记录的值
        else if (cmd == this.RPC_CLS_VALUE_ALL)
            this.rpc_ClsValue_all(message); // 清除所有游戏在服务器上记录的值
        else if (cmd == this.RPC_SEND_MESSAGE)
            this.rpc_Send_Message(message); // 通过服务器转发消息给其他客户端
        else if (cmd == this.RPC_SCORE)
            this.rpc_Score(message); // 报告记录游戏当前分数
        else if (cmd == this.RPC_END_GAME)
            this.rpc_EndGame(message); // 报告游戏结束
        else if (cmd == this.RPC_START_GAME)
            this.rpc_StateGame(message); // 报告游戏开始
        else if (cmd == this.PUSH_PLAY_JOINROOM)
            this.push_JoinRoom(message);
        else if (cmd == this.PUSH_PLAY_OUTLINE)
            this.push_onLine(message, 0);
        else if (cmd == this.PUSH_PLAY_ONLINE)
            this.push_onLine(message, 1);
        else if (cmd == this.PUSH_GAME_START)
            this.push_GameStart(message);
        else if (cmd == this.PUSH_MATCHING)
            this.push_Matching(message);
    };
    // rpc 调用是否显示mask遮挡，这里自己显示mask层（收到需要的消息后需要去掉mask层，保证游戏继续）
    netsocket.prototype.showMask = function () {
    };
    netsocket.prototype.errorCode = function (code) {
        var errStr = "";
        if (code == 200001)
            errStr = "服务器维护中";
        else if (code == 200002)
            errStr = "数据库操作失败";
        else if (code == 200004)
            errStr = "没有此游戏配置";
        else if (code == 200005)
            errStr = "APPID 不匹配";
        else if (code == 300001)
            errStr = "Session错误";
        else if (code == 300002)
            errStr = "用户不存在";
        else if (code == 300003)
            errStr = "校验sign失败";
        else if (code == 300004)
            errStr = "超出房间人数上限";
        else if (code == 300005)
            errStr = "房间不存在";
        else if (code == 300006)
            errStr = "网络链接中断";
        else if (code == 300007)
            errStr = "没有此Key值";
        else if (code == 300008)
            errStr = "游戏已经开始";
        else if (code == 300009)
            errStr = "游戏还未开始";
        return errStr;
    };
    netsocket.prototype.rpc_onLogin = function (message) {
        this.mReConnectCount = 0;
        this.mAutoConnect = false;
        var code = message.getLong();
        if (code == 0) {
            this.net.setSession(config.mSession);
            this.mAutoConnect = true; // 登录房间成功,断线开启自动重连.
            console.log("GameServer onLogin is ok ");
            var nowState = message.getLong();
            GameMain.app.setServerTime(message.getLong());
            config.mRoomID = message.getLong();
            var userTable = message.getTable(); // 用户列表
            var ruleTable = message.getTable(); // 房间规则
            var dataTable = message.getTable(); // 自己提交的需要服务器记录的值
            console.log("当前房间ID = " + config.mRoomID);
            this.gm.initUser(userTable);
            // this.gm.showGame() ;
        }
        else {
            this.net.close();
            var errStr = this.errorCode(code);
            console.log("GameServer onLogin is error : " + code + " , error = " + errStr);
            config.cJS.closePage(0, errStr);
        }
        message.clear();
    };
    // 主动发送消息的响应
    netsocket.prototype.rpc_SetValue = function (message) {
        var code = message.getLong();
        if (code == 0) {
            console.log("↓ 设置成功");
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_SetValue is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_GetValue = function (message) {
        var code = message.getLong();
        if (code == 0) {
            var key = message.getString();
            var value = message.getString();
            console.log("↓ 读取Key = " + key + " , value = " + value);
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_GetValue is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_ClsValue_all = function (message) {
        var code = message.getLong();
        if (code == 0) {
            console.log("↓ 清除成功");
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_ClsValue_all is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_Send_Message = function (message) {
        var code = message.getLong();
        if (code == 0) {
            var mess = message.getString();
            console.log("↓ 收到消息：" + mess);
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_Send_Message is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_Score = function (message) {
        var code = message.getLong();
        if (code == 0) {
            console.log("↓ 报分成功");
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_Score is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_EndGame = function (message) {
        var code = message.getLong();
        if (code == 0) {
            this.gm.onStop();
            var winUserID = message.getLong();
            var winScore = message.getLong();
            var loseScore = message.getLong();
            var session = message.getLong();
            console.log("↓ 游戏结束 : 获胜用户：" + winUserID + " , 获胜分数 = " + winScore + " , 失败用户分数：" + loseScore + " , session=" + session);
            // this.gm.mMatching.text = "游戏已经结束。。" ;
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_EndGame is error : " + code + " , error = " + errStr);
        }
    };
    netsocket.prototype.rpc_StateGame = function (message) {
        var code = message.getLong();
        if (code == 0) {
            var uid = message.getLong();
            console.log("↓ 用户" + uid + " 报告游戏开始成功。");
        }
        else {
            var errStr = this.errorCode(code);
            console.log("GameServer rpc_StateGame is error : " + code + " , error = " + errStr);
        }
    };
    // 服务器推送消息
    netsocket.prototype.push_JoinRoom = function (message) {
        var player = message.getTable();
        message.clear();
        // 用户进入游戏
        if (player.rowCount() > 0) {
            var exist = false;
            for (var row = 1; row <= this.gm.mUserTable.rowCount(); ++row) {
                if (this.gm.mUserTable.getLong(row, "uid") == player.getLong(1, "uid")) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                this.gm.mUserTable.addRows(player, 1, 1);
                this.gm.initUser(this.gm.mUserTable);
            }
        }
    };
    netsocket.prototype.push_onLine = function (message, open) {
        var uid = message.getLong();
        // 用户断线及连线
        if (open == 1) {
            console.log("↓ 用户[" + this.gm.getUserString(uid, "name") + "]连线");
        }
        else {
            console.log("↓ 用户[" + this.gm.getUserString(uid, "name") + "]离线");
        }
    };
    netsocket.prototype.push_GameStart = function (message) {
        GameMain.app.setServerTime(message.getLong());
        console.log("↓ 服务器通知游戏开始了");
        this.send_StartGame();
        this.gm.onStart();
        // this.send_SetValue("uid" , GameMain.app.uid.toString()) ;
        this.send_GetValue("bestScore");
        // this.send_ClsValue_all() ;
        // let param = {} ;
        // param["pm1"] = "MyName:" + this.gm.getUserString(GameMain.app.uid , "name") ;
        // param["pm2"] = GameMain.app.uid ;
        // this.send_Send_Message(0 , param) ;
        // this.send_Score(13) ;
        // this.send_OtherStart() ;
        var app = this;
        Laya.timer.once(10000, this, function () {
            app.send_EndGame(37);
        });
    };
    netsocket.prototype.push_Matching = function (message) {
        var tab = message.getTable(); // 自己的信息。
        if (tab.rowCount() == 1) {
            this.gm.initUser(tab);
            // this.gm.showGame() ;
        }
        else {
            console.log("↓ push_Matching 用户信息为空。");
        }
    };
    // 主动发送消息
    netsocket.prototype.send_SetValue = function (key, value) {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000100, config.uid, config.mRoomID, config.mSession);
        message.addString(key);
        message.addString(value);
        this.net.rpc(message);
        console.log("↑ 服务器记录:key=" + key + ",value=" + value);
    };
    netsocket.prototype.send_GetValue = function (key) {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000101, config.uid, config.mRoomID, config.mSession);
        message.addString(key);
        this.net.rpc(message);
        console.log("↑ 获取记录值:key=" + key);
    };
    netsocket.prototype.send_ClsValue_all = function () {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000102, config.uid, config.mRoomID, config.mSession);
        this.net.rpc(message);
        console.log("↑ 清理记录值");
    };
    netsocket.prototype.send_Send_Message = function (touid, a) {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000103, config.uid, config.mRoomID, config.mSession);
        message.addLong(0);
        message.addString(JSON.stringify(a));
        this.net.rpc(message);
        console.log("↑ 发送消息:json=" + JSON.stringify(a));
    };
    netsocket.prototype.send_Score = function (score) {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000104, config.uid, config.mRoomID, config.mSession);
        message.addLong(score);
        message.addLong(-1);
        this.net.rpc(message);
        console.log("↑ 报告当前分数:my=" + score);
    };
    netsocket.prototype.send_EndGame = function (score) {
        if (this.net == null)
            return;
        var otheruid = this.getOtherUid();
        var message = util.initMessage(0x00000105, config.uid, config.mRoomID, config.mSession);
        message.addLong(score);
        message.addLong(-1);
        // message.addLong(config.uid); // WinUid
        message.addLong(otheruid); // WinUid
        this.net.rpc(message);
        console.log("↑ 报告游戏结束:my" + score + ",winuid=" + config.uid);
    };
    netsocket.prototype.send_StartGame = function () {
        if (this.net == null)
            return;
        var message = util.initMessage(0x00000106, config.uid, config.mRoomID, config.mSession);
        message.addLong(config.uid);
        this.net.rpc(message);
        console.log("↑ 报告自己游戏开始");
    };
    netsocket.prototype.send_OtherStart = function () {
        if (this.net == null)
            return;
        var otheruid = this.getOtherUid();
        var message = util.initMessage(0x00000106, config.uid, config.mRoomID, config.mSession);
        message.addLong(otheruid);
        this.net.rpc(message);
        console.log("↑ 报告对方游戏开始");
    };
    netsocket.prototype.getOtherUid = function () {
        var otheruid = 0;
        for (var row = 1; row <= this.gm.mUserTable.rowCount(); ++row) {
            var uid = this.gm.mUserTable.getLong(row, "uid");
            if (uid != config.uid) {
                otheruid = uid;
            }
        }
        return otheruid;
    };
    return netsocket;
}());
//# sourceMappingURL=netsocket.js.map