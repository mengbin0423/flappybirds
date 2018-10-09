/*
* wx登录;
*/
const md5 = require('/ultima/md5.min.js');
const base64 = require('/ultima/base64.min.js');


import HttpRequest = Laya.HttpRequest;

class wxMinPro {
    public mOpenid: string = "";
    public mVersion: number = 7;
    public mUID: number = 0;
    public mADKeep: number = 0;
    public mCards: number = 0; //复活卡
    public mMoreGames: Array<Object> = [];
    public flag: boolean = true;
    public mMyRank: number = 0;
    public finalScore:number = 0;
    public msmark:number = 0;
    public fnOff:boolean = true;
    public closeBtn:boolean = true;


    public  showOut:boolean = false;
    //默认无敌时间
    public mWudi: number = 5;
    //续命开头 0-关，1-开
    public fhOnoff: number = 0;

    public mHttpCall: HttpRequest = null;
     // 首页按钮未加载完成时禁用
    public buttonType: boolean = false;
    // 线上地址
    public mURL: string = "https://mini.wanzhushipin.cn/xiao_niao/";
    // 线下地址
    //public mURL:string = "https://xcx.wanzhuwenhua.com/xiao_niao/";
    public mCmd = {
        "challenge": "1.0.1/xn/challenge?",
        "check": "1.0.1/xn/check?",
        "report": "1.0.1/xn/report?",
        "querycards": "1.0.1/xn/querycards?",
        "qr": "1.0.1/xn/qr?",
        "login": "1.0.1/xn/login?",
        "rank": "1.0.1/xn/rank?",
        "AddCard": "1.0.1/xn/AddCard?",
    };

    public mUser: Object = {};
    public mSaveImage: string = "";
    public mLaunch: Object = null;
    //当前续命的题目
    public mrelayID: number = 0;
    //当前挑战的题目--只有返回了才会改
    public mChallengeID: number = 0;
    //当前分享的题目--只要有新题出来，都会改
    public mShareID: number = 0;
    public mChallenge: Object = null;
    public mMarks: Array<number> = [0, 0, 0, 0];

    public moreGameUrl='';
    public gameArr: Array<Object> = [];
   
    public mQR: number = 0;
    public mQRs: Object = {};

    public mLogined: boolean = false;
    public gameClub: Laya.Button = null; // 游戏圈按钮

    
    public otherGameUrl: string = '';

    public gameId:string = '';

    public shareMessage:boolean = false;
    public noCards: boolean = false;

