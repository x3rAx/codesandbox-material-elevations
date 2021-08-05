import Vue from "vue";

export default Vue.extend({
  template: `<div class="font-mono overflow-hidden overflow-ellipsis whitespace-nowrap my-0.5 text-sm">{{ cssProp }}</div>`,
  props: {
    element: {
      type: [Function],
      default: null
    },
    property: String,
    map: {
      type: Function,
      default: (x) => x
    }
  },
  data() {
    return {
      cssProp: ""
    };
  },
  mounted() {
    let element = this.element;
    if (typeof element === "function") {
      element = element();
    }
    const style = window.getComputedStyle(element);
    this.cssProp = this.map(style[this.property]);
  }
});
