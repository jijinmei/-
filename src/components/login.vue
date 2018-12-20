<template>
    <div  style="width:400px;height:320px;" class="jz bai">
      <p class="f25 cffffff bg36c748 h60 lh60 center"> 免佣澳門統一登入平台</p>
      <div  class="pL24 pR24 pT20 pB30">
        <p class="mB10 relative h55"> 
            <img src="../assets/img/phone.png" alt="" class="w20 czjz L10">
            <input @keyup.enter='deng' v-model="mobile" type="text" name="" placeholder="用戶名" class="h55 f18 left">
        </p>
         <p class="relative h55 mB30"> 
            <img src="../assets/img/password.png" alt="" class="w20 czjz L10">
            <input  @keyup.enter='deng'  v-model="password"  type="password" name="" placeholder="密碼" class="h55 f18 left">
        </p>
        
        <button  @click="deng()" class="layui-btn f25 bg36c748 cffffff h55 lh55" style="width:352px;" >登入</button>
      </div>
    </div>
</template>
           <!-- 貸審會 已發佈 不通過 已封盤  -->
<script>
export default {
  name: 'login',
  data () {
    return {
       mobile:'',
        password:''
    }
  },
  methods:{
    deng(){
      var that=this;
      if(this.mobile&&this.password){
        $.post(Boss+'boss/login',{'mobile':this.mobile,'password':this.password},function(data){
            if(data.status){
              window.localStorage.setItem('houtaiUser',JSON.stringify(data))
              that.$router.push({name:'yonghu1',params:{index:0}})
            }else{
               // that.$router.push({name:'yonghu1',params:{index:0}})
               // return
                layui.use('layer', function(){
              var layer = layui.layer;                      
              layer.msg(data.message);
               })
          }
        })
      }
    }
  },
  mounted() {
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{border:1px solid #36c748;background: white;padding:0 10px 0 40px;width: 302px;}
</style>
