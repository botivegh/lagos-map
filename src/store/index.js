import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lagosGrid: [],
    stores: [],
    overview: [],
    catchments: [],
    storeCatchment: [],
    clickedGrid: null,
    clickedStore: null,
    sideMenuOpen: "Overview",
    gridSwitch: true,
    storeSwitch: true,
    oppSwitch: false,
    catchmentSwitch: false,
    gridOpacity: 70,
    gridChoroplethOptions: [
      "nga_general_2020",
      "competition_level_cat",
      "light_mean_cat",
    ],
    gridChoroplethAttribute: 0,
    sliderValues: {
      population: [30, 5000],
      urban: [50, 100],
      comp: [0, 2],
      wealth: [3, 4],
    },
    oppList: [],
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
    setOppSwitch: (state) => {
      state.oppSwitch = !state.oppSwitch;
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

    // FINDING OPPORTUNITY AREA FUNCTION

    findOpp: (state) => {
      const sliderValues = state.sliderValues;
      const cat_mapping = {
        nan: 0,
        "Very Low": 0,
        Low: 1,
        Medium: 2,
        High: 3,
        "Very High": 4,
      };
      var oppArray = [];
      state.lagosGrid.features.forEach((element) => {
        let check0;
        let check1;
        let check2;
        let check3;

        if (sliderValues.population[1] == 10000) {
          if (
            element.properties.nga_general_2020 >= sliderValues.population[0] &&
            element.properties.nga_general_2020 <= 100000
          ) {
            check0 = true;
          }
        } else {
          if (
            element.properties.nga_general_2020 >= sliderValues.population[0] &&
            element.properties.nga_general_2020 <= sliderValues.population[1]
          ) {
            check0 = true;
          } else {
            check0 = false;
          }
        }

        element.properties.urban_level >= sliderValues.urban[0] / 100 &&
        element.properties.urban_level <= sliderValues.urban[1] / 100
          ? (check1 = true)
          : (check1 = false);

        cat_mapping[element.properties.competition_level_cat] >=
          sliderValues.comp[0] &&
        cat_mapping[element.properties.competition_level_cat] <=
          sliderValues.comp[1]
          ? (check2 = true)
          : (check2 = false);
        cat_mapping[element.properties.light_mean_cat] >=
          sliderValues.wealth[0] &&
        cat_mapping[element.properties.light_mean_cat] <= sliderValues.wealth[1]
          ? (check3 = true)
          : (check3 = false);

        oppArray.push(check0 && check1 && check2 & check3);
      });
      console.log("True");

      console.log(oppArray.filter(Boolean).length);
      state.oppList = oppArray;
    },
  },
  //ACTIONS
  actions: {
    loadData({ commit }) {
      axios
        .get("./lagos_grid.geojson")
        .then((result) => {
          commit("setGridData", result.data);
        })
        .catch((error) => console.log(error));

      axios
        .get("./lagos_stores.geojson")
        .then((result) => {
          commit("setStoreData", result.data);
        })
        .catch((error) => console.log(error));

      axios
        .get("./store_catchment.geojson")
        .then((result) => {
          commit("setCatchmentData", result.data);
        })
        .catch((error) => console.log(error));

      axios
        .get("./lagos_overview.json")
        .then((result) => {
          commit("setOverviewData", result.data);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
