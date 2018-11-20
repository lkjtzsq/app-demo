// 导航请求ajax
$().ready(function() {
  // 头条ajax请求
  $.ajax({
    url: "./json/toutiao.json",
    type: "GET",
    data: {

    },
    dataType: "json",
    success: function(data) {
      var tt = data[0]
      $('.tt-pic img').attr("src", tt.imgUrl);
      $('.tt_href').attr("href", tt.href);
      $('.tt-title a').html(tt.title);
      $(".tt-desc").html(tt.desc);
      $(".trb-name").html(tt.source);
      $(".trb-time").html(tt.time);
      $(".trb-count").html(tt.look);
    }
  });
  //获取地址栏参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var tid = GetQueryString("tid");
  var title = GetQueryString("title");
  if (!tid) {
    tid = -1;
    $('#bigTitle').html("中国青年报App");
  } else {
    $('#bigTitle').html(title);
  }
  $.ajax({
    url: "./json/nav.json",
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
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var list = data[i].childs;
        if (item.tid == -1) {
          str += '<li><a href="index.html">' + item.cnname + '</a>';
        } else {
          str += '<li><a href=channel.html?tid=' + item.tid + '&title=' + escape(item.cnname) + '>' + item.cnname + '</a>';
        }
        wapStr += '<li>' + item.cnname + '<em class="tabline-lf"></em></li>'
        if (list.length) {
          str += '<ul class="child-lists">';
          wapList += '<ul class="sections-list" style="display:none;">';
          for (var j = 0; j < list.length; j++) {
            str += '<li><a href=list.html?tid=' + list[j].tid + '&title=' + escape(list[j].cnname) + '>' + list[j].cnname + '</a></li>';
            wapList += '<li><a href=list.html?tid=' + list[j].tid + '&title=' + escape(list[j].cnname) + '>' + list[j].cnname + '</a></li>'
          }
          str = str + '</ul>'
          wapList = wapList + '</ul>';
        }
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
