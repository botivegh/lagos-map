<template>
  <div class="pa-3">
    <!-- GRID LAYERS -->
    <div class="grids mt-5">
      <div class="text-body font-weight-medium">Grid</div>
      <v-card
        elevation="1"
        tile
        class="mx-auto pa-1"
        max-width="344"
        style="position: relative"
      >
        <v-switch
          class="mt-0"
          style="position: absolute; top: 5px; right: 5px; z-index: 1"
          v-model="switch1"
          flat
        ></v-switch>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100px"
        ></v-img>
        <v-slider
          v-model="opacity"
          thumb-label
          :thumb-size="24"
          hide-details
          :disabled="!switch1"
          dense
          class="ma-0 pa-0"
        ></v-slider>
        <div class="d-flex justify-space-between pa-1">
          <div
            style="cursor: pointer"
            :class="gridSelection == 0 ? 'active' : ''"
            @click="gridTypeSelected(0)"
          >
            Population
          </div>
          <div
            style="cursor: pointer"
            :class="gridSelection == 1 ? 'active' : ''"
            @click="gridTypeSelected(1)"
          >
            Competition
          </div>
          <div
            style="cursor: pointer"
            :class="gridSelection == 2 ? 'active' : ''"
            @click="gridTypeSelected(2)"
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
        tile
        class="mx-auto pa-1 d-flex align-center justify-space-between"
        max-width="344"
        style="position: relative"
      >
        <div class="align-center justify-start">
          <v-icon large>mdi-circle</v-icon>
          Grocery Retail Outlets
        </div>
        <v-switch
          class="ma-0 pa-0"
          hide-details
          v-model="switch2"
          flat
        ></v-switch>
      </v-card>
    </div>
  </div>
</template>

<script>


export default {
  data: () => ({
    switch1: true,
    switch2: true,

    opacity: 70,
    gridSelection: 1,
  }),
  methods: {
    gridTypeSelected(id) {
      this.gridSelection = id;
    },
  },
};
</script>

<style scoped>
.active {
  text-decoration: underline;
  font-weight: bold;
  color: rgb(255, 102, 0);
}
</style>
