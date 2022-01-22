<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from "./components/Layout";
export default {
  name: 'App',
  components: {
    Layout
  },
  created(){
    document.title = '云仓礼品';
  }
}
</script>

<style>
@import "./assets/reset.css";
</style>
