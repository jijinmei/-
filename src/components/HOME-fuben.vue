<template>

<!-- <el-container style="margin:0 auto;width:1000px;" class="red">
  <el-header class="h70 lh70 left padding0" style="" >
     <div class="bg36c748 f25 cffffff" style="">
        <span class="mL40" >免傭澳門管理系統</span>
        <div  class="rf mR20">
           <span v-if="user.avatar!=undefined" class="inline w40 h40 radius50  overflow">
                      <img :src="user.avatar.url!=undefined?user.avatar.url:''" alt="" class="jz" style="z-index:1;min-width:40px;min-height:40px;">
                 </span>
                 <span v-if="user!='no'" >
                      {{user.nickname}}{{user.call=='miss'?'小姐':(user.call=='mis'?'太太':'先生')}}
                 </span>
                  <span @click="tui"  class="mL25 inline bgffffff f18 cffffff w70 h40 lh40 center cursor" style="border:1px solid #ffffff;">登出</span>
        </div>
                

        
      </div>
  </el-header>
  <el-container>
    <el-aside width="196px" >
       <ul>
             <li  @click="goto(item.to,index)" v-for="(item,index) in tag" class="f20 center cursor" :class="{bg29aa39:index!=zuoitem,bgf5f5f5:index==zuoitem,cffffff:index!=zuoitem,c36c748:index==zuoitem,kong:index!=5&&index!=10}">
             {{item.title}}
             </li>
           </ul>
    </el-aside>
    <el-main class="padding0" style="width:710px;">
       <router-view/>
    </el-main>
  </el-container>
</el-container>
 -->

<div class="layui-layout layui-layout-admin">
  <div class="layui-header layui-bg-36c748 h70 lh70" >
    <div class="layui-logo bg36c748 f25 cffffff mL30">免傭澳門管理系統</div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
    <ul class="layui-nav layui-layout-right">
      <li class="layui-nav-item">
        <a href="javascript:;" v-if="user.avatar!=undefined" class="radius50 f20 cffffff" >
         <img :src="user.avatar.url!=undefined?user.avatar.url:''" alt="" class="layui-nav-img" style="z-index:1;min-width:40px;min-height:40px;" >
            {{user.nickname}}{{user.call=='miss'?'小姐':(user.call=='mis'?'太太':'先生')}}
        </a>
        
      </li>

      <li class="layui-nav-item"> <span @click="tui"  class="mL25 inline bgffffff f18 cffffff w70 h40 lh40 center cursor" style="border:1px solid #ffffff;">登出</span></li>
    </ul>
  </div>
  
  <div class="layui-side layui-bg-36c748 T70" style="width:180px;">
    <div class="layui-side-scroll" style="width:180px;">
      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
      <ul class="layui-nav layui-nav-tree ul"  lay-filter="test">
        <li class="layui-nav-item f20 center cursor li" v-for="(item,index) in tag" @click="goto(item.to,index)"  :class="{bg29aa39:index!=zuoitem,bgf5f5f5:index==zuoitem,cffffff:index!=zuoitem,c36c748:index==zuoitem,kong:index!=5&&index!=10}">
             {{item.title}}
             
        </li>
      </ul>
    </div>
  </div>
  
 <!--  <div class="rf mR20 layui-body" style="padding:0;width:780px;overflow-y:scroll;">
    
    <div style="padding:0;width:780px;">
       <router-view/>
    </div>
  </div> -->
   <div class="layui-body red T70 B10" style="padding:0;width:780px;left:180px;">
    <!-- 内容主体区域 -->
     <div style="padding:0;width:780px;">
       <router-view/>
    </div>
  </div>

</div>

  

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
      {'to':'shangdian3','title':'商店管理'},
      {'to':'tiezhi4','title':'帖子管理'},
      {'to':'taolunqu5','title':'討論區管理'},
      {'to':'jianju6','title':'檢舉管理'},
      {'to':'xiaoxi7','title':'最新消息'},
      {'to':'tuijian8','title':'推薦服務'},
      {'to':'remen9','title':'熱門話題'},
      {'to':'huandeng10','title':'幻燈片設置'},
      {'to':'bankuai11','title':'板塊管理'}
      ],
      zuoitem:0
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
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function(){
  var element = layui.element;
  
  //…
});
      this.zuoitem=this.$route.params.index
      this.user=JSON.parse(window.localStorage.getItem('houtaiUser')).results
      console.log(this.user)
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
  .layui-bg-36c748{background: #36c748 !important;}
</style>
<style scoped>
.ul{width:180px !important;}
.li{height:70px !important;line-height:70px !important;width:180px !important;}
/*ul>li{letter-spacing:0.5rem;}*/
.kong{letter-spacing:0.5rem;}
</style>
