import Vue from "vue";

import selectElementText from "../lib/selectElementText";

export default Vue.extend({
  template: `
    <div class="cursor-pointer hover:text-secondary" @click="copyText">
      <slot />
    </div>`,
  methods: {
    copyText() {
      const selection = selectElementText(this.$el);
      document.execCommand("copy");
      const text = selection.toString();
      this.$emit("textCopied", text);
    }
  }
});
