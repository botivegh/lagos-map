<template>
  <div style="height: 100%" class="d-flex justify-content">
    <v-card width="70"> <SideMenu /> </v-card>
    <Sidebar v-if="sideMenuOpen != null" />
    <v-card width="calc(100% - 70px)" style="position: relative">
      <Map />

        <Legend />
     
    </v-card>
  </div>
</template>

<script>
import Map from "../components/Map";
import SideMenu from "../components/SideMenu";
import Sidebar from "../components/Sidebar";
import Legend from "../components/Legend";

import { mapState } from "vuex";

export default {
  name: "Home",

  components: {
    Map,
    SideMenu,
    Sidebar,
    Legend,
  },
  computed: {
    ...mapState(["sideMenuOpen"]),
  },
};
</script>
