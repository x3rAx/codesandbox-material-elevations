import Vue from "vue";

import MaterialElevations from "./components/MaterialElevations";
import NotificationArea from "./components/NotificationArea";

export default Vue.extend({
  components: { MaterialElevations, NotificationArea },
  template: `
    <div>
      <MaterialElevations />
      <NotificationArea />
    </div>`
});
