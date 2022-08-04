import { createApp } from "vue";

import Datepicker from "@vuepic/vue-datepicker";
import VueUniversalModal from "vue-universal-modal";
import "@vuepic/vue-datepicker/dist/main.css";
import "vue-universal-modal/dist/index.css";

import App from "./app.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(VueUniversalModal, { teleportTarget: "#modals" })
  .component("Datepicker", Datepicker)
  .mount("#app");
