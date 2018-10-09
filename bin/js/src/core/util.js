/*
* util 公用的js模板;
*/
var util = /** @class */ (function () {
    function util() {
    }
    util.getUrlParams = function (params, ver) {
        if (ver === void 0) { ver = "1.0.1"; }
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
        var scr = "";
        if (util.mKeys[ver] != null)
            scr = md5(str + "key=" + util.mKeys[ver]);
        else
            scr = md5(str + "key=neco6sYpqo8s*p0mVwnk"); //要改
        return str + "key=" + scr;
    };
    util.getCDN = function () {
        return "https://t.wanzhucdn.com/xcx/sbf/";
    };
    util.getJSON = function (str) {
        if (str == "" || str == null) {
            return { "code": -999 };
        }
        var len = str.indexOf("{", 0);
        str = str.substr(len, str.length - len);
        return JSON.parse(str);
    };
    util.mKeys = {
        "1.0.1": "neco6sYpqo8s*p0mVwnk",
    };
    return util;
}());
//# sourceMappingURL=util.js.map