<template>
  <div id="app">
    <div class="swiper-container mlin">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
        <div class="swiper-slide">Slide 11</div>
        <div class="swiper-slide">Slide 12</div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div style="height: 100px; background: red;"></div>
    <div class="swiper-container lin">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'
import Swiper from "swiper"
export default {
  name: "fourCom",
  data() {
    return {

    }
  },
  mounted() {
    var mySwiper = new Swiper('.mlin', {
      slidesPerView: 6,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // 可以拿到当前的 Index
    mySwiper.on('slideChangeTransitionEnd', function () {
      // var imgurl = $('.swiper-slide-active img').attr("src");
      // var txt = $('.swiper-slide-active').html();
      console.log("内容：" + mySwiper.activeIndex);
      console.log("内容：" + mySwiper.realIndex);

    });
    // 可以拿到当前的 Index
    mySwiper.on('tap', function (swiper, event) {
      console.log(mySwiper.clickedIndex) //当前点击的索引
      // var index = swiper.realIndex;
      console.log("内容swiper：" + swiper);
      console.log("内容event：" + event);

    });


    var mySwiper1 = new Swiper('.lin', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // 可以拿到当前的 Index
    mySwiper1.on('slideChangeTransitionEnd', function () {
      // var imgurl = $('.swiper-slide-active img').attr("src");
      // var txt = $('.swiper-slide-active').html();
      console.log("内容1：" + mySwiper1.activeIndex);

    });


  },
  methods: {
  },
}
</script>
<style>
.swiper-slide {
  background-color: red;
  border: 2px solid #fff;
}

.swiper-container {
  --swiper-theme-color: #ff6600;
  /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33;
  /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px;
  /* 设置按钮大小 */
}

.swiper-container1 {
  --swiper-theme-color: #ff6600;
  /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33;
  /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px;
  /* 设置按钮大小 */
}
</style>