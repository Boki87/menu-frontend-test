import type { ActionContext, Module } from "vuex";
import type { User } from "@/types/User";
import { authService } from "@/utils/api";

interface AuthState {
  user: User | null;
}

const AuthModule: Module<AuthState, {}> = {
  namespaced: true as true,
  state: {
    user: null,
  } as AuthState,
  mutations: {
    ["LOGIN_SUCCESS"](state, user: User) {
      state.user = user;
    },
    ["LOGIN_FAILURE"](state, user: User) {
      state.user = null;
    },
    ["LOGOUT"](state, user: User) {
      state.user = null;
    },
  },
  actions: {
    setUser(context, payload: User | null) {
      context.commit("SET_USER", payload);
    },
    login(context, payload: { email: string; password: string }) {
      return authService
        .login(payload)
        .then((res) => {
          // console.log(res);
          context.commit("LOGIN_SUCCESS", { email: payload.email });
          return Promise.resolve(payload.email);
        })
        .catch((err) => {
          // console.log(err);
          context.commit("LOGIN_FAILURE", { email: payload.email });
          return Promise.reject(err);
        });
    },
    logout(context) {
      return authService.logout().then(() => {
        context.commit("LOGOUT");
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};

export { AuthModule };
