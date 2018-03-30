export function getCookie(name){//获取所有的cookie对处理cookie进行封账
    let cookieStr=document.cookie;//得到cookie
    if(cookieStr.length==0) return;
    let arr;
    let res=null
    if(cookieStr.indexOf(';')>-1){
       arr= cookieStr.split('; ')//还有个空格
       arr.forEach(function(cookie,index) {
          let tmp_arr= cookie.split('=')
          if(tmp_arr[0]==name){
            res=tmp_arr[1]
          }
       })
    }else{
         let tmp_arr= cookieStr.split('=')
          if(tmp_arr[0]==name){
            res=tmp_arr[1]
          }
    }
    return res
}

export function loginout () {
  let t = new Date();
  t.setTime( t.getTime() -1 );
  document.cookie = 'token=' + getCookie('token') + '; expires=' + t.toUTCString()
}