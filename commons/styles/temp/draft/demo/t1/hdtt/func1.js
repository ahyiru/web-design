$(function(){

  $(window).load(function(){ 
    $('.title').css({'transform':'translateX(0)','opacity':1});
    $('.download').css({'transform':'translateY(0%)','opacity':1});
    $('.ip1').css({'transform':'translateY(0)','opacity':1});
    $('.ip2').css({'transform':'translateX(0)','opacity':1});
  });

  var img=[
    '<img src="./pic/1.png">',
    '<img src="./pic/2.png">',
    '<img src="./pic/3.png">',
    '<img src="./pic/4.png">',
    '<img src="./pic/5.png">',
    '<img src="./pic/6.png">',
    '<img src="./pic/7.png">',
    '<img src="./pic/8.png">',
    '<img src="./pic/9.png">',
    '<img src="./pic/10.png">',
    '<img src="./pic/11.png">',
    '<img src="./pic/12.png">',
    '<img src="./pic/13.png">'
  ];
  var l=img.length;

  var tpl='<div class="yis"><div class="prev"></div><div class="active"></div><div class="next"></div></div>';

  $('.iphone__screen').append(tpl);

  var yis1=$('.yi1>.yis');
  var yis2=$('.yi2>.yis');

  var yi1=$('.yi1>.yis>div');
  var yi2=$('.yi2>.yis>div');

  yi1.eq(0).html(img[l-1]);
  yi1.eq(1).html(img[0]);
  yi1.eq(2).html(img[1]);

  yi2.eq(0).html(img[0]);
  yi2.eq(1).html(img[1]);
  yi2.eq(2).html(img[2]);

  var timer1=setInterval(function(){
    r2l(yi1);
    r2l(yi2);
    loadPic(yis1);
    loadPic(yis2);
  },3000);

  function loadPic(div){
    for(var i=0,l=img.length;i<l;i++){
      if(img[i]==div.find('.active').html()){

        var pi=i-1;
        if(pi<0) pi=l-1;

        var ni=i+1;
        if(ni>l-1) ni=0;

        div.find('.prev').html(img[pi]);
        div.find('.next').html(img[ni]);
      }
    }
  };
  function r2l(div){
    div.each(function(i){
      if($(this).hasClass('prev')){
        $(this).css({'left':'100%','transition':'none'});
        $(this).removeClass('prev').addClass('next');
      }
      else if($(this).hasClass('active')){
        $(this).css({'left':'-100%','transition':'left .8s'});
        $(this).removeClass('active').addClass('prev');
      }
      else{
        $(this).css({'left':'0','transition':'left .8s'});
        $(this).removeClass('next').addClass('active');
      }
    });
  };
 })