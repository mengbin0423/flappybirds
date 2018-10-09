/*
* wx登录;
*/
var md5 = require('/ultima/md5.min.js');
var base64 = require('/ultima/base64.min.js');
var HttpRequest = Laya.HttpRequest;
var wxMinPro = /** @class */ (function () {
    function wxMinPro() {
        this.mOpenid = "";
        this.mVersion = "1001";
        this.mUID = 0;
        this.mHttpCall = null;
        this.mURL = "https://xcx.wanzhuwenhua.com/uo/";
        this.mUser = {};
    }
    wxMinPro.prototype.initWX = function () {
        this.checkAuthorize();
    };
    wxMinPro.prototype.checkAuthorize = function () {
        var _this = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo'] == null) {
                    _this.dealAuthorize();
                }
                else {
                    if (res.authSetting['scope.userInfo'] == true) {
                        _this.checkSession();
                    }
                    else {
                        _this.openSeting();
                    }
                }
            },
            fail: function (res) {
                _this.dealAuthorize();
            }
        });
    };
    wxMinPro.prototype.dealAuthorize = function () {
        var _this = this;
        wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
                _this.checkSession();
            },
            fail: function (res) {
                _this.openSeting();
            }
        });
    };
    wxMinPro.prototype.openSeting = function () {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权头像和用户名信息',
            showCancel: false,
            cancelText: '取消',
            confirmText: "确认",
            success: function (res) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.userInfo'] == false) {
                            _this.openSeting();
                        }
                        else {
                            _this.checkSession();
                        }
                    },
                    fail: function (res) {
                        _this.openSeting();
                    }
                });
            }
        });
    };
    wxMinPro.prototype.checkSession = function () {
        var _this = this;
        var openid = laya.wx.mini.MiniLocalStorage.getItem("openid");
        if (openid.length <= 2) {
            _this.login();
            return;
        }
        else
            this.mOpenid = openid;
        wx.checkSession({
            success: function (res) {
                _this.getUserInfo();
            },
            fail: function (res) {
                _this.login();
            }
        });
    };
    wxMinPro.prototype.login = function () {
        var _this = this;
        wx.login({
            success: function (res) {
                _this.checkCode(res.code);
            }
        });
    };
    //提交code
    wxMinPro.prototype.checkCode = function (code) {
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = this.getJSON(e);
            else
                ret = this.getJSON(this.mHttpCall.data);
            if (ret['code'] == 0) {
                _this.mOpenid = ret['openid'];
                laya.wx.mini.MiniLocalStorage.setItem("openid", _this.mOpenid);
                _this.getUserInfo();
            }
            this.mHttpCall = null;
            this.visible = true;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        console.log("uo/check");
        var params = [];
        params['code'] = code;
        var str = this.mURL + "1.0.1/login/check?" + this.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //获取用户信息
    wxMinPro.prototype.getUserInfo = function () {
        var _this = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
                var userInfo = res.userInfo;
                _this.mUser['nickName'] = userInfo.nickName;
                _this.mUser['avatarUrl'] = userInfo.avatarUrl;
                _this.mUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
                _this.mUser['province'] = userInfo.province;
                _this.mUser['city'] = userInfo.city;
                _this.mUser['country'] = userInfo.country;
                _this.loginServer(res.rawData, res.signature, res.encryptedData, res.iv);
            }
        });
    };
    //登录服务器
    wxMinPro.prototype.loginServer = function (rawData, signature, encryptedData, iv) {
        var _this = this;
        console.log("openid:" + this.mOpenid);
        function onResult(e) {
            var ret = this.getJSON(this.mHttpCall.data);
            if (ret['code'] == 0) {
            }
            if (ret['code'] == -3) {
                _this.login();
            }
            this.mHttpCall = null;
            this.visible = true;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        console.log("uo/login");
        var params = [];
        params['secen'] = 0;
        if (Laya.Browser.onIOS)
            params['platform'] = 2;
        else
            params['platform'] = 1;
        params['openid'] = this.mOpenid;
        params['ver'] = this.mVersion;
        params['raw'] = base64.Base64.encodeURI(rawData);
        params['data'] = base64.Base64.encodeURI(encryptedData);
        params['signature'] = signature;
        params['iv'] = base64.Base64.encodeURI(iv);
        var str = this.mURL + "1.0.1/login/login?" + this.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.onHttpRequestError = function (e) {
        this.mHttpCall = null;
        console.log("onHttpRequestError:" + e);
    };
    wxMinPro.prototype.getUrlParams = function (params) {
        var havetick = false;
        var keys = new Array();
        for (var key in params) {
            if (typeof (params[key]) != "string" && typeof (params[key]) != "number")
                continue;
            if (key == "tick")
                havetick = true;
            var aa = key.toLocaleLowerCase();
            params[aa] = params[key];
            keys.push(aa);
        }
        if (havetick == false) {
            var date = new Date();
            params['tick'] = Math.floor(date.getTime() / 1000);
            keys.push("tick");
        }
        keys.sort(function (a, b) { return a > b ? 1 : -1; });
        //组合
        var str = "";
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + params[keys[index]] + "&";
        }
        var scr = md5(str + "key=fatality");
        return str + "key=" + scr;
    };
    wxMinPro.prototype.getJSON = function (str) {
        var len = str.indexOf("{", 0);
        str = str.substr(len, str.length - len);
        return JSON.parse(str);
    };
    return wxMinPro;
}());
//# sourceMappingURL=wxMinPro.js.map