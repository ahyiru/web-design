'use strict';
/* function.js */

$(function(){
  var drop=$('.y-drop');
  var fadeIn,fadeOut;
  drop.hover(function(){
    clearTimeout(fadeOut);
    fadeIn=setTimeout(function(){
      drop.find('>ul').slideDown(150);
    },200);
  },function(){
    clearTimeout(fadeIn);
    fadeOut=setTimeout(function(){
      drop.find('>ul').slideUp(150);
    },200);
  });

  $(window).scroll(function(){
    var st=$(this).scrollTop();
    if(st>42){
      $('.yt1').addClass('y-pha');
      $('.y-page-container').addClass('ypc-top');
    }
    else{
      $('.yt1').removeClass('y-pha');
      $('.y-page-container').removeClass('ypc-top');
    }

    if(st>500){
      $('.y-back-top').addClass('show');
    }
    else{
      $('.y-back-top').removeClass('show');
    }

  });

  $('.y-back-top').hover(function(){
    $(this).addClass('ybt-hover');
  },function(){
    $(this).removeClass('ybt-hover');
  });

  $('.y-back-top').on('click',function(){
    $('body,html').animate({scrollTop:0},200);
    return false;
  })


  $('.y-slide-l,.y-slide-r').hover(function(){
    $(this).find('>i').css('color','#fff');
  },function(){
    $(this).find('>i').css('color','#aaa');
  });

  $('.y-img>img:eq(0)').addClass('y-fade');
  $('.y-slide-btn>li:eq(0)').addClass('y-bgc');

  $('.y-slide-r').on('click',function(){
    clearInterval(ytm);
    ytm=setInterval(autoSlide,8000);

    $('.y-img>img').each(function(i){
      if($(this).hasClass('y-fade')){
        // if(i<4){
          var next=i+1>4?0:i+1;
          $(this).removeClass('y-fade');
          // $(this).next().addClass('y-fade');
          $('.y-img>img').eq(next).addClass('y-fade');

          $('.y-slide-btn>li:eq('+i+')').removeClass('y-bgc');
          $('.y-slide-btn>li:eq('+next+')').addClass('y-bgc');
          return false;
        // }
      }
    });
  });
  $('.y-slide-l').on('click',function(){
    clearInterval(ytm);
    ytm=setInterval(autoSlide,8000);

    $('.y-img>img').each(function(i){
      if($(this).hasClass('y-fade')){
        // if(i>0){
          var next=i-1<0?4:i-1;
          $(this).removeClass('y-fade');
          // $(this).prev().addClass('y-fade');
          $('.y-img>img').eq(next).addClass('y-fade');

          $('.y-slide-btn>li:eq('+i+')').removeClass('y-bgc');
          $('.y-slide-btn>li:eq('+next+')').addClass('y-bgc');
          return false;
        // }
      }
    });
  });

  var simg=0;
  function autoSlide(){
    if(simg==5) simg=0;
    var j=simg+1;
    if(simg==4) j=0;
    $('.y-img>img:eq('+simg+')').removeClass('y-fade');
    $('.y-img>img:eq('+j+')').addClass('y-fade');

    $('.y-slide-btn>li:eq('+simg+')').removeClass('y-bgc');
    $('.y-slide-btn>li:eq('+j+')').addClass('y-bgc');

    simg++;
  };

  var ytm=setInterval(autoSlide,8000);

  $('.y-slide-btn>li').each(function(i){
    $(this).on('click',function(){
      clearInterval(ytm);
      ytm=setInterval(autoSlide,8000);
      
      $(this).addClass('y-bgc').siblings().removeClass('y-bgc');
      $('.y-img>img:eq('+i+')').addClass('y-fade').siblings().removeClass('y-fade');
    })
  });


  $('.y-s1b').hover(function(){
    $(this).find('.y-s1bt').addClass('y-s1a');
  },function(){
    $(this).find('.y-s1bt').removeClass('y-s1a');
  });


  $('.y-s2b').hover(function(){
    $(this).find('a>span').addClass('y-s2b-hv');
  },function(){
    $(this).find('a>span').removeClass('y-s2b-hv');
  });

  $('.y-s3b').hover(function(){
    $(this).find('.y-sll,.y-slr').fadeIn();
  },function(){
    $('.y-sll,.y-slr').fadeOut();
  });

  /* s4 */
  $('.y-s4b').hover(function(){
    $(this).addClass('y-s4-hover');
  },function(){
    $(this).removeClass('y-s4-hover');
  });


})