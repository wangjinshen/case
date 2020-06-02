<template>
  <div id="app">
    <div class="warp">
      <Case @caseData="oncaseData"></Case>
    </div>
  </div>
</template>
<script>
import Case from "./views/case";
export default {
  components: {
    Case
  },
  methods: {
    oncaseData (data) {
      console.log(data);
    }
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
