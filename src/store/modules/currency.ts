import type { ActionContext, Module } from "vuex";
import type { Currency } from "@/types/Currency";

interface CurrencyState {
  currencies: Currency[];
}

const CurrencyModule: Module<CurrencyState, {}> = {
  namespaced: true as true,
  state: {
    currencies: [],
  } as CurrencyState,
  mutations: {
    ["ADD_CURRENCY"](state, currency: Currency) {
      state.currencies.push(currency);
    },
    ["UPDATE_CURRENCY"](state, currency: Currency) {
      state.currencies.map((c) => {
        if (c.ID === currency.ID) {
          return currency;
        } else {
          return c;
        }
      });
    },
    ["DELETE_CURRENCY"](state, id: string) {
      state.currencies = state.currencies.filter((c) => c.ID !== id);
    },
  },
  actions: {
    addCurrency(context, payload: Currency) {
      context.commit("ADD_CURRENCY", payload);
    },
    updateCurrency(context, payload: Currency) {
      context.commit("UPDATE_CURRENCY", payload);
    },
    deleteCurrency(context, payload: string) {
      context.commit("DELETE_CURRENCY", payload);
    },
  },
  getters: {
    currencies(state: CurrencyState) {
      return state.currencies;
    },

    isUniqueCode(state: CurrencyState, code: string) {
      return !!state.currencies.find((c) => c.code === code);
    },
  },
};

export { CurrencyModule };
