/**
 * Created by max on 15-12-28.
 */
//var SERVER_URL = "http://wechat.appartner.cn";
var SERVER_URL = "http://127.0.0.1:6544";
var SERVER_PAGE = "http://wechat.appartner.cn/";

function getQueryString() {
  var result = {}, queryString = location.search.slice(1),
      re = /([^&=]+)=([^&]*)/g, m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
}

function timestamp(){
  return (Date.now()/1000).toFixed(0)
}

function random_num_string(len){
  return Math.random().toFixed(len).slice(2);
}

//todo
function initialWX(APPID){
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: APPID, // 必填，公众号的唯一标识
    timestamp:timestamp() , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}