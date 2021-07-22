<template>
  <div style="position: absolute; z-index: 1000; bottom: 10px; right: 10px">
    <v-card
      elevation="1"
      class="mx-auto pa-1"
      max-width="300"
      style="position: relative; bottom: 0px; right: 0px"
    >
      <v-switch
        class="mt-0"
        style="position: absolute; top: 5px; right: 5px; z-index: 1"
        v-model="gridSwitch"
        color="#FF5722"
      ></v-switch>
      <v-img :src="require('../assets/img/grid.png')" height="50px"></v-img>
      <!-- COLOR SCHEME -->
      <div
        class="d-flex justify-left  text-caption"
        style="position: absolute; top: 10px; left: 5px; z-index: 1;"
      >
        <v-card class="ml-1" outlined height="20" width="35"  elevation="0" color="#a6a6a6"> </v-card>
        <v-card class="ml-1" outlined height="20" width="35"  elevation="0" color="#fcbba1"> </v-card>
        <v-card class="ml-1" outlined  height="20" width="35"  elevation="0" color="#fc9272"> </v-card>
        <v-card class="ml-1"  outlined  height="20" width="35"  elevation="0" color="#fb6a4a"> </v-card>
        <v-card class="ml-1" outlined  height="20" width="35"  elevation="0" color="#de2d26"> </v-card>
        <v-card class="ml-1" outlined  height="20" width="35"  elevation="0" color="#a50f15"> </v-card>
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
  data: () => ({}),
  methods: {
    ...mapMutations(["setGridChoroplethAttribute"]),
  },
  computed: {
    ...mapState(["gridChoroplethAttribute"]),
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
