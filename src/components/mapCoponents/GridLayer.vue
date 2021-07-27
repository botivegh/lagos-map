<template>
  <l-geo-json
    :geojson="lagosGrid"
    :options="options"
    :options-style="styleFunction"
    ref="jsonLayer"
  />
</template>

<script>
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
    fillColor: "#e82e3f",
    activeFillColor: "#ffffff",
    lastClickedLayer: null,
  }),

  methods: {
    ...mapMutations(["setGrid"]),

    test() {
      this.fillColor = "#ffffff";
    },
    ready() {
      this.$refs.json.mapObject.bringToBack();
    },
    getOppHighlight(d, t) {
      //console.log(this.oppList[d])
      if (t == "color") {
        return d == undefined ? "#607D8B" : !d ? "#607D8B" : "red";
      } else {
        return d == undefined ? 0.3 : !d ? 0.3 : 2;
      }
    },

    getColor(attr, d) {
      if (attr == "nga_general_2020") {
        return d > 10000
          ? "#045a8d"
          : d > 5000
          ? "#2b8cbe"
          : d > 1000
          ? "#74a9cf"
          : d > 250
          ? "#a6bddb"
          : d > 50
          ? "#d0d1e6"
          : "#f1eef6";
      }
      if (attr == "light_mean_cat") {
        return d == "Very Low"
          ? "#b2e2e2"
          : d == "Low"
          ? "#66c2a4"
          : d == "Medium"
          ? "#2ca25f"
          : d == "High"
          ? "#006d2c"
          : d == "Very High"
          ? "#00471d"
          : "#a6a6a6";
      }
      if (attr == "competition_level_cat") {
        return d == "Very Low"
          ? "#fcbba1"
          : d == "Low"
          ? "#fc9272"
          : d == "Medium"
          ? "#fb6a4a"
          : d == "High"
          ? "#de2d26"
          : d == "Very High"
          ? "#a50f15"
          : "#a6a6a6";
      }
    },
  },

  computed: {
    ...mapState([
      "lagosGrid",
      "clickedGrid",
      "gridOpacity",
      "gridChoroplethAttribute",
      "gridChoroplethOptions",
      "oppList",
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
      const oppList = this.oppList;

      const gridOpacity = this.gridOpacity / 100;
      const choroplethAttr =
        this.gridChoroplethOptions[this.gridChoroplethAttribute];
      var i = -1;
      return (feature) => {
        i += 1;
        return {
          //border
          weight: self.getOppHighlight(oppList[i], "weight"),
          color: self.getOppHighlight(oppList[i], "color"),
          opacity: 0.8,
          // Colouring
          fillColor: self.getColor(
            choroplethAttr,
            feature.properties[choroplethAttr]
          ),
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
