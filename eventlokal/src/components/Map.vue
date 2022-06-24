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
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };
  },
  // props: ["event"],
  mounted: async function () {
    try {
      await VueGeolocation.getLocation({}).then((coordinates) => {
        console.log(coordinates);
        let mymap = leaflet
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
          .addTo(mymap);

        const position = leaflet
          .marker([coordinates.lat, coordinates.lng])
          .addTo(mymap);

        position
          .bindPopup(
            `Your location
        ${coordinates.lat} ${coordinates.lng}`
          )
          .openPopup();

        // for (var i = 0; i < this.events.length; i++) {
        //   console.log(this.events[i]);
        //   // marker = new L.marker([this.events[i].latitude, this.events[i].longitude])
        //   //   .bindPopup(this.events[i].latitude[i].name)
        //   //   .addTo(mymap);
        // }
        for (const e of this.events) {
          leaflet
            .marker([e.latitude, e.longitude])
            .bindPopup(`${e.name} , ${e.location}`)
            .addTo(mymap);
        }

        mymap.on('click', function(e) {
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});

        console.log(this.events[0].latitude, this.events[0].longitude);
      });
    } catch (err) {
      console.log(err);
      Swal.fire("Please allow location", "", "error");
    }
  },
  computed: {
    ...mapState(useMainStore, ["events"]),
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
