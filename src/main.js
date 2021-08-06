import Vue from "vue";
import { store } from "./store";
import App from "./App";

import "tailwindcss/tailwind.css";
import "./assets/main.css";

Vue.config.devtools = true;
Vue.prototype.$store = store;
Vue.prototype.$state = store.state;

new Vue({
  el: "#app",
  render: (h) => h(App),
  data: {
    $store: store.state
  }
});
