import Vue from 'vue'
import App from './App.vue'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import 'normalize.css/normalize.css'
import './style/index.css'

Vue.use(ViewUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
