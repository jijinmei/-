<template>
<div class="youceng">
<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
        </div>
<!-- 表格 -->
<div class="pB16" style="width:778px;" >
<div class="layui-tab layui-tab-card border0 shadow0">
  <ul class="layui-tab-title">
    <li :class="{'layui-this':indexs==0}"  @click="goto(0)">內容</li>
    <li :class="{'layui-this':indexs==1}"  @click="goto(1)">評論({{datas.comments}})</li>
    <li :class="{'layui-this':indexs==2}"  @click="goto(2)">讚({{datas.goods}})</li>
  </ul>
  <div class="layui-tab-content bai pT20 pB15 pL15 pR15">
   <!-- 1.內容 -->
    <div class="layui-tab-item" v-if="datas!='no'" :class="{'layui-show':indexs==0}">
          <p class="right f16 c555555">
          <span class="f20 cff4d00 lf">{{datas.user.displayname}}</span>
          發布時間:{{datas.createdAt}}
          </p>

          <div class="f18 c222222 mT15">
            <span class="layui-badge-rim bg36c748 cffffff f18 border0 pL07 pR07 pT03 pB04">{{datas.tag}}</span>
            {{datas.title}}
          </div>

          <P class="f16 c222222 mT15 lh28"> {{datas.content}}</P>
          <ul >
            <li v-for="(item,index) in datas.pics" class="mB10 overflow w100s h345 relative">
            <img :src="item.url+imageView2" alt="" class="w100s jz cursor">
            </li>
          </ul>
    </div>
    <!-- 2.評論 -->
    <div class="layui-tab-item"  :class="{'layui-show':indexs==1}">
           <!-- 表格 -->
<div class="bai pT16 pB16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas2!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='108'>發佈者</th>
          <th class="padding0"  width='468'>內容</th>
          <th class="padding0"  width='108'>發佈時間</th>
          <th class="padding0"  width='56'>操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas2" >
          <td class='padding0 cursor'>{{item.user.nickname}}</td>
          <td class='padding0'>{{item.comment}}</td>
          <td class='padding0'>{{item.createdAt}}</td>
          <td class='padding0 cff4d00 cursor' @click="deleteds(item.objectId)">删除</td>
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
      <tbody>
        <tr v-for="(item,index) in datas3" class="left">
          <td class='padding0 cursor pL25'>{{item.nickname}}</td>
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
         count3:10,
         page3:1,
         count2:10,
         page2:1,
         imageView2:'?imageView2/1/w/748/h/345',
         datas:'no',
         datas2:'no',
         datas3:'no',
         indexs:0//当前的下标

    }
  },
  methods:{
        https3(page){
        var that=this
        that.$axios.get('boss/posts/'+this.$route.params.objectId+'/goods', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page
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
      that.$axios.get('boss/posts/'+this.$route.params.objectId+'/goods', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page
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
                     prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                    next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
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
     // 删除指定的评论
    deleteds(objectId){
      var that=this;      
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
                  $.ajax({
                headers:{'token':sessiontoken},
                 type: "DELETE",
                 url:Boss+'boss/comment/'+objectId,
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                   //清除删除后的数据
                                    that.https2(that.page)
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
        that.$axios.get('boss/posts/'+this.$route.params.objectId+'/comments', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page
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
      that.$axios.get('boss/posts/'+this.$route.params.objectId+'/comments', {
            params: {
            'limit':limit10,'sessiontoken':sessiontoken,'page':page
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
                     prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                    next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
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
  // 查看内容
  neirong(){
    var that=this;
    var layer;
    layui.use('layer', function(){
       layer = layui.layer;
     });
     $.ajax({
                headers:{'token':sessiontoken},
                 type: "get",
                 url: Boss+'boss/posts/'+this.$route.params.objectId,
                 data:{'sessiontoken':sessiontoken},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                    that.datas=data.results;
                             }else{                           
                                    layer.msg(data.message);
                             }
                          }
             });
  },
  goto(indexs){
     this.$router.push({name:'taolunqu5X',params:{'indexs':indexs}})
   },  
    // 返回上一级
  goback(){
    this.$router.push({name:'taolunqu5'})
  }
    
  },
  mounted() {
   this.indexs=this.$route.params.indexs
    // 内容
    this.neirong()
    // 评论
     this.pages2(1)
     //赞
     this.pages3(1)
    // this.objectId=this.$route.params.objectId
   
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
</style>

