<template>
<div class="youceng">

<!-- 表格 -->
<div class="pB16" style="width:778px;" >
<div class="layui-tab layui-tab-card border0 shadow0 relative mT20">

  <span  class="absolute R00 f18 cffffff w116 h40 lh40 center cursor bg36c748" style="z-index:10;top:-10px;" @click="goxiangqing('no','no','no')">新增幻燈片</span>

  <ul class="layui-tab-title relative">
    <li :class="{'layui-this':indexs==0}"  @click="goto(0)">首頁</li>
    <li :class="{'layui-this':indexs==1}"  @click="goto(1)">幫助</li>
    <li :class="{'layui-this':indexs==2}"  @click="goto(2)">討論區</li>
  </ul>
  <div class="layui-tab-content bai pT20 pB15 pL15 pR15">
   <!-- 1.內容 -->
    <div class="layui-tab-item" :class="{'layui-show':indexs==0}">
                   <!-- 表格 -->
<div class="bai pT16 pB16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas1!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='98'>排序</th>
          <th class="padding0"  width='258'>名稱</th>
          <th class="padding0"  width='197'>圖片</th>
          <th class="padding0"  width='188'>操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas1" class="h100 yonghu">
          <td class='padding0 cursor'>
         <input type="text"  name="" @focus="show($event)" @blur="close($event,item.objectId,'home')"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort">
          </td>
          <td class='padding0'>{{item.title}}</td>
          <td class='padding0'>
            <div  class="w158 h74 overflow relative" style="margin:0 auto;">
              <img :src="item.cover.url==false?'':item.cover.url+imageView3" alt="" class="w158 jz" style="max-width:158px;" >
            </div>
          </td>
          <td class='padding0'>
             <span class="c36c748 cursor mR30"  @click="goxiangqing(item.objectId,item.channel,item)">修改</span>
             <span class="cff4d00 cursor"  @click="deleteds(item.objectId,index)">删除</span>
          </td>
        </tr>
      </tbody>
</table>
<!-- 分页 -->
<div class="mT30 h55 relative">
   <div class="f15 c666666 czjz L00">第{{page1*10-9}}-{{page1*10>count1?count1:page1*10}}條記錄/共{{count1}}條記錄</div>
   <div id='test1' class="h35 rf" style='display:inline-block;'>
        
   </div> 
</div>


    </div>
    </div>
    <!-- 2.評論 -->
    <div class="layui-tab-item"  :class="{'layui-show':indexs==1}">
                   <!-- 表格 -->
<div class="bai pT16 pB16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas2!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='98'>排序</th>
          <th class="padding0"  width='258'>名稱</th>
          <th class="padding0"  width='197'>圖片</th>
          <th class="padding0"  width='188'>操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas2" class="h100 yonghu0">
          <td class='padding0 cursor'>
              <input type="text"  name="" @focus="show($event)" @blur="close($event,item.objectId,'services')"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort">
          </td>
          <td class='padding0'>{{item.title}}</td>
          <td class='padding0'>
            <div  class="w158 h74 overflow relative" style="margin:0 auto;">
              <img :src="item.cover.url==false?'':item.cover.url+imageView3" alt="" class="w158 jz" style="max-width:158px;" >
            </div>
          </td>
          <td class='padding0'>
             <span class="c36c748 cursor mR30"  @click="goxiangqing(item.objectId,item.channel,item)">修改</span>
             <span class="cff4d00 cursor"  @click="deleteds(item.objectId,index)">删除</span>
          </td>
        </tr>
      </tbody>
</table>
<!-- 分页 -->
<div class="mT30 h55 relative">
   <div class="f15 c666666 czjz L00">第{{page2*10-9}}-{{page2*10>count2?count2:page2*10}}條記錄/共{{count2}}條記錄</div>
   <div id='test2' class="h35 rf" style='display:inline-block;'>
        
   </div> 
</div>


    </div>
    </div>
    <!-- 3.讚 -->
    <div class="layui-tab-item"  :class="{'layui-show':indexs==2}">
                   <!-- 表格 -->
