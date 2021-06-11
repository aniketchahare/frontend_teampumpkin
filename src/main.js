import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import router from './router'
import Toasted from 'vue-toasted';
import VueLogger from 'vuejs-logger';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

const options = {
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'info',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: false,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: false,
  // optional : defaults to true if not specified
  showDev: true
}

Vue.use(VueMaterial);
Vue.use(VueLogger, options);
Vue.use(Toasted);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
