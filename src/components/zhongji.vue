<!-- 验苗报告的样式 -->
<template>



	<!-- 终极放大图-->
	<div class="wai_kuangs"  style="z-index:2006;">
		<div	style="display:none;">{{jiance}}</div>


    <!--4.首页轮播图-->
    <div class="swiper-container swiper2 zhongji" id="myCarousels" style="height:100%;">

      <div class="swiper-wrapper" style="height:100%;">
        <div  class="swiper-slide" v-for="(item,index) in finalArrs" style="width:100%;">
          <img :src="item.url||item" class="jz" style="width:400px;">
        </div>
      </div>

      <!-- 分页器 -->
      <div class="swiper-pagination swiper-pagination2 absolute B20 w100s f26 cffffff"></div>
      <!-- 左右的箭头 -->
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>

	<!-- 关闭叉子 -->
	<img @click="closes($event)" src="../assets/img/1-75.png"  class="cursor final5 absolute" style="top:20px;right:10px;z-index:100;">


</div>
</div>
</div>
</template>
<script>



	export default{
		data(){
			return{
				parentindex:this.$parent.parentindex,
				height:parseInt(innerHeight*0.9),
				index:-1,//控制<>+-
                 //finalArr:[], //全局变量，用来保存终极放大图中，从放大图传入的图片路径
                 finalArrs:'no',//原来的路径没有转大写的
                 remark:'',//描述
                 drag:0,
                 move:0,
                 dragObj:0,
                 clickleft:'',
                 clickTop:''
               

             }
         },
      computed:{
  	jiance(){
        this.parentindex=this.$parent.parentindex
  		this.finalArrs=this.$parent.datas.pics//原来的路径没有转大写的
        // this.remark=this.$store.state.remark//描述
	}
},    
         methods:{

  		toNum(index){
				 // $(".zhongji .item>img").css({'width':'auto','height':'auto','left':'50%'})
  				  $("#myCarousels").carousel(index);
			},       
  // 防止点击轮播的时候被识别成路由
  toNexts(e){
  	 // $(".zhongji .item>img").css({'width':'auto','height':'auto','left':'50%'})
  	$("#myCarousels").carousel('next');
  },
      // 防止点击轮播的时候被识别成路由
      toPrevs(e){
      	 // $(".zhongji .item>img").css({'width':'auto','height':'auto','left':'50%'})
      	$("#myCarousels").carousel('prev');
      },
      initWheel(){
				// 轮滚缩放功能			
				     $(document).on('#myCarousels mousewheel DOMMouseScroll', function (e) {			 	
					if($("#myCarousels").css("display")=="block"){
						e.preventDefault();
				        //鼠标滚轮的滚动方向 >0 up;<0 down   
				        var _delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
				        if (_delta > 0) {
				        	var width=parseFloat(getComputedStyle(document.querySelector(".swiper-slide-active>img")).width)
				        	var sx=width+width*0.06
				        	var height=parseFloat(getComputedStyle(document.querySelector(".swiper-slide-active>img")).height)
				        	var sx2=height+height*0.06
				        	// if((sx>innerWidth||sx==innerWidth)){
             //                   return
				         //    }
				        	$(".swiper-slide-active>img").css({'width':sx+'px','height':sx2})

				        } else {
				        	var width=parseFloat(getComputedStyle(document.querySelector(".swiper-slide-active>img")).width)
				        	var sx=width-width*0.06
				        	var height=parseFloat(getComputedStyle(document.querySelector(".swiper-slide-active>img")).height)
				        	var sx2=height-height*0.06
				        	// if((sx>innerWidth||sx==innerWidth)){
             //                   return
				         //    }
				        	$(".swiper-slide-active>img").css({'width':sx+'px','height':sx2})		                  
				        }
				    }
				})		
			},
			// 移动的代码
			init(){
				window.document.onmousemove = this.mouseMove
				window.document.onmousedown = this.mouseDown
				window.document.onmouseup = this.mouseUp
				window.document.ondragstart = this.mouseStop
			},
			mouseDown() {
				if (this.drag) {
					console.log('can move')
					this.clickleft = window.event.x - parseInt(getComputedStyle(this.dragObj).left)
					this.clicktop = window.event.y - parseInt(getComputedStyle(this.dragObj).top)
					this.dragObj.style.zIndex += 1
					this.move = 1
				}
			},
			mouseStop() {
				window.event.returnValue = false
			},
			mouseMove() {

				if (this.move) {
					//console.log($(this.dragObj),window.event.x, this.clickleft)
					$(this.dragObj).css('left', window.event.x - this.clickleft)
					$(this.dragObj).css('top',  window.event.y - this.clicktop)
				}
			},
			mouseUp() {
				this.move = 0
			},
		    // 终极图的下方的+点击事件
		    final3s(e){
		    	var width=parseFloat(getComputedStyle(document.querySelector(".zhongji .active>img")).width)
		    	var sx=width+width*0.06
		    	var height=parseFloat(getComputedStyle(document.querySelector(".zhongji .active>img")).height)
		    	var sx2=height+height*0.06
		    	console.log(width+'and'+sx)
		    	$(".zhongji .active>img").css({'width':sx+'px','height':sx2})
		    },
		      // 拖到的图片
		      drag_over(e){
		      	var final_fd=document.querySelector('.zhongji .active>img')
		      	this.drag=1
		      	this.dragObj=final_fd
		      	console.log(this.dragObj)
		      },
		      drag_out(e){
		      	this.drag=0
		      },
		  // 终极图的下方的-点击事件
		  final4s(e){
		  	var width=parseFloat(getComputedStyle(document.querySelector(".zhongji .active>img")).width)
		  	var sx=width-width*0.06
		  	var height=parseFloat(getComputedStyle(document.querySelector(".zhongji .active>img")).height)
		  	var sx2=height-height*0.06
		  	console.log(width+'and'+sx)
		  	$(".zhongji .active>img").css({'width':sx+'px','height':sx2})
		  },
		  // 终极放大图右上角的关闭叉子
		  closes(e){
		  	var that=this
		  	this.wai=true
		           // $('#welcome').modal('hide')
		           $(".zhongji .item>img").css({'width':'auto','height':'auto','left':'50%'})
		           this.$parent.bigbig = false
		          
		        },
		  // <>+-鼠标放上的时候换暗色的图片路径
		  hover_enter(e,n){
		  	this.index=n
		  },
		  hover_leave(e){
		  	this.index=-1
		  }




		},
		mounted(){
			var that=this;
                // this.finalArrs=this.$store.state.finalArrs
                // this.remark=this.$store.state.remark
                this.initWheel()
                this.init()
                console.log(this.$parent.parentindex)
                   var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination2',//分页器的名称
                initialSlide :that.$parent.parentindex,//初始打开的图片下标
                autoplay: false,//自动播放
                // clickable: true,//
                paginationClickable :true,//分页器可以被点击
                paginationType: 'fraction',//分页器的样式  1/10
                prevButton:'.swiper-button-prev',//前进按钮
                nextButton:'.swiper-button-next',//后退按钮
                observer: true,//检测图片变化，自动调整
                loop: false//环路

              });
		}
	}
</script>
<style	scoped>
/*改变前进后退按钮的颜色*/
    /*.swiper-button-white{}*/
	p{margin:0;}
	#myCarousels > ol > li{width:5px;height:5px;border:1px solid #FFFFFF;margin:2px;}
	#myCarousels > ol > li.active{width:5px;height:5px;border:1px solid #FFFFFF;background:#FFFFFF;position: relative;}
</style>