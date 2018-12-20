<template>
    <div v-if="datas!='no'" class="youceng">

<!-- 返回 -->
        <div class="h70 relative f18 c999999">
            <span class="czjz L00 cursor" @click="goback()">
              <i class="layui-icon" >&#xe603;</i> 返回上一級
            </span>
            <button  @click="save()" class="layui-btn bg36c748 pL17 pR17 czjz R00 f18 cffffff">保存</button>
        </div>
<!-- 个人信息 -->
        <div class="h70 bai relative" style="padding:15px;">
             <div class="h60 w60 radius50 overflow czjz L15">
                 <img :src="datas.avatar.url+imageView60" alt="" class="w60">
             </div>

             <div class="czjz L85">
                 <p class="f20 c222222 mB05">{{datas.nickname}}{{datas.call=='mr'?'先生':(datas.call=='miss'?'小姐':'太太')}}</p>
                
                 <p class="f18 c222222 relative pL20">
                    <img src="../assets/img/tel.png" alt="" class="w17 czjz L00">
                    {{datas.phone}}
                 </p>
             </div>

             <div class="czjz R15 f18 c222222 left">
                    <p class="mB05">
                    <span  style="letter-spacing:0.3rem;">註冊時間</span>
                    <span class="mR10">:</span>{{datas.createdAt}}
                    </p>
                    <p>討論區昵稱<span class="mR10 mL06">:</span>{{datas.nickname}}</p>
             </div>
        </div>
<!-- 表格 -->
<div class="bai pT16 pB16 pL16 pR16 mT16" style="width:748px;" >
<table class="layui-table margin0" id="laytable" style="table-layout:fixed;width:100%;"  v-if="datas!='no'">
      <thead>
        <tr  style="background-color:#ebfceb;">
          <th class="padding0" width='108'>板塊</th>
          <th class="padding0"  width='317'>角色</th>
          <th class="padding0"  width='317'>顯示條數</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,index) in section" class="yonghu">
          <td class='padding0'>{{item}}</td>
          <td class='padding0'   :rowspan="index==0?section.length:0" v-if="index==0">
              <img  @click="gouxuan($event,0)" :src="whoindex==0?require('../assets/img/yx.png'):require('../assets/img/wx.png')" alt="" class="cursor w28 mR10 ones">一般用戶
              <span class="mR10"></span>
              <img @click="gouxuan($event,1)"  :src="whoindex==1?require('../assets/img/yx.png'):require('../assets/img/wx.png')"  alt="" class="cursor w28 mR10 twos">地産中介
              <!-- <span class="mL50" @click.stop="show($event)"></span> -->
              
          </td>
          <td class='padding0'>
              <input type="text" name="" :value="index==0?datas.publish_setting[0].limit:datas.publish_setting[1].limit" :class="{inputs1:index==0,inputs2:index==1}" @focus="show($event)" @blur="close($event,index)"  class="w50 transparent right pT05 pB05 pL05 pR05" value="1000">條
              <!-- :value="index==0?publish_setting[0].limit:publish_setting[1].limit" -->
          </td>
        </tr>
      </tbody>
</table>
</div>
    </div>
</template>

<script>
export default {
  name: 'yonghu1X',
  data () {
    return {
           whoindex:0,
           imageView60:'?imageView2/1/w/60/h/60',
           datas:'no',
            section:['租售板塊','其它板塊']
           // section:['租售物业','汽車交易' ,'家私電器' ,'跳蚤市場' ,'裝修設計' ,'招生招聘' ,'家政服務' ,'搬屋配送', '代購代收']

    }
  },

  methods:{
    close(e,index){
      // var publish_setting= [{"role":this.whoindex,"limit":$('.inputs1').val(),"key":"租售物業"},{"role":this.whoindex,"limit":$('.inputs2').val(),"key":"其他"}]
      $(e.currentTarget).removeClass('border').addClass('transparent')
       // $.ajax({
       //          headers:{'token':sessiontoken},
       //           type: "POST",
       //           url: Boss+'boss/user/'+this.$route.params.objectId+'/publish_setting',
       //           data:{ 
       //            'publish_setting':JSON.stringify(publish_setting)
       //          },
       //           dataType: "json",
       //           success: function(data){
                          
       //                    }
       //       });

      
    },
    show(e){
      $(e.currentTarget).removeClass('transparent').addClass('border')
    },
  // 保存
  save(){
    var that=this;
      var publish_setting= [{"role":this.whoindex,"limit":$('.inputs1').val(),"key":"租售物業"},{"role":this.whoindex,"limit":$('.inputs2').val(),"key":"其他"}]
       $.ajax({
                headers:{'token':sessiontoken},
                 type: "POST",
                 url: Boss+'boss/user/'+this.$route.params.objectId+'/publish_setting',
                 data:{ 
                  'publish_setting':JSON.stringify(publish_setting),
                  'user_role':(this.whoindex==0?'base_user':'estate_agent')
                },
                 dataType: "json",
                 success: function(data){
                              if(data.status){
                                layui.use('layer', function(){
                                  var layer = layui.layer;
                                  layer.msg('保存成功');
                                });   
                              }else{
                                 layui.use('layer', function(){
                                  var layer = layui.layer;
                                  layer.msg('保存失败');
                                });   
                              }
                          }
             });

  },
  // 返回上一级
  goback(){
    this.$router.push({name:'yonghu1'})
  },
  // 勾选的事件
  gouxuan(e,n){
    // return
     // $(e.currentTarget).attr({'src':'../assets/img/yx.png'})
    // 勾选了
    this.whoindex=n
     if(n==0){
            // $(e.currentTarget).attr({'src':'../assets/img/yx.png'})
            //  $('.twos').attr({'src':'../assets/img/wx.png'})
            console.log('变未选')
     }else{
         // $(e.currentTarget).css({'src':'../assets/img/yx.png'})
         // $('.ones').attr({'src':'../assets/img/wx.png'})
         console.log('变已选')
     }
  },
  sections(){
    var that=this
        // 查看类型
      $.get(Boss1+'section',function(data){
        if(data.status){
          var aa=data.result
          for (var i = 0; i < aa.length; i++) {
            that.section.push(aa[i].title)
          }
            
        }
      })
   },
   user(){
    var that=this
       $.get(Boss1+'user/'+this.$route.params.objectId,function(data){
        if(data.status){
            console.log(data)
             that.datas=data.result
             that.whoindex=(that.datas.user_role=='estate_agent'?1:0)
             // that.whoindex=data.result.publish_setting[0].role;
        }
             
       })
   }
    
  },
  mounted() {
     this.user()
     // this.sections()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.layui-table tbody tr:hover {background:none  !important;}*/
.transparent{border:1px solid transparent;}
.yonghu:nth-child(2n) input{background: #f5f5f5 !important;}

</style>

