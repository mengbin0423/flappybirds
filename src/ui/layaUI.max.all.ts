
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class currentScoreUI extends View {
		public currentScore:laya.display.Text;
		public cards:laya.display.Text;
		public videoRevive:Laya.Image;
		public invincible:Laya.Image;
		public nouseBtn:Laya.Image;
		public jumpNow:Laya.Image;
		public nextFriend:Laya.Image;
		public currentAvart:Laya.Image;
		public friendScore:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"sizeGrid":"2,2,2,2","height":1334}},{"type":"Image","props":{"y":297,"x":75,"width":600,"skin":"res/bg1.png","height":650},"child":[{"type":"Text","props":{"y":65,"x":203,"width":194,"valign":"middle","text":"-  当前成绩  -","height":29,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Text","props":{"y":124,"x":0,"width":600,"var":"currentScore","text":"80米","height":93,"fontSize":80,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":289,"x":60,"width":480,"skin":"res/useCard.png","height":40}},{"type":"Image","props":{"y":384,"x":228,"width":62,"skin":"res/icon_card.png","height":56}},{"type":"Text","props":{"y":396,"x":322,"width":53,"var":"cards","valign":"middle","text":"x 0","height":30,"fontSize":40,"color":"#FF6666"}},{"type":"Image","props":{"y":508,"x":58,"width":224,"var":"videoRevive","skin":"res/mid_btn.png","height":84}},{"type":"Image","props":{"y":508,"x":188,"var":"invincible","skin":"res/btn_ressurgence.png"}},{"type":"Image","props":{"y":508,"x":318,"var":"nouseBtn","skin":"res/btn_nouse.png"}}]},{"type":"Image","props":{"y":995,"x":297,"var":"jumpNow","skin":"res/btn_pass.png"}},{"type":"Image","props":{"y":1084,"x":75,"var":"nextFriend","skin":"res/nextby.png"},"child":[{"type":"Image","props":{"y":20,"x":366,"width":80,"var":"currentAvart","height":80}},{"type":"Text","props":{"y":46,"x":474,"var":"friendScore","text":"678米","fontSize":30,"color":"#FFEA80"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.currentScoreUI.uiView);

        }

    }
}

