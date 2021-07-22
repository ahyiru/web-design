/* myfunc */
$(function(){

	var mymap=function(obj){
		var ul='';
		obj.map(function(i,j){
			ul+='<li>'+i+'</li>';
		})
		return ul;
	}


	// head left
	var cities=['北京','上海','天津','重庆','内蒙古','山西','河北','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','四川','贵州','云南','西藏','陕西','甘肃','宁夏','青海','新疆','香港','澳门','台湾','海外'];
	var local=localStorage.getItem('coo')-0;
	var rdc=!isNaN(local)?local:~~(Math.random()*cities.length);
	var rd_city=cities[rdc];
	var lul='';
	cities.map(function(i){
		lul+='<li>'+i+'</li>';
	});
	$('.cities').append('<ul>'+lul+'</ul>');
	$('.cities li').eq(rdc).addClass('sel');

	$('.cities li').each(function(i){
		$(this).on('click',function(){
			localStorage.setItem('coo',i);
			location.reload();
		})
	});
	
	$('.local').text(rd_city);

	// head right
	var head_r=['您好，请登录','注册','我的账户','我的订单','优惠卷','帮助'],
		head_r_url=['href="#"','href="#"','href="#"','href="#"','href="#"','href="#"'];
	var rul='';
	head_r.map(function(i,j){
		rul+='<li><a '+head_r_url[j]+'>'+i+'</a></li>';
	});
	$('.head_r').append('<ul>'+rul+'</ul>');

	var myinfo='<div class="h-drop"><div class="drop-title">'+head_r[2]+'</div><div class="drop-area myinfo"></div></div>';
	$('.head_r>ul>li').eq(2).html(myinfo);

	var ins=['请登录','登录','待付款订单','待签收订单','支付卡账户','优惠卷','电子礼品卡','我的消息','我的订单','我的积分','我的收藏','兑换卷'],
		ins_url=['href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"'];
	var ins_txt='<div class="ins-title"><span>'+ins[0]+'</span><span class="btn btn-sm btn-success ins-logn">'+ins[1]+'</span></div><div class="ins-left"></div><div class="ins-right"></div>'
	$('.myinfo').append(ins_txt);
	var ins_l='',ins_r='';
	for(var i=0;i<(ins.length-2)/2;i++){
		ins_l+='<p><a '+ins_url[i+2]+'>'+ins[i+2]+'</p>';
		ins_r+='<p><a '+ins_url[i+7]+'>'+ins[i+7]+'</p>';
	}
	$('.ins-left').append(ins_l);
	$('.ins-right').append(ins_r);


	var ico=' <i class="fa fa-angle-down"></i>';
	$('.drop-title').append(ico);

	$('.h-drop').on('mouseover',function(){
		$(this).find('.drop-area').show();
		$(this).find('.drop-title i').attr('class','fa fa-angle-up');
	}).on('mouseout',function(){
		$(this).find('.drop-area').hide();
		$(this).find('.drop-title i').attr('class','fa fa-angle-down');
	});
	/****************************************************************************/

	$('.h-close').on('click',function(){
		$('.h-ads').remove();
	});
	var search=['中秋月饼','十一出游','小米','9.9元','1折促销','精美礼盒','耐克'],
		search_url=['href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"'];
	var sul='';
	search.map(function(i,j){
		sul+='<li><a '+search_url[j]+'>'+i+'</a></li>';
	});
	$('.search').append('<ul>'+sul+'</ul>');

	/****************************************************************************/

	var nav=['闪购区','团购区','包邮区','精选食品','自有品牌','进口食品','各地特产','大客户','产地直送'],
		nav_url=['href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"','href="#"'];
	var nav_ul='';
	nav.map(function(i,j){
		nav_ul+='<li><a '+nav_url[j]+'>'+i+'</a></li>';
	})
	$('.nav-m').append('<ul>'+nav_ul+'</ul>');

	//nl-list
	var nl_title='全部商品分类';
	$('.nl-title').text(nl_title);

	var nl_list=['分类1','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9','分类10','分类11','分类12'];
	var nlist_ul=mymap(nl_list);
	$('.nl-list').append('<ul>'+nlist_ul+'</ul>');

	var mylist_item=[];
	nl_list.map(function(k,v){
		var li='';
		for(var i=0;i<18;i++){
			li+='<li><a href="#">'+k+'-'+i+'</a></li>'
		}
		mylist_item[v]=li;
	})

	$('.nl-list').append('<div class="show-list"><div class="mylist-item"></div><ul></ul></div>');

	$('.nl-list li').append('<span class="nl-right"><i class="fa fa-angle-right"></i></span>');

	$('.nl-list li').each(function(i){
		$(this).hover(function(){
			$('.show-list').show();
			$('.mylist-item').text($(this).text());
			$('.show-list>ul').text('');
			$('.show-list>ul').append(mylist_item[i]);
		},function(){
			$('.show-list').hide();
		})
	})

	$('.show-list').hover(function(){
		$('.show-list').show();
	},function(){
		$('.show-list').hide();
	})


	/****************************************************************************/

	var obj=[{
		'id':'1F',
		'name':'水果',
		'type':['水果a','水果b','水果c','水果d','水果e','水果f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		},{
		'id':'2F',
		'name':'肉类',
		'type':['肉类a','肉类b','肉类c','肉类d','肉类e','肉类f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		},{
		'id':'3F',
		'name':'休闲食品',
		'type':['休闲食品a','休闲食品b','休闲食品c','休闲食品d','休闲食品e','休闲食品f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		},{
		'id':'4F',
		'name':'酒水',
		'type':['酒水a','酒水b','酒水c','酒水d','酒水e','酒水f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		},{
		'id':'5F',
		'name':'各地特产',
		'type':['各地特产a','各地特产b','各地特产c','各地特产d','各地特产e','各地特产f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		},{
		'id':'6F',
		'name':'进口食品',
		'type':['进口食品a','进口食品b','进口食品c','进口食品d','进口食品e','进口食品f'],
		'fctImg':'pic/1.png',
		'fcmUrl':['#','#','#','#','#','#'],
		'fcmTxt':['产地直采','进口水果','国产水果','加工蔬菜','精品蔬菜','有机蔬菜'],
		'fcbUrl':['#','#','#'],
		'fcbTxt':['10分钟轻松搞定一桌大餐','时令水果解油腻','精选新鲜蔬菜5.5元起'],
		'pdtImg':['img/t1.jpg','img/t2.jpg','img/t3.jpg','img/t4.jpg'],
		'pdbImg':['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
		'pdPri':'￥22.00',
		'priUrl':'#'
		}];

	$('.hf').each(function(i){
		
		var type=obj[i].type,
			id=obj[i].id,
			name=obj[i].name,
			fctImg=obj[i].fctImg,
			fcmUrl=obj[i].fcmUrl,
			fcbUrl=obj[i].fcbUrl,
			fcmTxt=obj[i].fcmTxt,
			fcbTxt=obj[i].fcbTxt,
			pdtImg=obj[i].pdtImg,
			pdbImg=obj[i].pdbImg,
			pdPri=obj[i].pdPri,
			priUrl=obj[i].priUrl;

		//floor-t
		var li='';
		type.map(function(v){
			li+='<li>'+v+'</li>';
		});
		$(this).find('.floor-t').append('<span class="ft-flag">'+id+'</span><span class="ft-txt">'+name+'</span><ul>'+li+'</ul>');


		//fc-left
		$(this).find('.fcl-t').append('<img src='+fctImg+'>');
		var fcm='';
		fcmUrl.map(function(v,k){
			if(k%2==0) fcm+='<p>';
			fcm+='<a href='+v+'>'+fcmTxt[k]+'</a>';
			if(k%2==1) fcm+='</p>';
		})
		$(this).find('.fcl-m').append(fcm);

		var fcb='';
		fcbUrl.map(function(v,k){
			fcb+='<p><a href='+v+'>'+fcbTxt[k]+'</a></p>';
		})
		$(this).find('.fcl-b').append('<h4>劲爆大促</h4>'+fcb);

		//pd-lt
		var pdt='';
		pdtImg.map(function(v,k){
			pdt+='<div class="pdt-img"><img src='+v+'><div class="pd-price"><a href='+priUrl+'></a><span>'+pdPri+'</span></div></div>';
		})
		//$(this).find('.pd-lt').append(pdt);

		//pd-lb
		var pdb='';
		pdbImg.map(function(v,k){
			pdb+='<div class="pdb-img"><img src='+v+'><div class="pd-price"><a href='+priUrl+'></a><span>'+pdPri+'</span></div></div>';
		})
		//$(this).find('.pd-lb').append(pdb);

		var fcRight='<div class="pd-list"><div class="pd-lt">'+pdt+'</div><div class="pd-lb">'+pdb+'</div></div>';

		var tpList='';
		for(var n=0,m=type.length;n<m;n++){
			tpList+=fcRight;
		}

		//fc-right
		$(this).find('.fc-right').append(tpList);

		$(this).find('.pd-list').each(function(x){
			$(this).find('.pd-price').each(function(y){
				$(this).find('a').text(type[x]+''+(y+1));
			})
		})
		

	})

	/****************************************************************************/

	$('.hf').each(function(){
		var a=$(this);
		a.find('li:eq(0)').addClass('ft-sel');
		a.find('.pd-list:eq(0)').show();

		a.find('li').each(function(i){
			$(this).on('mouseenter',function(){
				$(this).addClass('ft-sel').siblings().removeClass('ft-sel');
				a.find('.pd-list').eq(i).show().siblings().hide();
			})
		})
	})

})