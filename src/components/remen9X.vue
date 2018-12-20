<template>
<div class="youceng">
<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
            <!-- 创建 -->
            <!-- <span @click="saveCreate" v-if="objectId=='no'" class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!=''&&searchkey!='',bg999999:title==''||searchkey==''}">保存</span> -->
            <!-- 修改 -->
            <span @click="saveModify" v-if="objectId!='no'" class="czjz R00 f18 cffffff w70 h40 lh40 center cursor" :class="{bg36c748:title!='',bg999999:title==''}">保存</span>
        </div>
<!-- 表格 -->
<div class="bai pT16 pB05 pL16 pR16" style="width:748px;" >
<!-- <p class="f18 c222222 pT15">簡述</p>
<form class="layui-form mT15" action="" onsubmit="return false">
  <div class="layui-form-item">
    <div class="layui-input-block margin0">
      <input v-model="title" type="text" name="title" required  lay-verify="required" placeholder="最多可輸入9個字" autocomplete="off" class="layui-input f18" maxlength="9">
    </div>
  </div>
</form> -->

<!-- 创建的时候的样式 -->
<p class="f18 c222222 mT50" v-if="objectId=='no'">搜索並勾選對應的討論區帖子</p>
<form class="layui-form mT15" action="" v-if="objectId=='no'" onsubmit="return false">
  <div class="layui-form-item">
    <div class="layui-input-block margin0">
      <input v-model="searchkey" type="text" name="searchkey" lay-verify="required"   autocomplete="off" placeholder="請輸入關鍵字進行搜索" class="layui-input f18 L20 h40 lf" style="width:675px;">   
       <button @click="sousuo()" class="lf layui-btn cffffff f18 bg36c748 R16 h40 lh40 padding0 w70" style="border-radius:0;">搜索</button>
    </div>
  </div>
</form>


</div>
 
<!-- 表格:创建的时候的样式 -->
<div class="bai pB16 pL16 pR16 relative" style="width:748px;z-index:10;" v-if="objectId=='no'">
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='58'></th>
          <th class="padding0" width='136'>發佈者</th>
          <th class="padding0"  width='546'>標題</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" >
          <td class='padding0 cursor center'>
             <img @click="tocheck($event,item.objectId)" :ids="item.objectId" :srcs="item.istopic==1?'../assets/img/yx.png':'../assets/img/wx.png'"  :src="item.istopic==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="w28 dengp">
          </td>
          <td class='padding0' >{{item.user.nickname}}</td>
          <td class='padding0'>{{item.title}}</td>
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


<!-- 表格:修改的时候的表格样式pT40 -->
<p class="f18 c222222 pB15 pL16 bai" v-if="objectId!='no'">對應的討論區帖子</p>
<div class="bai pB16 pL16 pR16 relative" style="width:748px;z-index:10;" v-if="objectId!='no'">
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas2!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='188'>發佈者</th>
          <th class="padding0"  width='376'>標題</th>
        </tr> 
      </thead>
      <tbody>
        <!-- <tr v-for="(item,index) in datas" > -->
        <tr>
          <td class='padding0' >{{datas2.user.nickname}}</td>
          <td class='padding0'>{{datas2.title}}</td>
        </tr>
      </tbody>
</table>
    </div>
</div>
</template>

<script>
export default {
  name: 'remen9X',
  data () {
    return {
        objectId:'oo',
        title:'',//简述
        searchkey:'',//关键字
        datas:'no',//id==no
        datas2:'no',//id!=no
        count:0,
        page:1


    }
  },
  methods:{
        tocheck(e,objectId){
           if($(e.currentTarget).attr('srcs')=='../assets/img/wx.png'){
               $(e.currentTarget).attr('src',require('../assets/img/yx.png'))
               $(e.currentTarget).attr('srcs','../assets/img/yx.png')
               // 加入热门
            $.ajax({
                headers:{'token':sessiontoken},
                 type: "POST",
                 url: Boss+'boss/posts/'+objectId+'/topic',
                 data:{ 
                  'action':1,
                  'sessiontoken':sessiontoken
                },
                 dataType: "json",
                 success: function(data){
                          
                          }
             });
           }else{
               $(e.currentTarget).attr('src',require('../assets/img/wx.png'))
               $(e.currentTarget).attr('srcs','../assets/img/wx.png')
               // 取消热门
              $.ajax({
                headers:{'token':sessiontoken},
                 type: "POST",
                 url: Boss+'boss/posts/'+objectId+'/topic',
                 data:{ 
                  'action':0,
                  'sessiontoken':sessiontoken
                },
                 dataType: "json",
                 success: function(data){
                          
                          }
             });
              
           }
    },
   saveCreate(){

   },
   saveModify(){
           
   },
   sousuo(){
     // if(this.searchkey){
        // 发请求拿关键字
        this.pages(1)
     // }
   },
   https(page){
        var that=this
        // 取得對應的討論區帖子
        that.$axios.get('boss/posts/'+this.objectId, {
            // params: {
            // 'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken
            // }
          })
          .then(function (data) {
            if(data.status){
              that.datas2=data.results
              // that.count=data.results.count

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
        var that=this
        // this.datas='no'
        that.$axios.get('boss/posts', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken
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
      // this.datas='no'
      this.page=page;
      that.$axios.get('boss/posts', {
            params: {
            'searchkey':that.searchkey,'page':page,'limit':limit10,'sessiontoken':sessiontoken
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
                          that.pages2(obj.curr)
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
    // 返回上一级
  goback(){
    this.$router.push({name:'remen9'})
  }
    
  },
  mounted() {
  this.objectId=this.$route.params.objectId
     if(this.objectId!='no'){
       // var bb=JSON.parse(window.sessionStorage.getItem('remen9X'))
       //   this.title=bb.title
         this.https(1)

    }else{
       this.pages(1)
    }

  }
}
</script>

<style  >



/*#layerssmall{}*/
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

