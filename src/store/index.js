import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lagosGrid: [],
    stores: [],
    clickedGrid: null,
    clickedStore: null,
    sideMenuOpen: null,
  },
  // MUTATIONS
  mutations: {
    setGridData(state, data) {
      state.lagosGrid = data;
    },
    setStoreData(state, data) {
      state.stores = data;
    },
    // Set Seleted Grid
    setGrid(state, data) {
      state.clickedGrid = data;
      state.sideMenuOpen = "Selection";
      state.clickedStore = null;
    },
    /// Set Selected Store
    setStore(state, data) {
      state.clickedStore = data;
      state.sideMenuOpen = "Selection";
      state.clickedGrid = null;
    },
    setSideMenuOpen: (state, newValue) => {
      state.sideMenuOpen = newValue;
    },
    sidebarToggle: (state) => {
      if (state.sideMenuOpen == null) {
        state.sideMenuOpen = "Search";
      } else {
        state.sideMenuOpen = null;
      }
    },
  },
  //ACTIONS
  actions: {
    loadData({ commit }) {
      axios
        .get("http://localhost:8080/lagos_grid.geojson")
        .then((result) => {
          commit("setGridData", result.data);
        })
        .catch((error) => console.log(error));

      axios
        .get("http://localhost:8080/lagos_stores.geojson")
        .then((result) => {
          commit("setStoreData", result.data);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
