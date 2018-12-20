<template>
<div class="youceng">
<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
            <!-- 创建 -->
            <span class="czjz" style="left:150px;color:red;" v-if="objectId!='no'">( 保存修改信息需要重新上傳圓標 )</span>
            <span @click="sendxin"  class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!=''&&headUrl.length>0&&muban!=0&&(bankuaiall.length>0||(objectId!='no'&&bankuaiall.length==0)),bg999999:title==''||headUrl.length==0||muban==0||(bankuaiall.length==0&&objectId=='no')}">保存</span>
            <!-- 修改 -->
            <!-- <span @click="sendxin"v-if="objectId!='no'" class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!='',bg999999:title==''}">保存</span> -->
        </div>
<!-- 表格 -->
<div class="pB16 pL16 pR16 bai" style="width:748px;" >
<ul class="f18 c222222">
  <li class="h100 lh100 border-b relative">圓標
      <span class="inline w70 h70 radius50 czjz R00" >
            <!-- <img  src="../assets/img/big.png" alt="" class="jz" style="min-width:70px;min-height:70px;"> -->
      </span> 
                 <span v-if="headUrl.length==0" class="inline w70 h70 radius50 czjz R00 cursor layerimg" >
                       <input type="file" id="input1" @change="change($event,'one')" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple"  class="jz cursor w70 h70 lh70" style="opacity:0;">
                 </span>
                  <span v-if="headUrl.length>0" class="inline w70 h70 radius50 czjz R00 cursor overflow">
                      <img :src="headUrl[0]" alt="" class="jz" style="z-index:1;min-width:90px;min-height:90px;">
                      <input type="file" id="input1" @change="change($event,'one')" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple" class="jz cursor w70 h70 lh70" style="opacity:0;z-index:10;">
                 </span>
  </li>
  <li class="h70 lh70 border-b relative">板塊名稱
      <input v-model="title" type="text" name="" maxlength="4" class="right f18 rf czjz R00 border0" placeholder="請點擊輸入(最多四個字)">
      <!-- <span class="inline radius50 czjz R00" >家私電器</span>                  -->
  </li>
  <li class="h70 lh70 border-b relative">操作
      <span class="inline radius50 czjz R00" > 
            <img  @click="toshow"     :src="xianshi==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="mR10 cursor" style="width:28px;">顯示
      </span>                 
  </li>

  <li class="border-b pB30">
    <p class="pT25 pB25">選擇板塊模版</p>
    <p class="relative">
       <span > 
           <img  @click="muban=1"     :src="muban==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="mR10 cursor" style="width:28px;">模版一  商店樣式
        </span> 
          <span @click="yulans('two')"  class="czjz R00 f18 c36c748 w70 h40 lh40 center cursor" style="border:1px solid #36c748;">預覽</span>
    </p>
    <p class="relative mT32 mB10">
       <span > 
           <img  @click="muban=2"     :src="muban==2?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="mR10 cursor" style="width:28px;">模版二  物品樣式
        </span> 
          <span @click="yulans('one')"  class="czjz R00 f18 c36c748 w70 h40 lh40 center cursor" style="border:1px solid #36c748;">預覽</span>
    </p>
  </li>
   <li v-if="objectId!='no'">
       <p class="pT25 pB25">現有二級分類</p>
       <span v-for="(item,index) in nowsection" class="f20 mB10 mR10 w100 inline">{{item}}</span>
  </li>
</ul>
</div>
<p class="mT40 mB13 c999999"> 二級分類</p>

<div class="pB16 pL16 pR16 bai relative pT90" style="width:748px;" >
   <span  @click="deleted"  class="absolute R16 T16 f18  cffffff w70 h40 lh40 center cursor" :class="{bgff4d00:dengpao==true,bg999999:dengpao==false}">删除</span>
    <!-- 1.未上传图片的时候只有一个加号 -->
                 <span @click="shows" style="width:75px;height:75px;display:block;" class="cursor relative add mR10 mB13"></span>                      
                
               
              <!--   <span style="width:175px;height:175px;" class="cursor inline relative add mR10 mB13">                      
                        <input type="file" id="input" @change="change($event)" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple" style="" class="jz cursor" style="opacity:0;width:175px;height:175px;line-height:175px;">
                </span>
                -->

   <!-- 2.上传图片的时候循环挂载已上传的图片 -->
   <div v-if="bankuaiall.length>0" v-for="(item,index) in bankuaiall" style="width:150px;height:75px;" class="RED overflow relative inline center f20 mB13" :class="{mR13:index!=2&&index!=6&&index!=10}">
   <!-- 复选框 -->
     <img @click="todel($event)" :ids="item.objectId" srcs="../assets/img/wx.png"  src="../assets/img/wx.png" alt="" class="czjz L00 cursor dengp" style="width:28px;">
     <!-- 输入框 -->
      <input type="text" class="czjz L40 border0 left w100" v-model="item.name" maxlength="4"> 
   </div>                              
   
