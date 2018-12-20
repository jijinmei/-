var Boss = 'http://stg-boss-macaucf.leanapp.cn/' //测试
var Boss1 = 'http://stg-boss-macaucf.leanapp.cn/api/v1/' //测试
var Boss2 = 'http://boss-macaucf.leanapp.cn/' //用户管理-用户发布设置
var Boss22 = 'http://boss-macaucf.leanapp.cn/api/v1/' //用户管理-用户发布设置
var limit10=10
var limit20=20			
// var sessiontoken = 'j9d9asn87r4kx09qnb9wc2d24' //我的楼盘有数据ohlhgspmwdk5eh0iy6qkacuks
var sessiontoken = 'lhiqpphc7dpundl6naldcyo9x' //我的楼盘有数据








//1.base64转文件对象
function commonFiles(files,formData,items){
                       for (var i = 0; i < files.length; i++) {
                       //base64转换为blob对象
                        var text = window.atob(files[i] .split(",")[1]);
                        var buffer = new ArrayBuffer(text.length);
                        var ubuffer = new Uint8Array(buffer);
                        var pecent = 0 , loop = null;

                        for (var n = 0; n < text.length; n++) {
                            ubuffer[n] = text.charCodeAt(n);
                        }
                        var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
                        var blob;
                        if (Builder) {
                            var builder = new Builder();
                            builder.append(buffer);
                            blob = builder.getBlob(type);
                        } else {
                            blob = new window.Blob([buffer], {type : 'image/png'});
                        }
                        //循环项目名称，依次添加项目
                            formData.append(items,blob);//依次添加的项目名称                 
                   
                    }           
}





// 时间戳
// timestampToTime(1403058804);   "2014-06-18 10:33:24"
function timestampToTime(timestamp) {
    if(timestamp.length==10){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }else{
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
        
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + '';
        s = date.getSeconds();
        console.log(Y+M+D+h+m)
        return Y+M+D+h+m;
    }





// 2.解决地址栏传参和读取参数
function locations(name, url){
    if (!url) {
      url = window.location.href;
      console.log(url)
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
