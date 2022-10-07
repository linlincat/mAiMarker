import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";

import "./assets/global.css";
import "element-ui/lib/theme-chalk/index.css";

import MyModule from '../components/index.js' // 引入组件库
Vue.use(MyModule) // 注册组件库

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

Vue.config.productionTip = false;
// Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