    public isShowToMy: boolean = false;
    constructor() {
    }
    public initWX(): void {
        let _this = this;
          // 右上角菜单
        wx.showShareMenu({ withShareTicket: true })
        wx.onShareAppMessage(() => {
            return {
                title: "比愤怒的小鸟更刺激的游戏，快来试试吧！",
                imageUrl: 'res/share.png',
                query: 'uid='+mainInst.mWX.mUID+'&id=0&map=0&invit=9',
            }
        })
        this.mLaunch = {};
        var option = wx.getLaunchOptionsSync();
        this.mLaunch['query'] = option['query'];
        this.mLaunch['scene'] = option['scene'];
        this.mLaunch['isSticky'] = option['isSticky'];
        this.mLaunch['shareTicket'] = option['shareTicket'];

        //this.mLaunch['query']['scene'] = "uid%3D1006063%26id%3D2425318863";
        if (this.mLaunch['query']['scene'] != null) {
            var scene = decodeURIComponent(this.mLaunch['query']['scene']);
            console.log("Launchscene: " + scene);

            //uid=1000031&id=2393485006
            var params: Array<string> = scene.split("&");
            for (var i = 0; i < params.length; i++) {
                var param: string = params[i];
                var keys: Array<string> = param.split("=");
                if (keys.length == 2)
                    this.mLaunch['query'][keys[0]] = keys[1];
            }
        }
        console.log(this.mLaunch);
        this.checkAuthorize();

        // wx.onHide(function(res) {
        //     if (mainInst.gameView != null && mainInst.startView.parent == null  && mainInst.gameView._mgr != null){
        //         mainInst.gameView._mgr.onDie()
        //     }
        // })

        wx.onShow(function (option) {
            var res = {};
            console.log('复活卡参数' + option)
            
            res['query'] = option['query'];
            res['scene'] = option['scene'];
            res['shareTicket'] = option['shareTicket'];
            res['isSticky'] = option['isSticky'];

            console.log(option)
            if (res['scene'] == 1104) {
                if (laya.wx.mini.MiniLocalStorage.getItem('isShowToMy') != '1') {
                    console.log(`本地缓存手指显示`);
                    laya.wx.mini.MiniLocalStorage.setItem("isShowToMy", '1');
                }
            }

         
            

            wx.hideLoading({});
            // mainInst.mPlayed = false;
            if (GameMain.app.mWX.mChallenge != null)
                console.log(GameMain.app.mWX.mChallenge);

            if (GameMain.app.mWX.mUID <= 0)
                GameMain.app.mWX.checkAuthorize();
            else {
                
                //二维码过来的参数         
                if (res['query']['scene'] != null) {
                    var scene = decodeURIComponent(res['query']['scene']);
                    //uid=1000031&id=2393485006
                    var params: Array<string> = scene.split("&");
                    for (var i = 0; i < params.length; i++) {
                        var param: string = params[i];
                        var keys: Array<string> = param.split("=");
                        if (keys.length == 2)
                            res['query'][keys[0]] = keys[1];
                    }
                }
                _this.mLaunch = res;
                console.log('好友接力' +_this.mLaunch['query']['type']);
                
                if (_this.mLaunch['query']['gift'] != null && typeof (_this.mLaunch['query']['gift']) != "undefined") {
            
                    //自己领卡（道具礼包）
                    if (_this.mLaunch['query']['id'] > 0) {
                        
                        _this.addCardForMe(_this.mLaunch['query']['id']);

                        //给别人加卡
                    } else {
                        mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                    }

                     if(GameMain.app.mIndexV.gameClub !== null){
                        GameMain.app.mIndexV.gameClub.show()
                    }

                    if(GameMain.app.mIndexV.banner !== null){
                        GameMain.app.mIndexV.closeBanner();
                    }

                    mainInst.onInit();
                    _this.initGame()
                } else if (Number(_this.mLaunch['query']['type']) == 8) {
                    //群排行
                    console.log('群排行')
                    console.log(_this.mLaunch['shareTicket']);
                    if (typeof (_this.mLaunch['shareTicket']) != "undefined" && _this.mLaunch['shareTicket'] != "undefined" && _this.mLaunch['shareTicket'] != "") {
                        mainInst.queryGroupRank();
                    }
                    _this.initGame()

                } else if (_this.mLaunch['query']['id'] > 0) {
                    //好友接力 
                        _this.mrelayID = _this.mLaunch['query']['id'];
                        mainInst.showRelay();
                        _this.initGame()
                }else if(mainInst.mGameScene !=null)
                {
                    console.log('好友挑战' +_this.mLaunch['query']['invit'] )
                    if(this.fnoff )
                    {
                         _this.initGame()
                        Laya.stage.removeChild(mainInst.mGameScene)
                        mainInst.mGameScene.bird.visible = false;

                        if(mainInst.mIndexV !=null)
                        {
                            mainInst.mIndexV.visible = true;
                            mainInst.mIndexV.revive.visible = false;
                            
                            if(GameMain.app.mIndexV.gameClub !== null){
                                GameMain.app.mIndexV.gameClub.show()
                            }
                        }  

                    }

                    if(_this.mLaunch['query']['invit']== 9)
                    {
                         _this.initGame()
                        Laya.stage.removeChild(mainInst.mGameScene)
                        Laya.stage.removeChild(mainInst.mGameresult)
                        mainInst.mGameScene.bird.visible = false;

                        if(mainInst.mIndexV !=null)
                        {
                            mainInst.mIndexV.visible = true;
                            mainInst.mIndexV.revive.visible = false;
                            if(GameMain.app.mIndexV.gameClub !== null){
                                GameMain.app.mIndexV.gameClub.show()
                            }
                                
                        } 

                        

                        if(GameMain.app.mIndexV.banner !== null){
                            GameMain.app.mIndexV.closeBanner()
                        }
                    }
                    
                }
                // else if(_this.mLaunch['query']['invit']== 9)
                //     {
                //         console.log('invit=9')
                //          _this.initGame()
                //         Laya.stage.removeChild(mainInst.mGameScene)
                //         Laya.stage.removeChild(mainInst.mGameresult)
                //         if(mainInst.mIndexV !=null)
                //         {
                //             mainInst.mIndexV.visible = true;
                //             mainInst.mIndexV.revive.visible = false;          
                //         } 

                //         if(GameMain.app.mIndexV.gameClub !== null){
                //                 GameMain.app.mIndexV.gameClub.show()
                //             }
                //         if(GameMain.app.mIndexV.banner !== null){
                //             GameMain.app.mIndexV.closeBanner()
                //         }
                //     }
                // else if(this.shareMessage)
                // {
                //     console.log('分享续命')
                // }
               
            }
            wx.hideLoading({});
            
        });
    }

