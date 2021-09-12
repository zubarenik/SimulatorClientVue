import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ToastPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);
Vue.use(require('vue-moment'));
Vue.use(Croppa);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
