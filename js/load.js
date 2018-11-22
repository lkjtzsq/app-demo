//获取地址栏参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var tid = GetQueryString("tid");
var title = GetQueryString("title");
var type = GetQueryString("type");
var searchUrl = '';
console.log(tid);
var isList = false;
if (!tid) {
  tid = -1;
  $('#bigTitle').html("中国青年报App");
  searchUrl = 'https://zqbapp.cyol.com/zqzxapi/api.php?s=/News/getNewsListCache/version/3.0.8/tid/-1';
} else {
  $('#bigTitle').html(title);
  if (type) {
    searchUrl = 'https://zqbapp.cyol.com/zqzxapi/api.php?s=/News/getNewsListCache/version/3.0.8/tid/' + tid;
  } else {
    searchUrl = 'https://zqbapp.cyol.com/zqzxapi/api.php?s=/Type/typeHomePage/siteid/1/device/user/tid/' + tid;
    isList = true;
  }
}
//获取滚动条当前的位置
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
//获取当前可视范围的高度
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}
//获取文档完整的高度
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//滚动事件触发
window.onscroll = function() {
  if (getScrollTop() + getClientHeight() == getScrollHeight()) {
    $('.loading').fadeIn();
    showLoading();
  }
  st = $('body,html').scrollTop();
  if (st > 300) {
    $('#toolBackTop').show();
  } else {
    $('#toolBackTop').hide();
  }
}
//回到顶部触发事件
$('#backtotop').click(function() {
  $('html,body').animate({
    scrollTop: 0
  }, 300);
});

//定时器延迟请求ajax && 显示加载转圈图标
var showLoading = function() {
  setTimeout(function() {
    console.log('下拉刷新了')
    if (isList) {
      loadList()
    } else {
      loadPt();
    }
    $('.loading').hide();
  }, 500)
}
var wrapTop = document.getElementById('list-panel')
jQuery.support.cors = true;
// 无限加载普通内容
var ptNum = 0; //初始读取下标
var ptCount = 10; //滚动加载条数
var reg = /\.htm$/; //匹配中青在线网址
function loadPt() {
  $.ajax({
    type: "GET",
    url: searchUrl,
    // data: "siteid=1&device=user&tid=" + tid,
    // data: {
    //   siteid:1,
    //   device:'user',
    //   tid:tid
    // },
    contentType: "text/plain",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var str = '';
      for (var i = ptNum; i < ptNum + ptCount; i++) {
        var item = data.data[i];
        if (item) {
          var imgUrl = item.imgs[0];
          var title = item.title;
          var id = item.id;
          var url = item.newsurl;
          console.log(url)
          var paras = '';
          if (url.indexOf('shareapp.cyol.com') == -1) {
            paras = item.newsurl;
          } else {
            var newUrl = url.split('cmsfile')[1].split('/');
            for (var k = 1; k < newUrl.length - 1; k++) {
              var para = 'para' + k;
              paras += ('&' + para + '=' + newUrl[k]);
            }
            var urlId = newUrl[newUrl.length - 1].split('.html')[0];
            paras += ('&urlId=' + urlId);
            paras = paras.slice(1, paras.length);
            paras = 'iframe.html?' + paras;
          }

          paras = item.newsurl; //跳转到正确地址为了测试访问
          var desc = item.outline;
          var viewcount = item.viewcount;
          var update_time = item.update_time;
          var copyfrom = item.copyfrom;

          str += '<div class="news-li"><div class="news-pic"><a href=' + paras + ' target="_blank"><img src=' + imgUrl + '></a></div><div class="h2p"><h2><a href=' + paras + ' target="_blank">' + title + '</a></h2><p>' + desc + '</p></div><div class="pdtt_trbs">' + '<a href="" target="_blank">' + copyfrom + '</a><span>' + update_time + '</span></div></div>';
        }

      }
      ptNum += ptCount;
      $(str).appendTo($('#list-panel'));
    }
  });
}
// 加载二级列表
function loadList() {
  $.ajax({
    type: "GET",
    url: searchUrl,
    // data: "siteid=1&device=user&tid=" + tid,
    // data: {
    //   siteid:1,
    //   device:'user',
    //   tid:tid
    // },
    contentType: "text/plain",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var str = '';
      for (var i = ptNum; i < ptNum + ptCount; i++) {
        var item = data.data.typenews[i];
        if (item) {
          var imgUrl = item.imgs[0];
          var title = item.title;
          var id = item.id;
          var url = item.newsurl;
          console.log(url)
          var paras = '';
          if (url.indexOf('shareapp.cyol.com') == -1) {
            paras = item.newsurl;
          } else {
            var newUrl = url.split('cmsfile')[1].split('/');
            for (var k = 1; k < newUrl.length - 1; k++) {
              var para = 'para' + k;
              paras += ('&' + para + '=' + newUrl[k]);
            }
            var urlId = newUrl[newUrl.length - 1].split('.html')[0];
            paras += ('&urlId=' + urlId);
            paras = paras.slice(1, paras.length);
            paras = 'iframe.html?' + paras;
          }

          //  paras = item.newsurl; //跳转到正确地址为了测试访问
          var desc = item.outline;
          var viewcount = item.viewcount;
          var update_time = item.update_time;
          var copyfrom = item.copyfrom;

          str += '<div class="news-li"><div class="news-pic"><a href=' + paras + ' target="_blank"><img src=' + imgUrl + '></a></div><div class="h2p"><h2><a href=' + paras + ' target="_blank">' + title + '</a></h2><p>' + desc + '</p></div><div class="pdtt_trbs">' + '<a href="" target="_blank">' + copyfrom + '</a><span>' + update_time + '</span></div></div>';
        }

      }
      ptNum += ptCount;
      $(str).appendTo($('#list-panel'));
    }
  });
}

//无限加载普通新闻
if (isList) {
  loadList()
} else {
  loadPt();
}
