<template>
  <div id="sidebar" class="elevation-2">
    <v-container class="pa-0" style="position: relative; height: 100%;" >
      <v-btn
        elevation="2"
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
      <v-card color="blue-grey darken-3" class="d-flex text-h5" height="70" tile>
        <div class="ma-auto white--text">Lagos</div>
      </v-card>
      <div class="text-h6 my-2 px-3">
        <v-icon>{{ icons[sideMenuOpen] }}</v-icon> {{ sideMenuOpen }}
      </div>

      <LayersSection v-if="sideMenuOpen == 'Layers'" />
      <SelectionSection v-if="sideMenuOpen == 'Selection'" />
      <OverviewSection v-if="sideMenuOpen == 'Overview'" />
      <ToolsSection v-if="sideMenuOpen == 'Tools'" />


    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LayersSection from "./sidebarComponents/LayersSection.vue";
import SelectionSection from "./sidebarComponents/SelectionSection.vue";
import OverviewSection from "./sidebarComponents/OverviewSection.vue";
import ToolsSection from "./sidebarComponents/ToolsSection.vue";




export default {
  components: {
    LayersSection,
    SelectionSection,
    OverviewSection,
    ToolsSection
  },
  data: () => ({
    icons: {
      Overview :  "mdi-chart-box-outline",
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
  background-color: #fcfcfc;
}
#close-btn {
  position: absolute;
  top: 10px;
  right: -25px;
}
</style>
