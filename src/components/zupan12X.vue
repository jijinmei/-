<template>
<div class="youceng">
<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
            <span class="czjz R00 f20" :class="{c36c748:datas.show==2, cff3333:datas.show==-1, cff4d00:datas.show==1, c999999:datas.show==0}">
              {{datas.show==0?'已封盤':'未封盤'}}
              <span class="mR15"></span>
              {{datas.status==-1?'不通過':(datas.status==0?'待審核':'已通過')}}
            </span>
            <!-- {{datas.show==0?'已封盤':(datas.status==-1?'不通過':(datas.status==0?'待審核':'已發佈'))}} -->
            <!-- {{datas.show==1?'待審核':(datas.show==0?'已封盤':(datas.show==-1?'不通過':'已發佈'))}} -->
        </div>
<!-- 表格 -->
<div class="bai pT16 pB16 pL16 pR16" style="width:748px;" >
<!-- 图片 -->
<ul class="overflow">
  <li @click="fangda(index)" class="cursor w117 h117 overflow mB10 lf" :class="{mR09:index!=5&&index!=11}" v-for="(item,index) in datas.pics">
          <img :src="item.url+imageView2" alt="" class="w117 cursor">
  </li>
</ul>
<!--  show = -1 为不通过
show = 0 为封盘
show = 1 为待审核
show = 2 为通过 -->
<!-- 列表 -->
<ul class="bai" v-if="datas!='no'">
  <li class="border-b" style="overflow:hidden;padding:15px 0;">
          <span class="f18 c222222">標題</span>
          <span class="f25 c36c748 rf" style="width:90%;">{{datas.build_name||'--'}}</span>
  </li>
  <li class="h70 lh70 border-b">
          <span class="f18 c222222">發佈時間</span>
          <span class="f18 c222222 rf">{{datas.publishAt||datas.createdAt||'--'}}</span>
  </li>
