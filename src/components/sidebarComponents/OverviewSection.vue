<template>
  <div class="pa-2"  style="overflow-y: auto; height: calc(100% - 115px)">
    <div class="text-h5 font-weight-medium text-no-wrap text-center">
      Lagos Statistics
    </div>
    <!-- {{ clickedGrid.properties }} -->
    <div class="text-center my-2 text-body font-weight-medium">
      Urbanisation Level
    </div>

    <v-progress-linear
      class="my-progress"
      dark
      color="deep-orange"
      :value="overview.uban_level * 100"
      height="25"
    >
      <v-icon small dark>mdi-tree-outline</v-icon>
      <strong>{{ Math.round(overview.uban_level * 100) }}%</strong>
      <v-icon small dark>mdi-city-variant-outline</v-icon>

    </v-progress-linear>

    <div class="text-center my-2 text-body font-weight-medium">
      Sociodemographics
    </div>

    <!--  POPULATION CARD -->
    <v-card>
      <v-row no-gutters>
        <v-col cols="3" class="d-flex align-center justify-center pa-2">
          <v-icon x-large> mdi-human-male-boy </v-icon></v-col
        >
        <v-col
          cols="6"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
        >
          <div class="text-h4 font-weight-medium">
            {{
              new Intl.NumberFormat({ maximumSignificantDigits: 0 }).format(
                Math.round(overview.nga_general_2020)
              )
            }}
          </div>
          <div>Population</div>
        </v-col>
        <v-col class="pa-2" cols="3"></v-col>
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{
              Math.round(
                (overview.nga_children_under_five_2020 /
                  overview.nga_general_2020) *
                  100
              )
            }}%
          </div>
          <div>Under 5</div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{
              Math.round(
                (overview.nga_youth_15_24_2020 / overview.nga_general_2020) *
                  100
              )
            }}%
          </div>
          <div>15-24</div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{
              Math.round(
                (overview.nga_elderly_60_plus_2020 /
                  overview.nga_general_2020) *
                  100
              )
            }}%
          </div>
          <div>Above 60</div></v-col
        >
      </v-row>
    </v-card>

    <!--  URBAN CARD-->
    <!-- <v-card class="mt-4">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-office-building</v-icon></v-col
        >
        <v-col
          cols="6"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ urbanLevel }}%
          </div>
          <div>Urbanisation Level</div></v-col
        >

        <v-col cols="3" class="ma-auto text-center"
          ><v-icon
            :color="iconMap[clickedGrid.properties.light_mean_cat][1]"
            x-large
            >{{ iconMap[clickedGrid.properties.light_mean_cat][0] }}</v-icon
          ></v-col
        >
      </v-row>
    </v-card> -->

    <!--  GRCOERY SECTION -->
    <div class="text-center my-2 text-body font-weight-medium">
      Grocery Market
    </div>

    <!--  No. Stores -->
    <v-card class="">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-store</v-icon></v-col
        >
        <v-col cols="1"></v-col>

        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ overview.no_stores }}
          </div>
          <div>No. Stores</div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ overview.no_chains }}
          </div>
          <div>No. Chains</div></v-col
        >
      </v-row>
    </v-card>
    <!--  Floorspace -->
    <v-card class="mt-4">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-floor-plan</v-icon></v-col
        >
        <v-col cols="1"></v-col>

        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{
              new Intl.NumberFormat({ maximumSignificantDigits: 0 }).format(
                overview.total_floorspace
              )
            }}
          </div>
          <div>Total Size <span class="text-caption">(m²)</span></div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{
              new Intl.NumberFormat({ maximumSignificantDigits: 0 }).format(
                Math.round(overview.avg_floorspace)
              )
            }}
          </div>
          <div>Avg. Size <span class="text-caption">(m²)</span></div></v-col
        >
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    iconMap: {
      nan: ["mdi-network-strength-off-outline", "grey"],
      "Very Low": ["mdi-network-strength-outline", "#B33030"],
      Low: ["mdi-network-strength-1", "#F27049"],
      Medium: ["mdi-network-strength-2", "#FFD061"],
      High: ["mdi-network-strength-3", "#B1C97F"],
      "Very High": ["mdi-network-strength-4", "#4C8F62"],
    },
  }),

  computed: {
    ...mapState(["overview"]),
  },
};
</script>

<style>
.my-progress .v-progress-linear__content {
  justify-content: space-between;
  padding: 0 4px;
}
</style>
