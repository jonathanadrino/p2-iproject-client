<script></script>

<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" @click="toHome">EVENTLOKAL</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" @click="toHome">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toLogin" v-if="!isLogin">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toMyEvent">My Event</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toAdd">Add Event</a>
          </li>
        </ul>
        <p>{{}}</p>
        <form class="d-flex me-3">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
        <a class="text-white text-darknav-link me-2" @click="toLogout" v-if="isLogin">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
import router from "../router/index";

export default {
  methods: {
      ...mapActions(useMainStore, ["logout"]),
    toLogin: function () {
       this.$router.push("/login");
    },
    toHome: function () {
       this.$router.push("/");
    },
    toMyEvent: function () {
      if (localStorage.getItem("access_token")) {
        this.$router.push("/myevent");
      } else {
        this.$router.push("/login");
      }
    },
    toAdd: function () {
      if (localStorage.getItem("access_token")) {
        this.$router.push("/add");
      } else {
        this.$router.push("/login");
      }
    },
    toLogout: async function () {
        try {
        await this.logout();
        Swal.fire("LOGGED OUT!", '', "success");
        this.$router.push("/");
    } catch (err) {
      console.log(err);
    }
    }
  },
  computed: {
    ...mapState(useMainStore,['isLogin'])
  },
  created: function () {
    if(localStorage.getItem("access_token")) {
      this.isLogin = true    
    }
  }
}
</script>
