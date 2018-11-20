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
  st=$('body,html').scrollTop();
  if(st>300){
    $('#toolBackTop').show();
  }else{
    $('#toolBackTop').hide();
  }
}
//回到顶部触发事件
$('#backtotop').click(function(){
  $('html,body').animate({ scrollTop: 0 }, 300);
});
//定时器延迟请求ajax && 显示加载转圈图标
var showLoading = function() {
  setTimeout(function() {
    console.log('下拉刷新了')
    loadPt();
    console.log(111)
    $('.loading').hide();
  }, 500)
}
var wrapTop = document.getElementById('list-panel')
console.log(wrapTop.scrollTop + " " + "滚动条当前的位置")
console.log(wrapTop.scrollHeight + " " + "获取滚动条的高度")

// 加载4条推荐内容
var tjNum=0; //初始读取下标
var tjCount=4; //滚动加载条数
jQuery.support.cors = true;
function loadTj(){
  $.ajax({
    type: "GET",
    url: "json/index.json",
    // async:true,
    data: {

    },
    dataType: "json",
    success: function(data) {
      var str = '';
      for (var i = tjNum; i < tjNum+tjCount; i++) {
        var item = data.data[i];
        if(item){
          var imgUrl = item.imgs[0];
          var title = item.title;
          var id = item.id;
          // var url = 'iframe.html'+'?href='+item.newsurl;
          var url=item.newsurl;
          var desc=item.outline;
          var viewcount=item.viewcount;
          var update_time=item.update_time;
          var copyfrom=item.copyfrom;

          str += '<div class="news-li"><div class="news-pic"><a href=' + url + ' target="_blank"><img src=' + imgUrl + '></a></div><div class="h2p"><h2><a href=' + url + ' target="_blank">'+title+'</a></h2><p>' + desc + '</p></div><div class="pdtt_trbs">' + copyfrom + '<span>' + update_time + '</span><div class="trbstxt">推荐</div></div></div>';
        }

      }
      tjNum+=tjCount;
      $(str).appendTo($('#list-panel'));
    }
  });
}
// 无限加载普通内容
var ptNum=0; //初始读取下标
var ptCount=10; //滚动加载条数
function loadPt(){
  $.ajax({
    type: "GET",
    url: "json/index.json",
    data: {

    },
    contentType:"text/plain",
    dataType: "json",
    success: function(data) {
      console.log(333)
      var str = '';
      for (var i = ptNum; i < ptNum+ptCount; i++) {
        var item = data.data[i];
        if(item){
          var imgUrl = item.imgs[0];
          var title = item.title;
          var id = item.id;
          var url = 'iframe.html'+'?href='+item.newsurl;
          var url=item.newsurl;
          var desc=item.outline;
          var viewcount=item.viewcount;
          var update_time=item.update_time;
          var copyfrom=item.copyfrom;

          str += '<div class="news-li"><div class="news-pic"><a href=' + url + ' target="_blank"><img src=' + imgUrl + '></a></div><div class="h2p"><h2><a href=' + url + ' target="_blank">'+title+'</a></h2><p>' + desc + '</p></div><div class="pdtt_trbs">' + copyfrom + '<span>' + update_time + '</span></div></div>';
        }

      }
      ptNum+=ptCount;
      $(str).appendTo($('#list-panel'));
    }
  });
}
//初始加载4条推荐新闻
loadTj();
//无限加载普通新闻
loadPt();
