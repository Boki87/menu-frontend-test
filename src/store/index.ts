import { createStore } from "vuex";
import { CurrencyModule } from "./modules/currency";
import { AuthModule } from "./modules/auth";

export default createStore({
  modules: {
    auth: AuthModule,
    currency: CurrencyModule,
  },
});
