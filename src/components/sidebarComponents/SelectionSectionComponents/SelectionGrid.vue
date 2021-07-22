<template>
  <div>
    <div class="text-h5 font-weight-medium text-no-wrap text-center">
      {{ clickedGrid.properties.ward_name }}, Lagos
    </div>
    <!-- {{ clickedGrid.properties }} -->
    <div class="text-center mt-3 text-subtitle-2">Sociodemographics</div>

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
                Math.round(clickedGrid.properties.nga_general_2020)
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
                (clickedGrid.properties.nga_children_under_five_2020 /
                  clickedGrid.properties.nga_general_2020) *
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
                (clickedGrid.properties.nga_youth_15_24_2020 /
                  clickedGrid.properties.nga_general_2020) *
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
                (clickedGrid.properties.nga_elderly_60_plus_2020 /
                  clickedGrid.properties.nga_general_2020) *
                  100
              )
            }}%
          </div>
          <div>Above 60</div></v-col
        >
      </v-row>
    </v-card>
    <!--  WEALTH LEVEL CARD-->
    <v-card class="mt-4">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-account-cash</v-icon></v-col
        >
        <v-col
          cols="6"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ clickedGrid.properties.light_mean_cat }}
          </div>
          <div>Wealth Level</div></v-col
        >

        <v-col cols="3" class="ma-auto text-center"
          ><v-icon color="orange" x-large>{{
            iconMap[clickedGrid.properties.light_mean_cat]
          }}</v-icon></v-col
        >
      </v-row>
    </v-card>
    <div class="text-center mt-3 text-subtitle-2">Grocery Market</div>

    <!--  No. Stores -->
    <v-card class="mt-4">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-store</v-icon></v-col
        >
        <v-col cols="1"></v-col>

        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ clickedGrid.properties.store_id.split(", ").length }}
          </div>
          <div>No. Stores</div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">NTC</div>
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
          ><div class="text-h5 font-weight-medium">NTC</div>
          <div>Total Size</div></v-col
        >
        <v-col
          cols="4"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">NTC</div>
          <div>Avg. Size</div></v-col
        >
      </v-row>
    </v-card>
    <!--  COMPETITION CARD-->
    <v-card class="mt-4">
      <v-row no-gutters>
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon x-large>mdi-podium</v-icon></v-col
        >
        <!-- mdi-flag-checkered , mdi-dumbbell -->
        <v-col
          cols="6"
          class="pa-2 d-flex flex-column align-center justify-bottom flex-wrap"
          ><div class="text-h5 font-weight-medium">
            {{ clickedGrid.properties.competition_level_cat }}
          </div>
          <div>Competition</div></v-col
        >
        <v-col cols="3" class="ma-auto text-center"
          ><v-icon color="orange" x-large>{{
            iconMap[clickedGrid.properties.competition_level_cat]
          }}</v-icon></v-col
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
      nan: "mdi-network-strength-off-outline",
      "Very Low": "mdi-network-strength-outline",
      Low: "mdi-network-strength-1",
      Medium: "mdi-network-strength-2",
      High: "mdi-network-strength-3",
      "Very High": "mdi-network-strength-4",
    },
  }),

  computed: {
    ...mapState(["clickedGrid", "clickedStore"]),
  },
};
</script>

<style scoped></style>