</div>
<div  style="display:none;">
  {{watch}}
</div>

<!-- 二级分类：点击加号的弹出框 -->
<div  class="wai_kuangs" v-if="show==true" @click="show=false">
    <div  class="nei_kuang bai" style="width:476px;"  @click.stop="yl()">
          <p class="bg36c748 cffffff h60 lh60 center f20">新增分類</p>
   <!--         <p class="relative left pL26 h90 lh90 mT20 f20" >圓標<span class="f20 cbbbbbb">（大小範圍待定）</span><span class="inline w90 h90 radius50 czjz R26" >
                 <span v-if="bankuaiUrl.length==0" class="jz layerimg2 cursor" style="width:90px;height:90px;">
                       <input type="file" id="input" @change="change($event,'two')" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple"  class="jz cursor w90 h90 lh90" style="opacity:0;">
                 </span>
                 <span v-if="bankuaiUrl.length>0"  class="jz cursor overflow radius50" style="width:90px;height:90px;">
                      <img :src="bankuaiUrl[0]" alt="" class="jz" style="z-index:1;min-width:90px;min-height:90px;" >
                      <input type="file" id="input" @change="change($event,'two')" accept="image/jpg,image/jpeg,image/png,image/bmp,image/JPG,image/JPEG,image/PNG,image/BMP"  ref="input" multiple="multiple" maxlength="4" class="jz cursor w90 h90 lh90" style="opacity:0;z-index:10;">
                 </span>
                 </span>
               </p> -->
              <p class="mT20 lh60 h60 border-t border-b left pL26 pR26 f20">名稱
                       <input v-model="title2" type="text" maxlength="4"  name="" class="right rf f18 border0 h60" placeholder="請點擊輸入(最多四個字)">
              </p>
              <p class="center mT40 mB40"> 
               <span @click="saves"  class="inline f18 cffffff w100 h40 lh40 center cursor" :class="{bg36c748:title2!='',bg999999:title2==''}">保存</span>
               <!-- <span @click="saves"  class="inline f18 cffffff w100 h40 lh40 center cursor" :class="{bg36c748:title2!=''&&bankuaiUrl.length>0,bg999999:title2==''||bankuaiUrl.length==0}">保存</span> -->
              </p>
               
    </div>
</div> 

<div  class="wai_kuangs" v-if="yulan1==true" @click="yulan1=false">
    <div  class="nei_kuang bai" style="width:400px;" @click.stop="yl()">
         <img src="../assets/img/one.jpg" alt="" style="width:100%;">       
    </div>
</div>  
<div  class="wai_kuangs" v-if="yulan2==true"  @click="yulan2=false">
    <div  class="nei_kuang bai" style="width:400px;" @click.stop="yl()">
         <img src="../assets/img/two.jpg" alt="" style="width:100%;">       
    </div>
</div>  
</div>
</template>

<script>

