<template>
  <l-geo-json
    :geojson="lagosGrid"
    :options="options"
    :options-style="styleFunction"
    ref="jsonLayer"
  />
</template>

<script>
import { latLng } from "leaflet";
import { LGeoJson } from "vue2-leaflet";

import { mapMutations, mapState } from "vuex";

export default {
  name: "GridLayer",
  components: {
    LGeoJson,
  },
  data: () => ({
    enableTooltip: true,
    zoom: 9,
    center: [6.5138, 3.3312],
    fillColor: "#e82e3f",
    activeFillColor: "#ffffff",
    lastClickedLayer: null,

    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    marker: latLng(6.5138, 3.3312),
  }),

  methods: {
    ...mapMutations(["setGrid"]),

    test() {
      this.fillColor = "#ffffff";
    },
    ready() {
      this.$refs.json.mapObject.bringToBack();
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
    ...mapState([
      "lagosGrid",
      "clickedGrid",
      "gridOpacity",
      "gridChoroplethAttribute",
      "gridChoroplethOptions",
    ]),

    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const self = this;
      // important! need touch fillColor in computed for re-calculate when change fillColor
      //const fillColor = this.fillColor;
      const gridOpacity = this.gridOpacity / 100;
      const choroplethAttr =
        this.gridChoroplethOptions[this.gridChoroplethAttribute];

      return (feature) => {
        return {
          //border
          weight: 0.3,
          color: "#ECEFF1",
          opacity: 0.8,
          // Colouring
          fillColor: self.getColor(feature.properties[choroplethAttr]),
          fillOpacity: gridOpacity,
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // IMPORTANT! so we can reach vue data object within the funtions
        var self = this;

        /// Bind Tooltop
        // layer.bindTooltip(
        //   "<div>Light:" +
        //     feature.properties.light_mean +
        //     "</div><div>Grid ID: " +
        //     feature.properties.grid_id +
        //     "</div>",
        //   { permanent: false, sticky: true }
        // );
        //// Mouse Over - Leave: https://jsfiddle.net/3fcxzm9u/15/
        layer.on("mouseover", () => {
          layer.setStyle({
            color: "#ffffff",
            weight: 3,
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
          // Set selected grid

          self.$store.commit("setGrid", e.target.feature);

          layer.setStyle({
            fillColor: self.activeFillColor,
            fillOpacity: 0.9,
          });
          // Process to make sure only one grid can be selected at the same time! 
          try {
            if (
              layer != self.lastClickedLayer &&
              self.lastClickedLayer != null
            ) {
              self.$refs.jsonLayer.mapObject.resetStyle(self.lastClickedLayer);
            }
          } finally {
            self.lastClickedLayer = layer;
          }
        });
      };
    },
  },
  /// IF LEAFLET FUNCTIONS NEEDED
  mounted() {
    this.$nextTick(() => {
      //this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.jsonLayer.mapObject.bringToBack();
    });
  },
};
</script>

<style></style>
