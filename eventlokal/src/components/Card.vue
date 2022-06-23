<template>
  <div class="card mb-3 mt-7 " style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="event.imgUrl" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ event.name }}</h5>
          <small class="text-muted">{{ event.type }}</small>
          <p class="card-text">
            {{ event.description }}
          </p>
          <p class="card-text">
            <small class="text-muted">{{ event.author }}</small>
          </p>
          <small class="text-white bg-dark">{{ event.location }}</small>
        </div>
        <div>
          <button
            type="button"
            class="btn-dark btn-secondary btn-sm mb-3"
            @click="addEvent(event.id)"
          >
            Follow
          </button>
          <button
          v-if="page !== 'home'"
            type="button"
            class="btn-dark btn-secondary btn-sm mb-3"
            @click="addEvent(event.id)"
          >
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
export default {
  data() {
    return {
      id: "",
      isLogin: false
    };
  },
  props: ["event"],
  methods: {
    ...mapActions(useMainStore, ["add"]),
    addEvent: async function (id) {
      if (localStorage.getItem("access_token")) {
        try {
          await this.add(id);
          Swal.fire("EVENT ADDED!", "", "success");
          this.$router.push("/myevent");
        } catch (err) {
          console.log(err);
          Swal.fire("ERROR!", `${err.response.data.message}`, "error");
        }
      } else {
        this.$router.push("/login");
      }
    },
  },
   computed: {
    ...mapState(useMainStore,['page'])
  },
};
</script>
