<template>
  <div>
    <MaterialElevations />
    <NotificationArea />
  </div>
</template>

<script>
import MaterialElevations from "./components/MaterialElevations";
import NotificationArea from "./components/notifications/NotificationArea";

export default {
  components: { MaterialElevations, NotificationArea },
};
</script>

<style lang="postcss" scoped>
</style>