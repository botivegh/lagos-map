<template>
  <div>
    <!-- Try cirleMarker if dont like fixed Radius -->
    <l-circle
      v-for="s in stores.features"
      :key="s.properties['Store ID']"
      :lat-lng="[s.properties.Latitude, s.properties.Longitude]"
      :radius="70"
      color="#673AB7"
      @click="setStore(s.properties)"
    >
      <l-tooltip class="pa-0">
        <v-card
          elevation="0"
          class="pa-0 ma-0 d-flex justify-start"
          height="50"
          width="150"
        >
          <v-avatar color="primary" size="50" tile>
            <v-icon dark large>mdi-store</v-icon></v-avatar
          >
          <div class="pl-2">
            <div class="font-weight-bold d-inline-block text-no-wrap text-truncate" style="max-width: 95px;">
              {{ s.properties["Company Name"] }}
            </div>
            <div>{{s.properties["Floorspace"]}}m²</div>
          </div>
        </v-card>
      </l-tooltip></l-circle
    >
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
  data: () => ({}),
  methods: {
    ...mapMutations(["setStore"]),
  },

  computed: {
    ...mapState(["stores"]),
  },
};
</script>

<style></style>
