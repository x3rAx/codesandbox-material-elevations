import Vue from "vue";

import ElevatedCard from "./ElevatedCard";
import ClickToCopy from "./ClickToCopy";
import RenderedStyle from "./RenderedStyle";

import rgba2hex from "../lib/rgba2hex";

export default Vue.extend({
  components: { ElevatedCard, ClickToCopy, RenderedStyle },
  template: `
    <div class="main">
      <div ref="dark" class="dark">
        <div class="container mx-auto max-w-6xl pb-32">
          <div class="cards-grid">
            <div class="px-4 py-0 col-span-full">
              <h3>Background</h3>
              <ClickToCopy @textCopied="sendCopyNotification" class="ml-2">
                <RenderedStyle :element="()=>$refs.dark" property="backgroundColor" />
              </ClickToCopy>
              <ClickToCopy @textCopied="sendCopyNotification" class="ml-2">
                <RenderedStyle :element="()=>$refs.dark" property="backgroundColor" :map="rgba2hex" />
              </ClickToCopy>
            </div>
            <ElevatedCard v-for="e of elevations" :key="e" :elevate="e" />
          </div>
        </div>
      </div>
      <div ref="light" class="light">
        <div class="container mx-auto max-w-6xl pb-32">
          <div class="cards-grid">
            <div class="px-4 py-0 col-span-full">
              <h3>Background</h3>
              <ClickToCopy @textCopied="sendCopyNotification" class="ml-2">
                <RenderedStyle :element="()=>$refs.light" property="backgroundColor" />
              </ClickToCopy>
              <ClickToCopy @textCopied="sendCopyNotification" class="ml-2">
                <RenderedStyle :element="()=>$refs.light" property="backgroundColor" :map="rgba2hex" />
              </ClickToCopy>
            </div>
            <ElevatedCard v-for="e of elevations" :key="e" :elevate="e" />
          </div>
        </div>
      </div>
    </div>`,

  data() {
    return {
      elevations: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]
    };
  },
  methods: {
    rgba2hex,

    sendCopyNotification(text) {
      this.$store.sendCopyNotification(text);
    }
  }
});
