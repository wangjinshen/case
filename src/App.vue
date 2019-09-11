<template>
  <div id="app">
    <div class="warp">
      <About></About>
    </div>
  </div>
</template>
<script>
import About from "./views/About";
export default {
  components: {
    About
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.warp{
  width: 1000px;
  margin:  0  auto;
}
</style>
