<template>
    <div class="waiceng">
    <!-- 搜索 -->
   <div class="bai h40 pT20 pB20 pL16 pR16 relative">
           <input @keyup.enter="sousuo()" v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入發佈者昵稱或樓盤名進行搜索" class="layui-input f18 czjz L20 h40" style="width:685px;">
            <button @click="sousuo()" class="layui-btn cffffff f18 bg36c748 czjz R16 h40 lh40" style="padding:0 15px;border-radius:0;">搜索</button>
      </div>
    <!-- 帅选条件 -->
    <ul class="bai relative" style="z-index:20;">
      <li class="bai relative" style="z-index:10;width:370px;display:inline-block;">
       <i  @click="goplace()" class="cursor layui-icon f14 absolute R20 T10" :class="{c222222:placeVal!='',cbbbbbb:placeVal==''}">{{place==false?'&#xe61a;':'&#xe619;'}}</i>  
        <div class="layui-form-item">
            <label class="layui-form-label w35">區域</label>
              <!-- <input type="text" name="title" required readonly lay-verify="required" placeholder="请選擇區域" autocomplete="off" class="lf layui-input cursor" style="width:300px;"> -->
               <input v-model="placeVal" @click="goplace()" type="text" name="title" required readonly lay-verify="required" placeholder="请選擇區域" autocomplete="off" class="lf layui-input cursor center" style="width:300px;">
               
        </div>
          <div v-if="place==true" class="border bai center absolute R05 T35 overflow" style="width:297px;">
             <div class="overflow">           
                    <ul class="lf margint0 quyuz" style="width:50%;height:400px;">
                              <li  v-for="(items,keys,indexs) in quyuZuo" class="cursor relative padding0 h40 lh40 f18 left pL10" @click="province(items,indexs,keys)"   :class="{bgeeeeee:quyuIdx!=indexs,bgffffff:quyuIdx==indexs}" >
                                  <a :class="{c36c748:quyuIdx==indexs,c666666:quyuIdx!=indexs}" class="f14 margin0" style="padding-left:0.4rem;">
                                     {{keys}}
                                  </a>
                                  <i class="layui-icon f14 czjz R10"  v-if="items.length>0" :class="{c36c748:quyuIdx==indexs,c666666:quyuIdx!=indexs}">&#xe602;</i>  

                              </li>
                              
                          </ul>
                          <ul class="rf margint0 quyuy" style="width:50%;overflow-y:scroll;height:400px;">
                              <li v-for="(items,indexs) in quyuYou" class="border-b cursor padding0 h40 lh40" @click="city(items,indexs)"  >
                                  <a :class="{c36c748:quyuIdxr==indexs,c333333:quyuIdxr!=indexs}" class="fz27 margin0">
                                     {{items}}
                                  </a>

                              </li>
                              
                          </ul>
                        
                          
                           </div>

                           <div class="center mB25" style="margin-top:35px;margin-bottom:10px;">
                           <span @click="quedings" class="mR15 inline bg36c748 R00 f18 cffffff w70 h40 lh40 center cursor">確定</span>
                           <span @click="resets" class="inline  R00 f18 c36c748 w68 h38 lh38 center cursor" style="border:1px solid #36c748;">重置</span>
                          </div>
                          
        </div>
      </li>
       <li class="bai rf relative" style="width:380px;display:inline-block;z-index:10;">
        <i @click="goprice()"  class="cursor layui-icon f14 absolute R30 T10" :class="{c222222:priceVal!='',cbbbbbb:priceVal==''}">{{price==false?'&#xe61a;':'&#xe619;'}}</i>  
        <div class="layui-form-item">
            <label class="layui-form-label w35">租金</label>
              <!-- <input type="text" name="title" readonly required  lay-verify="required" placeholder="请選擇租金" autocomplete="off" class="lf layui-input cursor" style="width:300px;"> -->
              <input v-model="priceVal" @click="goprice()" type="text" name="title" required readonly lay-verify="required" placeholder="请選擇租金" autocomplete="off" class="lf layui-input cursor center" style="width:300px;">
        </div>
         <ul v-show='price==true' class="border bai center absolute R16 T35" style="width:297px;">
         <li @click="priceclick(index,$event)" @mouseenter="priceenter(index)" v-for="(item,index) in priceItem" class="h40 lh40 f18 cursor" :class="{cffffff:index==priceIdx,bg36c748:index==priceIdx}">{{item}}</li>
        </ul>
      </li>
       <li class="bai relative" style="width:370px;display:inline-block;">
       <i  @click="gotype()" class="cursor layui-icon f14 absolute R20 T10" :class="{c222222:typeVal!='',cbbbbbb:typeVal==''}">{{type==false?'&#xe61a;':'&#xe619;'}}</i>  
        <div class="layui-form-item">
            <label class="layui-form-label w35">類型</label>
               <input v-model="typeVal" @click="gotype()" type="text" name="title" required readonly lay-verify="required" placeholder="请選擇類型" autocomplete="off" class="lf layui-input cursor center" style="width:300px;">
        </div>
        <ul v-show='type==true' class="border bai center absolute R05 T35" style="width:297px;">
          <li @click="typeclick(index,$event)" @mouseenter="typeenter(index)" v-for="(item,index) in typeItem" class="h40 lh40 f18 cursor" :class="{cffffff:index==typeIdx,bg36c748:index==typeIdx}">{{item}}</li>
        </ul>
      </li>
       <li class="bai rf relative" style="width:380px;display:inline-block;">
        <i @click="gostatus()"  class="cursor layui-icon f14 absolute R30 T10" :class="{c222222:statusVal!='',cbbbbbb:statusVal==''}">{{status==false?'&#xe61a;':'&#xe619;'}}</i>  
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
         <span class="mR15 mL05" @click="tocheckall($event)">全選</span>
         <button @click="deleteds" class="layui-btn fz18" :class="{bgff4d00:dengpao==true,bg999999:dengpao==false}">删除</button>
     </div>
     <!-- 表格748 -->
