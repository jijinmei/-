<template>
    <div class="waiceng">
    <!-- 搜索 -->
   <div class="h40 pT20 pB20 pL16 relative" style="">
           <input @keyup.enter="sousuo()"  v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入板塊名稱進行搜索" class="layui-input f18 czjz L20 h40" style="width:548px;">
            <button @click="sousuo()" class="layui-btn cffffff f18 bg36c748 czjz h40 lh40" style="padding:0 15px;border-radius:0;right:150px;">搜索</button>
            <button @click="goxiangqing('no','no')" class="layui-btn cffffff f18 bg36c748 czjz R00 h40 lh40" style="padding:0 15px;border-radius:0;">新增板塊</button>
    </div>
     <!-- 表格 -->
<div class="bai pT16 pB16 pL16 pR16 relative" style="width:748px;z-index:10;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='118'>圓標</th>
          <th class="padding0"  width='178'>板塊名稱</th>
          <th class="padding0"  width='178'>排序</th>
          <th class="padding0"  width='266'>操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" class="yonghu">
          <td class='padding0'>
             <div class="w35 h35 overflow radius50" style="margin:0 auto;">
                 <img  srcs="../assets/img/yuan.png"  :src="item.icon" alt="" class="w35 dengp mR10"style="min-height:100%;">
             </div>
          </td>
          <td class='padding0'>{{item.title}}</td>
          <td class='padding0'>
             <input type="text" name="" @focus="show($event)" @blur="close($event,item.objectId)"  class="w50 transparent center pT05 pB05 pL05 pR05" :value="item.sort">
          </td>
          <td class='padding0'>
           <span class="mR50">
             <img  :srcs="item.show==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')" :src="item.show==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="w28 dengp mR10">顯示
           </span>
           <span class='padding0 c36c748 cursor' @click="goxiangqing(item,item.objectId)">詳情</span>
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


    </div>
    </div>
</template>
           <!-- 貸審會 已發佈 不通過 已封盤  -->
<script>
export default {
  name: 'bankuai11',
  data () {
    return {
        datas:'no',
        count:10,
        searchkey:'',//关键字搜索
        page:1
        
    }
  },
  methods:{
    // 排序的失去焦点和获取焦点
     close(e,objectId){
      $(e.currentTarget).removeClass('border').addClass('transparent');

jQuery.ajax({
    url: Boss+'boss/section',
    type: "POST",
    headers: {
        "token":sessiontoken,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    contentType: "application/x-www-form-urlencoded",
    data: {'sessiontoken':sessiontoken,'sort':$(e.currentTarget).val(),'objectId':objectId},
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
    goxiangqing(item,objectId){
      var that=this;
      if(objectId=='no'){
                window.sessionStorage.removeItem('huandeng10X')
                that.$store.state.bankuaiblob=[]
                that.$store.state.bankuaiUrl=[]
                that.$store.state.bankuaiall=[]
                that.$store.state.headUrl=[]
                that.$store.state.headblob=[]
      }else{
        window.sessionStorage.setItem('bankuai11X',JSON.stringify(item))
      }

       window.open('#/HOME/bankuai11X/11/'+objectId)
      // this.$router.push({name:'bankuai11X',params:{objectId:objectId}})
    },
    statusclick(index,e){
      this.status=false
      this.statusVal=$(e.currentTarget).html()
    },
    statusenter(index){
      this.statusIdx=index
      // console.log(index)
    },
    // 状态
    gostatus(){
    this.status=!(this.status)
    },
    // 搜索关键字
    sousuo(){
         // if(this.searchkey){
            // this.https(1)
            this.pages(1)
         // }
    },
https(page){
        var that=this
    
        that.$axios.get('boss/section', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken
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
      that.$axios.get('boss/section', {
            params: {
            'searchkey':that.searchkey,'page':1,'limit':limit10,'sessiontoken':sessiontoken
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input{background: #f5f5f5 !important;}
</style>
