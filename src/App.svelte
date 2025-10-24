<script lang="ts">
  import Scene from "./lib/Scene.svelte";
</script>

<div id="app">
  <Scene mode="summer"></Scene>
</div>

<style lang="scss">
  #app {
    position: fixed;
    width: 100%;
    height: 100%;
    aspect-ratio: 3/1;
    background-color: grey;
  }
</style>
