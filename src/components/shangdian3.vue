<template>
    <div class="waiceng">
    <!-- 搜索 -->
   <div class="bai h40 pT20 pB20 pL16 pR16 relative">
           <input @keyup.enter="sousuo()" v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入關鍵字進行搜索" class="layui-input f18 czjz L20 h40" style="width:685px;">
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
     <!-- 表格 -->
<div class="bai pB16 pL16 pR16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='142'>商店名</th>
          <th class="padding0"  width='88'>類型</th>
          <th class="padding0"  width='105'>發佈者</th>
          <th class="padding0"  width='155'>發佈/<span class="cfbb03b">更新</span>時間</th>
          <th class="padding0"  width='70'>排序</th>
          <th class="padding0"  width='70'>狀態</th>   
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" class="yonghu">
          <td @click="goxiangqing(item.objectId)" class='padding0 c36c748 cursor left'><span class="pL10">{{item.title}} </span></td>
          <td class='padding0'>{{item.type}}</td>
          <td class='padding0'>{{item.user.displayname}}{{item.user.call=='mr'?'先生':(item.user.call=='miss'?'小姐':'太太')}}</td>
          <!-- 有更新过则显示更新时间黄色  否则显示发布时间黑色 -->
          <td class='padding0' :class="{cfbb03b:item.cratedTimeStamp!=item.updatedTimeStamp}">{{item.cratedTimeStamp==item.updatedTimeStamp?timestampToTime(item.cratedTimeStamp):timestampToTime(item.updatedTimeStamp)}}</td>
          <td class='padding0'>
             <input type="text" name="" @focus="show($event)" @blur="close($event)"  class="w50 transparent center pT05 pB05 pL05 pR05" value="1000">
          </td>
          <td class='padding0' :class="{cff4d00:item.show==1,c36c748:item.show==2,c999999:item.show==0,cff0000:item.show==-1}">{{item.show==2?'已發佈':(item.show==-1?'不通過':(item.show==1?'待審核':'已封盤'))}}</td>
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
  name: 'shangdian3',
  data () {
    return {
        datas:'no',
        count:10,
        searchkey:'',//关键字搜索
        page:1,
        // 类型
        typeVal:'',//输入框绑定的值
        typeIdx:0,//控制鼠标放上的下标
        type:false,//状态的弹出框的显示和隐藏
        typeItem:['全部類型','裝修設計', '招生招聘' , '家政服務', '搬屋配送', '代購代收'],//
// '汽車交易', '家私電器' ,'跳蚤市場',
        // 状态
        statusVal:'',//输入框绑定的值
        statusIdx:0,//控制鼠标放上的下标
        status:false,//状态的弹出框的显示和隐藏
        statusItem:['全部狀態', '已發佈', '待審核', '不通過', '已下架'],//状态的内容列表
    }
  },
  methods:{
        close(e){
      $(e.currentTarget).removeClass('border').addClass('transparent')
    },
    show(e){
      $(e.currentTarget).removeClass('transparent').addClass('border')
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
        console.log(Y+M+D+h+m)
        return Y+M+D+h+m;
    },
   
    // 点击楼盘名字跳去详情页面
    goxiangqing(objectId){
      this.$router.push({name:'shangdian3X',params:{'index':3,'objectId':objectId}})
    },
    // 类型
     typeclick(index,e){
      this.type=false
      this.typeVal=$(e.currentTarget).html()
      this.https(1)

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
      this.https(1)
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
         if(this.searchkey){
            this.https(1)
         }
    },
https(page){
        var that=this
    // 查看中介信息
    var show=(this.statusIdx==0?'':(this.statusIdx==1?'2':(this.statusIdx==2?'1':(this.statusIdx==3?'-1':'0'))))
    var type=(this.typeVal=='全部類型'?'':this.typeVal)
        that.$axios.get('boss/agent', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken,'category':'rent','type':type,'show':show
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
    pages(){
      //首次请求数据，并构建分页
      var that=this;
      // 查看中介信息
       var show=(this.statusIdx==0?'':(this.statusIdx==1?'2':(this.statusIdx==2?'1':(this.statusIdx==3?'-1':'0'))))
       var type=(this.typeVal=='全部類型'?'':this.typeVal)
        that.$axios.get('boss/agent', {
            params: {
            'searchkey':that.searchkey,'page':1,'limit':limit10,'sessiontoken':sessiontoken,'category':'rent','type':type,'show':show
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
      this.pages()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input{background: #f5f5f5 !important;}
</style>
