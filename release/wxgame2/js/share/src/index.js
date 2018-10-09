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
//下一个超越
var nextPlayer = /** @class */ (function (_super) {
    __extends(nextPlayer, _super);
    function nextPlayer() {
        return _super.call(this) || this;
    }
    return nextPlayer;
}(ui.nextPlayerUI));
var newRank = /** @class */ (function (_super) {
    __extends(newRank, _super);
    function newRank() {
        var _this = _super.call(this) || this;
        _this.sOpenId = "";
        _this.page = 1;
        _this.pages = 0;
        _this.mLevel = 0;
        _this.mDate = [];
        _this.page = 1;
        _this.pages = 0;
        _this.sOpenId = "";
        _this.mDate = [];
        _this.lists.renderHandler = new Laya.Handler(_this, _this.updateUser);
        _this.lists.selectEnable = false;
        _this.lists.mouseEnabled = false;
        return _this;
    }
    newRank.prototype.show = function () {
        this.visible = true;
    };
    newRank.prototype.init = function (message) {
        var info = message['info'];
        this.sOpenId = info['openid'];
        var dir = message['dir'];
        console.log("dir here:" + dir);
        if (dir == "none") {
            GameMain.app.sortData(message['level']);
            this.mLevel = message['level'];
            var total = 0;
            if (this.mLevel == 0) {
                this.pages = Math.ceil(GameMain.app.mData.length / 5);
                total = GameMain.app.mData.length;
            }
            else {
                for (var i = 0; i < GameMain.app.mData.length; i++) {
                    if (this.mLevel == 1 && GameMain.app.mData[i]['map1'] > 0)
                        total = total + 1;
                    if (this.mLevel == 2 && GameMain.app.mData[i]['map2'] > 0)
                        total = total + 1;
                    if (this.mLevel == 3 && GameMain.app.mData[i]['map3'] > 0)
                        total = total + 1;
                }
                this.pages = Math.ceil(total / 5);
            }
            if (this.pages == 0)
                this.pages = 1;
            console.log("pages:" + this.pages + "," + total + "," + this.mLevel);
            var have = false;
            for (var i = 0; i < GameMain.app.mData.length; i++) {
                if (GameMain.app.mData[i]['openid'] == this.sOpenId) {
                    this.mRank.text = GameMain.app.mData[i]['rank'];
                    this.mName.text = GameMain.app.mData[i]['name'];
                    this.myLevel.text = GameMain.app.mData[i]['level'];
                    this.mFace.skin = GameMain.app.mData[i]['avatar'];
                    if (this.mLevel == 1)
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map1']) + "%";
                    else if (this.mLevel == 2)
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map2']) + "%";
                    else if (this.mLevel == 3)
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map3']) + "%";
                    else
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['mark']) + "分";
                    this.mRank.text = GameMain.app.mData[i]['rank'];
                    have = true;
                    break;
                }
            }
            this.mSelf.visible = have;
        }
        this.onFlip(dir, this.mLevel);
    };
    newRank.prototype.initGroup = function (message) {
        var groupid = message['groupid'];
        this.sOpenId = GameMain.app.mOpenID;
        var dir = message['dir'];
        console.log("dir:" + dir);
        if (dir == "none") {
            GameMain.app.sortGroupData(groupid, message['level']);
            this.mLevel = message['level'];
            if (this.mLevel == 0)
                this.pages = Math.ceil(GameMain.app.mGroups[groupid].length / 5);
            else {
                var total = 0;
                for (var i = 0; i < GameMain.app.mGroups[groupid].length; i++) {
                    if (this.mLevel == 1 && GameMain.app.mGroups[groupid][i]['map1'] > 0)
                        total = total + 1;
                    if (this.mLevel == 2 && GameMain.app.mGroups[groupid][i]['map2'] > 0)
                        total = total + 1;
                    if (this.mLevel == 3 && GameMain.app.mGroups[groupid][i]['map3'] > 0)
                        total = total + 1;
                }
                this.pages = Math.ceil(total / 5);
                if (this.pages == 0)
                    this.pages = 1;
                console.log("pages:" + this.pages + "," + total + "," + this.mLevel);
            }
            var have = false;
            for (var i = 0; i < GameMain.app.mGroups[groupid].length; i++) {
                if (GameMain.app.mGroups[groupid][i]['openid'] == this.sOpenId) {
                    this.mRank.text = GameMain.app.mGroups[groupid][i]['rank'];
                    this.mName.text = GameMain.app.mGroups[groupid][i]['name'];
                    this.myLevel.text = GameMain.app.mGroups[groupid][i]['level'];
                    this.mFace.skin = GameMain.app.mGroups[groupid][i]['avatar'];
                    if (this.mLevel == 1)
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map1']) + "%";
                    else if (this.mLevel == 2)
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map2']) + "%";
                    else if (this.mLevel == 3)
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map3']) + "%";
                    else
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['mark']) + "分";
                    this.mRank.text = GameMain.app.mGroups[groupid][i]['rank'];
                    have = true;
                    break;
                }
            }
            this.mSelf.visible = have;
        }
        this.onFlipGroup(groupid, dir, this.mLevel);
    };
    newRank.prototype.onFlip = function (dir, level) {
        if (dir === "previous")
            this.page--;
        else if (dir === "next")
            this.page++;
        else
            this.page = 1;
        if (this.page > this.pages) {
            this.page = this.pages;
            return;
        }
        else if (this.page < 1) {
            this.page = 1;
            return;
        }
        this.mDate.splice(0, this.mDate.length);
        var starIndex = (this.page - 1) * 5;
        for (var i = starIndex; i < starIndex + 5; i++) {
            var mInfo = GameMain.app.mData[i];
            if (mInfo == null || mInfo == undefined)
                break;
            mInfo['map'] = level;
            this.mDate.push(mInfo);
        }
        if (this.mDate.length == 0) {
            this.lists.array = [];
            this.page--;
            return;
        }
        this.initData();
    };
    newRank.prototype.onFlipGroup = function (groupid, dir, level) {
        if (dir === "previous")
            this.page--;
        else if (dir === "next")
            this.page++;
        else
            this.page = 1;
        if (this.page > this.pages) {
            this.page = this.pages;
            return;
        }
        else if (this.page < 1) {
            this.page = 1;
            return;
        }
        this.mDate.splice(0, this.mDate.length);
        var starIndex = (this.page - 1) * 5;
        for (var i = starIndex; i < starIndex + 5; i++) {
            var mInfo = GameMain.app.mGroups[groupid][i];
            if (mInfo == null || mInfo == undefined)
                break;
            mInfo['map'] = level;
            this.mDate.push(mInfo);
        }
        if (this.mDate.length == 0) {
            this.lists.array = [];
            this.page--;
            return;
        }
        this.initData();
    };
    newRank.prototype.initData = function () {
        this.lists.repeatY = this.mDate.length;
        this.lists.array = this.mDate;
    };
    newRank.prototype.updateUser = function (cell, index) {
        var face = cell.getChildByName("fb");
        var name = cell.getChildByName("ne");
        var rank = cell.getChildByName("rk");
        var level = cell.getChildByName("lv");
        var mark = cell.getChildByName("mk");
        name.changeText(cell.dataSource['name']);
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        level.text = cell.dataSource['level'];
        if (cell.dataSource['map'] == 0)
            mark.text = Math.floor(cell.dataSource['mark']).toString() + "分";
        else if (cell.dataSource['map'] == 1) {
            var temp = Math.floor(cell.dataSource['map1']);
            if (temp > 100)
                temp = 100;
            mark.text = temp.toString() + "%";
        }
        else if (cell.dataSource['map'] == 2) {
            var temp = Math.floor(cell.dataSource['map2']);
            if (temp > 100)
                temp = 100;
            mark.text = temp.toString() + "%";
        }
        else if (cell.dataSource['map'] == 3) {
            var temp = Math.floor(cell.dataSource['map3']);
            if (temp > 100)
                temp = 100;
            mark.text = temp.toString() + "%";
        }
        var map1 = cell.getChildByName("map_1");
        var map2 = cell.getChildByName("map_2");
        var map3 = cell.getChildByName("map_3");
    };
    return newRank;
}(ui.newRankUI));
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.mData = [];
        this.mLevel = [1050, 3050, 6050, 9050, 12050, 15050, 18050, 21050, 25050, 30050, 50050, 100050, 200050, 10000000];
        this.mLevelName = ["蠢萌菜鸟", "学飞雏鸟", "蹦跶家雀", "幼鸟展翅", "温顺鸽子", "矫健海鸥", "孔雀开屏", "优雅天鹅", "白头海雕", "北归大雁", "非洲鸵鸟", "凶猛秃鹰", "孤傲雄鹰", "浴火凤凰"];
        this.mGroups = {};
        this.mShareTicket = "";
        this.mOpenID = "";
        GameMain.app = this;
        Laya.init(750, 1334);
        Laya.ResourceManager.systemResourceManager.autoRelease = false; //开启内存管理
    }
    GameMain.prototype.init = function (message) {
        Laya.stage.width = message['width'];
        Laya.stage.height = message['height'];
        wx.getFriendCloudStorage({
            keyList: ["avatarUrl", "nickName", "city", "openId", "mark1", "map11", "map12", "map13"],
            success: function (res) {
                console.log(res);
                GameMain.app.initData(res.data);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    GameMain.prototype.initData = function (users) {
        this.mData.splice(0, this.mData.length);
        for (var i = 0; i < users.length; i++) {
            var obj = {};
            obj['name'] = users[i]['nickname'];
            var face = users[i]['avatarUrl'];
            if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                face = face.substr(0, face.length - 2);
                face = face + "/132";
            }
            obj['avatar'] = face;
            obj['openid'] = users[i]['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            for (var j = 0; j < users[i]['KVDataList'].length; j++) {
                if (users[i]['KVDataList'][j]['key'] == "mark1")
                    obj['mark'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map11")
                    obj['map1'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map12")
                    obj['map2'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map13")
                    obj['map3'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
            }
            var level = this.mLevel.length;
            for (var m = 0; m < this.mLevel.length; m++) {
                if (this.mLevel[m] > Math.floor(obj['mark'])) {
                    level = m + 1;
                    break;
                }
            }
            obj['level'] = this.mLevelName[level - 1];
            this.mData.push(obj);
        }
        console.log("initData ok");
    };
    GameMain.prototype.initGroupData = function (users) {
        if (this.mGroups[this.mShareTicket] == null)
            this.mGroups[this.mShareTicket] = [];
        var data = this.mGroups[this.mShareTicket];
        data.splice(0, data.length);
        for (var i = 0; i < users.length; i++) {
            var obj = {};
            obj['name'] = users[i]['nickname'];
            var face = users[i]['avatarUrl'];
            if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                face = face.substr(0, face.length - 2);
                face = face + "/132";
            }
            obj['avatar'] = face;
            obj['openid'] = users[i]['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            for (var j = 0; j < users[i]['KVDataList'].length; j++) {
                if (users[i]['KVDataList'][j]['key'] == "mark1")
                    obj['mark'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map11")
                    obj['map1'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map12")
                    obj['map2'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if (users[i]['KVDataList'][j]['key'] == "map13")
                    obj['map3'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
            }
            var level = this.mLevel.length;
            for (var m = 0; m < this.mLevel.length; m++) {
                if (this.mLevel[m] > Math.floor(obj['mark'])) {
                    level = m + 1;
                    break;
                }
            }
            obj['level'] = this.mLevelName[level - 1];
            data.push(obj);
        }
        console.log("initGroupData ok");
        this.showGroupRank({ show: 1, level: 0, groupid: this.mShareTicket, dir: "none" });
    };
    GameMain.prototype.sortData = function (level) {
        if (level == 1)
            this.mData.sort(function (a, b) { return a['map1'] < b['map1'] ? 1 : -1; });
        else if (level == 2)
            this.mData.sort(function (a, b) { return a['map2'] < b['map2'] ? 1 : -1; });
        else if (level == 3)
            this.mData.sort(function (a, b) { return a['map3'] < b['map3'] ? 1 : -1; });
        else
            this.mData.sort(function (a, b) { return a['mark'] < b['mark'] ? 1 : -1; });
        for (var i = 0; i < this.mData.length; i++) {
            this.mData[i]['rank'] = i + 1;
        }
    };
    GameMain.prototype.sortGroupData = function (id, level) {
        if (level == 1)
            this.mGroups[id].sort(function (a, b) { return a['map1'] < b['map1'] ? 1 : -1; });
        else if (level == 2)
            this.mGroups[id].sort(function (a, b) { return a['map2'] < b['map2'] ? 1 : -1; });
        else if (level == 3)
            this.mGroups[id].sort(function (a, b) { return a['map3'] < b['map3'] ? 1 : -1; });
        else
            this.mGroups[id].sort(function (a, b) { return a['mark'] < b['mark'] ? 1 : -1; });
        for (var i = 0; i < this.mGroups[id].length; i++) {
            this.mGroups[id][i]['rank'] = i + 1;
        }
    };
    GameMain.prototype.sendTencent = function (message) {
        var user = message['user'];
        var best = message['best'];
        var map = message['level'];
        console.log("sendtencent");
        console.log(message);
        var his = 0;
        for (var i = 0; i < GameMain.app.mData.length; i++) {
            if (GameMain.app.mData[i]['openid'] == user['openid']) {
                console.log(GameMain.app.mData[i]);
                if (map == 0) {
                    his = GameMain.app.mData[i]['mark'];
                    if (Number(message['mark']) > Number(GameMain.app.mData[i]['mark'])) {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "mark1", value: message['mark'].toString() }],
                        });
                        GameMain.app.mData[i]['mark'] = Number(message['mark']);
                    }
                }
                else if (map == 1) {
                    his = GameMain.app.mData[i]['map1'];
                    if (Number(message['mark']) > Number(GameMain.app.mData[i]['map1'])) {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "map11", value: message['mark'].toString() }],
                        });
                        GameMain.app.mData[i]['map1'] = Number(message['mark']);
                    }
                }
                else if (map == 2) {
                    his = GameMain.app.mData[i]['map2'];
                    if (Number(message['mark']) > Number(GameMain.app.mData[i]['map2'])) {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "map12", value: message['mark'].toString() }],
                        });
                        GameMain.app.mData[i]['map2'] = Number(message['mark']);
                    }
                }
                else if (map == 3) {
                    his = GameMain.app.mData[i]['map3'];
                    if (Number(message['mark']) > Number(GameMain.app.mData[i]['map3'])) {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList: [{ key: "map13", value: message['mark'].toString() }],
                        });
                        GameMain.app.mData[i]['map3'] = Number(message['mark']);
                    }
                }
                // GameMain.app.mData.sort(function(a:Object, b:Object):number { return a['mark'] < b['mark'] ? 1 : -1});
                var level = this.mLevel.length;
                for (var m = 0; m < this.mLevel.length; m++) {
                    if (this.mLevel[m] > Math.floor(GameMain.app.mData[i]['mark'])) {
                        level = m + 1;
                        break;
                    }
                }
                GameMain.app.mData[i]['level'] = this.mLevelName[level - 1];
                break;
            }
        }
        if (his == 0 && best <= Number(message['mark'])) {
            console.log("best:" + best + "," + Number(message['mark']));
            var obj = {};
            obj['name'] = user['nickName'];
            obj['avatar'] = user['avatarUrl'];
            obj['openid'] = user['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            obj['level'] = 0;
            //测试
            //message['mark'] = Math.ceil(message['mark']) + 1;
            if (map == 0) {
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "mark1", value: message['mark'].toString() }],
                });
                obj['mark'] = message['mark'];
                var level = this.mLevel.length;
                for (var m = 0; m < this.mLevel.length; m++) {
                    if (this.mLevel[m] > Math.floor(obj['mark'])) {
                        level = m + 1;
                        break;
                    }
                }
                obj['level'] = this.mLevelName[level - 1];
            }
            else if (map == 1) {
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "map11", value: message['mark'].toString() }],
                });
                obj['map1'] = message['mark'];
            }
            else if (map == 2) {
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "map12", value: message['mark'].toString() }],
                });
                obj['map2'] = message['mark'];
            }
            else if (map == 3) {
                wx.setUserCloudStorage({
                    KVDataList: [{ key: "map13", value: message['mark'].toString() }],
                });
                obj['map3'] = message['mark'];
            }
            GameMain.app.mData.push(obj);
            console.log(obj);
            console.log(GameMain.app.mData);
        }
    };
    GameMain.prototype.showRank = function (message) {
        var rank = Laya.stage.getChildByName("rank");
        if (message['show'] == 1) {
            if (rank == null) {
                rank = new newRank();
                rank.centerX = 0;
                rank.y = (Laya.stage.height - 1334) / 2;
                rank.name = "rank";
                Laya.stage.addChild(rank);
            }
            rank.show();
            rank.init(message);
        }
        else {
            if (rank != null)
                rank.visible = false;
        }
    };
    GameMain.prototype.showGroupRank = function (message) {
        var rank = Laya.stage.getChildByName("rank");
        if (message['show'] == 1) {
            if (rank == null) {
                rank = new newRank();
                rank.centerX = 0;
                rank.y = (Laya.stage.height - 1334) / 2;
                rank.name = "rank";
                Laya.stage.addChild(rank);
            }
            rank.show();
            rank.initGroup(message);
        }
        else {
            if (rank != null)
                rank.visible = false;
        }
    };
    GameMain.prototype.showGroup = function (message) {
        this.mOpenID = message['openid'];
        if (message['show'] == 1) {
            var groupid = message['groupid'];
            if (this.mGroups[groupid] != null) {
                this.showGroupRank(message);
            }
            else {
                this.mShareTicket = message['groupid'];
                wx.getGroupCloudStorage({
                    shareTicket: message['groupid'],
                    keyList: ["avatarUrl", "nickName", "openId", "mark1", "map11", "map12", "map13"],
                    success: function (res) {
                        console.log(res);
                        GameMain.app.initGroupData(res.data);
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                });
            }
        }
        else
            this.showGroupRank(message);
    };
    GameMain.prototype.showNextPlayer = function (message) {
        var next = Laya.stage.getChildByName("next");
        if (message['show'] == 1) {
            if (next == null) {
                next = new nextPlayer();
                next.centerX = 0;
                next.y = 1120 + (Laya.stage.height - 1334) / 2;
                next.name = "next";
                Laya.stage.addChild(next);
            }
            next.visible = true;
            var level = message['level'];
            var openid = message['openid'];
            this.sortData(level);
            var row = this.mData.length - 1;
            for (var i = 0; i < this.mData.length; i++) {
                if (this.mData[i]['openid'] == message['openid'])
                    continue;
                if (level == 0 && this.mData[i]['mark'] <= Number(message['mark'])) {
                    row = i - 1;
                    break;
                }
                if (level == 1 && this.mData[i]['map1'] <= Number(message['mark'])) {
                    row = i - 1;
                    break;
                }
                if (level == 2 && this.mData[i]['map2'] <= Number(message['mark'])) {
                    row = i - 1;
                    break;
                }
                if (level == 3 && this.mData[i]['map3'] <= Number(message['mark'])) {
                    row = i - 1;
                    break;
                }
            }
            if (row < 0)
                next.visible = false;
            else {
                if (this.mData[row]['openid'] == message['openid']) {
                    row = row - 1;
                    if (row < 0)
                        next.visible = false;
                }
                if (Number(message['level']) == 0)
                    next.mark.text = Math.floor(this.mData[row]['mark']) + "分";
                if (Number(message['level']) == 1)
                    next.mark.text = Math.floor(this.mData[row]['map1']) + "%";
                if (Number(message['level']) == 2)
                    next.mark.text = Math.floor(this.mData[row]['map2']) + "%";
                if (Number(message['level']) == 3)
                    next.mark.text = Math.floor(this.mData[row]['map3']) + "%";
                next.face.skin = this.mData[row]['avatar'];
            }
        }
        else {
            if (next != null)
                next.visible = false;
        }
    };
    GameMain.app = null;
    return GameMain;
}());
Laya.MiniAdpter.init(true, true);
new GameMain();
wx.onMessage(function (message) {
    console.log(message);
    if (message.type && message.type == "init") {
        GameMain.app.init(message);
    }
    if (message.type && message.type == "rank") {
        GameMain.app.showRank(message);
    }
    if (message.type && message.type == "send") {
        GameMain.app.sendTencent(message);
    }
    if (message.type && message.type == "next") {
        GameMain.app.showNextPlayer(message);
    }
    if (message.type && message.type == "group") {
        GameMain.app.showGroup(message);
    }
    if (message['isLoad'] == "filedata") {
        laya.wx.mini.MiniFileMgr.ziyuFileData[message.url] = message.data;
    }
});
//# sourceMappingURL=index.js.map