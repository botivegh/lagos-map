import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lagosGrid: [],
    stores: [],
    overview : [],
    catchments: [],
    storeCatchment: [],
    clickedGrid: null,
    clickedStore: null,
    sideMenuOpen: null,
    gridSwitch: true,
    storeSwitch: true,
    catchmentSwitch: false,
    gridOpacity: 70,
    gridChoroplethOptions: [
      "nga_general_2020",
      "competition_level_cat",
      "light_mean_cat",
    ],
    gridChoroplethAttribute: 2,
  },
  // MUTATIONS
  mutations: {
    setGridData(state, data) {
      state.lagosGrid = data;
    },
    setStoreData(state, data) {
      state.stores = data;
    },
    setCatchmentData(state, data) {
      state.catchments = data;
    },
    setOverviewData(state, data) {
      state.overview = data[0];
    },
    // Set Seleted Grid
    setGrid(state, data) {
      state.clickedGrid = data;
      state.sideMenuOpen = "Selection";
      state.clickedStore = null;
      state.storeCatchment = [];
    },
    /// Set Selected Store
    setStore(state, data) {
      state.clickedStore = data;
      state.sideMenuOpen = "Selection";
      state.clickedGrid = null;

      // filter catchment polygons
      state.storeCatchment = state.catchments.features.filter(
        (p) => p.properties["Store ID"] == data["Store ID"]
      );
    },
    setSideMenuOpen: (state, newValue) => {
      state.sideMenuOpen = newValue;
    },
    sidebarToggle: (state) => {
      if (state.sideMenuOpen == null) {
        state.sideMenuOpen = "Overview";
      } else {
        state.sideMenuOpen = null;
      }
    },
    setGridSwitch: (state) => {
      state.gridSwitch = !state.gridSwitch;
    },
    setStoreSwitch: (state) => {
      state.storeSwitch = !state.storeSwitch;
    },
    setGridOpacity: (state, newValue) => {
      state.gridOpacity = newValue;
    },
    setCatchmentSwitch: (state) => {
      state.catchmentSwitch = !state.catchmentSwitch;
    },
    setGridChoroplethAttribute: (state, newValue) => {
      state.gridChoroplethAttribute = newValue;
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

      axios
        .get("http://localhost:8080/store_catchment.geojson")
        .then((result) => {
          commit("setCatchmentData", result.data);
        })
        .catch((error) => console.log(error));

      axios
        .get("http://localhost:8080/lagos_overview.json")
        .then((result) => {
          commit("setOverviewData", result.data);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