    /**
     * 给自己加卡
     * @param uid 
     */
    public addCardForMe(shareId: number): void {
        console.log("addCardForMe");
        this.flag = false;
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.mCards = _this.mCards + 1;
                wx.showToast({
                    title: "获得复活卡1张",
                    icon: "success",
                    image: "",
                    duration: 3000
                });
            }
            _this.mHttpCall = null;
        }

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);

        let params: Object = [];
        params['uid'] = _this.mUID;
        params['id'] = shareId;

        let str = this.mURL + "1.0.1/xn/AddMyCard?" + util.getUrlParams(params, "1.0.1");
        this.mHttpCall.send(str, null, 'get', 'text');
    }


    /**
     * @desc 好友接力数据获取
     */
    public showRelay(): void {
        let _this = this;
        function onResult(e: any): void {
            wx.hideLoading({});
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                let master = {
                    name: base64.Base64.decode(ret['master']['name']),
                    friend_base: ret['master']['friend_base'],
                    mark: ret['master']['mark'],
                    uid: ret['master']['uid'],
                    id: ret['master']['id'],
                };
                var face1: string = base64.Base64.decode(ret['master']['avatar']);
                if (face1.charAt(face1.length - 1) == '0' && face1.charAt(face1.length - 2) == '/') {
                    face1 = face1.substr(0, face1.length - 2);
                    face1 = face1 + "/132";
                }
                master['avatar'] = face1;
                let mData: Array<Object> = [];
                let rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i]['uid'] != ret['master']['uid']) {
                        var obj: Object = {};
                        obj['uid'] = rData[i]['uid'];
                        obj['name'] = base64.Base64.decode(rData[i]['name']);

                        var face: string = base64.Base64.decode(rData[i]['avatar']);
                        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                            face = face.substr(0, face.length - 2);
                            face = face + "/132";
                        }
                        obj['avatar'] = face;
                        obj['mark'] = rData[i]['mark'];

                        let mLevel = mainInst.mLevel;
                        let mLevelName = mainInst.levelArr;
                        let level: number = mLevel.length;
                        for (let m: number = 0; m < mLevel.length; m++) {
                            if (Math.floor(obj['mark']/100) < mLevel[m]) {
                                level = m + 1;
                                break;
                            }
                        }
                        obj['level'] = mLevelName[level - 1];

                        mData.push(obj);
                    }
                }

                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }
                mainInst.mIndexV.showRelayData(master, mData);
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        wx.showLoading({
            title: "",
            mask: true
        });

        console.log('xn/challenge');
        let params: Object = [];
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        let str = this.mURL + '1.0.1/xn/challenge?' + util.getUrlParams(params, "1.0.1");
        this.mHttpCall.send(str, null, 'get', 'text');
        
    }



     // 获取我的成绩
    public getMyMark(rank_type: string, type: boolean = true): void {
        console.log(' 获取我的成绩');
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                if (ret['mark'] && ret['mark']['mark']){
                    this.mUser['mark'] = ret['mark']['mark']
                    GameMain.app.mGameRank.mScore.text  =  Math.floor(this.mUser['mark']/100)+'米'
                    // GameMain.app.mWX.reportMark(ret['mark']['mark'])
                    wx.postMessage({
                        type: "send", mark: ret['mark']['mark'], level: 0, map:ret['mark']['mark'], best: this.mMarks[0], user: this.mUser
                    });
                }

            }

            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);

        let params: Object = [];
        params['uid'] = this.mUID;
        let str = this.mURL + "1.0.1/xn/mymark?" + util.getUrlParams(params, "1.0.1");


        this.mHttpCall.send(str, null, 'get', 'text');
    }

    public checkAuthorize(): void {

        let _this = this;
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
    }



    public dealAuthorize(): void {
        let _this = this;
        wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
                _this.checkSession();
            },
            fail: function (res) {
                _this.openSeting();
            }
        });
    }
    public openSeting(): void {
        let _this = this;
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
    }


    public checkSession(): void {
        let _this = this;

        let openid: string = laya.wx.mini.MiniLocalStorage.getItem("openid");
        if (openid.length <= 2) {
            _this.login();
            return;
        }
        else {
            this.mOpenid = openid;
            this.mUser['openid'] = this.mOpenid;
        }

        if (GameMain.app.mSDKVersion >= "3.0.1") {

            _this.login();
        }
        else {
            console.log("start wx.checkSession");
            wx.checkSession({
                success: function (res) {
                    _this.getUserInfo();
                },
                fail: function (res) {
                    _this.login();
                }
            });
        }
    }


    public login(): void {
        let _this = this;
        wx.login({
            success: function (res) {
                _this.checkCode(res.code);
            }
        });
    }
    //提交code
    public checkCode(code: string, res: any = null): void {
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.mOpenid = ret['openid'];
                _this.mUser['openid'] = _this.mOpenid;
                laya.wx.mini.MiniLocalStorage.setItem("openid", _this.mOpenid);

                if (res == null) {
                    _this.getUserInfo();
                } else {
                    _this.loginServer(res.rawData, res.signature, res.encryptedData, res.iv);

                }
            }
            else
                console.log(ret);
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        console.log("uo/check");
        let params: Object = [];
        params['code'] = code;
        let str = this.mURL + this.mCmd["check"] + util.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    //汇报成绩
    //continue=1表示使用复活卡
    public reportMark(mark: number): void {
        let _this = this;
        function onResult(e: any): void {
            wx.hideLoading({});
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.mShareID = ret['id'];
                _this.mCards = Number(ret['cards']);
                if(Number(mark) >= Number(this.finalScore))
                {
                    this.finalScore = Number(mark);
                }
                if(mark >= _this.mMarks[0]){
                    GameMain.app.mGameRank.mScore.text = Math.floor(mark/100 )+ '米';
                }
                wx.postMessage({
                    type: "send",mark:mark,level:0,best:GameMain.app.mWX.mMarks[0],user:GameMain.app.mWX.mUser
                });
                
                //复活
                // if (mainInst.mUseCards == true) mainInst.scoreView.resume();
            }
            _this.mHttpCall = null;
        }

        let mmark = Math.floor(mark/100)
        if(mmark > this.msmark)
        {
            this.msmark = mmark;
        }
        wx.postMessage({
            type: "send", mark: mmark, level: 0, best: 0,user: GameMain.app.mWX.mUser
        });

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        console.log(this.mCmd["report"]);
        console.log("report id: " + this.mrelayID);
        
        let params: Object = [];
        params['mark'] = mark;
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        console.log(params);
        console.log(GameMain.app.mUseCards)
        if(this.fnOff)
        {
            if (GameMain.app.mUseCards == true)
                params['continue'] = 1;
            else
                params['continue'] = 0;
        }else{
             params['continue'] = 0;
        }
        
        // if (GameMain.app.mUseCards == true)
        //         params['continue'] = 1;
        //     else
        //         params['continue'] = 0;


        //闯关地图
        //  params['level']= GameMain.app.mMapLevel;
        // //分享次数
        // params['shares']=GameMain.app.mShares;


        let str = this.mURL + this.mCmd["report"] + util.getUrlParams(params, "");
        wx.showLoading({
            title: "",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    //获取复活卡
    public updateCards(): void {
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                if (_this.mCards <= 0) {
                    this.noCards = true;
                }

                GameMain.app.mIndexV.cards.text = 'x' + _this.mCards;
                if (GameMain.app.mGameScene != null) {
                    GameMain.app.mGameScene.cards.text = 'x' + _this.mCards;
                }


                if (GameMain.app.mGameresult != null) {
                    GameMain.app.mGameresult.cards.text = 'x' + _this.mCards;
                    this.getUrl();
                }

                
            }
            _this.mHttpCall = null;
        }

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        let params: Object = [];
        params['uid'] = this.mUID;

        console.log(this.mCmd["querycards"]);
        let str = this.mURL + this.mCmd["querycards"] + util.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    }
    //获取复活卡
    public queryCards(): void {
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            wx.hideLoading({});
            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                // GameMain.app.mGameGift.show();
            }
            _this.mHttpCall = null;
        }

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        wx.showLoading({
            title: "",
            mask: true
        });

        let params: Object = [];
        params['uid'] = this.mUID;

        console.log("uo/querycards");
        let str = this.mURL + this.mCmd["querycards"] + util.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    public dealCards(gift: number): void {
        this.flag = false;
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                console.log('复活卡获取成功')
            }
            _this.mHttpCall = null;
            console.log('复活卡结果' + ret)
        }

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        let params: Object = [];
        params['uid'] = this.mUID;
        if (gift != null)
            params['gift'] = gift;
        else {
            if (typeof (this.mLaunch['query']['gift']) != "undefined") {
                params['gift'] = Number(this.mLaunch['query']['gift']);
            }
            else {
                params['gift'] = 0;
            }
        }

        // if(shareTicket != null)
        // {
        //     params['ticket'] = shareTicket;
        // }
        // else
        // {
        //     if(typeof(this.mLaunch['shareTicket']) != "undefined")
        //     {
        //         params['ticket'] = this.mLaunch['shareTicket'];
        //     }
        // }
        console.log("server/AddCard");
        let str = this.mURL + this.mCmd["AddCard"] + util.getUrlParams(params, 'AddCard1.0.1');
        this.mHttpCall.send(str, null, 'get', 'text');

    }


    //获取二维码
    public createQR(qr: number): void {
        let _this = this;
        this.mQR = qr;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                var url: string = ret['url'];
                if (url.length > 10) {
                    _this.mQRs[_this.mShareID] = url;
                    // if(_this.mQR == 1)
                    // {
                    //     Laya.loader.load(url, Laya.Handler.create(GameMain.app, GameMain.app.saveimage1,[url]), null);
                    // }
                    // else
                    // {
                    //     Laya.loader.load(url, Laya.Handler.create(GameMain.app, GameMain.app.saveimage2,[url]), null);
                    // }
                }
                else {
                    // if(_this.mQR == 1)
                    //     GameMain.app.saveimage1("");
                    // else
                    //     GameMain.app.saveimage2("");
                }
            }
            else {
                // if(_this.mQR == 1)
                //     GameMain.app.saveimage1("");
                // else
                //     GameMain.app.saveimage2("");
            }
            _this.mHttpCall = null;
        }

        if (this.mQRs[this.mShareID] != null) {
            console.log("已经有了");
            // if(this.mQR == 1)
            //     GameMain.app.saveimage1(this.mQRs[this.mShareID]);
            // else
            //     GameMain.app.saveimage2(this.mQRs[this.mShareID]);
            return;
        }

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        let params: Object = [];
        params['uid'] = this.mUID;
        params['id'] = this.mShareID;

        console.log("server/qr");
        let str = this.mURL + this.mCmd["qr"] + util.getUrlParams(params);
        wx.showLoading({
            title: "生成图片中",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    //获取用户信息
    public getUserInfo(): void {
        if (GameMain.app.mSDKVersion >= "3.0.1") {
            // GameMain.app.Login()
        }
        else {
            let _this = this;
            wx.getUserInfo({
                withCredentials: true,
                lang: "zh_CN",
                success: function (res) {
                    var userInfo = res.userInfo;
                    _this.mUser['nickName'] = userInfo.nickName;

                    var face: string = userInfo.avatarUrl;
                    if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                        face = face.substr(0, face.length - 2);
                        face = face + "/132";
                    }

                    _this.mUser['avatarUrl'] = face;
                    _this.mUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
                    _this.mUser['province'] = userInfo.province;
                    _this.mUser['city'] = userInfo.city;
                    _this.mUser['country'] = userInfo.country;
                    _this.loginServer(res.rawData, res.signature, res.encryptedData, res.iv);

                    GameMain.app.mIndexV.selfAvart.skin = face;
                    // mainInst.mGameresult.resultAvart.skin = face;
                    GameMain.app.mGameRank.myFace.skin = face;
                    // GameMain.app.mGameresult.resultAvart.skin = face;
                    GameMain.app.mGameRank.mUser.text = userInfo.nickName

                },
                fail: function (res) {
                    _this.login();
                }
            });
        }
    }


    //按钮登录
    public onLogin(res): void {
        var userInfo = res.userInfo;
        this.mUser['nickName'] = userInfo.nickName;
        var face: string = userInfo.avatarUrl;
        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
            face = face.substr(0, face.length - 2);
            face = face + "/132";
        }
        this.mUser['avatarUrl'] = face;
        this.mUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
        this.mUser['province'] = userInfo.province;
        this.mUser['city'] = userInfo.city;
        this.mUser['country'] = userInfo.country;

        let _this = this;
        wx.login({
            success: function (rescode) {
                _this.checkCode(rescode.code, res);
            }
        });

        // this.loginServer(res.rawData,res.signature,res.encryptedData,res.iv);
    }

    //登录服务器
    public loginServer(rawData: string, signature: string, encryptedData: string, iv: string): void {
        let _this = this;
        console.log("openid:" + this.mOpenid);
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            if (ret['code'] == 0) {
                Laya.Browser.window.sharedCanvas.width = Laya.stage.width;
                Laya.Browser.window.sharedCanvas.height = Laya.stage.height;

                // GameMain.app.startView.clickButtons() ;                
                _this.getMyMark("none", false);
                _this.mUID = ret['uid'];
                _this.mMoreGames = ret['games'];

                _this.mMarks[0] = Number(ret['marks']['mark']);
                _this.mMarks[1] = Number(ret['marks']['mark1']);
                _this.mMarks[2] = Number(ret['marks']['mark2']);
                _this.mMarks[3] = Number(ret['marks']['mark3']);
                _this.fhOnoff = Number(ret['fh_onoff']);
                _this.msmark = Math.floor( _this.mMarks[0]/100)

                if(Number(ret['fh_onoff']) == 0)
                {
                    this.fnOff = true
                }else{
                    this.fnOff = false;
                }
                wx.postMessage({
                    type: "send", mark: _this.mMarks[0], level: 0, best: 0, user: GameMain.app.mWX.mUser
                })
                _this.mADKeep = Number(ret['ad_onoff']);

               

                if (typeof (_this.mLaunch['query']['gift']) != "undefined")
                    if (this.flag) {
                        mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                    }
                if (_this.mLaunch['query']['gift'] != null && typeof (_this.mLaunch['query']['gift']) != "undefined") {

                    //自己领卡（道具礼包）
                     if (this.flag) {
                        if (_this.mLaunch['query']['id'] > 0) {
                            _this.addCardForMe(_this.mLaunch['query']['id']);

                            //给别人加卡
                        } else {
                            mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                        }
                     }
                    mainInst.onInit();


                } else if (Number(_this.mLaunch['query']['type']) == 8) {
                    console.log(_this.mLaunch['shareTicket']);

                    //群排行
                    if (typeof (_this.mLaunch['shareTicket']) != "undefined" && _this.mLaunch['shareTicket'] != "undefined" && _this.mLaunch['shareTicket'] != "") {
                        mainInst.queryGroupRank();
                    }

                } else if (_this.mLaunch['query']['id'] > 0) {
                    //好友接力
                    _this.mrelayID = _this.mLaunch['query']['id'];
                    mainInst.showRelay();
                }else{
                   
                }
                 
                wx.hideLoading({});
                // mainInst.setBest(_this.mMarks[0]);
                // _this.initMoreGame(mainInst.startView.moreGame, true);
               

                if (ret['games'].length > 0) {
                    
                    _this.gameArr = ret['games'];
                    if(_this.gameArr.length>0){
                        _this.getIcon();

                    }
                    
                }
                 // 按钮启用
                this.buttonType = true
            }

            console.log(ret);

            if (ret['code'] == -3) {
                _this.login();
            }
            if (ret['code'] == -999) {
                _this.onHttpRequestError("error");
            }

            if (ret['marks'] != '') {
                console.log(ret['marks']['mark'])
                this.finalScore = ret['marks']['mark'];
                
                let mLevel = GameMain.app.mLevel;
                let mLevelName = GameMain.app.levelArr;
                let level: number = mLevel.length;
                for (let m: number = 0; m < mLevel.length; m++) {
                    if (Math.floor(ret['marks']['mark']/100) < mLevel[m]) {
                        level = m + 1;
                        break;
                    }
                }
                GameMain.app.mGameRank.mLevel.text = (mLevelName[level]).toString();
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        console.log("uo/login");
        let params: Object = [];
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

        if (typeof (this.mLaunch['query']['gift']) != "undefined") {
            params['gift'] = Number(this.mLaunch['query']['gift']);
        }
        else {
            params['gift'] = 0;
        }

        if (this.mLaunch != null && this.mLaunch['query']['uid'] != null && Number(this.mLaunch['query']['uid']) != this.mUID)
            params['friend'] = this.mLaunch['query']['uid'];

        let str = this.mURL + this.mCmd["login"] + util.getUrlParams(params);

        wx.showLoading({
            // title: "获取用户信息",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    }


    public initGame():void
    {
        console.log('关闭游戏'+mainInst.mGameScene)
        this.showOut = true;
        if(mainInst.mGameScene !=null)
        { 
            Laya.stage.removeChild(mainInst.mGameScene) 
            mainInst.mGameScene.bird.visible = false;
            this.closeBtn = false;
            if(GameMain.app.mIndexV.banner !== null){
            GameMain.app.mIndexV.closeBanner()
        }
    
        }

        if(GameMain.app.mIndexV.banner !== null){
            GameMain.app.mIndexV.closeBanner()
        }
    
       
        // if(mainInst.mGameRank !=null)
        // {
        //     Laya.stage.removeChild(mainInst.mGameRank)
        // }

        if(mainInst.mGameresult !=null)
        {
            Laya.stage.removeChild(mainInst.mGameresult)
        }
       
    }

    public getIcon():void
    {
        let _this = this;
        
        if(_this.gameArr.length > 0){
            let gameRandom = Math.floor(Math.random() * (_this.gameArr.length -1))
            GameMain.app.mIndexV.moreGame.skin = _this.gameArr[gameRandom]['btn']
            _this.moreGameUrl = _this.gameArr[gameRandom]['url'] 
            GameMain.app.mIndexV.moreGame.name = _this.gameArr[gameRandom]['id']          
        }
        
    }


    public getUrl():void
    {
        let _this = this;
        
        if(_this.gameArr.length>0){
            let gameRandom = Math.floor(Math.random() * (_this.gameArr.length -1))
           GameMain.app.mGameresult.moreGame.skin= _this.gameArr[gameRandom]['icon'];
            _this.otherGameUrl = _this.gameArr[gameRandom]['url'];
            _this.gameId = _this.gameArr[gameRandom]['id'];
        }
       
       console.log('结果页gameId=' + _this.gameId)
    }


    public showChallenge(show: boolean): void {
        let _this = this;
        function onResult(e: any): void {
            wx.hideLoading({});
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.mChallenge = ret;
                let master = {
                    name: base64.Base64.decode(ret['master']['name']),
                    friend_base: ret['master']['friend_base'],
                    mark: ret['master']['mark'],
                    uid: ret['master']['uid'],
                    id: ret['master']['id'],
                };
                var face1: string = base64.Base64.decode(ret['master']['avatar']);
                if (face1.charAt(face1.length - 1) == '0' && face1.charAt(face1.length - 2) == '/') {
                    face1 = face1.substr(0, face1.length - 2);
                    face1 = face1 + "/132";
                }
                master['avatar'] = face1;
                let mData: Array<Object> = [];
                let rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i]['uid'] != ret['master']['uid']) {
                        var obj: Object = {};
                        obj['uid'] = rData[i]['uid'];
                        obj['name'] = base64.Base64.decode(rData[i]['name']);

                        var face: string = base64.Base64.decode(rData[i]['avatar']);
                        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                            face = face.substr(0, face.length - 2);
                            face = face + "/132";
                        }
                        obj['avatar'] = face;

                        obj['mark'] = rData[i]['mark'];

                        let mLevel = GameMain.app.mLevel;
                        let mLevelName = GameMain.app.levelArr;
                        let level:number = mLevel.length;
                        for(let m:number=0;m<mLevel.length;m++)
                        {
                            if(Math.floor(obj['mark']/100)<mLevel[m])
                            {
                                level = m + 1;
                                break;
                            }
                        }
                        obj['level'] = mLevelName[level-1];

                        mData.push(obj);
                    }
                }

                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }
                // mainInst.relayView.showrelayData(master, mData);
            }
            else {
                // GameMain.app.mGameScene.showPage();
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        if (show == true) {
            wx.showLoading({
                title: "",
                mask: true
            });
        }

        console.log(this.mCmd["challenge"]);
        let params: Object = [];
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        let str = this.mURL + this.mCmd["challenge"] + util.getUrlParams(params, "1.0.3");
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    public showWorldRank(page: number = 0): void {
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);

            console.log(ret);
            if (ret['code'] == 0) {
                _this.getMyMark("none", false);
                if(Number(ret['rank'])>0){
                    var mrank: number = Number(ret['rank']);
                    if (mrank > 0 && _this.mMarks[0] > 0) {
                        _this.mMyRank = mrank;
                    }
                    GameMain.app.mGameRank.mRank.visible = true;
                    GameMain.app.mGameRank.mRank.text =   mrank.toString();
                }
                
                let mLevel1= GameMain.app.mLevel;
                let mLevelName1 = GameMain.app.levelArr;
                let level1: number = mLevel1.length;
                for (let m: number = 0; m < mLevel1.length; m++) {
                    if ( Math.floor(this.finalScore/100 ) <= mLevel1[m]) {
                        level1 = m + 1;
                        break;
                    }
                }
                GameMain.app.mGameRank.mLevel.text = (mLevelName1[level1-1]).toString();
                console.log('我的世界排名'+  _this.mMyRank +'----'+ mrank)

                
                let mData: Array<Object> = GameMain.app.mGameRank.wRankData;
                let rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    var obj: Object = {};
                    obj['name'] = base64.Base64.decode(rData[i]['name']);

                    var face: string = base64.Base64.decode(rData[i]['avatar']);
                    if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                        face = face.substr(0, face.length - 2);
                        face = face + "/132";
                    }
                    obj['avatar'] = face;

                    obj['mark'] = Math.floor(rData[i]['hismark']);
                    obj['city'] = rData[i]['city'];
                    obj['uid'] = rData[i]['uid'];


                    let mLevel = GameMain.app.mLevel;
                    let mLevelName = GameMain.app.levelArr;
                    let level: number = mLevel.length;
                    for (let m: number = 0; m < mLevel.length; m++) {
                        if (Math.floor(obj['mark']/100) <= mLevel[m]) {
                            level = m + 1;
                            break;
                        }
                    }
                    obj['level'] = mLevelName[level - 1];

                    mData.push(obj);

                    if(this.mUID == rData[i]['uid'] )
                    {

                        if(_this.mMarks[0] <= rData[i]['hismark']){
                            GameMain.app.mGameRank.mScore.text = Math.floor(rData[i]['hismark'] /100 )+ '米';
                        }
                        
                        // GameMain.app.mGameRank.mRank.text = (i+1).toString();
                        let mLevel1= GameMain.app.mLevel;
                        let mLevelName1 = GameMain.app.levelArr;
                        let level1: number = mLevel1.length;
                        for (let m: number = 0; m < mLevel1.length; m++) {
                            if ( Math.floor(rData[i]['hismark'] /100) <= mLevel1[m]) {
                                level1 = m + 1;
                                break;
                            }
                        }
                        GameMain.app.mGameRank.mLevel.text = (mLevelName1[level1-1]).toString(); 
                       
                    }
                }

                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }

                GameMain.app.mGameRank.parseRankData(mData);
                

                wx.hideLoading({});
            }
            _this.mHttpCall = null;
        }

        wx.showLoading({
            title: "",
            mask: true
        });

        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);

        console.log(this.mCmd["rank"]);
        let params: Object = [];
        params['uid'] = this.mUID;
        params['page'] = page;
        let str = this.mURL + this.mCmd["rank"] + util.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    private onHttpRequestError(e: any): void {
        wx.hideLoading({});
        this.mHttpCall = null;
        // GameMain.app.mGameScene.showNetError();
        console.log("onHttpRequestError:" + e);
    }



    public openAlbumSeting(): void {
        let _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权保存图片到相册',
            showCancel: false,
            cancelText: '取消',
            confirmText: "确认",
            success: function (res) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.writePhotosAlbum'] == false) {
                        }
                        else {
                            _this.saveToAlbum();
                        }
                    }
                });
            }
        });
    }
    public dealAlbum(): void {
        let _this = this;
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
                _this.saveToAlbum();
            },
            fail: function (res) {
                _this.openAlbumSeting();
            }
        });
    }
    public saveImage(file: string): void {
        this.mSaveImage = file;
        let _this = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.writePhotosAlbum'] == null) {
                    _this.dealAlbum();
                }
                else {
                    if (res.authSetting['scope.writePhotosAlbum'] == true) {
                        _this.saveToAlbum();
                    }
                    else {
                        _this.openAlbumSeting();
                    }
                }
            },
            fail: function (res) {
                _this.dealAlbum();
            }
        });
    }
    public saveToAlbum(): void {
        wx.saveImageToPhotosAlbum({
            filePath: this.mSaveImage,
            success: function (res) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    image: "",
                    duration: 2000
                });
            }
        });
    }

    /**
     * 测量屏幕尺寸
     */
    public getBrowserInfo(): void {
        var info = wx.getSystemInfoSync();
        mainInst.mSDKVersion = info['SDKVersion'];
        // mainInst.mScreenHeight = Number(info['screenHeight']);
        // mainInst.mScreenWidth = Number(info['screenWidth']);
        // console.log("width = "+mainInst.mScreenWidth+",height="+mainInst.mScreenHeight);
    }
    //根据百分比显示更多好玩
    //isIndex 是否是首页广告
    public initMoreGame(btn: Laya.Image, isIndex: boolean = false): void {
        var total: number = 0;
        for (var i = 0; i < this.mMoreGames.length; i++) {
            if (Laya.Browser.onAndriod == true && Number(this.mMoreGames[i]['sys']) == 2)
                total = total + Number(this.mMoreGames[i]['random']);
            if (Laya.Browser.onIOS == true && Number(this.mMoreGames[i]['sys']) == 1)
                total = total + Number(this.mMoreGames[i]['random']);
            if (Number(this.mMoreGames[i]['sys']) == 0)
                total = total + Number(this.mMoreGames[i]['random']);
        }

        var rd: number = Math.floor(Math.random() * total) - 1;
        total = 0;

        for (var i = 0; i < this.mMoreGames.length; i++) {
            if (Number(this.mMoreGames[i]['sys']) == 0)
                total = total + Number(this.mMoreGames[i]['random']);
            else if (Laya.Browser.onAndriod == true && Number(this.mMoreGames[i]['sys']) == 2)
                total = total + Number(this.mMoreGames[i]['random']);
            else if (Laya.Browser.onIOS == true && Number(this.mMoreGames[i]['sys']) == 1)
                total = total + Number(this.mMoreGames[i]['random']);
            if (rd <= total) {
                btn.name = this.mMoreGames[i]['id'];
                if (isIndex) {
                    btn.skin = this.mMoreGames[i]['btn'];
                } else {
                    btn.skin = this.mMoreGames[i]['icon'];
                }
                return;
            }
        }
    }





    public getMoreUrl(id: string): Object {
        for (var i = 0; i < this.mMoreGames.length; i++) {
            if (Number(id) == Number(this.mMoreGames[i]['id']))
                return this.mMoreGames[i];
        }
        return null;
    }


    public reportADHit(id: string): void {
        let _this = this;
        function onResult(e: any): void {
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);

        console.log("qq/data");
        let params: Object = [];
        params['uid'] = this.mUID;
        params['id'] = id;
        let str = this.mURL + "1.0.2/qq/data?" + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    public reportData(type: number): void {
        let _this = this;
        function onResult(e: any): void {
            let ret: Object = null;
            ret = util.getJSON(e);
            console.log(ret);

            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);

        console.log("uo/ad");
        let params: Object = [];
        params['uid'] = this.mUID;
        params['type'] = type;
        let str = this.mURL + "1.0.1/xn/ad?" + util.getUrlParams(params, "1.0.1");
        this.mHttpCall.send(str, null, 'get', 'text');
    }

    // public showMoreGamePage(btn: Laya.Image): void {
    //     var url: string = mainInst.mWX.getMoreUrl(btn.name);
    //     mainInst.mWX.reportADHit(btn.name);
    //     console.log(url);
    //     wx.previewImage({
    //         urls: [url],
    //         success: (res) => {
    //             wx.hideLoading({});
    //             console.log('预览图片成功');
    //         }
    //     });
    // }


    public initGameClub(offset: number): void {
        let topY = 15 + offset / 2;
        if (mainInst.mSDKVersion >= "2.0.3") {
            this.gameClub = wx.createGameClubButton({
                icon: 'dark',
                style: {
                    left: 15,
                    top: topY,
                    width: 30,
                    height: 30
                }
            });
            // this.gameClub.hide();
        }
    }
}

