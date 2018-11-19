var cyol={
  // 导航浮动弹出子菜单函数
  showNavList:function(){
    $('.pnav-list>li').hover(function(){
      $(this).find('.child-lists').stop().show('fast');
      $(this).siblings('li').find('.child-lists').slideUp();
    },function(){
      $(this).find('.child-lists').hide();
    });
  }
}

//导航浮动弹出子菜单执行
cyol.showNavList();

//监控浏览器页面宽度变化
$(window).resize(function(){
  var wdWidth=$(window).width();
  if(wdWidth>640){
  }
})