<div class="bai pT16 pB16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas3!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='98'>排序</th>
          <th class="padding0"  width='258'>名稱</th>
          <th class="padding0"  width='197'>圖片</th>
          <th class="padding0"  width='188'>操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas3" class="h100 yonghu1">
          <td class='padding0 cursor'>
              <input type="text"  name="" @focus="show($event)" @blur="close($event,item.objectId,'discuss')"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort">
          </td>
          <td class='padding0'>{{item.title}}</td>
          <td class='padding0'>
            <!-- <div  class="w158 h74" style="margin:0 auto;">
              <img :src="item.cover.url+imageView3" alt="" class="w158" style="max-width:158px;">
            </div> -->
            <div  class="w158 h74 overflow relative" style="margin:0 auto;">
              <img :src="item.cover.url==false?'':item.cover.url+imageView3" alt="" class="w158 jz" style="max-width:158px;" >
            </div>
          </td>
          <td class='padding0'>
             <span class="c36c748 cursor mR30"  @click="goxiangqing(item.objectId,item.channel,item)">修改</span>
             <span class="cff4d00 cursor"  @click="deleteds(item.objectId,index)">删除</span>
          </td>
        </tr>
      </tbody>
</table>
<!-- 分页 -->
<div class="mT30 h55 relative">
   <div class="f15 c666666 czjz L00">第{{page3*10-9}}-{{page3*10>count3?count3:page3*10}}條記錄/共{{count3}}條記錄</div>
   <div id='test3' class="h35 rf" style='display:inline-block;'>
        
   </div> 
</div>


    </div>
    </div>
  </div>
</div>

</div>
</div>
</template>

