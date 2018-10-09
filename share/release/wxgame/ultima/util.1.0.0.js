/*
* util 公用的js模板;
*/
var util = /** @class */ (function () {
    function util() {
    }
    /**     *
     * 获取调用php服务器地址的参数。如返回空，不需要链接php服务器，直接链接游戏服务器。
     * @param url_str 传入?后面所有字符。
     * @param appid 分配给游戏的id
     * @param code 分配给游戏的固定字符串
     * @param tickTime 当前时间戳
     * @param copyright 客户端当前版本号
     * @param platform 客户端当前运行环境 ， 0 - pc ， 1 - android ， 2 - ios
     * 返回 url
     */
    util.get_login_url = function (url_str, version, platform) {
        util.initParams(url_str);
        if (util.mParams['appid'] == null)
            util.mParams['appid'] = 117;
        var appid = util.mParams['appid'];
        if (util.mXCX_Login) {
            return "";
        }
        else {
            var url = "https://game.wanzhuwenhua.com/tesla_sm_game/verify.php";
            util.mKey = "1302";
            var params = [];
            params['code'] = "login";
            params['sn'] = util.mParams['sn'];
            params['key'] = util.mKey;
            params['appid'] = appid;
            params['version'] = version;
            params['platform'] = platform;
            if (util.mParams["test"] != null && Number(util.mParams["test"]) == 1) {
                params['reconnect'] = util.mParams['reconnect'];
                params['test'] = util.mParams['test'];
                params['test_uid'] = util.mParams['test_uid'];
                params['test_roomid'] = util.mParams['test_roomid'];
                params['test_robot_uid'] = util.mParams['test_robot_uid'];
            }
            var str = url + "?" + util.getUrlParams(params);
            return str;
        }
    };
    util.initMessage = function (cmd, uid, roomid, session) {
        var message = new NetMessage();
        message.addCmd(cmd);
        message.setSession(session);
        message.addLong(uid);
        message.addLong(roomid);
        message.addString(util.mParams['appid']);
        return message;
    };
    util.getCDNUrl = function () {
        return "";
        // if(!util.mDebug)
        //     return "https://s.wanzhucdn.com/game/" + appid + "/" ;
        // return "https://img.shihuo.me/game/" + appid + "/" ;
    };
    util.initParams = function (url_str) {
        var u = url_str.split("&");
        for (var i = 0; i < u.length; i++) {
            var param = u[i].split("=");
            if (param.length >= 2) {
                var key = param[0];
                var value = u[i].substr(key.length + 1, u[i].length - key.length);
                util.mParams[param[0]] = value;
            }
        }
        if (util.mParams["release"] != null && Number(util.mParams["release"]) == 1) {
            util.mDebug = false;
        }
        else {
            util.mDebug = true;
        }
        if (util.mParams["xcx"] != null && Number(util.mParams["xcx"]) == 1) {
            util.mXCX_Login = true;
        }
        else {
            util.mXCX_Login = false;
        }
    };
    util.getUrlParams = function (params) {
        var havetick = false;
        var keys = new Array();
        for (var key in params) {
            var aa = key.toLocaleLowerCase();
            params[aa] = params[key];
            if (aa != "contains") {
                keys.push(aa);
            }
        }
        //组合
        var str = "";
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + params[keys[index]] + "&";
        }
        return str;
    };
    util.mParams = new Object();
    util.mXCX_Login = true;
    util.mDebug = false;
    util.mKey = ""; // 通过 js app的接口 getAppKey 获取的key
    util.mSN = ""; // App 传进自己的 sn
    return util;
}());
//# sourceMappingURL=util.js.map