var mobileFn = function() {
  //touch for upordown
  function touchScroll() {
    var a = $(this).scrollTop();
    Math.abs(a - lastScrollTop) <= delat ||
      (a > navHight && a > lastScrollTop ?
        $(".header-v4").slideUp("150") : a + $(window).height() < $(document).height() &&
        $(".header-v4").slideDown("150"), lastScrollTop = a);
  }

}
var bindTab = function(heads, tabs, curHeadCName, curTabCName, context) {
  var old = 0,
    cur = 0;
  old = $('.cur-state').index();
  if (!heads || !tabs) {
    return;
  }
  heads = $(heads, context);
  tabs = $(tabs, context);
  //tabs.hide().eq(0).show();

  heads.parent().click(function(event) {
    var target = event.target,
      oldTab, curTab;
    cur = heads.index(target);
    cur == -1 && heads.each(function(i, h) {
      heads.eq(i).find(target).length && (cur = i);
    })
    if (cur == old) {
      return;
    }
    if (cur != -1) {
      oldTab = tabs.eq(old).hide();
      curTab = tabs.eq(cur).show();
      if (curHeadCName) {
        heads.eq(old).removeClass(curHeadCName);
        heads.eq(old).siblings("li").removeClass(curHeadCName);
        heads.eq(cur).addClass(curHeadCName);
      }
      old = cur;
    }
  }).end();

}
$(function() {


  // 主要参数列表
  var $burger = $("#burger");
  var ski = 0;
  var timeout;
  var timeout1;
  var sheight = $(window).height();
  var upa = $(".upv30-icon").height();
  var flsize;
  var disScroll, lastScrollTop = 0,
    delat = 5,
    navHight = $(".header-v4").outerHeight();
  var burtop = 0,
    burski = 0;
  //判断head出现的元素
  var isdiscont = $('#isdiscont').val();
  if (isdiscont == "" || isdiscont == undefined) {
    isdiscont = "0";

  }


  $(".sy-downward").css("height", sheight);
  $(".sections-list").css("height", sheight - upa - navHight - 118);

  $burger.click(function() {
    burtop = burtop;
    if (ski == 0) {
      $(".burger").addClass("transform");
      $(".sy-downward").eq(0).fadeIn("150");
      clearTimeout(timeout);
      //获取当前定位
      burtop = $(window).scrollTop();
      timeout = setTimeout(function() {
        $("#v3cont_id").hide();
      }, 500);
      var uph = $(".user-view-info").height();
      $(".cont-list").css("height", sheight - uph);

      //反色
      $('.header-v4 .logo a:first').css("background-image", "url('./img/ap_lg.png')");
      clearTimeout(timeout1);
      timeout1 = setTimeout(function() {
        $('.header-v4 .header-container').css("background-color", "#3e3e46");
      }, 150);
      $('.burger div').css("background-color", "#fff");
      $('.sy-downward').css("top", "43px");
      if ($(window).width() >= 640) {
        $('.sy-downward').css("top", "81px");
      }
      // $('.user-view-info').css("margin-top","16px");
      //文字加反色
      $('.header-v4 .toptit-cont').css("color", "#fff");
      ski = 1;
      burski = 1;
      if (isdiscont == '3' || isdiscont == '0') {
        $('.bg-opacity30').hide();
        $('.v3-shareBox').hide();
      }


    } else {
      $(".burger").removeClass("transform");
      $(".sy-downward").eq(0).fadeOut("150");
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        $("#v3cont_id").show();
        $(window).scrollTop(burtop);
      }, 50);
      var uph = $(".user-view-info").height();
      $(".cont-list").css("height", sheight - uph);
      //反色
      $('.header-v4 .logo a:first').css("background-image", "url('./img/ap_lg.png')");
      clearTimeout(timeout1);
      timeout1 = setTimeout(function() {
        $('.header-v4 .header-container').css("background-color", "#fff");
      }, 150);
      $('.burger div').css("background-color", "#333");
      $('.sy-downward').css("top", "44px");
      if ($(window).width() >= 640) {
        $('.sy-downward').css("top", "83px");
      }
      // $('.user-view-info').css("margin-top","29px");
      //文字加反色
      $('.header-v4 .toptit-cont').css("color", "#000");
      ski = 0;
      burski = 0;
    }

  });
  //tab切换初始化
  $('.scrolly:has(.sections-nav)').each(function(_, el) {
    var ctrlSelector = '.sections-nav li',
      tabSelector = '.sections-list';
    bindTab(ctrlSelector, tabSelector, 'cur-state', 'cur', el);
  });
});
if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
  mobileFn()
}