<script>
export default {
  name: 'taolunqu5X',
  data () {
    return {
         count1:10,
         page1:1,
         count3:10,
         page3:1,
         count2:10,
         page2:1,
         imageView2:'?imageView2/1/w/748/h/345',
         imageView3:'?imageView2/1/w/158/h/74',
         datas1:'no',
         datas2:'no',
         datas3:'no',
         indexs:0//当前的下标

    }
  },
  methods:{
      // 排序的失去焦点和获取焦点
     close(e,objectId,channel){
   
      $(e.currentTarget).removeClass('border').addClass('transparent');
// return
jQuery.ajax({
    url: Boss2+'boss/slider',
    type: "POST",
    headers: {
        "token":sessiontoken,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    contentType: "application/x-www-form-urlencoded",
    data: {'sessiontoken':sessiontoken,'sort':$(e.currentTarget).val(),'objectId':objectId,'channel':channel},
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
                           if(data.status){

                            }else{
                                layui.use('layer', function(){
                                    var layer = layui.layer;
                                    layer.msg(data.message);
                                  }); 
                            }
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});
       // $.ajax({
       //          headers:{'token':sessiontoken,"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"},
       //           type: "post",
       //            contentType: "application/x-www-form-urlencoded",
       //           url: Boss+'boss/article/'+objectId+'/sort',
       //           data:{'sessiontoken':sessiontoken,'sort':$(e.currentTarget).val()},
       //           // dataType: "json",
       //           success: function(data){
       //                    if(data.status){

       //                      }else{
       //                          layui.use('layer', function(){
       //                              var layer = layui.layer;
       //                              layer.msg(data.message);
       //                            }); 
       //                      }
       //                    }
       //       });
    },
    show(e){
      $(e.currentTarget).removeClass('transparent').addClass('border')
    },
      // 点击楼盘名字跳去详情页面
    goxiangqing(objectId,channel,item){
      // 清除缓存
         this.$store.state.imgblob=[]
         this.$store.state.imgUrl=[]
          var channels=(this.indexs==0?'home':(this.indexs==1?'services':'discuss'))
      if(objectId=='no'){
       
        // this.$router.push({name:'huandeng10X',params:{'objectId':objectId,'channel':channels}})
          window.open('#/HOME/huandeng10X/10/'+this.$route.params.indexs+'/'+objectId+'/'+channels)
      }else{
        window.sessionStorage.setItem('huandeng10X',JSON.stringify(item))
        // this.$router.push({name:'huandeng10X',params:{'objectId':objectId,'channel':channel}})
         window.open('#/HOME/huandeng10X/10/'+this.$route.params.indexs+'/'+objectId+'/'+channels)
      }
      
    },
     https1(page){
        var that=this
        that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'home'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas1=data.results.data
              that.count1=data.results.count

            }else{
                   layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                        
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    },
    pages1(page){
      //首次请求数据，并构建分页
      var that=this;
      // this.page=page;
      // this.datas='no'
      that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'home'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas1=data.results.data
              that.count1=data.results.count

              layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limit10,
                     prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                    next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                    // hash: 'page', //自定义hash值
                    count:that.count1, //数据总数，从服务端得到
                    jump:function(obj,first){
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if(!first){
                       console.log('切换对应页数据')
                       that.page1=obj.curr
                          that.https1(obj.curr)
                    }else{
                      // 如果是首次
                       console.log('首次啥也不干')
                        //that.https(1)
                    }
                  }
                });
              });
            }else{
                    layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                    
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    },
        https3(page){
        var that=this
        that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'discuss'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas3=data.results.data
              that.count3=data.results.count

            }else{
                   layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                        
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    },
    pages3(page){
      //首次请求数据，并构建分页
      var that=this;
      // this.datas='no'
      that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'discuss'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas3=data.results.data
              that.count3=data.results.count

              layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'test3', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limit10,
                    // hash: 'page', //自定义hash值
                    count:that.count3, //数据总数，从服务端得到
                    jump:function(obj,first){
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if(!first){
                       console.log('切换对应页数据')
                       that.page3=obj.curr
                          that.https3(obj.curr)
                    }else{
                      // 如果是首次
                       console.log('首次啥也不干')
                        //that.https(1)
                    }
                  }
                });
              });
            }else{
                    layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                    
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    },
     // 删除指定的幻燈片
    deleteds(objectId,index){
      var that=this;      
       layui.use('layer', function(){
       var layer = layui.layer;
            layer.confirm('確認刪除幻燈片?',{
              closeBtn:0,
              title:false,
              area: ['340px'],
              skin: 'layerssmall',
              btn: ['刪除','取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("删除幻灯片"); //如果设定了yes回调，需进行手工关闭
                  $.ajax({
                headers:{'token':sessiontoken},
                 type: "DELETE",
                 url:Boss+'boss/slider/'+objectId,
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                   //清除删除后的数据
                                   // that.https2(that.page)
                                   // alert(2323)
                                    if(that.indexs==0){that.https1(that.page)
                                      // that.datas1.splice(index,1)
                                    }else if(that.indexs==1){that.https2(that.page)
                                      // that.datas2.splice(index,1)
                                    }else if(that.indexs==2){that.https3(that.page)
                                      // that.datas3.splice(index,1)
                                    }
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
                             }else{
                                  layui.use('layer', function(){
                                    var layer = layui.layer;
                                    layer.msg(data.message);
                                  });   
                             }
                          }
             });
                                                
                  
              },
              btn2: function(layero){
                console.log("我是取消按钮"); //
              }
            

            });
      })
        
    },
    https2(page){
        var that=this
        that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'services'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas2=data.results.data
              that.count2=data.results.count

            }else{
                   layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                        
            }
          })
          .catch(function (error) {
            console.log(error);
        });
    },
    pages2(page){
      //首次请求数据，并构建分页
      var that=this;
      // this.datas='no'
      that.$axios.get('boss/slider', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page,'channel':'services'
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas2=data.results.data
              that.count2=data.results.count

              layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'test2', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limit10,
                    // hash: 'page', //自定义hash值
                    count:that.count2, //数据总数，从服务端得到
                    jump:function(obj,first){
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if(!first){
                       console.log('切换对应页数据')
                       that.page2=obj.curr
                          that.https2(obj.curr)
                    }else{
                      // 如果是首次
                       console.log('首次啥也不干')
                        //that.https(1)
                    }
                  }
                });
              });
            }else{
                    layui.use('layer', function(){
                      var layer = layui.layer;
                      layer.msg(data.message);
                    });                                                    
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    },
  goto(indexs){
    var that=this;
    // setTimeout(function(){
      that.$router.push({name:'huandeng10',params:{'indexs':indexs}})
    // },500)
     this.indexs=this.$route.params.indexs;
   if(this.indexs==0){
    // 首页
    this.pages1(1)
  }else if(this.indexs==1){
    // 帮助
    this.pages2(1)
   }else if(this.indexs==2){
    // 讨论区
    this.pages3(1)
   }
     
   }
    
  },
  mounted() {
   this.indexs=this.$route.params.indexs
   if(this.indexs==0){
    // 首页
    this.pages1(1)
  }else if(this.indexs==1){
    // 帮助
    this.pages2(1)
   }else if(this.indexs==2){
    // 讨论区
    this.pages3(1)
   }
    
   
    layui.use('element', function(){
        var element = layui.element;
            });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layui-tab-title{border-bottom: 0 !important;}
.layui-tab-title>li:after{border-left: 0 !important;border-right: 0 !important;}
.layui-tab-title>li{font-size: 18px;color:#222222;padding:0 30px;width:auto !important;}
.layui-tab-title>.layui-this{color:#36c748;border-top:3px solid #36c748;}
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input,.yonghu0:nth-child(2n) input,.yonghu1:nth-child(2n) input{background: #f5f5f5 !important;}
</style>

