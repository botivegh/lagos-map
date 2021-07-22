<template>
  <div class="pa-2">
    <!-- GRID LAYERS -->
    <div class="grids mt-5">
      <div class="text-body font-weight-medium">Grid</div>
      <v-card
        elevation="1"
        class="mx-auto pa-1"
        max-width="344"
        style="position: relative"
      >
        <v-switch
          class="mt-0"
          style="position: absolute; top: 5px; right: 5px; z-index: 1"
          v-model="gridSwitch"
          color="#FF5722"
        ></v-switch>
        <v-img
          :src="require('../../assets/img/grid.png')"
          height="50px"
        ></v-img>
        <v-divider></v-divider>
        <!-- Opcatiy slider -->
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
    <!-- POINT LAYERS -->
    <div class="grids mt-5">
      <div class="text-body font-weight-medium">Points</div>
      <v-card
        elevation="1"
        height="50"
        class="mx-auto pa-1 d-flex align-center justify-space-between"
        max-width="344"
        style="position: relative"
      >
        <div class="align-center justify-start">
          <v-icon color="deep-purple" large>mdi-circle</v-icon>
          Grocery Retail Outlets
        </div>
        <v-switch
          class="ma-0 pa-0"
          color="#FF5722"
          hide-details
          v-model="storeSwitch"
        ></v-switch>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
 
  }),
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
  color: #FF5722;
}
</style>
