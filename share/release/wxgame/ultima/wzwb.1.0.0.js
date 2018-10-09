;(function() {
  var doc = document;
  var wz = new Object();
  
  var onKeyDownName;
  var onAgainName;
  var onBackBtnName;
  var onInitValue = new Array;
  onceClosePage = false;
  
  Array.prototype.contains = function ( needle ) {
	  for (i in this) {
	    if (this[i] == needle) return true;
	  }
	  return false;
	}
  
  var getFnName = function(callee){
      var _callee = callee.toString().replace(/[\s\?]*/g,""),
      comb = _callee.length >= 50 ? 50 :_callee.length;
      _callee = _callee.substring(0,comb);
      var name = _callee.match(/^function([^\(]+?)\(/);
      if(name && name[1]){
        return name[1];
      }
      var caller = callee.caller,
      _caller = caller.toString().replace(/[\s\?]*/g,"");
      var last = _caller.indexOf(_callee),
      str = _caller.substring(last-30,last);
      name = str.match(/var([^\=]+?)\=/);
      if(name && name[1]){
        return name[1];
      }
      return "anonymous"
    };
  
	function onInit(rjson){//注册
		onInitValue = rjson.apilists;
		if (window.app) {
			var onjson = {'code':0,'msg':'成功'};
		}else{
			var onjson = {'code':1,'msg':'失败'};
		}
		
		return onjson;
	}
	function closePage(rjson){//关闭当前页面
		if(onInitValue.contains(getFnName(arguments.callee))){
			if(onceClosePage == false){
				onceClosePage = true;
				app.closePage(JSON.stringify(rjson));
			}
		 }
	}

	function userPage(rjson){//打开用户界面
		if(onInitValue.contains(getFnName(arguments.callee))){
	 	 	app.userPage(JSON.stringify(rjson));
		}
	}
	function gameReady(rjson) {//显示游戏界面
	 	 	app.gameReady(JSON.stringify(rjson));
	}
	function showAppBtn(rjson) {//app按钮是否显示
		if(onInitValue.contains(getFnName(arguments.callee))){
	 	 	app.showAppBtn(JSON.stringify(rjson));
		}
	}
	function onKeyDown(callback){//通知游戏按了手机按钮
		window['onKeyDownName'] = callback;
	}
	function onKeyDownCallback(data) {
		window['onKeyDownName'](data);
	}
	function downloadSound(rjson){//预下载音乐
		if(onInitValue.contains(getFnName(arguments.callee))){
			app.downloadSound(JSON.stringify(rjson))
		}
	}
	function playSound(rjson){//播放音效
		if(onInitValue.contains(getFnName(arguments.callee))){
			app.playSound(JSON.stringify(rjson))
		}
	}
	function onBackBtn(callback) {//注册按钮回调
		window['onBackBtnName'] = callback;
	}
	function onBtnCallBack(data) {
		window['onBackBtnName'](data);
	}
	function setMic(rjson) {//关闭麦克风
		if(onInitValue.contains(getFnName(arguments.callee))){
			app.setMic(JSON.stringify(rjson))
		}
	}
	function onAgain(rjson,callback){//再来一局及结算框
		window['onAgainName'] = callback;
		if(onInitValue.contains(getFnName(arguments.callee))){
			app.onAgain(JSON.stringify(rjson))
		}	
	}
	function onAgainCallback(data) {
		window['onAgainName'](data);
	}
	function closeAgain(rjson) {//关闭再来一局对话框
		if(onInitValue.contains(getFnName(arguments.callee))){
			app.closeAgain(JSON.stringify(rjson))
		}
	}
	function createText(rjson) {//生成文字图片
		if(onInitValue.contains(getFnName(arguments.callee))){
			var returnV = app.createText(JSON.stringify(rjson))
			return returnV
		}
	}
	function getAppKey(rjson) {//获取游戏sign
		if(onInitValue.contains(getFnName(arguments.callee))){
			var returnV = app.getAppKey(JSON.stringify(rjson))
			return returnV
		}
	}
	window.wz = {
		onInit:onInit,
		closePage:closePage,
		userPage:userPage,
		gameReady:gameReady,
		showAppBtn:showAppBtn,
		downloadSound:downloadSound,
		playSound:playSound,
		onKeyDown:onKeyDown,
		onKeyDownCallback:onKeyDownCallback,
		onAgain:onAgain,
		onAgainCallback:onAgainCallback,
		onBackBtn:onBackBtn,
		onBtnCallBack:onBtnCallBack,
		setMic:setMic,
		closeAgain:closeAgain,
		createText:createText,
		getAppKey:getAppKey
	}

})();