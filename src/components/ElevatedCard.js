import Vue from "vue";

import ClickToCopy from "./ClickToCopy";
import RenderedStyle from "./RenderedStyle";

import px2calcRem from "../lib/px2calcRem";
import rgba2hex from "../lib/rgba2hex";

export default Vue.extend({
  components: { ClickToCopy, RenderedStyle },
  template: `
    <div class="card" :class="\`elevate-\${elevate}dp\`">
      <h2>{{ elevate }}dp</h2>
      <h3>Background</h3>
      <div class="flex items-stretch ml-2">
        <ClickToCopy @textCopied="sendCopyNotification" class="min-w-0">
          <RenderedStyle :element="()=>$el" property="backgroundColor" />
        </ClickToCopy>
      </div>
      <div class="flex items-stretch ml-2">
        <ClickToCopy @textCopied="sendCopyNotification" class="min-w-0">
          <RenderedStyle :element="()=>$el" property="backgroundColor" :map="rgba2hex" />
        </ClickToCopy>
      </div>
      <h3>Box-Shadow</h3>
      <div class="flex items-stretch ml-2">
        <span class="text-sm text-gray-600 dark:text-gray-400 mr-1">rem: </span>
        <ClickToCopy @textCopied="sendCopyNotification" class="min-w-0">
          <RenderedStyle :element="()=>$el" property="boxShadow" :map="px2calcRem" />
        </ClickToCopy>
      </div>
      <div class="flex items-stretch ml-2">
        <span class="text-sm text-gray-600 dark:text-gray-400 mr-1">px: </span>
        <ClickToCopy @textCopied="sendCopyNotification" class="min-w-0">
          <RenderedStyle :element="()=>$el" property="boxShadow" />
        </ClickToCopy>
      </div>
    </div>`,
  props: {
    elevate: Number
  },
  methods: {
    rgba2hex,
    px2calcRem,

    sendCopyNotification(text) {
      this.$store.sendCopyNotification(text);
    },
    prefix(pr) {
      return (text) => pr + text;
    }
  }
});
