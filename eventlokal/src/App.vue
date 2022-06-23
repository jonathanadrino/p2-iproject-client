<script>
import { mapActions } from "pinia"
import { useMainStore } from "./stores"
import Navbar from "./components/Navbar.vue"
export default {
  components: {
    Navbar
  },
  created: function() {
    if(localStorage.getItem("access_token")) {
      this.setIsLogin(true)
    }
  },
  methods: {
    ...mapActions(useMainStore,['setIsLogin'])
  }
}
</script>

<template>
<Navbar/>
  <RouterView />
</template>

<style>
body {
   background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  background-size: cover;
  background-image: url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80');
}
</style>