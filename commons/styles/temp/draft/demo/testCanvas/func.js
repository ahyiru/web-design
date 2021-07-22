/* canvas test
** 20160119
** yiru
*/
$(function(){
	var sel='size';
	$('.toolbar>button').each(function(){
		$(this).on('click',function(){
			sel=$(this).text();
		})
	});
	$('#canvas').css('z-index',1);
	$('#note').hide();

	var cw=document.body.clientWidth-2,ch=400,ct,cl;
	var size=1,color='red';

	var canvas=document.getElementById('canvas');
	var ctx=canvas.getContext('2d');
	ct=$(canvas).offset().top;
	cl=$(canvas).offset().left;
	canvas.width=cw;
	canvas.height=ch;

	var canvasImg=document.getElementById('imgCanvas');
	var ctxImg=canvasImg.getContext('2d');
	canvasImg.width=cw;
	canvasImg.height=ch;

	//鼠标
	canvas.addEventListener('mousedown', onMouseDown, false);
	canvas.addEventListener('mousemove', onMouseMove, false);
	canvas.addEventListener('mouseup', onMouseUp, false);
	//触摸
	canvas.addEventListener('touchstart',onMouseDown,false);
	canvas.addEventListener('touchmove',onMouseMove,false);
	canvas.addEventListener('touchend',onMouseUp,false);

	// ctx.lineWidth=size;
	// ctx.strokeStyle=color;

	var flag=false;
	var getP;

	function onMouseDown(e){
		ctx.beginPath();
		var p=pos(e);
		ctx.moveTo(p.x,p.y);
		flag=true;

		getP=p;
	};

	function onMouseMove(e){
		e.preventDefault();
		if(flag){
			if(sel=='size'){
				ctx.lineWidth=size;
				ctx.strokeStyle=color;
				var p=pos(e);
				ctx.lineTo(p.x,p.y);
				/*ctx.shadowColor=color;
				ctx.shadowBlur=1;*/
				ctx.stroke();
			}
			else if(sel=='eraser'){
				//ctx.beginPath();
				ctx.lineWidth=1;
				ctx.strokeStyle='#fff';
				var p=pos(e);
				/*ctx.moveTo(p.x-size*10,p.y-size*10);
				ctx.lineTo(p.x+size*10,p.y-size*10);
				ctx.lineTo(p.x+size*10,p.y+size*10);
				ctx.lineTo(p.x-size*10,p.y-size*10);
				ctx.lineTo(p.x-size*10,p.y-size*10);
				ctx.stroke();*/
				ctx.clearRect(p.x-size*10,p.y-size*10,size*20,size*20);
			}
		}
	};
	function onMouseUp(e){

		if(sel=='text'){
			$('#note').show();
			var tArea=$('#txtArea');
			tArea.val('');
			tArea.focus();
			tArea.off('blur').on('blur',function(){
				var txt=$(this).val();
				ctx.font='12px 微软雅黑';
				ctx.fillStyle='red';
				var p=getP;
				ctx.fillText(txt,p.x,p.y);
				$('#note').hide();
				sel='size';
			})
		};

		flag=false;
		saveData();
	};

	var pos=function(e){
		var x,y;
		if(isTouch(e)){
			x=e.touches[0].pageX-cl;
			y=e.touches[0].pageY-ct;
		}
		else{
			//x=e.layerX;
			//y=e.layerY;
			x=e.pageX-cl;
			y=e.pageY-ct;
		}
		return {x:x,y:y};
	};
	var isTouch=function(e){
		var type=e.type;
		if(type.indexOf('touch')>=0) return true;
		else return false;
	}
	var getWidth=function(){
		var xWidth=null;
		if(window.innerWidth!==null){
			xWidth=window.innerWidth;
		}
		else{
			xWidth=document.body.clientWidth;
		}
		return xWidth;
	};

	$('#clean').on('click',function(){
		ctx.clearRect(0,0,cw,ch);
	});

	//
	var cancelList=[],cancelIndex=0;

	$('#pre').on('click',function(){
		if(cancelList.length-1<cancelIndex) return false;
		pre();
	});
	$('#next').on('click',function(){
		if(cancelIndex<=0) return false;
		next();
	});

	var saveData=function(){
		cancelIndex=0;
		var dataUrl=canvas.toDataURL();
		cancelList.push(dataUrl);
	};
	var pre=function(){
		cancelIndex++;
		ctx.clearRect(0,0,cw,ch);
		var cImage=new Image();
		var index=cancelList.length-1-cancelIndex;
		if(index>=0){
			cImage.src=cancelList[index];
			cImage.onload=function(){
				ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
			}
		}
	};
	var next=function(){
		cancelIndex--;
		ctx.clearRect(0,0,cw,ch);
		var cImage=new Image();
		var index=cancelList.length-1-cancelIndex;
		cImage.src=cancelList[index];
		cImage.onload=function(){
			ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
		}
	};

	var loadImg=function(){
		var img=new Image();
		img.src='1.jpg';
		img.onload=function(){
			ctxImg.drawImage(img,0,0,cw,ch);
		}
	};
	loadImg();
 
})