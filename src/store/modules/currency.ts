import type { ActionContext, Module } from "vuex";
import type { Currency } from "@/types/Currency";

interface CurrencyState {
  currencies: Currency[];
  filter: string;
}

const CurrencyModule: Module<CurrencyState, {}> = {
  namespaced: true as true,
  state: {
    currencies: [
      {
        ID: 1,
        title: "Euro",
        code: "EUR",
        symbol: "€",
      },
    ],
    filter: "",
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
    ["DELETE_CURRENCY"](state, id: number) {
      state.currencies = state.currencies.filter((c) => c.ID !== id);
    },
    ["SET_FILTER"](state, query: string) {
      state.filter = query;
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
    setFilter(context, payload: string) {
      context.commit("SET_FILTER", payload);
    },
  },
  getters: {
    currencies(state: CurrencyState) {
      return state.filter != ""
        ? state.currencies.filter((c) => {
            if (
              c.title.toLowerCase().includes(state.filter.toLowerCase()) ||
              c.symbol.includes(state.filter) ||
              c.code.toLowerCase().includes(state.filter)
            ) {
              return c;
            }
          })
        : state.currencies;
    },

    isUniqueCode(state: CurrencyState, code: string) {
      return !!state.currencies.find((c) => c.code === code);
    },
  },
};

export { CurrencyModule };
