<template>
  <div id="map" class="ma-0 pa-0" style="height: 100%; width: 100%">
    <v-card width="200" height="300" style="position: absolute; z-index: 1000">
      {{ clickedGrid.properties }}</v-card
    >

    <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%">
      <l-tile-layer :url="url" />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
      <l-marker :lat-lng="marker" @click="test()">
        <l-icon
          :icon-size="[2, 2]"
          :icon-anchor="[10, 10]"
          icon-url="static/images/baseball-marker.png"
        >
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson, LIcon } from "vue2-leaflet";

import { mapMutations, mapState } from "vuex";

export default {
  name: "HomeMap2",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LIcon,
  },
  data: () => ({
    loading: false,
    show: true,
    enableTooltip: true,
    zoom: 9,
    center: [6.5138, 3.3312],
    geojson: null,
    fillColor: "#e82e3f",
    activeFillColor: "#ffffff",

    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    marker: latLng(6.5138, 3.3312),
  }),

  methods: {
    ...mapMutations(["setGrid"]),

    test() {
      this.fillColor = "#ffffff";
    },
    getColor(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : "#FFEDA0";
    },
  },
  computed: {
    ...mapState(["clickedGrid"]),

    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const self = this; // important! need touch fillColor in computed for re-calculate when change fillColor
      //const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return (feature) => {
        return {
          //border
          weight: 0.3,
          color: "#ECEFF1",
          opacity: 0.6,
          // Colouring
          fillColor: self.getColor(feature.properties.light_mean),
          fillOpacity: 0.7,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // IMPORTANT! so we can reach vue data object within the funtions
        var self = this;

        /// Bind Tooltop
        layer.bindTooltip(
          "<div>Light:" +
            feature.properties.light_mean +
            "</div><div>Grid ID: " +
            feature.properties.grid_id +
            "</div>",
          { permanent: false, sticky: true }
        );
        //// Mouse Over - Leave: https://jsfiddle.net/3fcxzm9u/15/
        layer.on("mouseover", () => {
          layer.setStyle({
            color: "#cc0000",
            weight: 2,
          });
        });
        layer.on("mouseout", () => {
          layer.setStyle({
            color: "#ECEFF1",
            weight: 0.3,
          });
        });

        // Bind Click Event
        layer.on("click", function (e) {
          // doesn't work
          self.$store.commit("setGrid", e.target.feature);
          console.log("clicked saved");
          layer.setStyle({
            fillColor: self.activeFillColor,
          });
        });
      };
    },
  },
  /// DATA LOAD
  async created() {
    this.loading = true;
    const response = await fetch("http://localhost:8080/lagos_grid.geojson");
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  },
  /// IF LEAFLET FUNCTIONS NEEDED
  mounted() {
    this.$nextTick(() => {
      //this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
    });
  },
};
</script>
