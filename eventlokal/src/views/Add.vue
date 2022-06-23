<template>
  <div class="container-fluid px-1 mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <div class="card">
          <h5 class="text-center mb-3">ADD EVENT</h5>
          <form class="form-card" @submit.prevent="add">
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Name<span class="text-danger"> *</span></label
                >
                <input
                  v-model="name"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder=""
                />
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Type<span class="text-danger"> *</span></label
                >
                <input
                  v-model="type"
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Location<span class="text-danger"> *</span></label
                >
                <input
                  type="text"
                  v-model="location"
                  id="email"
                  name="email"
                  placeholder=""
                />
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Date<span class="text-danger"> *</span></label
                >
                <input
                  type="date"
                  v-model="date"
                  id="mob"
                  name="mob"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Time<span class="text-danger"> *</span></label
                >
                <input
                  type="time"
                  id="job"
                  name="job"
                  placeholder=""
                  v-model="time"
                />
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Poster URL<span class="text-danger"> *</span></label
                >
                <input
                  type="text"
                  v-model="imgUrl"
                  id="job"
                  name="job"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-12 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Description<span class="text-danger"> *</span></label
                >
                <input
                  type="textarea"
                  v-model="description"
                  id="ans"
                  name="ans"
                  placeholder=""
                />
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="form-group col-sm-6">
                <button type="submit" class="btn-block btn-primary">
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  data() {
    return {
      name: "",
      type: "",
      description: "",
      location: "",
      time: "",
      date: "",
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, { addAction: "addEvent" }),
    add: async function () {
      try {
        await this.addAction(
          this.name,
          this.type,
          this.description,
          this.location,
          this.time,
          this.date,
          this.imgUrl
        );
        Swal.fire("EVENT ADDED!", "", "success");
        this.$router.push("/");
      } catch (err) {
        Swal.fire("ERROR!", `${err.response.data.message}`, "error");
      }
    },
  },
};
</script>
<style>
body {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.card {
  padding: 30px 40px;
  margin-top: 60px;
  margin-bottom: 60px;
  border: none !important;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
}
.blue-text {
  color: #00bcd4;
}
.form-control-label {
  margin-bottom: 0;
}
input,
textarea,
button {
  padding: 8px 15px;
  border-radius: 5px !important;
  margin: 5px 0px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 18px !important;
  font-weight: 300;
}
input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #00bcd4;
  outline-width: 0;
  font-weight: 400;
}
.btn-block {
  text-transform: uppercase;
  font-size: 15px !important;
  font-weight: 400;
  height: 43px;
  cursor: pointer;
}
.btn-block:hover {
  color: #fff !important;
}
button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}
</style>
