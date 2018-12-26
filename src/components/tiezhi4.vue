<template>
    <div class="waiceng">
    <!-- 搜索 -->
   <div class="bai h40 pT20 pB20 pL16 pR16 relative">
           <input @keyup.enter="sousuo()" v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入帖子名關鍵字進行搜索" class="layui-input f18 czjz L20 h40" style="width:685px;">
            <button @click="sousuo()" class="layui-btn cffffff f18 bg36c748 czjz R16 h40 lh40" style="padding:0 15px;border-radius:0;">搜索</button>
      </div>
    <!-- 帅选条件 -->
   
    <ul class="bai relative" style="z-index:20;">
      
       <li class="bai relative" style="width:370px;display:inline-block;">
       <i @click="gotype()" class="cursor layui-icon f14 absolute R20 T10" :class="{c222222:typeVal!='',cbbbbbb:typeVal==''}">{{type==false?'&#xe61a;':'&#xe619;'}}</i>  
        <div class="layui-form-item">
            <label class="layui-form-label w35">類型</label>
               <input v-model="typeVal" @click="gotype()" type="text" name="title" required readonly lay-verify="required" placeholder="请選擇類型" autocomplete="off" class="lf layui-input cursor center" style="width:300px;">
        </div>
        <ul v-show='type==true' class="border bai center absolute R05 T35" style="width:297px;">
          <li @click="typeclick(index,$event)" @mouseenter="typeenter(index)" v-for="(item,index) in typeItem" class="h40 lh40 f18 cursor" :class="{cffffff:index==typeIdx,bg36c748:index==typeIdx}">{{item}}</li>
        </ul>
      </li>
       <li class="bai rf relative" style="width:380px;display:inline-block;">
        <i @click="gostatus()" class="cursor layui-icon f14 absolute R30 T10" :class="{c222222:statusVal!='',cbbbbbb:statusVal==''}">{{status==false?'&#xe61a;':'&#xe619;'}}</i>  
        <div class="layui-form-item">
            <label class="layui-form-label w35">狀態</label>
              <input v-model="statusVal" @click="gostatus()" type="text" name="title" required readonly lay-verify="required" placeholder="请選擇狀態" autocomplete="off" class="lf layui-input cursor center" style="width:300px;">
        </div>
        <ul v-show='status==true' class="border bai center absolute R16 T35" style="width:297px;">
          <li @click="statusclick(index,$event)" @mouseenter="statusenter(index)" v-for="(item,index) in statusItem" class="h40 lh40 f18 cursor" :class="{cffffff:index==statusIdx,bg36c748:index==statusIdx}">{{item}}</li>
        </ul>
      </li>
    </ul>
     <div class="relative pL23 cursor bai mB10 pB15" >
         <!-- <img @click="tocheckall($event)"   :src="dengpao==true?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="w28 dengall"> -->
         <span class="mR15 mL05"  @click="tocheckall($event)">全選</span>
         <button @click="deleteds" class="layui-btn fz18" :class="{bgff4d00:dengpao==true,bg999999:dengpao==false}">删除</button>
     </div>
     <!-- 表格 /<span class="cfbb03b">更新784</span>-->
<div class="bai pB16 pL16 pR16 relative pT16" style="width:752px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
        <th class="padding0" width='43'></th>
          <th class="padding0" width='142'>帖子名</th>
          <th class="padding0"  width='88'>類型</th>
          <th class="padding0"  width='105'>發佈者/<span class="cff4d00">昵稱</span></th>
          <th class="padding0"  width='155'>發佈時間</th>
          <th class="padding0"  width='70'>排序</th>
          <th class="padding0"  width='70'>狀態</th>   
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" class="yonghu">
         <td class='padding0 cursor center'>
             <img @click="tocheck($event)" :ids="item.objectId" srcs="no"  src="../assets/img/wx.png" alt="" class="w28 dengp">
          </td>
          <!-- @click="goxiangqing(item.objectId)" -->
          <td  class='padding0 c36c748 cursor left'>  
          <router-link :to="{name:'tiezhi4X',params:{'index':3,'objectId':item.objectId}}" target="_blank" class="c36c748">
           <span class="pL10">{{item.title}} </span>
          </router-link>
          </td>
          <td class='padding0'>{{item.section}}</td>
          <td class='padding0'>{{item.user.displayname}}{{item.user.call=='mr'?'先生':(item.user.call=='miss'?'小姐':'太太')}}
           <br>
              <span class="cff4d00">{{item.user.nickname}}</span>
          </td>
          <!-- 有更新过则显示更新时间黄色  否则显示发布时间黑色 -->
          <td class='padding0' :class="{cfbb03b:item.cratedTimeStamp!=item.updatedTimeStamp}">
           {{formatMsgTime(item.publishAt||item.createdAt)}}
          <!-- {{item.cratedTimeStamp==item.updatedTimeStamp?timestampToTime(item.cratedTimeStamp):timestampToTime(item.updatedTimeStamp)}}--></td> 
          <td class='padding0'>
             <input type="text" name="" @focus="show($event)" @blur="close($event,item.objectId)"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort">
          </td>
          <!-- <td class='padding0' :class="{cff4d00:item.show==1,c36c748:item.show==2,c999999:item.show==0,cff0000:item.show==-1}"> -->
           <td class='padding0' :class="{c36c748:item.show==1&&item.status==1,cff0000:!(item.show=='1'&&item.status=='1')}">
              {{item.show==0?'已下架':'已上架'}}
              </br>
              {{item.status==-1?'不通過':(item.status==0?'待審核':'已通過')}}
          <!-- {{item.show==2?'已發佈':(item.show==-1?'不通過':(item.show==1?'待審核':'已封盤'))}} -->
          </td>
        </tr>
      </tbody>
