<template>
    <div class="waiceng">
      <div class="bai h40">
           <input  @keyup.enter="sousuo()" v-model="searchkey" type="text" name="title" lay-verify="title"   autocomplete="off" placeholder="請輸入討論區昵稱/手機號碼/姓名進行搜索" class="layui-input f18 border0 lf" style="width:710px;">
            <button @click="sousuo()" class="layui-btn cffffff f18 bg36c748 rf h40 lh40" style="padding:0 15px;border-radius:0;">搜索</button>
      </div>
<div class="bai pT16 pB16 pL16 pR16 mT16" style="width:748px;" >

<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='58'>頭像</th>
          <th class="padding0"  width='108'>討論區昵稱</th>
          <th class="padding0"  width='108'>姓氏/姓名</th>
          <th class="padding0"  width='53'>稱謂</th>
          <th class="padding0"  width='98'>手機號碼</th>
          <th class="padding0"  width='158'>註冊時間</th>
          <th class="padding0"  width='151'>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in datas" >
          <td class="overflow padding0 w60">
          <div class="h35 center relative radius50 w34 margin overflow">
             <img :src="item.avatar!=undefined?item.avatar.url:''" onerror="onerror=null;src='../../static/yuan.png'" alt="" class="w35">
          </div>

          </td>
          <td class='padding0'>{{item.nickname}}</td>
          <td class='padding0'>{{item.displayname||item.nickname}}</td>
          <td class='padding0'>{{item.call=='miss'?'小姐':(item.call=='mr'?'先生':(item.call=='mrs'?'太太':''))}}</td>
          <td class='padding0 diandiandian1'>{{item.phone}}</td>
          <td class='padding0'>{{item.createdAt}}</td>
          <td class='padding0'>
             <span class="cursor" @click="heiming(item.block,item.objectId,(item.block==true?0:1),index)" :class="{cff4d00:item.block==true}">{{item.block==true?'解除黑名單':'列入黑名單'}}</span>
              <router-link :to="{name:'yonghu1X',params:{'objectId':item.objectId}}" target="_blank" class="c36c748">
           <span  class="c36c748 mL30 cursor">詳情</span>
          </router-link>
             
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

<script>
export default {
  name: 'yonghu1',
  data () {
    return {
      datas:'no',
      count:10,
      searchkey:'',//关键字搜索
      page:1
    }
  },
  methods:{
    xiangqing(item,objectId){

         this.$router.push({name:'yonghu1X',params:{'objectId':objectId}})
    },
    // 加入黑名单
    heiming(block,objectId,action,index,title){
      var that=this
      var title=''
      if(block==true){
             title='確認解除黑名單？'
      }else{
             title='確認列入黑名單？'
      }
       layui.use('layer', function(){
       var layer = layui.layer;
            layer.confirm(title, {
              closeBtn:0,
              title: false,
              area: ['340px'],
               skin: 'layerssmall',
              btn: ['確認','取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("我是确定按钮"); //如果设定了yes回调，需进行手工关闭
                  $.ajax({
                headers:{'token':sessiontoken},
                 type: "post",
                 url: Boss+'boss/user/'+objectId+'/block?action='+action,
                 // data: {'action':action,'sessiontoken':sessiontoken},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                   // 改变黑名单的状态
                                  // that.datas[index].block=!(that.datas[index].block)
                                  // console.log(that.datas)
                                  that.pages(1)
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
                             }else{
                              layer.msg(data.message)
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
    sousuo(){
         // if(this.searchkey){
            // this.https(1)
            this.pages(1)
         // }
    },
    https(page){
        var that=this

        that.$axios.get('boss/user', {
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
      that.$axios.get('boss/user', {
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

<style  >
/*input {
    color: #222222;
    caret-color: #36c748;
}
@supports (-webkit-mask: none) and (not (cater-color: #36c748)) {
    input { color: #36c748; }
    input::first-line { color: #222222; }

}*/

/*.layui-layer{width:340px !important;}*/
</style>

<style scoped>


</style>

