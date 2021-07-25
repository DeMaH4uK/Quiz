import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "@/router";
import state from '../store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    credentials: {},
    tokens: {},
  },
  mutations: {
    SET_QUESTIONS_TO_STATE: (state, questions) => {
      state.questions = questions;
    },

    // test
    SET_CREDENTIALS_TO_STATE: (state, credentials) => {
      state.credentials.login = credentials.login;
      state.credentials.password = credentials.password;
    },
    SET_TOKENS_TO_STATE: (state, tokens) => {
      state.tokens.accessToken = tokens.accessToken;
      state.tokens.refreshToken = tokens.refreshToken;
    },
  },
  actions: {
    REFRESH_TOKEN({ commit }) {
      return axios('http://localhost:3000/refresh-tokens', {
        method: 'POST',
        data: {
          "refreshToken": state.getters.TOKENS.refreshToken
        }
      })
      .then((tokens) => {
        commit('SET_TOKENS_TO_STATE', tokens.data);

        return tokens;
      })
      .catch((error) => {
        // console.log(error);

        return error;
      });
    },

    GET_QUESTIONS_FROM_API({ commit, dispatch }) {
      // console.log(state.getters.TOKENS.accessToken);

      return axios('http://localhost:3000/questions', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.getters.TOKENS.accessToken}`
        }
      })
      .then((questions) => {
        commit('SET_QUESTIONS_TO_STATE', questions.data);
        return questions;
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log('refresh!');

          dispatch('REFRESH_TOKEN')
          .then((res) => {
            // console.log(res);

            if (res.status === 200) {
              console.log('successfully');
            }
            else if (res.response.status === 400) {
              state.getters.CREDENTIALS.login = null;
              router.push({ name: "Login"});  // redirect to url by name
            }
          });
        }
        return error;
      });
    },

    // test
    GET_TOKEN_FROM_API({commit}, data) {
      // console.log(data);
      // console.log(data.login);
      // console.log(data.password);
      return axios('http://localhost:3000/signin', {
        method: "POST",
        data: {
          "email": data.login,
          "password": data.password
        }
      })
      .then((tokens) => {
        // console.log(tokens.data);
        commit('SET_TOKENS_TO_STATE', tokens.data);
        // console.log(tokens);
        commit('SET_CREDENTIALS_TO_STATE', {login: data.login, password: data.password})

        router.push({ name: "Quiz"})  // redirect to url by name

        return tokens;
      })
      .catch((error) => {
        // console.log(error.response);
        if (error.response.status === 401) {
          alert(error.response.data.message);
        }
        else {
          return error;
        }
      });
    },
  },
  getters: {
    QUESTIONS(state) {
      return state.questions;
    },
    TOKENS(state) {
      return state.tokens
    },
    CREDENTIALS(state) {
      return state.credentials
    },
  },
  modules: {
  }
})
