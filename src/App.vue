<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <UrlForm :host-url="host"/>
  </div>
</template>

<script>
import UrlForm from './components/UrlForm.vue'

export default {
  name: 'App',
  components: {
    UrlForm
  },
  data: () => ({
    host: 'http://short.url/'
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
