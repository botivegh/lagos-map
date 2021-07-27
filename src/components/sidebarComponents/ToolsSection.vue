<template>
  <div class="pa-2">
    <v-card class="pa-2">
      <div class="text-h6 font-weight-medium">
        Find Your Area of Opportunity
      </div>
      <v-switch
        class="mt-0"
        v-model="oppSwitch"
        style="position: absolute; top: 4px; right: 4px; z-index: 1"
        color="#FF5722"
      ></v-switch>

      <div class="text-body font-weight-medium">Population</div>
      <div class="sliders">
        <v-range-slider
          :disabled="!oppSwitch"
          hide-details
          v-model="sliderValues.population"
          max="10000"
          color="blue-grey"
          track-color="#E0E0E0"
          step="1"
          min="0"
        ></v-range-slider>
        <div class="d-flex justify-space-between text-caption">
          <span>0</span><span>10,000+</span>
        </div>

        <div class="text-body font-weight-medium">Urbanisation Level</div>

        <v-range-slider
          :disabled="!oppSwitch"
          hide-details
          v-model="sliderValues.urban"
          max="100"
          color="blue-grey"
          track-color="#E0E0E0"
          step="1"
          min="0"
        ></v-range-slider>
        <div class="d-flex justify-space-between text-caption">
          <span>0%</span><span>100%</span>
        </div>

        <div class="text-body font-weight-medium">Competition Level</div>
        <v-range-slider
          :disabled="!oppSwitch"
          dense
          color="blue-grey"
          class="text-caption"
          :tick-labels="levels"
          v-model="sliderValues.comp"
          min="0"
          max="4"
          track-color="#E0E0E0"
          ticks="always"
          tick-size="4"
        >
        </v-range-slider>
        <div class="text-body font-weight-medium">Wealth Level</div>
        <v-range-slider
          :disabled="!oppSwitch"
          dense
          color="blue-grey"
          class="text-caption"
          :tick-labels="levels"
          v-model="sliderValues.wealth"
          min="0"
          max="4"
          track-color="#E0E0E0"
          ticks="always"
          tick-size="4"
        >
        </v-range-slider>
      </div>
      <v-btn @click="findOpp()" :dark="oppSwitch" :disabled="!oppSwitch"  :color="oppSwitch ? 'deep-orange' : 'grey'" block>Apply</v-btn>

    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    levels: ["Very Low", "Low", "Medium", "High", "Very High"],
  }),
  computed: {
    ...mapState(["sliderValues"]),
    oppSwitch: {
      get() {
        return this.$store.state.oppSwitch;
      },
      set(newValue) {
        this.$store.commit("setOppSwitch", newValue);
      },
    },
  },
  methods:{
    ...mapMutations(['findOpp'])
  }
};
</script>

<style></style>
