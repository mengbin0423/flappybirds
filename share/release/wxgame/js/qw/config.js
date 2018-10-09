/*
* name;
*/
var config = /** @class */ (function () {
    function config() {
    }
    //游戏的APPID
    config.mAPPID = 113;
    //游戏的名字
    config.mGameName = "指神";
    //App传进的版本号
    config.mAppCopyRight = "";
    //游戏当前 版本号
    config.mCopyright = "1.0.0";
    //固定字符，校验使用，由项目确定
    config.mFixedCode = "wzyxtestsn";
    // 客户端当前运行环境 ， 0 - pc ， 1 - android ， 2 - ios
    config.mPlatform = 0;
    config.mServerTime = 0; // 服务器时间    
    config.mParams = {}; // url 入口所有参数
    config.uid = 0; // 用户自己的id
    config.username = ""; // 用户名
    config.userface = ""; // 用户头像
    config.mSession = 0; // 调用session
    config.mRoomID = 0; // 房间ID
    config.mReConnect = 0; // 是否是重连进入游戏，1 - 重连  0 - 不重连    
    config.mWSSUrl = ""; // 游戏服务器https地址
    config.rivalUid = 0; // 对手的id
    return config;
}());
//# sourceMappingURL=config.js.map