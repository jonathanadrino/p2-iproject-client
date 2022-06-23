<template>
  <center>
    <Card v-for="event in events" :key="event.id" :event="event" />
  </center>
</template>

<script>
import Card from "../components/Card.vue";
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";

export default {
  components: {
    Card,
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
  padding-top: 3%;
}
</style>
