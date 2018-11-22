$().ready(function() {
  // 导航请求ajax
  $.ajax({
    url: "https://zqbapp.cyol.com/zqzxapi/api.php?s=/Type/getTypeListCache/siteid/1",
    type: "GET",
    async: false,
    dataType: 'json',
    data: {

    },
    success: function(data) {
      var data = data.data;
      var str = '';
      var wapStr = '';
      var wapList = '';
      for (var i = 0; i < 9; i++) { //设置9条 否则溢出
        var item = data[i];
        var list = data[i].childs;
        if (item.tid == -1) {
          str += '<li><a href="index.html">' + item.cnname + '</a>';
          var moreLi = '<li><a href="index.html">更多</a></li>';
        } else {
          str += '<li><a href=channel.html?tid=' + item.tid + '&title=' + escape(item.cnname) + '&type=channel >' + item.cnname + '</a>';
          var moreLi = '<li><a href=channel.html?tid=' + item.tid + '&title=' + escape(item.cnname) + '&type=channel >更多</a></li>';
        }
        wapStr += '<li>' + item.cnname + '<em class="tabline-lf"></em></li>'
        str += '<ul class="child-lists">';
        wapList += '<ul class="sections-list" style="display:none;">';
        for (var j = 0; j < list.length; j++) {
          str += '<li><a href=list.html?tid=' + list[j].tid + '&title=' + escape(list[j].cnname) + '>' + list[j].cnname + '</a></li>';
          wapList += '<li><a href=list.html?tid=' + list[j].tid + '&title=' + escape(list[j].cnname) + '>' + list[j].cnname + '</a></li>'
        }
        str = str + '</ul>'
        wapList = wapList + moreLi + '</ul>';
        str = str + '</li>'
      }
      $(str).appendTo($('.pnav-list'));
      $(wapStr).appendTo($('.sections-nav'));
      $(wapList).appendTo($('.scrolly'));
      $('.sections-list').eq(0).show()
      $('.sections-nav li').eq(0).addClass('cur-state');
      $('.pnav-list>li').hover(function() {
        $(this).find('.child-lists').stop().show('fast');
        $(this).siblings('li').find('.child-lists').slideUp();
      }, function() {
        $(this).find('.child-lists').hide();
      });
    }
  });
});
