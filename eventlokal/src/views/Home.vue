<template>
<center>
  <div style="color:white; background-color: black;"><h3>Events locations</h3></div>
  <div class="map-home">
    <Map></Map>
  </div>
  <div class="card-row">
    <!-- card -->
    <Card v-for="event in events" :key="event.id" :event="event" />
  </div>
</center>
</template>

<script>
import Card from "../components/Card.vue";
import Map from "../components/Map.vue";
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
export default {
  components: {
    Card,
    Map,
  },
  methods: {
    ...mapActions(useMainStore, ["fetchEvents"]),
  },
  created: async function () {
    try {
      await this.fetchEvents();
      console.log(this.fetchEvents);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapState(useMainStore, ["events"]),
  },
};
</script>

<style>
.card-row {
  margin-top: -5%;
}
</style>
