<template>
  <div>
    <v-btn-toggle
      class="d-flex flex-column"
      v-model="sideMenuOpen"
      tile
      color="deep-orange darken-2"
      group
      
    >
      <v-btn
        class="flexcol"
        :value="b.name"
        icon
        height="62"
        width="62"
        v-for="b in buttons"
        :key="b.name"
      >
        <v-icon dark> {{ b.icon }} </v-icon>
        <span class="text-caption">{{ b.name }}</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
//import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedButton: "center",
      buttons: [
        { name: "Overview", icon: "mdi-chart-box-outline" },
        { name: "Layers", icon: "mdi-layers" },
        { name: "Tools", icon: "mdi-tools" },
        { name: "Selection", icon: "mdi-cursor-default-click" },
      ],
    };
  },
  computed: {
     
    sideMenuOpen: {
    get () {
      return this.$store.state.sideMenuOpen
    },
    set (newValue) {
      return this.$store.commit('setSideMenuOpen', newValue)
    }
  }
  },
};
</script>

<style>
.flexcol .v-btn__content {
  flex-direction: column;
  text-transform: none;
}
</style>