module ui {
    export class mainUI extends View {
		public bk1:Laya.Image;
		public bk2:Laya.Image;
		public land:Laya.Sprite;
		public s1:Laya.Image;
		public s2:Laya.Image;
		public s3:Laya.Image;
		public s4:Laya.Image;
		public game:Laya.Sprite;
		public guide:Laya.Image;
		public mScore:Laya.Label;
		public btnReplay:Laya.Image;
		public currentBg:Laya.Image;
		public currentResult:Laya.Image;
		public curentScore:laya.display.Text;
		public heart:Laya.Image;
		public cards:laya.display.Text;
		public nouse:Laya.Image;
		public invincible:Laya.Image;
		public nouseBtn:Laya.Image;
		public isRevive:Laya.Label;
		public resumText:Laya.Image;
		public resumBtn:Laya.Image;
		public toAv:Laya.Image;
		public videoIcon:Laya.Image;
		public btnClose:Laya.Image;
		public jumpNow:Laya.Image;
		public nextFriend:Laya.Image;
		public timeout:Laya.Image;
		public timeNum:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bk1","skin":"bird/bg_day.png","height":1334}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bk2","skin":"bird/bg_night.png","height":1334}},{"type":"Sprite","props":{"y":1042,"x":0,"width":0,"var":"land","height":0},"child":[{"type":"Image","props":{"var":"s1","skin":"bird/land.png","sizeGrid":"75,21,29,27","height":292}},{"type":"Image","props":{"y":0,"x":336,"var":"s2","skin":"bird/land.png","sizeGrid":"75,21,29,27","height":292}},{"type":"Image","props":{"y":0,"x":672,"var":"s3","skin":"bird/land.png","sizeGrid":"75,21,29,27","height":292}},{"type":"Image","props":{"y":0,"x":1008,"var":"s4","skin":"bird/land.png","sizeGrid":"75,21,29,27","height":292}}]},{"type":"Sprite","props":{"var":"game"}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"guide","skin":"bb.png","sizeGrid":"2,2,2,2","height":1334},"child":[{"type":"Image","props":{"skin":"res/guid.png","centerY":0,"centerX":0}}]},{"type":"Label","props":{"y":65,"x":375,"var":"mScore","text":"888","strokeColor":"#000000","stroke":2,"fontSize":36,"color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":662,"x":371,"var":"btnReplay","skin":"bird/button_play.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"currentBg","height":1334},"child":[{"type":"Image","props":{"y":307,"x":85,"width":600,"var":"currentResult","skin":"res/bg1.png","height":650},"child":[{"type":"Text","props":{"y":65,"x":0,"width":600,"valign":"middle","text":"-  当前成绩  -","height":29,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Text","props":{"y":124,"x":0,"width":600,"var":"curentScore","text":"80米","height":93,"fontSize":80,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":384,"x":228,"width":62,"var":"heart","skin":"res/icon_card.png","height":56}},{"type":"Text","props":{"y":396,"x":322,"width":53,"visible":false,"var":"cards","valign":"middle","text":"x 0","height":30,"fontSize":40,"color":"#FF6666"}},{"type":"Image","props":{"y":493,"x":317,"width":224,"var":"nouse","skin":"res/btn_nouse.png","height":84}},{"type":"Image","props":{"y":508,"x":188,"var":"invincible","skin":"res/btn_ressurgence.png"}},{"type":"Image","props":{"y":500,"x":71,"var":"nouseBtn","skin":"res/btn_use.png"}},{"type":"Label","props":{"y":266,"x":0,"width":600,"var":"isRevive","valign":"middle","text":"是否复活？","height":81,"fontSize":32,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":294,"x":63,"var":"resumText","skin":"res/resum_2_txt.png"}},{"type":"Image","props":{"y":442,"x":195,"var":"resumBtn","skin":"res/resum_2_btn.png"}},{"type":"Image","props":{"y":500,"x":328,"width":224,"var":"toAv","skin":"res/mid_btn.png","name":"toAv","height":84}},{"type":"Image","props":{"y":380,"x":254,"var":"videoIcon","skin":"res/mid_icon.png"}},{"type":"Image","props":{"y":27,"x":502,"var":"btnClose","skin":"res/btn_close.png"}}]},{"type":"Image","props":{"y":1005,"x":307,"var":"jumpNow","skin":"res/btn_pass.png"}},{"type":"Image","props":{"y":1094,"x":85,"var":"nextFriend","skin":"res/nextby.png"},"child":[{"type":"Image","props":{"y":20,"x":366,"width":80,"height":80}},{"type":"Text","props":{"y":46,"x":474,"text":"678米","fontSize":30,"color":"#FFEA80"}}]}]},{"type":"Image","props":{"y":466,"x":263,"var":"timeout","skin":"res/timeOut.png"},"child":[{"type":"Text","props":{"y":63,"x":86,"var":"timeNum","text":"3","fontSize":120,"color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.mainUI.uiView);

        }

    }
}

