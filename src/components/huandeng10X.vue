<template>
<div class="youceng">
<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
            <!-- 创建 -->
            <span @click="sendxin"  class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!=''&&imgUrl.length>0,bg999999:title==''||imgUrl.length==0}">保存</span>
            <!-- 修改 -->
            <!-- <span @click="sendxin"v-if="objectId!='no'" class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!='',bg999999:title==''}">保存</span> -->
        </div>
<!-- 表格 -->
<div class="pB16 bai" style="width:778px;" >
<form class="layui-form pT35" action="" onsubmit="return false">
  <div class="layui-form-item">
    <label class="layui-form-label f18 c222222 w40">名稱</label>
    <div class="layui-input-block mL70">
      <input v-model="title" type="text" name="title" required  lay-verify="required" placeholder="请输入幻燈片名稱" autocomplete="off" class="layui-input f18 c222222" style="width:690px;">
    </div>
  </div>
  </form>
<!--图片-->
<form class="layui-form pT35" action="">
  <div class="layui-form-item">
    <label class="layui-form-label f18 c222222 w40">图片</label>
    <div class="layui-input-block mL70">
    <!-- 1.未上传图片的时候 -->
                <span v-if="imgUrl.length==0" class="cursor f20 bg36c748 cffffff h40 lh40 center cursor relative inline" style="width:100px;">上傳
                       
                        <input type="file" id="input" @change="change($event)" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple" style="" class="jz w100 h40 lh40 cursor" style="opacity:0;">
                </span>
               

   <!-- 2.上传图片的时候 -->
   <div v-if="imgUrl.length>0" style="width:260px;height:122px;" class="overflow relative inline">
      <img  :src="imgUrl" alt="" style="width:100%;" class="jz">
   </div>
  
   <!-- <span @click="adds()" v-if="imgUrl.length>0" class="mL12 cursor f20 bgffffff cff4d00 h40 lh40 center cursor inline relative" style="width:80px;" ></span> -->
   <!--3. 更换图片的时候 -->
<span v-if="imgUrl.length!=0" class="cursor f20 bgffffff cff4d00 h40 lh40 center cursor relative inline" style="width:80px;border:1px solid #ff4d00;top:-15px;">更換
                       
                        <input type="file" id="input" @change="change($event)" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple" style="" class="jz w100 h40 lh40 cursor" style="opacity:0;">
</span>


    <span  class="f18 cbbbbbb mL10 relative" :style="{'top':imgUrl.length==0?'0':'-15px'}"> 建議上傳640*{{this.$route.params.indexs==0?'320':'385'}}PX的圖片 </span>                               
    </div>
  </div>
  </form>
<!--内容  -->
<form class="layui-form pT35" action="">
  <div class="layui-form-item">
    <label class="layui-form-label f18 c222222 w40">內容</label>
    <div class="layui-input-block mL70">
     <div id="editor" style="width:650px;">
        <!-- <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p> -->
     </div>
    </div>
  </div>
</form>
<!-- <div  @click="dong">
  88888888888888
</div> -->
<div  style="display:none;">
  {{watch}}
</div>

</div>
</div>
</template>

<script>

