import type { ActionContext, Module } from "vuex";
import type { Currency } from "@/types/Currency";

interface CurrencyState {
  currencies: Currency[];
  filter: string;
}

function updateLocalStorage(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj));
}

const CurrencyModule: Module<CurrencyState, {}> = {
  namespaced: true as true,
  state: {
    currencies: [],
    filter: "",
  } as CurrencyState,
  mutations: {
    ["INIT_STORE"](state) {
      state.currencies = JSON.parse(
        localStorage.getItem("menu-currencies") || String([])
      );
    },
    ["ADD_CURRENCY"](state, currency: Currency) {
      const nextId =
        state.currencies.length > 0
          ? Math.max(...state.currencies.map((c) => c.ID)) + 1
          : 1;

      state.currencies.push({ ...currency, ID: nextId });

      updateLocalStorage("menu-currencies", state.currencies);
    },
    ["UPDATE_CURRENCY"](state, currency: Currency) {
      state.currencies = state.currencies.map((c) => {
        if (c.ID === currency.ID) {
          return currency;
        } else {
          return c;
        }
      });
      updateLocalStorage("menu-currencies", state.currencies);
    },
    ["DELETE_CURRENCY"](state, id: number) {
      state.currencies = state.currencies.filter((c) => c.ID !== id);
      updateLocalStorage("menu-currencies", state.currencies);
    },
    ["SET_FILTER"](state, query: string) {
      state.filter = query;
    },
  },
  actions: {
    addCurrency(context, payload: Currency & Omit<Currency, "ID">) {
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

    isUniqueCode(state: CurrencyState) {
      return (code: string, id: number) => {
        if (id !== -1) {
          let q = state.currencies.filter((c) => {
            if (c.ID === id && c.code === code) {
              return c;
            } else {
              if (c.code === code) {
                return c;
              }
            }
          });
          if (q.length > 2) {
            return false;
          } else {
            return true;
          }
        } else {
          let q = state.currencies.find(
            (c) => c.code.toLowerCase() === code.toLowerCase()
          );

          if (q) {
            return false;
          } else {
            return true;
          }
        }
      };
    },

    currency(state) {
      return (ID: number) => {
        return state.currencies.find((c) => c.ID === ID);
      };
    },
    filter(state) {
      return state.filter;
    },
  },
};

export { CurrencyModule };
