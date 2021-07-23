<template>
  <div class="pa-2" style="overflow-y: auto; height: calc(100% - 115px)">
    <div>
      <v-chip id="type-chip" v-if="idType != null" dark color="deep-orange" label>
        {{ idType
        }}<v-icon medium right>{{
          idType == "store" ? "mdi-map-marker" : "mdi-grid-large"
        }}</v-icon></v-chip
      >
    </div>
    
    <div v-if="idType != null">
      <selection-grid v-if="idType == 'grid'"></selection-grid>
      <selection-store v-if="idType == 'store'"></selection-store>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SelectionGrid from "./SelectionSectionComponents/SelectionGrid.vue";
import SelectionStore from "./SelectionSectionComponents/SelectionStore.vue";

export default {
  components: {
    SelectionGrid,
    SelectionStore,
  },
  computed: {
    ...mapState(["clickedGrid", "clickedStore"]),
    idType: function () {
      var result;
      if (this.clickedStore == null && this.clickedGrid == null) {
        result = null;
      } else {
        this.clickedStore == null ? (result = "grid") : (result = "store");
      }

      return result;
    },
  },
};
</script>

<style scoped>
#type-chip {
  position: absolute;
  top: 78px;
  right: 12px;
}
</style>