<!--    <li class="h70 lh70 border-b" v-if="datas.createdAt!=timestampToTime(datas.updatedTimeStamp)">
          <span class="f18 c222222">更新時間</span>
          <span class="f18 c222222 rf">{{timestampToTime(datas.updatedTimeStamp)}}</span>
  </li> -->
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">瀏覽人數(人)</span>
          <span class="f18 c222222 rf">{{datas.views||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">租金(元/月)</span>
          <span class="f30 cff4d00 rf">{{datas.price||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">類型</span>
          <span class="f18 c222222 rf">{{datas.type||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">間隔</span>
          <span class="f18 c222222 rf">{{datas.space||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">樓層單位</span>
           <span class="f18 c222222 rf">{{datas.floor}}{{datas.code}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">建築面積</span>
          <span class="f18 c222222 rf">{{datas.area?datas.area+'呎':'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">實際面積</span>
          <span class="f18 c222222 rf">{{datas.useable_area?datas.useable_area+'呎':'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">平均呎價</span>
          <span class="f18 c222222 rf">{{datas.unit?datas.unit+'元/呎':'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">景觀</span>
          <span class="f18 c222222 rf">{{datas.landscape||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">座向</span>
          <span class="f18 c222222 rf">{{datas.direct||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">明火煮食</span>
          <span class="f18 c222222 rf">{{datas.additiaion==undefined||datas.additiaion==''?"":(datas.additiaion.cook=='0'?'不可以':(datas.additiaion.cook=='1'?'可以':'--'))}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">飼養寵物</span>
          <span class="f18 c222222 rf">{{datas.additiaion==undefined||datas.additiaion==''?"":(datas.additiaion.pet=='0'?'不可以':(datas.additiaion.pet=='1'?'可以':'--'))}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">地區</span>
          <span class="f18 c222222 rf">{{datas.build_area||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">街道</span>
          <span class="f18 c222222 rf">{{datas.build_street||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">裝修程度</span>
          <span class="f18 c222222 rf">{{datas.decoration||'--'}}</span>
  </li>
    <!--  <li class="h70 lh70 border-b">
          <span class="f18 c222222">物業現況</span>
          <span class="f18 c222222 rf">{{datas.build_status||'--'}}</span>
  </li> -->
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">可入住時間</span>
          <span class="f18 c222222 rf">{{datas.start_time||'--'}}</span>
  </li>
   <li class="border-b" style="overflow:hidden;padding:15px 0;">
          <span class="f18 c222222">詳情描述</span>
          <span class="f18 c222222 rf" style="width:85%;">{{datas.content||datas.remark||'這業主很懶甚麼都沒有留下...'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">發佈者</span>
          <span class="f18 c222222 rf">
          {{datas.user.displayname||'--'}}
          {{datas.user.displayname!=undefined?(datas.user.call=='miss'?'小姐':(datas.user.call=='mrs'?'太太':'先生')):''}}
          </span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">發佈者身份</span>
          <span class="f18 c222222 rf">{{datas.from||'--'}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">聯絡方式</span>
          <span class="f18 c222222 rf">{{datas.contactType=='1'?'電話及在線咨詢':(datas.contactType=='0'?'僅在線咨詢':'--')}}</span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">聯絡人</span>
          <span class="f18 c222222 rf"> 
          {{datas.contacts||'--'}}
          {{datas.contacts!=undefined?(datas.call=='miss'?'小姐':(datas.call=='mrs'?'太太':'先生')):''}}
                
           </span>
  </li>
   <li class="h70 lh70 border-b">
          <span class="f18 c222222">手機號</span>
          <span class="f18 c222222 rf">{{datas.phone||'--'}}</span>
  </li>
  <li class="overflow relative pT20 pB100">
          <span class="f18 c222222 czj">審核歷史</span>
         <!--  <ul v-if="datas.audited_history.length!=0">
            <li class="f18 c222222 rf mB20">
            2018-01-24 16:03 <span class="cff3333 mL05 mR10">審核不通過</span>操作員陳小姐
            <p class="c999999 mT05"> 背着内容背着内容背着内容背着内容背着内容背着内容背着内容</p>
            </li>
            <li class="f18 c222222 rf mB20">
            2018-01-24 16:03 <span class="c36c748 mL05 mR10">審核通過</span>操作員陳小姐
            <p class="c999999 mT05"> 背着内容背着内容背着内容背着内容背着内容背着内容背着内容</p>
            </li>
          </ul>
          <span class="f18 c222222 rf" v-if="datas.audited_history.length==0">還沒有審核歷史</span> -->
           <ul v-if="datas.audited_history.length!=0" class="rf">
            <li class="f18 c222222 mB20 right"  v-for="(item,index) in datas.audited_history">
            {{item.auditedAt}} <span class=" mL05 mR10" :class="{c36c748:item.action==1,cff3333:item.action==-1}">{{item.action==-1?'審核不通過':'審核通過'}}</span>操作員  {{item.nickname}}
            <p class="c999999 mT05 left"> {{item.remark}}</p>
            </li>
            <!-- <li class="f18 c222222 rf mB20">
            2018-01-24 16:03 <span class=" mL05 mR10">審核通過</span>操作員陳小姐
            <p class="c999999 mT05"> 背着内容背着内容背着内容背着内容背着内容背着内容背着内容</p>
            </li> -->
          </ul>
          <span class="f18 c222222 rf" v-if="datas.audited_history.length==0">還沒有審核歷史</span>
  </li>
</ul>


</div>
 
 <!-- 按钮灰色不能点击 999999-->
 <!-- 待审核：审核通过绿色  审核不通过红色 封盘橙色 -->
 <!-- 已发布：审核通过灰色  审核不通过红色 封盘橙色 -->
 <!-- 不通过：审核通过绿色  审核不通过灰色 封盘橙色 -->
 <!-- 已封盤：审核通过绿色  审核不通过红色 封盘灰色 -->
<!--  show = -1 为不通过
show = 0 为封盘
show = 1 为待审核
show = 2 为通过 -->
 <p class="center mT40 fixed B00 h100 lh100 bgf5f5f5" style="width:780px;">
<button  @click="pass(datas.show)" class="layui-btn padding0 w130 f18 cffffff inline bg36c748" >審核通過</button>

<button  @click="nopass(datas.show)" class="layui-btn padding0 w130  f18 cffffff mL60 mR60 bgff3333">審核不通過</button>

<button  @click="fengpan(datas.show)" class="layui-btn padding0 w130  f18 cffffff mR60 bgff4d00">封盤</button>

<button  @click="jiefeng(datas.show)" class="layui-btn padding0 w130  f18 cffffff bg0000ff" >開盤</button>
<!-- <button  @click="pass(datas.show)" class="layui-btn padding0 w130 f18 cffffff inline" :class="{bg36c748:datas.show!=2,bg999999:datas.show==2}">審核通過</button>

<button  @click="nopass(datas.show)" class="layui-btn padding0 w130  f18 cffffff mL60 mR60"  :class="{bgff3333:datas.show!=-1,bg999999:datas.show==-1}">審核不通過</button>

<button  @click="fengpan(datas.show)" class="layui-btn padding0 w130  f18 cffffff" :class="{bgff4d00:datas.show!=0,bg999999:datas.show==0}">封盤</button> -->
</p>

 <!-- 点击的放大图 -->
<fangdatu  v-if="bigbig==true"></fangdatu>

</div>
</template>

<script>
import fangdatu from './zhongji.vue'
// import Swiper from '../assets/swiper.jquery.js';
export default {
  name: 'zupan12X',
  data () {
    return {
      parentindex:0,
      bigbig:false,
      imageView2:'?imageView2/1/w/117/h/117',
      datas:'no'
         // imgitem:[1,2,2,2,2,2,2,2,2,2,2,2]
         // tableitem:['標題', '發佈時間', '更新時間', '流覽人數(人)', '租金(元/月)','類型', '間隔', '樓層單位', '建築面積', '實際面積', '平均尺價', '景觀', '坐向', '明火煮食', '飼養寵物', '地區' ,'街道','裝修程度',  '可入住時間',  '詳情描述',  '發佈者' , '發佈者身份' , '聯絡方式',  '聯絡人' , '手機號',  '審核歷史']

    }
  },
  components:{                                                                                                      
      "fangdatu":fangdatu
    },
  methods:{
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
    fangda(index){
      this.parentindex=index
      this.bigbig=true;
    },
    // 查看详细的接口
data(){
var that=this;
      $.ajax({
                headers:{'token':sessiontoken},
                 type: "get",
                 url: Boss+'boss/agent/'+this.$route.params.objectId,
                 data: {'sessiontoken':sessiontoken},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                               that.datas=data.results
                              }else{
                                layui.use('layer', function(){
                                 var layer = layui.layer;
                                      layer.msg(data.message)
                                })
                              }
                          }
             });

},
   layersbig(title,pass){
      var that=this;
      var content=''
                 if(pass=='pass'){
                   content='審核通過'
                  }else if(pass=='nopass'){
                    content='審核不通過'
                  }
       layui.use('layer', function(){
       var layer = layui.layer;
            layer.confirm('<textarea name="" id="neirongs" style="width:460px;height:102px;background:#f5f5f5;resize:none;padding:10px 15px;" class="f18 border0" placeHolder="請填寫'+content+'的備註內容（選填）..."></textarea>', {
              closeBtn:0,
              area: ['520px'],
              title:title,
               skin: 'layersbig',
              btn: ['確認','取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("我是确定按钮"); //如果设定了yes回调，需进行手工关闭
                  if(pass=='pass'){
                    console.log('通过的事件')
                  }else if(pass=='nopass'){
                    console.log('不通过的事件')
                  }
                 console.log($('#neirongs').val())
                  $.ajax({
                headers:{'token':sessiontoken},
                 type: "post",
                 url: Boss+'boss/agent/'+that.datas.objectId+'/status',
                 data: {'action':(content=='審核通過'?1:0),'sessiontoken':sessiontoken,'remark':$('#neirongs').val()},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                   // 更新页面数据
                                  that.data()
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
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
    // 审核通过
    pass(show){
  //     if(show==2){
  //   return;
  // }
      this.layersbig('審核通過 備註','pass')
    },
    // 审核不通过
    nopass(show){
  //       if(show==-1){
  //   return;
  // }
       this.layersbig('審核不通過 備註','nopass')
    },
    layerssmall(title){
      var that=this;
                 layui.use('layer', function(){
       var layer = layui.layer;

            layer.confirm('確認'+title+'?', {
              closeBtn:0,
              title: false,
              skin: 'layerssmall',
              area: ['340px'],
              btn: [title,'取消'], //可以无限个按钮
              yes: function(index, layero){
                  console.log("我是"+title+"按钮"); //如果设定了yes回调，需进行手工关闭
                  if(title=='封盤'){
                    console.log('封盤的事件')
                  }else if(title=='開盤'){
                    console.log('開盤的事件')
                  }
                $.ajax({
                headers:{'token':sessiontoken},
                 type: "post",
                 url: Boss+'boss/agent/'+that.datas.objectId+'/closing',
                 data: {'objectId':that.datas.objectId,'sessiontoken':sessiontoken,'show':(title=='封盤'?0:1)},
                 dataType: "json",
                 success: function(data){
                             if(data.status){
                                    // 更新页面数据
                                  that.data();
                                  layer.close(index); //如果设定了yes回调，需进行手工关闭
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
    // 封盘
    fengpan(){
  //       if(show==0){
  //   return;
  // }
      this.layerssmall('封盤')
    },
    // 開盤
    jiefeng(){
this.layerssmall('開盤')
    },
    // // 下架
    // xiajia(){
    //   this.layerssmall('下架')
    // },
    // 返回上一级
  goback(){
    this.$router.push({name:'zupan12'})
  }
    
  },
  mounted() {
this.data()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*@import '../assets/swiper.min.css'*/
</style>

