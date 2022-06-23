<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

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
                  <label class="form-label" for="typePasswordX">Password</label>
                  <input
                    type="password"
                    id="typePasswordX"
                    class="form-control form-control-lg"
                    v-model="password"
                  />
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p>

                <button
                  class="btn btn-outline-light btn-lg px-5"
                  @click="login"
                >
                  Login
                </button>
                <button
                  class="btn btn-outline-light btn-lg px-5"
                  @click="toRegister"
                >
                  Register
                </button>
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
    };
  },
  methods: {
    ...mapActions(useMainStore, { loginAction: "login" }),
    login: async function (email, password) {
      try {
        await this.loginAction(this.email, this.password);
        Swal.fire("LOGGED IN!", '', "success");
        this.$router.push("/");
      } catch (err) {
        Swal.fire("ERROR!", `${err.message}`, "error");
      }
    },
    toRegister: function () {
      this.$router.push("/register");
    },
  },
};
</script>
