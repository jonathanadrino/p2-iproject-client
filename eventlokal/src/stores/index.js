import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index";
export const useMainStore = defineStore({
  id: "main",
  state: () => ({}),
  getters: {},
  actions: {
    register: async function (email, password, name, phoneNumber) {
      try {
        const response = await axios({
          url: "http://localhost:3000/register",
          method: "POST",
          data: {
            email,
            password,
            name,
            phoneNumber,
          },
        });

        console.log(response);
        Swal.fire("REGISTERED!", "You clicked the button!", "success");
        router.push("/login");
      } catch (err) {
        console.log(err);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
    login: async function (email, password) {
      try {
        const response = await axios({
          url: "http://localhost:3000/login",
          method: "POST",
          data: {
            email,
            password,
          },
        });
        const {access_token} = response.data.data
        localStorage.setItem("access_token",access_token)
        console.log(response);
        Swal.fire("LOGGED IN!", "You clicked the button!", "success");
        router.push("/");
      } catch (err) {
        console.log(err);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
});
