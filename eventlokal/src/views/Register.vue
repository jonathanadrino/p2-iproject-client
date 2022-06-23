<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                <p class="text-white-50 mb-3">Please input your data!</p>
                <form @submit.prevent="register">
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX">Email</label>
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="email"
                    />
                  </div>
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX">Name</label>
                    <input
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="name"
                    />
                  </div>
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX"
                      >Phone Number</label
                    >
                    <input
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="phoneNumber"
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      v-model="password"
                    />
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  data() {
    return {
      email: "",
      password: "",
      phoneNumber: "",
      name: "",
    };
  },
  methods: {
    ...mapActions(useMainStore, { registerAction: "register" }),
    register: async function () {
      try {
        await this.registerAction(
          this.email,
          this.password,
          this.phoneNumber,
          this.name
        );
        Swal.fire("REGISTERED!", "", "success");
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
        Swal.fire("ERROR!", `${err.response.data.message}`, "error");
      }
    },
  },
};
</script>