<div class="bai pB16 pL16 pR16 relative pT16" style="width:752px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
         <th class="padding0" width='43'></th>
          <th class="padding0" width='142'>樓盤名稱</th>
          <th class="padding0"  width='88'>物業類型</th>
          <th class="padding0"  width='103'>地區</th>
          <th class="padding0"  width='68'>租金<br><span class="f14">(元/月)</span></th>
          <th class="padding0"  width='105'>發佈者/<span class="cff4d00">昵稱</span></th>
          <th class="padding0"  width='112'>發佈時間</th>
          <!-- /<span class="cfbb03b">155更新</span> -->
          <th class="padding0"  width='70'>狀態</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" >
          <td class='padding0 cursor center'>
             <img @click="tocheck($event)" :ids="item.objectId" srcs="no"  src="../assets/img/wx.png" alt="" class="w28 dengp">
          </td>
          <td  class='padding0 c36c748 cursor left'>
           <router-link :to="{name:'zupan12X',params:{'index':1,'objectId':item.objectId}}" target="_blank" class="c36c748">
            <span class="pL10">{{item.title}} </span>
          </router-link>
          </td>
          <td class='padding0'>{{item.type}}</td>
          <td class='padding0'>{{item.build_area}}</td>
          <td class='padding0'>{{item.price}}</td>
          <td class='padding0'>{{item.user.displayname}}{{item.user.call=='mr'?'先生':(item.user.call=='miss'?'小姐':'太太')}}
    <br>
    <span class="cff4d00">{{item.user.nickname}}</span>
          </td>
          <!-- 有更新过则显示更新时间黄色  否则显示发布时间黑色 -->
           <!-- <td class='padding0' :class="{cfbb03b:item.cratedTimeStamp!=item.updatedTimeStamp}"> -->
           <td class='padding0'>
           {{item.publishAt||item.createdAt}}
           <!--{{item.cratedTimeStamp==item.updatedTimeStamp?timestampToTime(item.cratedTimeStamp):timestampToTime(item.updatedTimeStamp)}} --></td>
          <!-- <td class='padding0' :class="{cff4d00:item.show==1,c36c748:item.show==2,c999999:item.show==0,cff0000:item.show==-1}"> -->
           <td class='padding0' :class="{c36c748:item.show==1&&item.status==1,cff0000:!(item.show=='1'&&item.status=='1')}">
              {{item.show==0?'已封盤':'已開盤'}}
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
  name: 'zupan12',
  data () {
    return {dengpao:false,//删除是否亮灯
        datas:'no',
        count:10,
        searchkey:'',//关键字搜索
        page:1,
        // quyu
        place:false,
        placeVal:'',//输入框绑定的值
        quyuZuo:[],
        quyuYou:[],//地区详细
        quyuItem:[],//地区标题
        sheng:'不限',//提交的省
        shi:'不限',//提交的市
        quyuIdx:0,//区域左边的index
        quyuIdxr:0,//区域右边的index
        // 租金
        priceVal:'',//输入框绑定的值
        priceIdx:0,//控制鼠标放上的下标
        price:false,//状态的弹出框的显示和隐藏
        priceItem:['不限','$4,000元或以下','$4,000-$8,000元','$8,000-$10,000元','$10,000-$15,000元','$15,000-$20,000元','$20,000元以上'],//状态的内容列表
        pricemin:'',
        pricemax:'',
        priceZu:[
                {'price_min':'','price_max':''},
                {'price_min':'','price_max':'4000'},
                {'price_min':'4000','price_max':'8000'},
                {'price_min':'8000','price_max':'10000'},
                {'price_min':'10000','price_max':'15000'},
                {'price_min':'15000','price_max':'20000'},
                {'price_min':'20000','price_max':''}
                       ],//租的价格

        // 类型
        typeVal:'',//输入框绑定的值
        typeIdx:0,//控制鼠标放上的下标
        type:false,//状态的弹出框的显示和隐藏
        typeItem:['不限','住宅','車位','商鋪','寫字樓','工業大廈'],//

        // 状态
        statusVal:'',//输入框绑定的值
        statusIdx:0,//控制鼠标放上的下标
        status:false,//状态的弹出框的显示和隐藏
        statusItem:['全部狀態', '已開盤 已通過', '已開盤 待審核', '已開盤 不通過', '已封盤 已通過', '已封盤 待審核', '已封盤 不通過'],//状态的内容列表
        // statusItem:['全部狀態', '已發佈', '待審核', '不通過', '已封盤'],//状态的内容列表
    }
  },
  methods:{
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
              url : Boss2+"boss/agent/"+objectid,    
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
// 获取时间
// timestampToTime(1403058804);   "2014-06-18 10:33:24"
timestampToTime(timestamp) {
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
        // console.log(Y+M+D+h+m)
        return Y+M+D+h+m;
    },
    // 状态
    goplace(){
    this.place=!(this.place)

    if(this.price==true){
        this.price=false
    }else if(this.type==true){
        this.type=false
    }else if(this.status==true){
        this.status=false
    }
    
    },
    quyus(){
      var that=this;
  //获取区域
        $.ajax(Boss1+'system/area', {
                      dataType: 'json', //服务器返回json格式数据
                      type: 'GET', //HTTP请求类型
                      timeout: 10000, //超时时间设置为10秒；
                      //  headers:{'Content-Type':'application/json'},
                    success: function(data) {
                        //1.服务器返回响应，根据响应结果，分析是否登录成功；
                        if(data.status == true) {
                            that.quyuZuo=data.result
                                                
                        }
                        

                      }
                
                    });
    },
    province(item,index,keys){
        this.quyuIdx=index
        this.quyuIdxr=-1
        this.quyuYou=item
        // this.shi='不限'
         if(item.length>0){
          this.shi=item.join(',')
        }else{
            this.shi='不限'
        }
        console.log(this.shi)
        this.sheng=keys
      },
            city(item,index){
              this.quyuIdxr=index
              this.shi=item
            },
    //1.区域重置按钮和确定按钮
      resets(){
        this.quyuIdx=0//不限左边的下标
        this.quyuIdxr=0//不限右边的下标
        this.quyuYou=[]//不限右边是空的
        // this.placeVal='不限'
        this.shi='不限'
        this.sheng='不限'
      },
      quedings(){
        if(this.shi.indexOf(',')!=-1){
          this.placeVal=this.sheng
        }else if(this.shi.indexOf(',')==-1&&this.shi!='不限'){
          this.placeVal=this.shi
        }else{
           this.placeVal=this.sheng
        }
//         // alert(2)
//         if(this.shi!=''&&this.shi!='不限'){
//           this.placeVal=this.shi
// //          alert("shi"+this.shi)
//         }else{
//           this.placeVal=this.sheng
// //          alert("sheng"+this.sheng)
//         }
       this.place=false
       this.pages(1)
      },
    // 点击楼盘名字跳去详情页面
    goxiangqing(objectId){
      this.$router.push({name:'zupan12X',params:{'index':1,'objectId':objectId}})
    },
    // 价格
     priceclick(index,e){
      this.price=false
      this.priceVal=$(e.currentTarget).html()
      this.pricemin=this.priceZu[index].price_min
      this.pricemax=this.priceZu[index].price_max
      this.pages(1)

    },
    priceenter(index){
      this.priceIdx=index
      // console.log(index)
    },
    // 状态
    goprice(){
    this.price=!(this.price)
    if(this.place==true){
        this.place=false
    }else if(this.type==true){
        this.type=false
    }else if(this.status==true){
        this.status=false
    }
    },
    // 类型
     typeclick(index,e){
      this.type=false
      this.typeVal=$(e.currentTarget).html()
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
         // }
    },
https(page){
        var that=this
    // 查看中介信息
    console.log(this.sheng,this.shi)
    // var show=(this.statusIdx==0?'':(this.statusIdx==1?'2':(this.statusIdx==2?'1':(this.statusIdx==3?'-1':'0'))))
    var show=(this.statusIdx==1||this.statusIdx==2||this.statusIdx==3)?1:(this.statusIdx==0?'':0)
    var status=(this.statusIdx==0?'':(this.statusIdx==1||this.statusIdx==4?1:(this.statusIdx==2||this.statusIdx==5?0:-1)))
    // var area=(this.placeVal=='不限'?'':this.placeVal)
    var area=(this.shi.indexOf(',')!=-1?this.shi:(this.shi!='不限'?this.shi:(this.sheng=='不限'?'':this.sheng)))
    var type=(this.typeVal=='不限'?'':this.typeVal)
        that.$axios.get('boss/agent', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken,'category':'rent','type':type,'area':area,'show':show,'status':status,'price_min':that.pricemin,'price_max':that.pricemax
            }
          })
          .then(function (data) {
            if(data.status){
              that.datas=data.results.data
              that.count=data.results.count
              // alert(that.count)
              // layui.use('laypage', function(){
              //     var laypage = layui.laypage;
              //     //执行一个laypage实例
              //     laypage.render({
              //       elem: 'test', //注意，这里的 test1 是 ID，不用加 # 号
              //       limit:limit10,
              //        prev:'<i class="layui-icon f12 mR05" style="">&#xe603;</i>上一頁',
              //       next:'下一頁<i class="layui-icon f12 mL05" >&#xe602;</i>',
              //       // hash: 'page', //自定义hash值
              //       count:that.count, //数据总数，从服务端得到
              //       jump:function(obj,first){
              //       // alert(obj.curr)
              //       //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
              //       //如果是切换页
              //       if(!first){
              //          console.log('切换对应页数据')
              //          that.page=obj.curr
              //             that.https(obj.curr)
              //       }else{
              //         // 如果是首次
              //          console.log('首次啥也不干')
              //           //that.https(1)
              //       }
              //     }
              //   });
              // });
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
        var show=(this.statusIdx==1||this.statusIdx==2||this.statusIdx==3)?1:(this.statusIdx==0?'':0)
        var status=(this.statusIdx==0?'':(this.statusIdx==1||this.statusIdx==4?1:(this.statusIdx==2||this.statusIdx==5?0:-1)))
       // var area=(this.placeVal=='不限'?'':this.placeVal)
    var area=(this.shi.indexOf(',')!=-1?this.shi:(this.shi!='不限'?this.shi:(this.sheng=='不限'?'':this.sheng)))
       var type=(this.typeVal=='不限'?'':this.typeVal)
        that.$axios.get('boss/agent', {
            params: {
            'searchkey':that.searchkey,'page':1,'limit':limit10,'sessiontoken':sessiontoken,'category':'rent','type':type,'area':area,'show':show,'status':status,'price_min':that.pricemin,'price_max':that.pricemax
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
                                                                      
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    }
  },
  mounted() {
      this.pages(1)
      this.quyus()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
