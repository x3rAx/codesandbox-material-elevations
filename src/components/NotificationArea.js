import Vue from "vue";

import NotificationContainer from "./NotificationContainer";

export default Vue.extend({
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
