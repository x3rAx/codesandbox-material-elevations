<template>
  <div
    class="notification-container"
    :class="{ 'hide-notification': isHidden }"
  >
    <div ref="colapser" class="notification-colapser" @click="hideNotification">
      <div class="notification" :class="{ 'has-content': hasSlot }">
        <h6 class="font-bold">{{ title }}</h6>
        <div v-if="hasSlot" class="notification-text"><slot /></div>
      </div>
    </div>
  </div>
</template>

<script>
import collapseSection from "../../lib/collapseElement";

export default {
  props: {
    title: String,
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
      isHidden: true,
    };
  },
  computed: {
    hasSlot() {
      return this.$slots.default !== undefined;
    },
  },
  methods: {
    hideNotification() {
      this.isHidden = true;
      collapseSection(this.$refs.colapser);
      setTimeout(this.emitNotificationClosed, 300);
    },

    emitNotificationClosed() {
      this.$emit("notificationClosed");
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>