export default {
  name: 'huandeng10X',
  data () {
    return {
         imgblob:this.$store.state.imgblob,
         imgUrl:this.$store.state.imgUrl,
         objectId:'',
         channel:'',
         title:'',//名称
         imageView2:'?imageView2/1/w/748/h/345',
         datas:'no'

    }
  },
  computed:{
     watch(){
         this.imgblob=this.$store.state.imgblob
         this.imgUrl=this.$store.state.imgUrl
     }
  },
  methods:{
    // 创建和修改的
    sendxin(){
      var layer 
     layui.use('layer', function(){
     layer = layui.layer;
       });     
      // return
if(this.title){
      var that=this;
      var formData = new FormData();
if(this.objectId!='no'){
  formData.append("objectId", that.objectId);
}
formData.append("title", that.title);
formData.append("content", editor.txt.html());
formData.append("channel",that.channel);
if(that.$store.state.imgblob.length>0){
  formData.append("cover", that.imgblob[0]);
}

formData.append("sort", 0);
formData.append("sessiontoken", sessiontoken);

  jQuery.ajax({
    url:Boss+'boss/slider',
    type: "POST",
    headers:{'token':sessiontoken},
    processData: false,
    contentType: false,
    data: formData,
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    if(data.status){
      window.sessionStorage.removeItem('huandeng10X')
      // that.$router.back(-1)
        that.$router.push({name:'huandeng10'})         
    }else{
     layer.msg(data.message);
    }
    
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
   layer.msg('保存失敗，請稍后再試')
})
.always(function() {

    /* ... */
});
     
}
    },
change: function change(e) {
  console.log('files点击了图片上传框,粗发了事件')
  var file = document.getElementById("input");
  var fileList = file.files //获取的图片文件
console.log(fileList)
// 缓存获取的图片的长度加上现在上传的图片的长度不能超过12个,声明变量记录超出的个数,到时候超出了的不进入循环
if(fileList.length>1){
  alert('图片不能超过1張！')
  return
}

      

  console.log("图片数量符合") 
    fileList = validateUp(fileList);
    // return
    fileList.forEach(function(file, i) {
       console.log("开始处理上传文件")         
          var reader = new FileReader();          
//          获取图片大小
          reader.onload = function() {
             var result = this.result;
              var img = new Image();
              img.src = result;
              // 测试没有压缩前的文件大小
              // upload(result,fileList[i].type);
              // return
              //如果图片大小小于100kb，则直接上传
              if (result.length <= maxsize) {
                  img = null;
                  
                  upload(result,fileList[i].type);
                  return;
              }
//      图片加载完毕之后进行压缩，然后上传
              if (img.complete) {
                  callback();
              } else {
                  img.onload = callback;
              }
              function callback() {
                  var data = compress(img);
                  console.log(data)
                  upload(data, fileList[i].type);
                  img = null;
              }
          };
          reader.readAsDataURL(fileList[i]);
   

  console.log('处理上传文件完成')
})
    },
    editor(){
       var E = window.wangEditor
       editor = new E('#editor')
        // 自定义菜单配置
    editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'underline',
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        'video',  // 插入视频
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复

    ]
    // editor.customConfig.uploadImgShowBase64 = true 
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = Boss+'boss/upload'
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgParams = {
    sessiontoken: sessiontoken  // 属性值会自动进行 encode ，此处无需 encode
      }
    editor.customConfig.uploadImgHeaders = {
            'token': sessiontoken
       }
editor.customConfig.uploadImgHooks = {
    before: function (xhr, editor, files) {
    },
    success: function (xhr, editor, result) {
    },
    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    customInsert: function (insertImg, result, editor) {
       console.log('result')
      console.log(result)
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.results.url
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
    }
    }
   
        editor.create()
      },
    // 返回上一级
  goback(){
    if(this.title){
          
      var that=this;      
       layui.use('layer', function(){
       var layer = layui.layer;
            layer.confirm('離開本頁面將清空當前頁面內容，<br>確認離開？',{
              closeBtn:0,
              title:false,
              area: ['400px'],
              skin: 'layerssmall',
              btn: ['確認','取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("我是確認按钮"); //如果设定了yes回调，需进行手工关闭
                // that.$router.push({name:'huandeng10'})
                window.sessionStorage.removeItem('huandeng10X')
                that.$store.state.imgblob=[]
                that.$store.state.imgUrl=[]
                 // that.$router.back(-1)    
                 that.$router.push({name:'huandeng10'})        
                 layer.close(index); //如果设定了yes回调，需进行手工关闭
                  
              },
              btn2: function(layero){
                console.log("我是取消按钮"); //
              }
            

            });
      })
        
    
    }else{
      this.$router.push({name:'huandeng10'})
      // this.$router.back(-1)
    }
    
  }
    
  },
  mounted() {      
    this.objectId=this.$route.params.objectId;
    this.channel=this.$route.params.channel;
    this.editor()
    // 如果是修改的，就將内容全部读取回来
    if(this.objectId!='no'){
       var bb=JSON.parse(window.sessionStorage.getItem('huandeng10X'))
         this.$store.state.imgUrl=bb.cover.url
         this.title=bb.title
         editor.txt.html(bb.content)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layui-layedit-tool{width:680px !important;}
.layui-layedit-iframe,.layui-layedit{width:690px !important;}
</style>

