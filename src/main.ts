import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faBell,
  faUser,
  faChartLine,
  faTicket,
  faStar,
  faMoneyBillTransfer,
  faPersonBiking,
  faGear,
  faPlus,
  faMagnifyingGlass,
  faTrashCan,
  faTimes,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircleNotch,
  faBell,
  faUser,
  faChartLine,
  faTicket,
  faStar,
  faMoneyBillTransfer,
  faPersonBiking,
  faGear,
  faPlus,
  faMagnifyingGlass,
  faTrashCan,
  faTimes,
  faArrowRightFromBracket
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).use(store);
app.mount("#app");
