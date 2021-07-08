import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickedGrid : [],
  },
  mutations: {
    setGrid(state, data) {
      state.clickedGrid = data;
    },
  },
  actions: {},
  modules: {},
});