</table>
<!-- 分页 -->
<div class="mT30 h55 relative">
   <div class="f15 c666666 czjz L00">第{{page*10-9}}-{{page*10>count?count:page*10}}條記錄/共{{count}}條記錄</div>
   <div id='test' class="h35 rf" style='display:inline-block;'>
        
   </div> 
</div>
<!--  show = -1 为不通过
show = 0 为封盘
show = 1 为待审核
show = 2 为通过 -->

    </div>
    </div>
</template>
           <!-- 貸審會 已發佈 不通過 已封盤  -->
<script>
export default {
  name: 'tiezhi4',
  data () {
    return { dengpao:false,//删除是否亮灯
        datas:'no',
        count:10,
        searchkey:'',//关键字搜索
        page:1,
        // 类型
        typeVal:'',//输入框绑定的值
        typeIdx:0,//控制鼠标放上的下标
        type:false,//状态的弹出框的显示和隐藏
        typeItem:['全部類型'],//['全部類型','汽車交易', '家私電器' ,'跳蚤市場'],//
// '汽車交易', '家私電器' ,'跳蚤市場','裝修設計', '招生招聘' , '家政服務', '搬屋配送', '代購代收'
        // 状态
        statusVal:'',//输入框绑定的值
        statusIdx:0,//控制鼠标放上的下标
        status:false,//状态的弹出框的显示和隐藏
        statusItem:['全部狀態', '已上架 已通過', '已上架 待審核', '已上架 不通過', '已下架 已通過', '已下架 待審核', '已下架 不通過'],//状态的内容列表
        // statusItem:['全部狀態', '已發佈', '待審核', '不通過', '已下架'],//状态的内容列表
    }
  },
  methods:{
    formatMsgTime (timespan) { 
        timespan=timespan.replace(/-/g,':').replace(' ',':');
        timespan=timespan.split(':');
        var date24 = new Date(timespan[0],(timespan[1]-1),timespan[2],timespan[3],timespan[4]);
        // console.log(date24);
        var timespan = date24.getTime();
        // console.log(timespan)
        // var n = timespan;
        // var timespan = new Date(n);
        // var dateTime = new Date(timespan);  
        // var year = dateTime.getFullYear();  
        // var month = dateTime.getMonth() + 1;  
        // var day = dateTime.getDate();  
        // var hour = dateTime.getHours();  
        // var minute = dateTime.getMinutes();  
        // var second = dateTime.getSeconds();  
        // var now = new Date();  
        // var now_new = Date.parse(now.toDateString());   
        var now_new=(new Date()).getTime(); 
        var milliseconds = 0;  
        var timeSpanStr;  milliseconds = now_new - timespan; 
        console.log(now_new,timespan,milliseconds)
         if (milliseconds < 1000 * 1 * 1) {  
             timeSpanStr = '剛剛'; 
         }
         else if (1000 * 1 * 1 < milliseconds &&milliseconds < 1000 * 60 * 1) {   
          timeSpanStr = Math.round((milliseconds / (1000))) + '秒前';  
        }   
         else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {   
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分鐘前';  
          } 
         else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {   
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';  
          } 
          else {
          // if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {  
              timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';  
            }  
          // else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {   
          //    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute; 
          //    }
          // else {    
          //   timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;  
          // }  
          return timeSpanStr;
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
                  // return
                    for (var i = 0; i < ids.length; i++) {      
          var objectid=$(ids[i]).attr('ids')

            $.ajax({    
              url : Boss22+"article/"+objectid+'?sessiontoken='+sessiontoken,    
              type : "DELETE",  
               headers:{'token':sessiontoken},  
              data :{'sessiontoken':sessiontoken,'objectId':objectid},    
              success : function(data) {    
                    if(data.status){
                                  that.pages(that.page)
                                    that.dengpao=false;
                                    $('.dengp').attr('src',require('../assets/img/wx.png'))
                                     $('.dengp').attr('srcs','no')
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
                    }else{
                                           layui.use('layer', function(){
                                    var layer = layui.layer;
                                    layer.msg(data.message);
                                  });  
                    }
              },    
              error : function(data) {    
                   
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
    // // 勾选
    // tocheckall(e){
    //        if(this.dengpao==false){
    //            // $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
    //            // $(e.currentTarget).attr('srcs','../assets/img/yx.png')
    //            $('.dengp').attr('src',require('../assets/img/yx.png'))
    //            $('.dengp').attr('srcs','../assets/img/yx.png')
    //            this.dengpao=true
    //        }else{
    //            // $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
    //            // $(e.currentTarget).attr('srcs','../assets/img/wx.png')
    //            $('.dengp').attr('src',require('../assets/img/wx.png'))
    //            $('.dengp').attr('srcs','../assets/img/wx.png')
    //             this.dengpao=false
               
    //        }
    // },
    //  tocheck(e){
    //        if($(e.currentTarget).attr('srcs')=='../assets/img/wx.png'){
    //            $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
    //            $(e.currentTarget).attr('srcs','../assets/img/yx.png')
    //            this.dengpao=true
    //        }else{
    //            $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
    //            $(e.currentTarget).attr('srcs','../assets/img/wx.png')
    //            if($('.dengp[srcs="../assets/img/yx.png"]').length>0){
    //               this.dengpao=true
    //            }else{
    //             this.dengpao=false
    //            }
    //        }
    // },
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
// 获取时间
// timestampToTime(1403058804);   "2014-06-18 10:33:24"
timestampToTime(timestamp) {
  // return
    if(timestamp.length==10){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }else{
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
        
         var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + '';
        var s = date.getSeconds();
        console.log(Y+M+D+h+m)
        return Y+M+D+h+m;
    },
   
    // 点击楼盘名字跳去详情页面
    goxiangqing(objectId){
      this.$router.push({name:'tiezhi4X',params:{'index':3,'objectId':objectId}})
    },
    // 类型
     typeclick(index,e){
      this.type=false
      this.typeVal=$(e.currentTarget).html()
      // this.https(1)
      this.pages(1)

    },
    typeenter(index){
      this.typeIdx=index
      // console.log(index)
    },
    // 状态
    gotype(){
    this.type=!(this.type)

    if(this.price==true){
        this.price=false
    }else if(this.place==true){
        this.place=false
    }else if(this.status==true){
        this.status=false
    }
    },
    // 状态
    statusclick(index,e){
      this.status=false
      this.statusVal=$(e.currentTarget).html()
      // this.https(1)
       this.pages(1)
    },
    statusenter(index){
      this.statusIdx=index
      // console.log(index)
    },
    // 状态
    gostatus(){
    this.status=!(this.status)
    if(this.price==true){
        this.price=false
    }else if(this.type==true){
        this.type=false
    }else if(this.place==true){
        this.place=false
    }
    },
    // 搜索关键字
    sousuo(){
         // if(this.searchkey){
           this.pages(1)
         //    this.https(1)
         // }
    },
https(page){
        var that=this
    // 查看中介信息
    // var show=(this.statusIdx==0?'':(this.statusIdx==1?'2':(this.statusIdx==2?'1':(this.statusIdx==3?'-1':'0'))))
    // var type=(this.typeVal=='全部類型'?'':this.typeVal)

    var show=(this.statusIdx==1||this.statusIdx==2||this.statusIdx==3)?1:(this.statusIdx==0?'':0)
    var status=(this.statusIdx==0?'':(this.statusIdx==1||this.statusIdx==4?1:(this.statusIdx==2||this.statusIdx==5?0:-1)))
        that.$axios.get('boss/article', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken,'section':that.typeVal,'status':status,'show':show
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas=data.results.data
              that.count=data.results.count

            }else{
                                                                      
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
      // 查看中介信息
       // var show=(this.statusIdx==0?'':(this.statusIdx==1?'2':(this.statusIdx==2?'1':(this.statusIdx==3?'-1':'0'))))
       // var type=(this.typeVal=='全部類型'?'':this.typeVal)
        var show=(this.statusIdx==1||this.statusIdx==2||this.statusIdx==3)?1:(this.statusIdx==0?'':0)
    var status=(this.statusIdx==0?'':(this.statusIdx==1||this.statusIdx==4?1:(this.statusIdx==2||this.statusIdx==5?0:-1)))
        that.$axios.get('boss/article', {
            params: {
            'searchkey':that.searchkey,'page':1,'limit':limit10,'sessiontoken':sessiontoken,'section':that.typeVal,'status':status,'show':show
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
                    //如果是切换页cou
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
                                                                      
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    }
  },
  mounted() {
    var that=this;
      this.pages(1)
      // 查看类型
      $.get(Boss1+'section',function(data){
        if(data.status){
          var aa=data.result
          for (var i = 0; i < aa.length; i++) {
            that.typeItem.push(aa[i].title)
          }
            
        }
      })



      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input{background: #f5f5f5 !important;}
</style>
