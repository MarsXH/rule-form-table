import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import ElementUI from 'element-ui'

Vue.config.productionTip = false;
Vue.use(ElementUI)

// try {
//   const UmdComponent = require('../lib/index.umd.js');
//   console.log(UmdComponent);
//   (window as any).HAS_LIB = true;

//   // 如果导出方式有变改一下这里
//   Vue.component('umd-component', UmdComponent.default);
// } catch (e) {
//   console.log(e);
// }

new Vue({
  render: (h) => h(App)
}).$mount('#app');
