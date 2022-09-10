<template>
    <swiper :slidesPerView="6" :spaceBetween="30" :slidesPerGroup="6" :loop="false" :loopFillGroupWithBlank="true"
       :navigation="true" :modules="modules" class="mySwiper">
        <swiper-slide v-for="(item, index) in newsinfo" :key="index" class="swiper-slide ">
            <div class="mid-bottom-item ">
                <div class="mid-bottom-item-title"><p>{{  item.title  }}</p></div>
                <div class="mid-bottom-item-main">{{  item.main  }}</div>
                <div class="mid-bottom-item-forecast">
                    <p>{{  item.time  }}</p>
                </div>
                <div class="mid-bottom-item-forecast">
                    <p>市场情绪：{{  item.forecast>0?'乐观':'悲观'  }}</p>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
  <script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

export default {
    name: "news",
    props: ["newsinfo"],
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination, Navigation],
        };
    },
    data(){
        return{
           
        }
    }
};
</script>

  <style scoped>
  .mySwiper {
      width: auto;
      height: 100%;
  }
  
  .mid-bottom-item {
      height: 100%;
      width: 400px;
  }
  
  .mid-bottom-item-title {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 10px;
      height: 40px;
      
  }

  .mid-bottom-item-title p{
      line-height: 20px;
      vertical-align: top;
      margin: 0;
  }
  
  .mid-bottom-item-main {
      font-size: 14px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 20px;
      max-height: 100px;
      /* 超出范围隐藏 */
      overflow: hidden;
  }
  
  .mid-bottom-item-forecast {
      font-size: 14px;
  }

  .mid-bottom-item-forecast p {
    margin: 6px 0;
  }
  
  .swiper {
      width: 100%;
      height: 100%;
  }
  
  .swiper-slide {
      text-align: left;
      font-size: 18px;
      background: #fff;
  
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
  }
  
  .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  </style>