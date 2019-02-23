import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import router from './routes'

import App from './App.vue'

// LOADING COMPONENT
import Loading from './components/Utils/Loading'
Vue.component('v-loading', Loading)

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
