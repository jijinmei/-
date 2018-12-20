import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
window.store = new Vuex.Store({
  state:{  
  	// 10幻灯片的文件对象和base64

  	     imgblob:[],
         imgUrl:[],
    // 11板块管理的二级分类文件对象和base64
         bankuaiblob:[],
         bankuaiUrl:[],
         bankuaiall:[],
    // 11板块管理的一级图标文件对象和base64
         headblob:[],
         headUrl:[],
         who:''//one是一级分类，two是二级分类
  },
  mutations: {                              // 操作数据
   
  },
  actions: {                                // 异步操作数据
           
  }

})

export default window.store