export default {
  name: 'huandeng10X',
  data () {
    return {
      nowsection:[],//远程的二级分类
          xianshi:1,
          yulan1:false,
          yulan2:false,
          show:false,
        dengpao:false,
         headUrl:this.$store.state.bankuaiblob,
         headblob:this.$store.state.headblob,
         bankuaiblob:this.$store.state.bankuaiblob,
         bankuaiUrl:this.$store.state.bankuaiUrl,
         bankuaiall:this.$store.state.bankuaiall,
         objectId:'',
         muban:0,
         channel:'',
         title:'',//板块名称
         title2:'',
         imageView2:'?imageView2/1/w/748/h/345',
         datas:'no',
         img2:'no'

    }
  },
  computed:{
     watch(){
         this.bankuaiblob=this.$store.state.bankuaiblob//二级分类blob
         this.bankuaiUrl=this.$store.state.bankuaiUrl//二级分类路径
         this.bankuaiall=this.$store.state.bankuaiall//二级分类
         this.headUrl=this.$store.state.headUrl//板块路径
         this.headblob=this.$store.state.headblob//板块file

     }
  },
  methods:{
    yl(){

    },
    // 二级分类的图标保存
    saves(){
      // if(this.title2&&this.$store.state.bankuaiUrl.length>0){
        if(this.title2){
        window.store.state.bankuaiall.push({'name':this.title2,'bankuaiblob':this.$store.state.bankuaiblob,'bankuaiUrl':this.$store.state.bankuaiUrl,'id':'no'})
         this.show=false
         this.title2=''
      }
    },
    close(){
         // this.show=false
    },
    // 添加图标的弹出框
    shows(){
      // this.title=''
      this.$store.state.bankuaiblob=[]
      this.$store.state.bankuaiUrl=[]
      this.show=true
    },
    // 删除二级分类的勾选
     todel(e){
           if($(e.currentTarget).attr('srcs')=='../assets/img/wx.png'){
               $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
               $(e.currentTarget).attr('srcs','../assets/img/yx.png')
               this.dengpao=true
           }else{
               $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
               $(e.currentTarget).attr('srcs','../assets/img/wx.png')
               if($('.dengp[srcs="../assets/img/yx.png"]').length>0){
                  this.dengpao=true
               }else{
                this.dengpao=false
               }
           }
    
    },
    // 删除二级分类
    deleted(){
    var that=this;
        if(this.dengpao==true){       
       layui.use('layer', function(){
       var layer = layui.layer;
            layer.confirm('確認刪除?',{
              closeBtn:0,
              title:false,
              area: ['340px'],
              skin: 'layerssmall',
              btn: ['刪除','取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("我是刪除按钮"); //如果设定了yes回调，需进行手工关闭
                  // 循环所有的图片，找出没有被勾选的图片，压入数组，复制给全局变量  勾选全部變未选
   var bb=$('.dengp')
   // var blob=[];需要给dengp设置一个id，如果是远程赋值显示的则含有id，如果是本地添加的则不含id
   // 结合当前的index 循环所有的，然后每循环一个则判断是否有被选中，没有则跳过，否则判断是否含有id，有则远程删除，然后本地移除，没有则直接本地移除
   // for (var i = 0; i < bb.length; i++) {
   //  if($(bb[i]).attr('srcs')=="../assets/img/yx.png"){
   //       if($(bb[i]).attr('id')!='no'){
   //            // 执行远程删除sasasa
   //            // 执行本地删除
   //            that.$store.state.bankuaiall.splice(i,1)
   //      } else{
   //           // 执行本地删除
   //            that.$store.state.bankuaiall.splice(i,1)
   //      }
   //  }
   // }
   // 现在删除了远程删除的接口，删除的全部都是本地的上传数据
   var url=[];
   for (var i = 0; i < bb.length; i++) {
    if($(bb[i]).attr('srcs')=="../assets/img/wx.png"){
      url.push({'name':that.$store.state.bankuaiall[i].name,'bankuaiUrl':that.$store.state.bankuaiall[i].bankuaiUrl,'bankuaiblob':that.$store.state.bankuaiall[i].bankuaiblob})
      
    }
    
   }
   that.$store.state.bankuaiall=url;

  $('.dengp').attr('src',require('../assets/img/wx.png'))
  $('.dengp').attr('srcs','../assets/img/wx.png')
  that.dengpao=false;
    layer.close(index); //如果设定了yes回调，需进行手工关闭                                             
                  
              },
              btn2: function(layero){
                console.log("我是取消按钮"); //
              }
            

            });
      })
        }
   
    },
    yulans(who){
      if(who=='one'){
        this.yulan1=true
      }else{
        this.yulan2=true
      }
    },
        toshow(){
          this.xianshi=(this.xianshi==1?0:1)
    },
    // 创建和修改的
    sendxin(){
      if(this.title==''||this.headUrl.length==0||this.muban==0||(this.bankuaiall.length==0&&this.objectId=='no')){
        return
      }
      console.log(this.headblob)
      var layer 
     layui.use('layer', function(){
     layer = layui.layer;
       });     
     
if(this.title){
      var that=this;
      var formData = new FormData();
if(this.objectId!='no'){
  formData.append("objectId", that.objectId);
  // 说明现在是修改的时候点击的保存，判断是否有新上传的，有则传新上传的二级分类，否则拿回之前的二级分类再传一次
  if(this.bankuaiall.length>0){
               var tags=''
        for (var i = 0; i < this.bankuaiall.length; i++) {
         var oo=(i!=0&&i!=this.bankuaiall.length?',':'')
         tags+=oo+this.bankuaiall[i].name
        }
  }else{
    // nowsection
    var tags=this.nowsection.join(',')

  }

}else{
  // 说明现在是新上传的，则拿本地选择的二级分类
          var tags=''
        for (var i = 0; i < this.bankuaiall.length; i++) {
         var oo=(i!=0&&i!=this.bankuaiall.length?',':'')
         tags+=oo+this.bankuaiall[i].name
        }
}

formData.append("templeId", (that.muban==1?'content_01':'content_02'));//板块模板 ：content_02= 店铺 content_01 = 帖子
formData.append("title", that.title);//板块名称
// if(this.objectId!='no'){
  formData.append("icon",this.headblob);//图标
// }else{
//    formData.append("icon",this.img2);//图标
// }

formData.append("show",this.xianshi);//显示标识： 1 = 显示， 0=不显示
formData.append("tags", tags);
formData.append("sort", 0);//序号
formData.append("sessiontoken", sessiontoken);

  jQuery.ajax({
    url:Boss+'boss/section',
    type: "POST",
    headers:{'token':sessiontoken},
    processData: false,
    contentType: false,
    data: formData,
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    if(data.status){
      // JSON.parse(window.sessionStorage.getItem('bankuai11X'))
      that.$store.state.bankuaiblob=[]//二级分类blob
      that.$store.state.bankuaiUrl=[]//二级分类路径
      that.$store.state.bankuaiall=[]//二级分类
      that.$store.state.headUrl=[]//板块路径
      that.$store.state.headblob=[]//板块file
      window.sessionStorage.removeItem('bankuai11X')
      // that.$router.back(-1)
        that.$router.push({name:'bankuai11'})         
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
change: function change(e,who) {
  this.$store.state.who=who;
  console.log('files点击了图片上传框,粗发了事件')
  if(who=='two'){
     var file = document.getElementById("input");
   }else{
    var file = document.getElementById("input1");
     this.$store.state.headblob=file.files[0]
   
   }
 
  
  var fileList = file.files //获取的图片文件
console.log(fileList)
// 缓存获取的图片的长度加上现在上传的图片的长度不能超过12个,声明变量记录超出的个数,到时候超出了的不进入循环
// if(fileList.length+this.bankuaiUrl.length>12){
//   alert('图片不能超过12張！')
//   return
// }

  
  // console.log("图片数量符合") 
    fileList = validateUp(fileList);
    // return
    fileList.forEach(function(file, i) {
       // console.log("开始处理上传文件")         
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
                  // console.log(data)
                  upload(data, fileList[i].type);
                  img = null;
              }
          };
          reader.readAsDataURL(fileList[i]);
   

  console.log('处理上传文件完成')
})
    },
   
    // 返回上一级
  goback(){
    // if(this.title){  
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
                window.sessionStorage.removeItem('bankuai11X')
                that.$store.state.bankuaiblob=[]
                that.$store.state.bankuaiUrl=[]
                that.$store.state.bankuaiall=[]
                that.$store.state.headUrl=[]
                that.$store.state.headblob=[]
                 // that.$router.back(-1)   
                 that.$router.push({name:'bankuai11'})         
                 layer.close(index); //如果设定了yes回调，需进行手工关闭
                  
              },
              btn2: function(layero){
                console.log("我是取消按钮"); //
              }
            

            });
      })
        
    
    // }
    // else{
    //   // this.$router.push({name:'huandeng10'})
    //   this.$router.back(-1)
    // }
    
  }
    
  },
  mounted() {      
    var that=this;
    this.objectId=this.$route.params.objectId;
    this.channel=this.$route.params.channel;
 
    // 如果是修改的，就將内容全部读取回来
    if(this.objectId!='no'){
       var bb=JSON.parse(window.sessionStorage.getItem('bankuai11X'))
       this.xianshi=bb.show;
         this.title=bb.title;//板块名称
         this.$store.state.headUrl=[bb.icon];//图标
         console.log(bb)
         this.$store.state.bankuaiall=[]
           this.nowsection=bb.tags||[]//展示的远程已上传的二级分类
         this.muban=(bb.templeId=='content_02'?2:1)

//                              function getImgToBase64(url,callback){ //将图片转换为Base64
//   var canvas = document.createElement('canvas'),
//     ctx = canvas.getContext('2d'),
//     img = new Image;
//   img.crossOrigin = 'Anonymous';
//   img.onload = function(){
//     canvas.height = img.height;
//     canvas.width = img.width;
//     ctx.drawImage(img,0,0);
//     var dataURL = canvas.toDataURL('image/png');
//     callback(dataURL);
//     canvas = null;
//   };
//   img.src = url;
// }
 

//     function dataURLtoFile(dataurl, filename) { //将base64转换为文件
//         var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//             bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//         while(n--){
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, {type:mime});
//     }
 

// //可以将图片转换为base64

// getImgToBase64(bb.icon,function(data){
// 　　　var myFile = dataURLtoFile(data,'');
// that.img2=myFile
//       console.log('myFile');
// 　　　console.log(myFile);
// });
                       

    }else{
      // 否则都是全新的，不需要赋值
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.add{background:url(../assets/img/adds.png);background-size: 75px 75px;}
.layerimg{background:url(../assets/img/big.png) no-repeat;background-size: 70px 70px;}
.layerimg2{background:url(../assets/img/big.png) no-repeat;background-size: 90px 90px;}
/*.layui-layer-dialog .layui-layer-content{padding-top:20px !important;}*/
</style>

