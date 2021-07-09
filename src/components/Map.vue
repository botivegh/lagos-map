<template>
    <div
      id="map"
      class="ma-0"
      style="height: 100%; width: 100%;"
    >
      <l-map
        ref="myMap"
        :zoom="zoom"
        :center="center"
        :options="{ zoomControl: false }"
        style="height: 100%; width: 100%"
      >
        <l-tile-layer :url="url" />

        <GridLayer></GridLayer>
        <Stores v-if="true"></Stores>

        <l-control-zoom position="topright"></l-control-zoom>
        <l-control-scale
          position="bottomright"
          :imperial="false"
          :metric="true"
        ></l-control-scale>
      </l-map>
    </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LControlScale } from "vue2-leaflet";
import GridLayer from "./mapCoponents/GridLayer";
import Stores from "./mapCoponents/Stores";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LControlScale,
    GridLayer,
    Stores,
  
  },
  data: () => ({
    loading: false,
    show: false,
    zoom: 9,
    center: [6.5138, 3.3312],

    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
  }),

  methods: {
    geoJsonReady(layer) {
      layer.bringToBack();
      this.show = true;

      console.log("ready");
    },
  },


  /// IF LEAFLET FUNCTIONS NEEDED
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.myMap.mapObject);
    });
  },
  /// LOADING THE DATA
  async created() {
    this.$store.dispatch("loadData");
  },
};
</script>
