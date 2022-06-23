<template>
<center>
    <Card v-for="event in myEvents" :key="event.id" :event="event" />
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
    ...mapActions(useMainStore, ["fetchMyEvents"]),
  },
  created: async function () {
    try {
        await this.fetchMyEvents();
        console.log(this.fetchMyEvents);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapState(useMainStore, ["myEvents"]),
  },
};
</script>

<style>
.card-row {
  padding-top: 3%;
}
</style>
