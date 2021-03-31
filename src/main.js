import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import i18n from './i18n/i18n'
import store from "./store/store"


Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created: function () {
    this.loadData()
    window.addEventListener('beforeunload', this.beforeLeave)
  },
  methods: {
    saveData: function () {
      localStorage.setItem("data", JSON.stringify(this.$store.state))
    },
    loadData: function () {
      let data = localStorage.getItem("data")
      data = JSON.parse(data)
      this.$store.commit("init", data)
      console.log("Data was loaded", data)
    },
    beforeLeave: function () {
      this.saveData()
    }
  }
}).$mount('#app')
