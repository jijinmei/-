<template>
    <div class="waiceng">
    <!-- 帅选条件 -->
    <ul class="relative h40 bgf5f5f5 mB15" style="z-index:20;">
     <li class="lf relative pL23 cursor" style="display:inline-block;">
         <!-- <img @click="tocheckall($event)"   :src="dengpao==true?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="w28 dengall"> -->
         <span class="mR15 mL05" @click="tocheckall($event)">全選</span>
         <button @click="deleteds" class="layui-btn f18" :class="{bgff4d00:dengpao==true,bg999999:dengpao==false}">删除</button>
         <button  @click="goxiangqing('no','no')" class="layui-btn f18 bg36c748 mL30" >新建</button>
     </li>
      
      <li class="bai rf" style="display:inline-block;">
           <input @keyup.enter="sousuo()" v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入標題關鍵字進行搜索" class="layui-input f18 L20 h40 lf" style="width:380px;">
            <button @click="sousuo()" class="lf layui-btn cffffff f18 bg36c748 R16 h40 lh40 padding0 w70" style="border-radius:0;">搜索</button>
      </li>
    </ul>
     <!-- 表格 -->
<div class="bai pT16 pB16 pL16 pR16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='43'></th>
          <th class="padding0" width='391'>標題</th>
          <th class="padding0"  width='168'>發佈時間</th>
          <th class="padding0"  width='86'>排序</th>
          <th class="padding0"  width='52'>操作 </th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" class="yonghu">
          <td class='padding0 cursor center'>
             <img @click="tocheck($event)" :ids="item.objectId" srcs="no"  src="../assets/img/wx.png" alt="" class="w28 dengp">
          </td>
          <td class='padding0 cursor c36c748'  @click="goxiangqing(item,item.objectId)">{{item.title}}</td>
          <td class='padding0'>{{item.createdAt}}</td>
          <td class='padding0'>{{item.sort}}
          <!--   <input type="text" name="" @focus="show($event)" @blur="close($event,item.objectId)"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort"> -->
          </td>
          <td class='padding0 c36c748 cursor' @click="goxiangqing(item,item.objectId)">詳情</td>
        </tr>
      </tbody>
</table>
<!-- 分页 -->
<div class="mT30 h55 relative">
   <div class="f15 c666666 czjz L00">第{{page*10-9}}-{{page*10>count?count:page*10}}條記錄/共{{count}}條記錄</div>
   <div id='test' class="h35 rf" style='display:inline-block;'>
        
   </div> 
</div>


    </div>
    </div>
</template>
           <!-- 貸審會 已發佈 不通過 已封盤  -->
