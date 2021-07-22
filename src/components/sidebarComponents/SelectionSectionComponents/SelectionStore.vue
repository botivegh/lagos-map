<template>
  <div>
    <div class="text-h5 font-weight-medium my-2">
      <v-avatar class="mr-2" color="primary" size="56"></v-avatar>{{ clickedStore.Fascia }}
    </div>
    <div>
      <v-icon small>mdi-map-marker</v-icon> NTC - place holder for address
    </div>
    <v-card
      elevation="1"
      height="50"
      tile
      class="mt-2 d-flex align-center justify-space-between"
      max-width="344"
      style="position: relative"
    >
      <div class="align-center justify-start">
        <v-icon large>mdi-circle</v-icon>
        Store Catchment Area
      </div>
      <v-switch class="ma-0 pa-0" hide-details></v-switch>
    </v-card>

    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["Brand Owner"] }}
      </div>
      <div>Brand Owner</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["Floorspace"] }}m²
      </div>
      <div>Floorspace</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["Price Range"] }}
      </div>
      <div>Price Range</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">NTC</div>
      <div>No. Branches in Lagos</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">NTC</div>
      <div>No. Grids Covered</div>
    </div>

    {{ clickedStore }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["clickedGrid", "clickedStore"]),
  },
};
</script>

<style scoped></style>
