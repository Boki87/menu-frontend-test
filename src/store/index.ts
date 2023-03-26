import type { Currency } from "@/types/Currency";
import type { User } from "@/types/User";
import { createStore } from "vuex";
import { CurrencyModule } from "./modules/currency";
import { AuthModule } from "./modules/auth";

export interface State {
  user: User | null;
  currencies: Currency[];
}

export default createStore({
  modules: {
    auth: AuthModule,
    currency: CurrencyModule,
  },
});