<script>
export default {
  name: 'xiaoxi7',
  data () {
    return {
        datas:'no',
        dengpao:false,//删除是否亮灯
        count:10,
        searchkey:'',//关键字搜索
        page:1
        
    }
  },
  methods:{
      close(e,objectId){
      $(e.currentTarget).removeClass('border').addClass('transparent')
       jQuery.ajax({
      url: Boss+'boss/article/'+objectId+'/sort',
      type: "POST",
      headers: {
          "token":sessiontoken,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      contentType: "application/x-www-form-urlencoded",
      data: {'sessiontoken':sessiontoken,'sort':$(e.currentTarget).val()},
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



    },
    show(e){
      $(e.currentTarget).removeClass('transparent').addClass('border')
    },
    // 创建
    creates(){

    },
    // 删除
    deleteds(){
      var that=this;
        if(this.dengpao==true){
          var objectid=''
        var ids=$('.dengp[srcs="yes"]')
        // for (var i = 0; i < ids.length; i++) {
        //   var b='|'
        //   if(i==0){
        //     b=''
        //   }
        //   objectid+=b+$(ids[i]).attr('ids')
        // }
        // console.log(objectid)
        // return

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
                  for (var i = 0; i < ids.length; i++) {
                    console.log($(ids[i]).attr('ids'))
                      // layer.close(index); //如果设定了yes回调，需进行手工关闭
                    // return
                      $.ajax({
                headers:{'token':sessiontoken},
                 type: "DELETE",
                 url: Boss+'boss/article/'+$(ids[i]).attr('ids'),
                 // data:{'ids':objectid},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                   //清除删除后的数据
                                    // that.https(that.page)
                                    that.pages(that.page)
                                    that.dengpao=false;
                                    $('.dengp').attr('src',require('../assets/img/wx.png'))
                                    $('.dengp').attr('srcs','no')
                                     // $('.dengp').attr('srcs','../assets/img/wx.png')
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
                             }else{
                                  layui.use('layer', function(){
                                    var layer = layui.layer;
                                    layer.msg(data.message);
                                  });   
                             }
                          }
             });
                  }
                
                                                
                  
              },
              btn2: function(layero){
                console.log("我是取消按钮"); //
              }
            

            });
      })
        }
    },
    // 勾选
    tocheckall(e){
           if(this.dengpao==false){
               // $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
               // $(e.currentTarget).attr('srcs','../assets/img/yx.png')
               $('.dengp').attr('src',require('../assets/img/yx.png'))
               $('.dengp').attr('srcs','yes')
               this.dengpao=true
           }else{
               // $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
               // $(e.currentTarget).attr('srcs','../assets/img/wx.png')
               $('.dengp').attr('src',require('../assets/img/wx.png'))
               $('.dengp').attr('srcs','no')
                this.dengpao=false
               
           }
    },
    tocheck(e){
           if($(e.currentTarget).attr('srcs')=='no'){
               $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
               $(e.currentTarget).attr('srcs','yes')
               this.dengpao=true
           }else{
               $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
               $(e.currentTarget).attr('srcs','no')
               if($('.dengp[srcs="yes"]').length>0){
                  this.dengpao=true
               }else{
                this.dengpao=false
               }
           }
    },
    // 点击楼盘名字跳去详情页面
    goxiangqing(item,objectId){
      if(objectId!='no'){
         window.sessionStorage.setItem('xiaoxi7X',JSON.stringify(item))
         window.open('#/HOME/xiaoxi7X/7/'+objectId)
        // this.$router.push({name:'xiaoxi7X',params:{'objectId':objectId}})
      }else{
         // this.$router.push({name:'xiaoxi7X',params:{'objectId':objectId}})
          window.open('#/HOME/xiaoxi7X/7/'+objectId)
      }
    },
    // statusclick(index,e){
    //   this.status=false
    //   this.statusVal=$(e.currentTarget).html()
      
    //   this.https(1)
    // },
    // statusenter(index){
    //   this.statusIdx=index
    //   // console.log(index)
    // },
    // 状态
    // gostatus(){
    // this.status=!(this.status)

    // },
    // 搜索关键字
    sousuo(){
         // if(this.searchkey){

            // this.https(1)
            this.pages(1)
         // }
    },
https(page){
        var that=this
        // 取得最新消息数据
        that.$axios.get('boss/article?section=最新消息', {
            params: {
            'searchkey':that.searchkey,'page':page,'tag':that.statusVal,'limit':limit10,'sessiontoken':sessiontoken
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas=data.results.data
              that.count=data.results.count

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
    pages(page){
      //首次请求数据，并构建分页
      var that=this;
      this.page=page;
      // 取得检举数据
      that.$axios.get('boss/article?section=最新消息', {
            params: {
            'searchkey':that.searchkey,'page':page,'tag':that.statusVal,'limit':limit10,'sessiontoken':sessiontoken
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas=data.results.data
              that.count=data.results.count

              layui.use('laypage', function(){
                  var laypage = layui.laypage;
                  //执行一个laypage实例
                  laypage.render({
                    elem: 'test', //注意，这里的 test1 是 ID，不用加 # 号
                    limit:limit10,
                     prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
                    next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
                    // hash: 'page', //自定义hash值
                    count:that.count, //数据总数，从服务端得到
                    jump:function(obj,first){
                    // alert(obj.curr)
                    //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
                    //如果是切换页
                    if(!first){
                       console.log('切换对应页数据')
                          that.page=obj.curr
                          that.https(obj.curr)
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

    }
  },
  mounted() {
      this.pages(1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input{background: #f5f5f5 !important;}
</style>
