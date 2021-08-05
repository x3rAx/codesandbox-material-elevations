import Vue from "vue";
// import App from "./App.vue";

// Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App)
// }).$mount("#app");

import "./assets/main.css";

// Thanks to Erick Petrucelli (https://stackoverflow.com/a/3627747/1185892)
const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

const px2calcRem = (px) =>
  px.replace("0px", "0").replace(/(-{0,1}\d+)px/g, "calc($1rem/16)");

// Thanks to Brandon Smith (https://css-tricks.com/using-css-transitions-auto-dimensions/)
function collapseSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  var elementTransition = element.style.transition;
  element.style.transition = "";

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function () {
    element.style.height = sectionHeight + "px";
    element.style.transition = elementTransition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + "px";
    });
  });

  // mark the section as "currently collapsed"
  element.setAttribute("data-collapsed", "true");
}

// ======================================================
// ======================================================

function selectElementText(el) {
  const range = document.createRange();
  range.selectNodeContents(el);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}

// ======================================================

const store = {
  debug: false,
  state: {
    nextNotificationId: 0,
    notifications: [] // {id: 0, text: "This is a notification"}
  },
  sendNotification({ title, html }) {
    if (this.debug) console.log("[store] sendNotification:", { title, html });
    this.state.notifications.push({
      id: this.state.nextNotificationId++,
      title,
      html
    });
  },
  sendCopyNotification(text) {
    this.sendNotification({
      title: "Copied to clipboard",
      html: `<span class="pre">${text}</span>`
    });
  },
  removeNotification(notification) {
    if (this.debug) console.log("[store] removeNotification:", notification);
    const idx = this.state.notifications.findIndex(
      (n) => n.id == notification.id
    );
    this.state.notifications.splice(idx, 1);
  }
};

// ======================================================

const ClickToCopy = Vue.extend({
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

// ------------------------------------------------------

const RenderedStyle = Vue.extend({
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

// ------------------------------------------------------

const ElevatedCard = Vue.extend({
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
    sendCopyNotification(text) {
      this.$store.sendCopyNotification(text);
    },
    prefix(pr) {
      return (text) => pr + text;
    }
  }
});

// ------------------------------------------------------

const MaterialElevations = Vue.extend({
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
    sendCopyNotification(text) {
      this.$store.sendCopyNotification(text);
    }
  }
});

// ------------------------------------------------------

const NotificationContainer = Vue.extend({
  template: `
    <div class="notification-container" :class="{'hide-notification': isHidden}">
      <div ref="colapser" class="notification-colapser" @click="hideNotification">
        <div class="notification" :class="{'has-content': hasSlot}">
          <h6 class="font-bold">{{ title }}</h6>
          <div v-if="hasSlot" class="notification-text"><slot /></div>
        </div>
      </div>
    </div>`,
  props: {
    title: String
  },
  mounted() {
    requestAnimationFrame(() => {
      this.isHidden = false;
    });
    setTimeout(() => {
      this.hideNotification();
    }, 2000);
  },
  data() {
    return {
      isHidden: true
    };
  },
  computed: {
    hasSlot() {
      return this.$slots.default !== undefined;
    }
  },
  methods: {
    hideNotification() {
      this.isHidden = true;
      collapseSection(this.$refs.colapser);
      setTimeout(this.emitNotificationClosed, 300);
    },

    emitNotificationClosed() {
      this.$emit("notificationClosed");
    }
  }
});

// ------------------------------------------------------

const NotificationArea = Vue.extend({
  components: { NotificationContainer },
  template: `
    <div class="notification-area">
      <NotificationContainer v-for="n of notifications" :key="n.id" @notificationClosed="removeNotification(n)" :title="n.title">
        <div v-html="n.html"></div>
      </NotificationContainer>
    </div>`,
  computed: {
    notifications() {
      return this.$state.notifications;
    }
  },
  methods: {
    removeNotification(n) {
      this.$store.removeNotification(n);
    }
  }
});

// ------------------------------------------------------

const App = Vue.extend({
  components: { MaterialElevations, NotificationArea },
  template: `
    <div>
      <MaterialElevations />
      <NotificationArea />
    </div>`
});

// ------------------------------------------------------

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

// ======================================================
// ======================================================
