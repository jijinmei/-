// 图片压缩代码区域
  //    用于压缩图片的canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    //    瓦片canvas
    var tCanvas = document.createElement("canvas");
    var tctx = tCanvas.getContext("2d");
    var maxsize = 100 * 1024;
     //    使用canvas对大图片进行压缩
    function compress(img) {
      console.log('大图片进行压缩')
        var initSize = img.src.length;
        var width = img.width;
        var height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000) > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
//        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);
            tCanvas.width = nw;
            tCanvas.height = nh;
            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }
        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.5);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
    }    
    //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
    function upload(basestr, type) {
      console.log("开始转换fordata 压缩完后进行转base64")
        var text = window.atob(basestr.split(",")[1]);
        var buffer = new ArrayBuffer(text.length);
        var ubuffer = new Uint8Array(buffer);
        var pecent = 0 , loop = null;
        for (var i = 0; i < text.length; i++) {
            ubuffer[i] = text.charCodeAt(i);
        }
        var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var blob;
        if (Builder) {
            var builder = new Builder();
            builder.append(buffer);
            blob = builder.getBlob(type);
        } else {
            blob = new window.Blob([buffer], {type: type});
        }
// 逻辑代码
// 10幻灯片的添加图片1張最多
console.log('123')
if(vm.$route.name=='huandeng10X'){
    console.log('huandeng10X')
   var aa=[blob];
   var bb=[basestr];
   window.store.state.imgblob=aa
   window.store.state.imgUrl=bb 
}else if(vm.$route.name=='bankuai11X'){
// 11版块管理的添加图片12張最多
   console.log('bankuai11X')
   if(window.store.state.who=='one'){ console.log('one')
     var aa1=[blob];
     var bb1=[basestr];
     // window.store.state.headblob=aa1
     window.store.state.headUrl=bb1
   }else{ console.log('two')
    var aa2=[blob];
    var bb2=[basestr];
    window.store.state.bankuaiblob=aa2
    window.store.state.bankuaiUrl=bb2
   }
   
   // window.store.state.bankuaiall.push({'bankuaiblob':blob,'bankuaiUrl':basestr})
   // window.store.state.bankuaiblob.push(blob)
   // window.store.state.bankuaiUrl.push(basestr)
}

        console.log('压缩完后的大小')
       console.log("转换完成！") 
    }
 /**
     * 获取blob对象的兼容性写法
     * @param buffer
     * @param format
     * @returns {*}
     */
    function getBlob(buffer, format) {
        try {
            return new Blob(buffer, {type: format});
        } catch (e) {
            var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
            buffer.forEach(function(buf) {
                bb.append(buf);
            });
            return bb.getBlob(format);
        }
    }
    /**
     * 获取formdata
     */
    function getFormData() {
        var isNeedShim = ~navigator.userAgent.indexOf('Android')
            && ~navigator.vendor.indexOf('Google')
            && !~navigator.userAgent.indexOf('Chrome')
            && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
        return isNeedShim ? new FormDataShim() : new FormData()
    }
    /**
     * formdata 补丁, 给不支持formdata上传blob的android机打补丁
     * @constructor
     */
    function FormDataShim() {
        console.warn('using formdata shim');
        var o = this,
            parts = [],
            boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
            oldSend = XMLHttpRequest.prototype.send;
        this.append = function(name, value, filename) {
            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
            if (value instanceof Blob) {
                parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                parts.push(value);
            }
            else {
                parts.push('\r\n\r\n' + value);
            }
            parts.push('\r\n');
        };
        // Override XHR send()
        XMLHttpRequest.prototype.send = function(val) {
            var fr,
                data,
                oXHR = this;
            if (val === o) {
                // Append the final boundary string
                parts.push('--' + boundary + '--\r\n');
                // Create the blob
                data = getBlob(parts);
                // Set up and read the blob into an array to be sent
                fr = new FileReader();
                fr.onload = function() {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function(err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);
                // Set the multipart content type and boudary
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                XMLHttpRequest.prototype.send = oldSend;
            }
            else {
                oldSend.call(this, val);
            }
        };
    }
// 图片压缩代码区域
console.log('图片压缩代码区域')
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","PNG","JPG","bmp","BMP","jpeg","JPEG"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击图片的文本框*/
        	
		function validateUp(files){
      console.log('validateUp 判断上传的类型是否有错')  
      var arrFiles = [];//替换的文件数组
      console.log(files)
			for(var i = 0, file; file = files[i]; i++){
				//获取文件上传的后缀名
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 类型符合，可以上传
							if (file.size >= defaults.fileSize) {
								// alert(file.size);
								mui.toast('您这个"'+ file.name +'"文件大小过大');	
							} else {
								// 在这里需要判断当前所有文件中
								arrFiles.push(file);	
							}
						}else{
							mui.toast('您这个"'+ file.name +'"上传类型不符合');	
						}
					}else{
						mui.toast('您这个"'+ file.name +'"没有类型, 无法识别');	
					}
      }
      console.log('validateUp:arrFiles')
			console.log(arrFiles)
			return arrFiles;
		}	
	



//如果图片大于9张则隐藏上传框    270
//如果要限定上传的张数则在这里限制 185
//如果要设置压缩的比例，比例越大图片越清晰   49
// 逻辑代码赋予路径和文本对象 74












