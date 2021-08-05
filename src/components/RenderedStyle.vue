<template>
  <div
    class="font-mono overflow-hidden overflow-ellipsis whitespace-nowrap my-0.5 text-sm"
  >
    {{ cssProp }}
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: [Function],
      default: null,
    },
    property: String,
    map: {
      type: Function,
      default: (x) => x,
    },
  },
  data() {
    return {
      cssProp: "",
    };
  },
  mounted() {
    let element = this.element;
    if (typeof element === "function") {
      element = element();
    }
    const style = window.getComputedStyle(element);
    this.cssProp = this.map(style[this.property]);
  },
};
</script>

<style lang="postcss" scoped>
</style>