<template>
  <div id="map" class="ma-0" style="height: 100%; width: 100%">
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="{ zoomControl: false }"
      style="height: 100%; width: 100%"
    >
      <l-tile-layer :url="url" />

      <GridLayer v-if="gridSwitch"></GridLayer>
      <Stores v-if="storeSwitch"></Stores>
      <Catchments v-if="catchmentSwitch"></Catchments>
      <l-control-scale
        position="topright"
        :imperial="false"
        :metric="true"
      ></l-control-scale>
      <l-control-zoom position="topright"></l-control-zoom>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LControlScale } from "vue2-leaflet";
import GridLayer from "./mapCoponents/GridLayer";
import Stores from "./mapCoponents/Stores";
import Catchments from "./mapCoponents/Catchment";

import { mapState } from "vuex";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LControlScale,
    GridLayer,
    Stores,
    Catchments,
  },
  data: () => ({
    loading: false,
    show: false,
    zoom: 9,
    center: [6.5138, 3.3312],

    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=4d6954a0-fda6-4a75-9396-d356517d82cc",
  }),

  methods: {
    geoJsonReady(layer) {
      layer.bringToBack();
      this.show = true;
      console.log("ready");
    },
  },
  computed: {
    ...mapState(["gridSwitch", "storeSwitch", "catchmentSwitch"]),
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