module ui {
    export class rankPageUI extends View {
		public rankBg:Laya.Image;
		public backBtn:Laya.Image;
		public rankTitle:Laya.Image;
		public rankbg:Laya.Image;
		public mlist:Laya.List;
		public rankbk:Laya.Image;
		public mRank:laya.display.Text;
		public myFace:Laya.Image;
		public mUser:laya.display.Text;
		public mLevel:laya.display.Text;
		public mScore:Laya.Label;
		public lastPage:Laya.Image;
		public nextPage:Laya.Image;
		public startChallenge:Laya.Image;
		public rankSprite:Laya.Sprite;
		public rankBack:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"width":750,"var":"rankBg","skin":"res/bg.png","height":1334}},{"type":"Image","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":20,"x":20,"var":"backBtn","skin":"res/back_btn.png"}},{"type":"Image","props":{"y":140,"x":251,"var":"rankTitle","skin":"res/rank_friend.png"}},{"type":"Image","props":{"y":210,"x":45,"width":660,"var":"rankbg","skin":"res/rank_bg.png","height":830},"child":[{"type":"Image","props":{"y":20,"x":20,"skin":"res/list_bg.png"}},{"type":"List","props":{"y":20,"x":20,"width":620,"var":"mlist","repeatY":5,"repeatX":1,"height":647},"child":[{"type":"Box","props":{"y":0,"x":0,"width":620,"name":"render","height":124},"child":[{"type":"Image","props":{"skin":"res/rank_other_rank_bg.png","name":"rk"},"child":[{"type":"Label","props":{"y":0,"x":0,"width":64,"valign":"middle","name":"rank","height":24,"fontSize":20,"color":"#FFFFFF","align":"center"}}]},{"type":"Image","props":{"y":65,"x":90,"width":80,"name":"face","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"res/rank_other_bg.png"}}]},{"type":"Text","props":{"y":28,"x":159,"width":149,"overflow":"hidden","name":"name","height":28,"fontSize":22,"color":"#FFFFFF"}},{"type":"Image","props":{"y":72,"x":159,"width":140,"skin":"res/rank_level_bg.png","name":"ll","height":36},"child":[{"type":"Text","props":{"width":140,"valign":"middle","text":"倒立鸟蛋","name":"otherLevel","height":36,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Text","props":{"y":56,"x":471,"width":100,"valign":"middle","text":"999米","strokeColor":"#000000","stroke":4,"name":"mk","height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Line","props":{"y":123,"x":159,"toY":0,"toX":409.9999999999999,"lineWidth":1,"lineColor":"#8FB7BF"}}]}]},{"type":"Image","props":{"y":688,"x":0,"var":"rankbk","skin":"res/rank_my_rank_bg.png"},"child":[{"type":"Text","props":{"width":90,"var":"mRank","valign":"middle","text":"未上榜","height":30,"fontSize":20,"color":"#FFFFFF","align":"center"}}]},{"type":"Image","props":{"y":762,"x":112,"width":80,"var":"myFace","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"res/rank_head_self.png"}}]},{"type":"Text","props":{"y":724,"x":179,"width":149,"var":"mUser","text":"墨痕","height":22,"fontSize":22,"color":"#000000","bold":true}},{"type":"Image","props":{"y":762,"x":181,"skin":"res/rank_level_bg.png"},"child":[{"type":"Text","props":{"width":140,"var":"mLevel","valign":"middle","text":"倒立鸟蛋","height":36,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":740,"x":489,"width":100,"var":"mScore","text":"暂无成绩","strokeColor":"#000000","stroke":4,"height":30,"fontSize":30,"color":"#FFFFFF"}}]},{"type":"Image","props":{"y":1075,"x":73,"var":"lastPage","skin":"res/rank_last.png"}},{"type":"Image","props":{"y":1075,"x":393,"var":"nextPage","skin":"res/rank_next.png"}},{"type":"Image","props":{"y":1187,"x":73,"var":"startChallenge","skin":"res/btn_challege.png"}},{"type":"Sprite","props":{"y":0,"x":0,"var":"rankSprite"}},{"type":"Image","props":{"y":-7,"x":0,"width":131,"var":"rankBack","height":127}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.rankPageUI.uiView);

        }

    }
}

module ui {
    export class resultPageUI extends View {
		public resultBg:Laya.Image;
		public bbb:Laya.Image;
		public backIndex:Laya.Image;
		public shareImg:Laya.Image;
		public levelText:laya.display.Text;
		public resultAvart:Laya.Image;
		public resultScore:laya.display.Text;
		public precent:laya.display.Text;
		public resultImg:Laya.Image;
		public resultIndex:Laya.Image;
		public gameAgain:Laya.Image;
		public saveImage:Laya.Image;
		public reviveCard:Laya.Image;
		public cards:laya.display.Text;
		public moreGame:Laya.Image;
		public inviteBtn:Laya.Image;
		public friendRelay:Laya.Image;
		public giftBg:Laya.Image;
		public giftBox:Laya.Image;
		public bag:Laya.Image;
		public sendBag:Laya.Image;
		public shareBag:Laya.Image;
		public closeBtn:Laya.Image;
		public giftBagClose:Laya.Image;
		public otherGameUrl:Laya.Image;
		public addToMy:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"resultBg","skin":"res/bg.png","height":1334}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bbb","skin":"bb.png","sizeGrid":"2,2,2,2","height":1334},"child":[{"type":"Image","props":{"y":74,"x":80,"var":"backIndex","skin":"res/btn_home.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":294,"x":78,"width":600,"var":"shareImg","skin":"res/result_bg.png","height":500},"child":[{"type":"Image","props":{"y":36,"x":41,"skin":"res/result_icon.png"}},{"type":"Image","props":{"y":36,"x":352,"skin":"res/result_level_bg.png"},"child":[{"type":"Text","props":{"y":0,"x":0,"width":190,"var":"levelText","valign":"middle","text":"等级1: 大力金刚指","height":32,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":414,"x":71,"width":60,"var":"resultAvart","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"res/result_avart_mask.png"}}]},{"type":"Text","props":{"y":383,"x":119,"var":"resultScore","text":"678m","fontSize":30,"color":"#000000","bold":true}},{"type":"Text","props":{"y":418,"x":116,"var":"precent","text":"已超越98%的玩家","fontSize":20,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":87,"x":143,"width":270,"var":"resultImg","skin":"res/1.png","height":270}}]},{"type":"Image","props":{"y":71,"x":102,"width":192,"var":"resultIndex","height":199,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":835,"x":105,"width":110,"var":"gameAgain","skin":"res/btn_continue.png","height":100}},{"type":"Image","props":{"y":835,"x":225,"var":"saveImage","skin":"res/btn_save.png"}},{"type":"Image","props":{"y":835,"x":416,"var":"reviveCard","skin":"res/btn_card.png"},"child":[{"type":"Text","props":{"y":100,"x":115,"width":25,"var":"cards","text":"x2","pivotY":62,"pivotX":35,"height":18,"fontSize":24,"color":"#FFFFFF"}},{"type":"Image","props":{"y":-20,"x":58,"skin":"res/more_card.png"}}]},{"type":"Image","props":{"y":835,"x":558,"width":110,"var":"moreGame","height":100}},{"type":"Image","props":{"y":961,"x":393,"var":"inviteBtn","skin":"res/btn_invite_callenge.png"}},{"type":"Image","props":{"y":961,"x":73,"var":"friendRelay","skin":"res/friendrelay_btn.png"},"child":[{"type":"Image","props":{"y":22,"x":37,"skin":"res/dup.png"}}]},{"type":"Image","props":{"y":220,"x":669,"var":"giftBg","skin":"res/bg_gift.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":158,"x":617,"var":"giftBox","skin":"res/gift_box.png"}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bag","skin":"bb.png","height":1334},"child":[{"type":"Image","props":{"y":332,"x":72,"var":"sendBag","skin":"res/bg2.png"},"child":[{"type":"Image","props":{"y":44,"x":213,"skin":"res/txt_bag.png"}},{"type":"Image","props":{"y":188,"x":176,"skin":"res/messgae.png"}},{"type":"Image","props":{"y":454,"x":157,"var":"shareBag","skin":"res/btn_sendbag.png"}},{"type":"Image","props":{"y":21,"x":513,"var":"closeBtn","skin":"res/btn_close.png"}},{"type":"Image","props":{"y":3,"x":481,"width":119,"var":"giftBagClose","height":108}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"otherGameUrl","height":1334}},{"type":"Image","props":{"y":60,"x":190,"visible":false,"var":"addToMy","skin":"res/nnnnav.png","anchorY":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.resultPageUI.uiView);

        }

    }
}

module ui {
    export class startPageUI extends View {
		public bg:Laya.Image;
		public index:Laya.Image;
		public selfAvart:Laya.Image;
		public giftBg:Laya.Image;
		public giftBtn:Laya.Image;
		public startGame:Laya.Image;
		public friendRank:Laya.Image;
		public worldRank:Laya.Image;
		public groupRank:Laya.Image;
		public honorBtn:Laya.Image;
		public moreGamePic:Laya.Image;
		public music_btn:Laya.Image;
		public moreGame:Laya.Image;
		public mHonor:Laya.Sprite;
		public levelImg:Laya.Image;
		public levelNum:Laya.Label;
		public honorText:laya.display.Text;
		public backIndex:Laya.Image;
		public leftBtn:Laya.Image;
		public rightBtn:Laya.Image;
		public backOff:Laya.Image;
		public revive:Laya.Image;
		public reviveBg:Laya.Image;
		public closeBtn:Laya.Image;
		public cards:laya.display.Text;
		public invitBtn:Laya.Image;
		public reviveClose:Laya.Image;
		public relay:Laya.Image;
		public myface:Laya.Image;
		public myName:Laya.Label;
		public indexScore:laya.display.Text;
		public bestRelay:laya.display.Text;
		public finalScore:laya.display.Text;
		public mlist:Laya.List;
		public startRelay:Laya.Image;
		public backBtn:Laya.Image;
		public relayBack:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","skin":"res/bg.png","height":1330}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"index","height":1334},"child":[{"type":"Image","props":{"y":159,"x":362,"width":150,"var":"selfAvart","height":150,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"res/avart_mask.png"}}]},{"type":"Image","props":{"y":290,"x":45,"width":660,"skin":"res/index_logo.png","height":400},"child":[{"type":"Image","props":{"y":297,"x":615,"var":"giftBg","skin":"res/bg_gift.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":240,"x":567,"var":"giftBtn","skin":"res/btn_gift.png"}}]},{"type":"Image","props":{"y":728,"x":45,"width":660,"var":"startGame","skin":"res/start_game_btn.png","height":120}},{"type":"Image","props":{"y":876,"x":45,"var":"friendRank","skin":"res/friend_rank_btn.png","height":120}},{"type":"Image","props":{"y":876,"x":446,"var":"worldRank","skin":"res/world_rank_btn.png","height":120}},{"type":"Image","props":{"y":1024,"x":45,"var":"groupRank","skin":"res/group_rank_btn.png"}},{"type":"Image","props":{"y":1024,"x":308,"var":"honorBtn","skin":"res/honor_btn.png"}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"moreGamePic","height":1334}},{"type":"Image","props":{"y":24,"x":102,"visible":true,"var":"music_btn","skin":"res/sound_on.png"}},{"type":"Image","props":{"y":586,"x":77,"width":142,"var":"moreGame","height":168,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"var":"mHonor","height":1334},"child":[{"type":"Image","props":{"y":427,"x":145,"width":460,"skin":"res/honor_bg.png","height":472},"child":[{"type":"Image","props":{"y":70,"x":80,"width":300,"var":"levelImg","skin":"res/none.png","height":300}},{"type":"Label","props":{"y":27,"x":372,"width":20,"var":"levelNum","text":"5","height":20,"fontSize":24,"color":"#000000","bold":true,"align":"right"}},{"type":"Label","props":{"y":27,"x":400,"width":20,"text":"/14","height":20,"fontSize":24,"color":"#000000","bold":true,"align":"left"}},{"type":"Image","props":{"y":392,"x":90,"skin":"res/honor_tip_bg.png"},"child":[{"type":"Text","props":{"y":0,"x":0,"width":280,"var":"honorText","valign":"middle","text":"需要简单模式通关才点亮","height":40,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]}]},{"type":"Image","props":{"y":20,"x":20,"width":60,"var":"backIndex","skin":"res/back_btn.png","height":60}},{"type":"Image","props":{"y":615,"x":28,"width":94,"var":"leftBtn","skin":"res/left_btn.png","height":104}},{"type":"Image","props":{"y":615,"x":628,"width":94,"var":"rightBtn","skin":"res/right_btn.png","height":104}},{"type":"Image","props":{"y":295,"x":205,"skin":"res/hohor_totle.png"}},{"type":"Image","props":{"y":998,"x":208,"var":"backOff","skin":"res/back_home.png"}}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"revive","height":1334},"child":[{"type":"Image","props":{"y":320,"x":75,"width":600,"var":"reviveBg","skin":"res/bg2.png","height":600},"child":[{"type":"Image","props":{"y":45,"x":238,"skin":"res/txt_card.png"}},{"type":"Image","props":{"y":21,"x":514,"var":"closeBtn","skin":"res/btn_close.png"}},{"type":"Image","props":{"y":313,"x":229,"skin":"res/icon_card.png"}},{"type":"Text","props":{"y":333,"x":322,"width":43,"var":"cards","text":"x 0","height":30,"fontSize":30,"color":"#000000","bold":true}},{"type":"Image","props":{"y":424,"x":195,"var":"invitBtn","skin":"res/btn_invite.png"}},{"type":"Label","props":{"y":164,"x":3,"width":592,"valign":"middle","text":"邀请好友点入，可得复活卡","height":93,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":0,"x":472,"width":121,"var":"reviveClose","height":114}}]}]},{"type":"Image","props":{"y":0,"x":3,"var":"relay","skin":"res/bg.png"},"child":[{"type":"Image","props":{"y":209,"x":42,"skin":"res/rank_bg.png"},"child":[{"type":"Image","props":{"y":163,"x":24,"skin":"res/list_bg.png"}},{"type":"Image","props":{"y":34,"x":92,"width":80,"var":"myface","height":80},"child":[{"type":"Image","props":{"y":0,"x":0,"width":80,"skin":"res/rank_head_self.png","height":80}}]},{"type":"Label","props":{"y":118,"x":49,"width":166,"var":"myName","valign":"middle","text":"用户名","overflow":"hidden","height":41,"fontSize":20,"color":"#000000","bold":true,"align":"center"}},{"type":"Line","props":{"y":17,"x":231,"toY":136.6409266409267,"toX":0.9266409266408573,"lineWidth":1,"lineColor":"#A3D0D9"}},{"type":"Text","props":{"y":35,"x":287,"width":104,"text":"初始成绩：","height":33,"fontSize":20,"color":"#000000","bold":true}},{"type":"Text","props":{"y":73,"x":288,"width":104,"text":"最佳助力：","height":33,"fontSize":20,"color":"#000000","bold":true}},{"type":"Text","props":{"y":111,"x":289,"width":104,"text":"最终成绩：","height":33,"fontSize":20,"color":"#000000","bold":true}},{"type":"Image","props":{"y":31,"x":413,"width":200,"skin":"res/rank_result_bg.png","height":36},"child":[{"type":"Text","props":{"y":-2,"x":2,"width":201,"var":"indexScore","valign":"middle","text":"56米","height":42,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":73,"x":414,"width":200,"skin":"res/rank_result_bg.png","height":36},"child":[{"type":"Text","props":{"y":-2,"x":2,"width":201,"var":"bestRelay","valign":"middle","text":"100米","height":42,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":113,"x":413,"width":200,"skin":"res/rank_result_bg.png","height":36},"child":[{"type":"Text","props":{"y":-2,"x":2,"width":201,"var":"finalScore","valign":"middle","text":"156米","height":42,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"List","props":{"y":170,"x":24,"width":620,"var":"mlist","repeatY":5,"repeatX":1,"height":632},"child":[{"type":"Box","props":{"y":0,"x":0,"width":620,"name":"render","height":124},"child":[{"type":"Image","props":{"skin":"res/rank_other_rank_bg.png","name":"rk"},"child":[{"type":"Label","props":{"y":0,"x":0,"width":64,"valign":"middle","name":"rank","height":24,"fontSize":20,"color":"#FFFFFF","align":"center"}}]},{"type":"Image","props":{"y":65,"x":90,"width":80,"name":"face","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"res/rank_other_bg.png"}}]},{"type":"Text","props":{"y":28,"x":159,"width":149,"overflow":"hidden","name":"name","height":28,"fontSize":22,"color":"#FFFFFF"}},{"type":"Image","props":{"y":72,"x":159,"width":140,"skin":"res/rank_level_bg.png","name":"ll","height":36},"child":[{"type":"Text","props":{"width":140,"valign":"middle","text":"倒立鸟蛋","name":"level","height":36,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Text","props":{"y":56,"x":471,"width":100,"valign":"middle","text":"999米","strokeColor":"#000000","stroke":4,"name":"mk","height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Line","props":{"y":123,"x":159,"toY":0,"toX":409.9999999999999,"lineWidth":1,"lineColor":"#8FB7BF"}}]}]}]},{"type":"Image","props":{"y":1089,"x":69,"var":"startRelay","skin":"res/btn_relay_4.png"}},{"type":"Image","props":{"y":20,"x":20,"var":"backBtn","skin":"res/back_btn.png"}},{"type":"Image","props":{"y":0,"x":0,"width":131,"var":"relayBack","height":113}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.startPageUI.uiView);

        }

    }
}
