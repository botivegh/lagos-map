<template>
  <l-geo-json
    :geojson="storeCatchment"
    :options-style="styleFunction"
    ref="catchmentJsonLayer"
  />
</template>

<script>
import { LGeoJson } from "vue2-leaflet";
import { mapState } from "vuex";
export default {
  components: {
    LGeoJson,
  },
  data: () => ({
    fillColor: "#673AB7",
  }),
  computed: {
    ...mapState(["storeCatchment"]),

    styleFunction() {
      return () => {
        return {
          //border
          weight: 1.5,
          color: "#ECEFF1",
          opacity: 0.8,
          // Colouring
          fillColor: this.fillColor,
          fillOpacity: 0.5,
        };
      };
    },
  },
};
</script>

<style></style>
