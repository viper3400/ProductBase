<template>
  <div id="app">
    <router-view v-on:propagate-event="openSnackbar" :key="$route.fullPath"/>
    <mu-snackbar :color="this.snackbar.color" position="bottom-start" :open.sync="this.snackbar.open">{{snackbar.message}}</mu-snackbar>
  </div>
</template>

<script>
// https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
export default {
  name: 'App',
  data () {
    return {
      snackbar: {
        open: false,
        timeout: 3000,
        message: null,
        color: null
      }
    }
  },
  methods: {
    openSnackbar: function (type, msg) {
      if (this.snackbar.timer) clearTimeout(this.snackbar.timer)
      this.snackbar.color = type
      this.snackbar.message = msg
      this.snackbar.open = true
      this.snackbar.timer = setTimeout(() => {
        this.snackbar.open = false
      }, this.snackbar.timeout)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.overlay {
  position: relative;
}
.page-wrap {
  margin-top: 10%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  -moz-box-shadow: 0 0 20px black;
  -webkit-box-shadow: 0 0 20px black;
  box-shadow: 0 0 20px black;
  color: black;
}
</style>
