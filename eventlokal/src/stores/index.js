import { defineStore } from "pinia";
import axios from "axios";
export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    events: [],
    myEvents: [],
    isLogin: false,
    page: 'home'
  }),
  getters: {},
  actions: {
    register: async function (email, password, name, phoneNumber) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: "https://eventlokal.herokuapp.com/register",
            method: "POST",
            data: {
              email,
              password,
              name,
              phoneNumber,
            },
          });

          console.log(response);
        
          resolve();
        } catch (err) {
          reject(err);
          console.log(err);
        }
      });
    },
    addEvent: async function (
      name,
      type,
      description,
      location,
      time,
      date,
      imgUrl
    ) {
      return new Promise(async (resolve, reject) => {
        try {
          const access_token = localStorage.getItem("access_token");
          const response = await axios({
            url: "https://eventlokal.herokuapp.com/event",
            method: "POST",
            headers: {
              access_token,
            },
            data: {
              name,
              type,
              description,
              location,
              time,
              date,
              imgUrl,
            },
          });
          console.log(response);
          Swal.fire("REGISTERED!", "You clicked the button!", "success");
          resolve();
        } catch (err) {
          reject(err);
          console.log(err);
        }
      });
    },
    login: async function (email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: "https://eventlokal.herokuapp.com/login",
            method: "POST",
            data: {
              email,
              password,
            },
          });
          const { access_token } = response.data.data;
          localStorage.setItem("access_token", access_token);
          console.log(response);
          this.isLogin = true;
          resolve();
        } catch (err) {
          reject(err.response.data);
        }
      });
    },
    logout: async function () {
      return new Promise(async (resolve, reject) => {
        try {
          localStorage.clear();
          this.isLogin = false;
          resolve();
        } catch (err) {
          reject(err.response.data);
        }
      });
    },
    add: async function (id) {
      return new Promise(async (resolve, reject) => {
        try {
          const access_token = localStorage.getItem("access_token");
          const result = await axios({
            url: `https://eventlokal.herokuapp.com/myevent/${id}`,
            method: "POST",
            headers: {
              access_token,
            },
          });
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    },
    fetchEvents: async function () {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios({
            url: "https://eventlokal.herokuapp.com/event",
            method: "GET",
          });
          this.events = result.data.data;
          resolve();
          console.log(this.events);
        } catch (err) {
          reject(err.response.data);
        }
      });
    },
    fetchMyEvents: async function () {
      return new Promise(async (resolve, reject) => {
        try {
          const access_token = localStorage.getItem("access_token");
          const result = await axios({
            url: "https://eventlokal.herokuapp.com/myevent",
            method: "GET",
            headers: {
              access_token,
            },
          });
          this.myEvents = result.data.data;
          resolve();
          console.log(this.myEvents);
        } catch (err) {
          reject(err.response.data);
        }
      });
    },
    setIsLogin: function (status = false) {
      this.isLogin = status;
    },
  },
});
