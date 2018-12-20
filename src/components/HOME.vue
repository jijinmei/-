<template>
<el-container style="margin:0 auto;width:1000px;" class="">
  <el-header class="h70 lh70 left padding0 fixed" style="width:1000px;z-index:1000;" >
     <div class="bg36c748 f25 cffffff" style="">
        <span class="mL40" >免傭澳門管理系統</span>
        <div  class="rf mR20 relative">
                 <span v-if="user.avatar!=undefined" class="inline w40 h40 radius50 overflow relative T10">
                      <img :src="user.avatar.url!=undefined?user.avatar.url:''" alt="" style="z-index:1;width:40px;max-height:40px;" class="lf">
                 </span>
                 <span v-if="user!='no'" >
                      {{user.nickname}}{{user.call=='miss'?'小姐':(user.call=='mis'?'太太':'先生')}}
                 </span>
                  <span @click="tui"  class="mL25 inline bgffffff f18 cffffff w70 h40 lh40 center cursor" style="border:1px solid #ffffff;">登出</span>
        </div>
                

        <!--  <div class="rf mR20">hahaha</div> -->
      </div>
  </el-header>
  <el-container class="mT70">
    <el-aside width="196px" class="fixed h100s" >
       <ul class="h100s bg29aa39">
             <li  @click="goto(item.to,index)" v-for="(item,index) in tag" class="f20 center cursor" :class="{bg29aa39:index!=zuoitem,bgf5f5f5:index==zuoitem,cffffff:index!=zuoitem,c36c748:index==zuoitem,kong:index!=5&&index!=10&&index!=6}">
             {{item.title}}
             </li>
           </ul>
    </el-aside>
    <el-main class="padding0" style="width:740px;margin-left:196px;min-height:800px;">
       <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  name: 'HOME',
  data () {
    return {
      user:'no',//用户个人资料
      tag: [
      {'to':'yonghu1','title':'用戶管理'},
      {'to':'zupan12','title':'租盤管理'},
      {'to':'soupan2','title':'售盤管理'},
      // {'to':'shangdian3','title':'商店管理'},
      {'to':'tiezhi4','title':'帖子管理'},
      {'to':'taolunqu5','title':'討論區管理'},
      {'to':'jianju6','title':'樓盤檢舉管理'},
      {'to':'jianju61','title':'其它檢舉管理'},
      {'to':'xiaoxi7','title':'最新消息'},
      {'to':'tuijian8','title':'推薦服務'},
      {'to':'remen9','title':'熱門話題'},
      {'to':'huandeng10','title':'幻燈片設置'},
      {'to':'bankuai11','title':'板塊管理'}
      ],
      zuoitem:0
    }
  },
  // 监听,当路由发生变化的时候执行
watch:{
  $route(to,from){
    console.log(to.path);
    this.zuoitem=this.$route.params.index
  }
},
  methods:{
    // 推出
    tui(){
window.localStorage.removeItem('houtaiUser')
this.$router.push({name:'login'})
    },
  goto(to,index){
    this.zuoitem=index
    if(to=='huandeng10'){
        this.$router.push({name:to,params:{index:this.zuoitem,indexs:0}})
    }else{
       this.$router.push({name:to,params:{index:this.zuoitem}})
    }
   
  }
  },
  mounted() {
      this.zuoitem=this.$route.params.index
      this.user=JSON.parse(window.localStorage.getItem('houtaiUser')).results
      console.log(this.user)
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{width:180px;}
li{height:70px;line-height:70px;width:180px;}
/*ul>li{letter-spacing:0.5rem;}*/
.kong{letter-spacing:0.5rem;}
</style>
