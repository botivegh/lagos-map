<template>
  <div>
    <!-- Try cirleMarker if dont like fixed Radius -->
    <l-circle
      v-for="s in stores.features"
      :key="s.properties['Store ID']"
      :lat-lng="[s.properties.Latitude, s.properties.Longitude]"
      :radius="70"
      :color="circleColor"
      :fillColor="circleColor"
      @click="
        setStore(s.properties);
        test();
      "
    >
      <l-tooltip class="pa-0">
        <v-card
          elevation="0"
          class="pa-0 ma-0 d-flex justify-start"
          height="50"
          width="150"
        >
          <v-avatar color="deep-purple" size="50">
            <v-icon dark large>mdi-store</v-icon></v-avatar
          >
          <div class="pl-2">
            <div
              class="font-weight-bold d-inline-block text-no-wrap text-truncate"
              style="max-width: 95px"
            >
              {{ s.properties["Company Name"] }}
            </div>
            <div>{{ s.properties["Floorspace"] }}m²</div>
          </div>
        </v-card>
      </l-tooltip></l-circle
    >
    <l-circle
      v-if="clickedStore != null"
      :lat-lng="[clickedStore.Latitude, clickedStore.Longitude]"
      :radius="70"
      :color="selectedCircleColor"
      :fillColor="selectedCircleColor"
      :fillOpacity="0.8"
    >
    </l-circle>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { LCircle, LTooltip } from "vue2-leaflet";

export default {
  name: "Stores",
  components: {
    LCircle,
    LTooltip,
  },
  data: () => ({
    circleColor: "#673AB7",
    selectedCircleColor: "#ffffff",
    displaySelected: false,
  }),
  methods: {
    ...mapMutations(["setStore"]),
    test() {
      this.displaySelected = true;
    },
  },

  computed: {
    ...mapState(["stores", "clickedStore"]),

    // options() {
    //   return {
    //     onEachFeature: this.onEachFeatureFunction,
    //   };
    // },
    // onEachFeatureFunction() {
    //   return (feature, layer) => {
    //     // IMPORTANT! so we can reach vue data object within the funtions
    //    // var self = this;
    //     console.log(feature)
    //     layer.on("click", () => {
    //       console.log(layer)
    //     });
    //   };
    // },
  },
};
</script>

<style></style>
