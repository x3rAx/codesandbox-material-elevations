import Vue from "vue";
import { store } from "./store";
import App from "./App";

import "./assets/main.css";

Vue.config.devtools = true;
Vue.prototype.$store = store;
Vue.prototype.$state = store.state;
new Vue({
  el: "#app",
  components: { App },
  template: `<App />`,
  data: {
    $store: store.state
  }
});
