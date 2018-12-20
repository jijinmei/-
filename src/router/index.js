import Vue from 'vue'
import Router from 'vue-router'
// 首页路由
const login = resolve => require(['@/components/login'], resolve);
const HOME = resolve => require(['@/components/HOME'], resolve);
// 用户管理
const yonghu1 = resolve => require(['@/components/yonghu1'], resolve);
const yonghu1X = resolve => require(['@/components/yonghu1X'], resolve);
// 租盘管理
const zupan12 = resolve => require(['@/components/zupan12'], resolve);
const zupan12X = resolve => require(['@/components/zupan12X'], resolve);
// 售盘管理
const soupan2 = resolve => require(['@/components/soupan2'], resolve);
const soupan2X = resolve => require(['@/components/soupan2X'], resolve);
// 商店管理
const shangdian3 = resolve => require(['@/components/shangdian3'], resolve);
const shangdian3X = resolve => require(['@/components/shangdian3X'], resolve);
// 帖子管理
const tiezhi4 = resolve => require(['@/components/tiezhi4'], resolve);
const tiezhi4X = resolve => require(['@/components/tiezhi4X'], resolve);

// 讨论区
const taolunqu5 = resolve => require(['@/components/taolunqu5'], resolve);
const taolunqu5X = resolve => require(['@/components/taolunqu5X'], resolve);

// 楼盘检举管理
const jianju6 = resolve => require(['@/components/jianju6'], resolve);


// 其他板块检举管理
const jianju61 = resolve => require(['@/components/jianju61'], resolve);

// 最新消息
const xiaoxi7 = resolve => require(['@/components/xiaoxi7'], resolve);
const xiaoxi7X = resolve => require(['@/components/xiaoxi7X'], resolve);

// 推进服务
const tuijian8 = resolve => require(['@/components/tuijian8'], resolve);
const tuijian8X = resolve => require(['@/components/tuijian8X'], resolve);

// 热门话题
const remen9 = resolve => require(['@/components/remen9'], resolve);
const remen9X = resolve => require(['@/components/remen9X'], resolve);

// 幻灯片设置
const huandeng10 = resolve => require(['@/components/huandeng10'], resolve);
const huandeng10X = resolve => require(['@/components/huandeng10X'], resolve);

// 板块管理
const bankuai11 = resolve => require(['@/components/bankuai11'], resolve);
const bankuai11X = resolve => require(['@/components/bankuai11X'], resolve);
// const yonghu1 = resolve => require(['@/components/yonghu1'], resolve);
const wyfb = resolve => require(['@/components/wyfb'], resolve);
Vue.use(Router)

export default new Router({
  routes: [

{
      path: '/',
      name: 'login',
      component: login,
},


    {
      path: '/',
      name: 'HOME',
      component: HOME,
      // redirect:'/HOME/yonghu1',
      children:
      [
                 {
          path: '/HOME/wyfb',
          name: 'wyfb',
          component: wyfb,
          },
// 1.用户管理页面
		      {
		      path: '/HOME/yonghu1/:index',
		      name: 'yonghu1',
		      component: yonghu1,
		      },
           {
          path: '/HOME/yonghu1X/:objectId/:index',
          name: 'yonghu1X',
          component: yonghu1X,
          },
// 2.租盘管理页面
          {
          path: '/HOME/zupan12/:index',
          name: 'zupan12',
          component: zupan12,
          },
         {
          path: '/HOME/zupan12X/:index/:objectId',
          name: 'zupan12X',
          component: zupan12X,
          },



// 3.售盘管理页面
           {
          path: '/HOME/soupan2/:index',
          name: 'soupan2',
          component: soupan2,
          },
          {
          path: '/HOME/soupan2X/:index/:objectId',
          name: 'soupan2X',
          component: soupan2X,
          },
// 4.商店管理
           {
          path: '/HOME/shangdian3/:index',
          name: 'shangdian3',
          component: shangdian3,
          },
          {
          path: '/HOME/shangdian3X/:index/:objectId',
          name: 'shangdian3X',
          component: shangdian3X,
          },

// 5.帖子管理
           {
          path: '/HOME/tiezhi4/:index',
          name: 'tiezhi4',
          component: tiezhi4,
          },
          {
          path: '/HOME/tiezhi4X/:index/:objectId',
          name: 'tiezhi4X',
          component: tiezhi4X,
          },

// 6.讨论区管理
           {
          path: '/HOME/taolunqu5/:index',
          name: 'taolunqu5',
          component: taolunqu5,
          },
          {
          path: '/HOME/taolunqu5X/:index/:objectId/:indexs',
          name: 'taolunqu5X',
          component: taolunqu5X,
          },


// 7.楼盘检举管理
           {
          path: '/HOME/jianju6/:index',
          name: 'jianju6',
          component: jianju6,
          },

// 7.1楼盘检举管理
           {
          path: '/HOME/jianju61/:index',
          name: 'jianju61',
          component: jianju61,
          },
          
// 8.最新消息
         {
          path: '/HOME/xiaoxi7/:index',
          name: 'xiaoxi7',
          component: xiaoxi7,
          },
           {
          path: '/HOME/xiaoxi7X/:index/:objectId',
          name: 'xiaoxi7X',
          component: xiaoxi7X,
          },

// 9.推进服务
        {
          path: '/HOME/tuijian8/:index',
          name: 'tuijian8',
          component: tuijian8,
          },
           {
          path: '/HOME/tuijian8X/:index/:objectId',
          name: 'tuijian8X',
          component: tuijian8X,
          },

// 10.热门话题
           {
          path: '/HOME/remen9/:index',
          name: 'remen9',
          component: remen9,
          },
           {
          path: '/HOME/remen9X/:index/:objectId',
          name: 'remen9X',
          component: remen9X,
          },

// 11.幻灯片设置
          {
          path: '/HOME/huandeng10/:index/:indexs',
          name: 'huandeng10',
          component: huandeng10,
          },
          {
          path: '/HOME/huandeng10X/:index/:indexs/:objectId/:channel',
          name: 'huandeng10X',
          component: huandeng10X,
          },
// 12.板块管理
          {
          path: '/HOME/bankuai11/:index',
          name: 'bankuai11',
          component: bankuai11,
          },
                    {
          path: '/HOME/bankuai11X/:index/:objectId',
          name: 'bankuai11X',
          component: bankuai11X,
          }
      ]
    }
  ]
})
