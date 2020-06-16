import Vue from 'vue'
import App from './App.vue'
import Antd from "ant-design-vue";
import vuescroll from 'vuescroll';
import 'ant-design-vue/dist/antd.css';



Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(vuescroll);
Vue.component('vue-scroll', vuescroll);
new Vue({
  render: h => h(App),
}).$mount('#app')
