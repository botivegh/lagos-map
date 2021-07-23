<template>
  <div style="position: absolute; z-index: 1000; bottom: 10px; right: 10px">
    <v-card
      elevation="1"
      class="mx-auto pa-1"
      max-width="322"
      style="position: relative; bottom: 0px; right: 0px"
    >
      <v-switch
        class="mt-0"
        style="position: absolute; top: 5px; right: 5px; z-index: 2"
        v-model="gridSwitch"
        color="#FF5722"
      ></v-switch>
      <v-img :src="require('../assets/img/grid.png')" height="50px"></v-img>
      <!-- COLOR SCHEME -->
      <div
        class="d-flex justify-left text-caption"
        style="position: absolute; top: 10px; left: 5px; z-index: 1"
        v-if="gridSwitch"
      >
        <v-card
          v-for="c in colourCoding[activeLayer].colours"
          :key="c"
          class="mr-1"
          outlined
          height="20"
          width="40"
          elevation="0"
          :color="c"
        >
        </v-card>
      </div>
      <div
        class="d-flex justify-space-between text-center"
        v-if="gridSwitch"
        style="
          position: absolute;
          top: 32px;
          left: 5px;
          z-index: 1;
          font-size: 10px;
          width: 264px;
        "
      >
        <span
          v-for="l in colourCoding[activeLayer].labels"
          :key="l"
          class="pr-1"
          style="width: 44px; line-height: 0.95"
          >{{ l }}</span
        >
      </div>
      <v-divider></v-divider>
      <!-- Opacity Slider -->
      <v-slider
        v-model="gridOpacity"
        color="#FF5722"
        track-color="blue-grey"
        thumb-label
        step="10"
        :thumb-size="24"
        hide-details
        :disabled="!gridSwitch"
        dense
        class="ma-0 pa-0"
      ></v-slider>
      <div class="d-flex justify-space-between pa-1">
        <div
          style="cursor: pointer"
          :class="gridChoroplethAttribute == 0 ? 'active' : ''"
          @click="setGridChoroplethAttribute(0)"
        >
          Population
        </div>
        <div
          style="cursor: pointer"
          :class="gridChoroplethAttribute == 1 ? 'active' : ''"
          @click="setGridChoroplethAttribute(1)"
        >
          Competition
        </div>
        <div
          style="cursor: pointer"
          :class="gridChoroplethAttribute == 2 ? 'active' : ''"
          @click="setGridChoroplethAttribute(2)"
        >
          Wealth Level
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    colourCoding: {
      nga_general_2020: {
        labels: ["≤50", "≤250", "≤1,000", "≤5,000", "≤10,000", " 10,000+"],
        colours: [
          "#f1eef6",
          "#d0d1e6",
          "#a6bddb",
          "#74a9cf",
          "#2b8cbe",
          "#045a8d",
        ],
      },
      light_mean_cat: {
        labels: ["No Data", "Very Low", "Low", "Medium", "High", "Very High"],
        colours: [
          "#a6a6a6",
          "#b2e2e2",
          "#66c2a4",
          "#2ca25f",
          "#006d2c",
          "#00471d",
        ],
      },
      competition_level_cat: {
        labels: ["No Data", "Very Low", "Low", "Medium", "High", "Very High"],
        colours: [
          "#a6a6a6",
          "#fcbba1",
          "#fc9272",
          "#fb6a4a",
          "#de2d26",
          "#a50f15",
        ],
      },
    },
  }),
  methods: {
    ...mapMutations(["setGridChoroplethAttribute"]),
  },
  computed: {
    ...mapState(["gridChoroplethAttribute", "gridChoroplethOptions"]),
    activeLayer: function () {
      return this.gridChoroplethOptions[this.gridChoroplethAttribute];
    },
    gridSwitch: {
      get() {
        return this.$store.state.gridSwitch;
      },
      set(newValue) {
        this.$store.commit("setGridSwitch", newValue);
      },
    },
    storeSwitch: {
      get() {
        return this.$store.state.storeSwitch;
      },
      set(newValue) {
        this.$store.commit("setStoreSwitch", newValue);
      },
    },
    gridOpacity: {
      get() {
        return this.$store.state.gridOpacity;
      },
      set(newValue) {
        this.$store.commit("setGridOpacity", newValue);
      },
    },
  },
};
</script>

<style scoped>
.active {
  text-decoration: underline;
  font-weight: bold;
  color: #ff5722;
}
</style>
