<template>
  <div>
    <div class="text-h5 font-weight-medium my-2">
      <v-avatar class="mr-2" color="primary" size="56"></v-avatar
      >{{ clickedStore["Company Name"] }}
    </div>
    <div class="text-center text-body-2">
      <v-icon small>mdi-map-marker</v-icon> {{ clickedStore["Address"] }}
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
      <v-switch
        v-model="catchmentSwitch"
        class="ma-0 pa-0"
        hide-details
      ></v-switch>
    </v-card>

    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["Brand Owner"] }}
      </div>
      <div>Brand Owner</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["Brand Owner Origin"] }}
      </div>
      <div>Brand Owner Origin</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{     new Intl.NumberFormat({ maximumSignificantDigits: 0 }).format(clickedStore["Floorspace"]) }}m²
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
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["No Branches"] }}
      </div>
      <div>No. Branches in Lagos</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{ clickedStore["grid_id"] }}
      </div>
      <div>No. Grids Reached</div>
    </div>
    <div class="text-center my-5">
      <div class="text-h5 font-weight-medium">
        {{
          new Intl.NumberFormat({ maximumSignificantDigits: 0 }).format(
            Math.round(clickedStore["nga_general_2020"])
          )
        }}
      </div>
      <div>Potential Population Reached</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["clickedGrid", "clickedStore"]),
    catchmentSwitch: {
      get() {
        return this.$store.state.catchmentSwitch;
      },
      set(newValue) {
        this.$store.commit("setCatchmentSwitch", newValue);
      },
    },
  },
};
</script>

<style scoped></style>
