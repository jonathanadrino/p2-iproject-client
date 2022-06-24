<template>
  <div id="mapid"></div>
</template>

<script>
import VueGeolocation from "vue-browser-geolocation";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
    };
  },
  methods: {
    getposition: function(lat,lng) {
        this.latitude = lat
        this.latitude = lng
    }
  },
  mounted: async function () {
    try {
      await VueGeolocation.getLocation({}).then((coordinates) => {
        // console.log(coordinates);
        let addmap = leaflet
          .map("mapid")
          .setView([coordinates.lat, coordinates.lng], 13);
        leaflet
          .tileLayer(
            "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=HgdBfKWwK1kyyRLgFKDH",
            {
              attribution:
                '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }
          )
          .addTo(addmap);

        const position = leaflet
          .marker([coordinates.lat, coordinates.lng])
          .addTo(addmap);

        position
          .bindPopup(
            `Your location
        ${coordinates.lat} ${coordinates.lng}`
          )
          .openPopup();

        addmap.on("dblclick", function (e) {
          // addmap.removeLayer(marker)
          leaflet.marker(e.latlng).addTo(addmap).bindPopup(
            `Pinned location
        ${coordinates.lat} ${coordinates.lng}`
          )
          // console.log(e.latlng.lat, e.latlng.lng);
             Swal.fire("Pinned", `${e.latlng.lat} , ${e.latlng.lng}`, "success");

          this.latitude = e.latlng.lat
          this.latitude = e.latlng.lng

          console.log(e);

          console.log(this.latitude,this.longitude);
          console.log(this.longitude);
        });

        
          console.log(this.latitude);
          console.log(this.longitude);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
#mapid {
  position: absolute;
  top: 65px;
  bottom: 0;
  left: auto;
  right: auto;
  width: 100%;
  height: 200px;
}
</style>
