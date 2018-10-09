/*
* util 公用的js模板;
*/
class util{
    static mKeys:Object = {
                                "1.0.1":"neco6sYpqo8s*p0mVwnk" ,      
                          };
    constructor(){
    }
    static getUrlParams(params:Object,ver:string="1.0.1"):string
    {
        let havetick = false;
        let keys:Array<string> = new Array<string>();
        for(let key in params)
        {
            if(typeof(params[key]) != "string" && typeof(params[key]) != "number")
                continue;
            if(key == "tick")
                havetick = true;

            let aa = key.toLocaleLowerCase();    
            params[aa] = params[key];
            keys.push(aa);
        }
        if(havetick == false)
        {
            var date: Date = new Date();
            params['tick'] = Math.floor(date.getTime()/1000); 
            keys.push("tick");
        }
        keys.sort(function(a:string, b:string):number { return a > b ? 1 : -1});
        //组合
        let str = "";
        for (var index = 0; index < keys.length; index++) 
        {
            str = str + keys[index] + "=" + params[keys[index]] + "&";
        }
        let scr:string = "";
        if(util.mKeys[ver] != null)
            scr = md5(str + "key=" + util.mKeys[ver]);
            
        else
            scr = md5(str + "key=neco6sYpqo8s*p0mVwnk");//要改
        return str + "key=" + scr;
    }
    static getCDN():string
    {
        return "https://tcdn.wanzhushipin.cn/xcx/sbf/";
    }    
    static getJSON(str:string):Object
    {
        if(str == "" || str == null)
        {
            return {"code":-999};
        }
        var len:number = str.indexOf("{",0);
        str = str.substr(len,str.length - len);
        return JSON.parse(str);
    }
}