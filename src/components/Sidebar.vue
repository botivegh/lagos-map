<template>
  <div id="sidebar">
    <v-container class="pa-0" style="position: relative">
      <v-btn
        elevation="0"
        tile
        min-width="25"
        class="pa-0"
        width="10"
        height="60"
        color="white"
        id="close-btn"
        @click="sidebarToggle()"
      >
        <v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-card color="purple" class="d-flex text-h5" height="70" tile>
        <div class="ma-auto white--text">Lagos</div>
      </v-card>
      <div class="text-h6 my-2 px-3">
        <v-icon>{{ icons[sideMenuOpen] }}</v-icon> {{ sideMenuOpen }}
      </div>

      <layersSection v-if="sideMenuOpen == 'Layers'" />
      <SelectionSection v-if="sideMenuOpen == 'Selection'" />

    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import layersSection from "./sidebarComponents/LayersSection.vue";
import SelectionSection from "./sidebarComponents/SelectionSection.vue";


export default {
  components: {
    layersSection,
    SelectionSection
  },
  data: () => ({
    icons: {
      Search: "mdi-magnify",
      Layers: "mdi-layers",
      Tools: "mdi-tools",
      Selection: "mdi-cursor-default-click",
    },
  }),
  methods: {
    ...mapMutations(["sidebarToggle"]),
  },
  computed: {
    ...mapState(["sideMenuOpen"]),
  },
};
</script>

<style scoped>
#sidebar {
  position: absolute;
  z-index: 1000;
  left: 70px;
  height: 100%;
  width: 375px;
  background-color: #f5f5f5;
}
#close-btn {
  position: absolute;
  top: 10px;
  right: -25px;
}
</style>
