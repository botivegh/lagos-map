<template>
  <div class="pa-3">
    <div>
      <v-chip id="type-chip" v-if="idType != null" outlined color="red" label>
        {{ idType }}<v-icon medium right>{{idType=='store'?'mdi-map-marker' : 'mdi-grid-large'}}</v-icon></v-chip
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
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
