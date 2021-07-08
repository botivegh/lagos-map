<template>
  <div class="ma-0 pa-0" style="height: 100%; width: 100%">
    <v-btn @click="test()"> TEST</v-btn>
    <MglMap
      @load="onMapLoad"
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :attributionControl="false"
    >
      <MglNavigationControl position="top-right" />
      <MglFullscreenControl position="top-right" />
      <MglScaleControl position="bottom-right" />

      <!--  TEST MARKER -->
      <MglMarker :coordinates="coordinates" @mouseenter="test()">
        <MglPopup :showed="true">
          <v-card>
            <div>Hello, I'm popup!</div>
          </v-card>
        </MglPopup>
      </MglMarker>
      <!-- GEOJSON -->
      <MglGeojsonLayer
        @click="test()"
        sourceId="lagos-grid"
        :source="lagosLayerSource"
        layerId="testLayer"
        :layer="lagosLayer"
 
      />
    </MglMap>
  </div>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css";
import "v-mapbox/dist/v-mapbox.css";
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglNavigationControl,
  MglPopup,
  MglFullscreenControl,
  MglScaleControl,
  MglMarker,
  MglGeojsonLayer,
} from "v-mapbox";

export default {
  name: "HomeMap",
  components: {
    MglMap,
    //Controlls
    MglNavigationControl,
    MglFullscreenControl,
    MglScaleControl,
    /// Spatial Objects
    MglPopup,
    MglMarker,
    MglGeojsonLayer,
  },

  data: () => ({
    coordinates: [3.3543, 6.5257],
    popShow: null,
    accessToken:
      "pk.eyJ1IjoiYm90aXZlZ2gxMSIsImEiOiJjazdydGI1NXAwYTJ4M25zZnNuanhoOGVtIn0.ehZ8tfymMjbNyAPJ2o2lhQ",
    mapStyle: "mapbox://styles/botivegh11/ckkedidqu15wn17my7dcdc34d",

    lagosLayerSource: {
      type: "geojson",
      // Use a URL for the value for the `data` property.
      data: "http://localhost:8080/lagos_grid.geojson",
    },
    lagosLayer: {
      id: "lagos-grid-layer",
      type: "fill",
      source: "lagos-grid",
      paint: {
        "fill-color": "#0080ff", // blue color fill
        "fill-opacity": 0.5,
      },
    },
  }),

  methods: {
    /// MAP Load event
    async onMapLoad(event) {
      this.map = event.map;
      const asyncActions = event.component.actions;
      /// see more on https://soal.github.io/vue-mapbox/api/#actions
      await asyncActions.flyTo({
        center: this.coordinates,
        zoom: 8,
        speed: 5,
      });
      this.map.on("click", "testLayer", function (e) {
        console.log(e);
      });
    },
    lagosLayerClick() {
      console.log(this.lagosLayer.paint);
    },
    test() {
      console.log("test");
    },
  },

  created() {
    this.map = null;
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
};
</script>
