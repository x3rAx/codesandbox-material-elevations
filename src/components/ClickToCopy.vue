<template>
  <div class="cursor-pointer hover:text-secondary" @click="copyText">
    <slot />
  </div>
</template>

<script>
import selectElementText from "../lib/selectElementText";

export default {
  methods: {
    copyText() {
      const selection = selectElementText(this.$el);
      document.execCommand("copy");
      const text = selection.toString();
      this.$emit("textCopied", text);
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>