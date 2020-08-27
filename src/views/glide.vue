<template lang="">
    <div class="warp">
        <div class="warp-body" @mousemove="onMousemove">
            <span class="ride" 
                :style="{left:left +'px'}"
                @mousedown="onMousedown"
                @mouseup="onMouseup" 
            ></span>
        </div>
    </div>
</template>
<script>
export default {
  name: "Glide",
  data() {
    return {
      isMousedown: false,
      left: 0,
      downX: 0,
      thisX: 0
    };
  },
  mounted() {},
  methods: {
    onMousedown(e) {
      e.preventDefault();
      this.isMousedown = true;
      const { clientX } = e;
      this.thisX = clientX;
      this.leftData = e.target.offsetLeft;
    },
    onMousemove(e) {
      e.preventDefault();
      if (!this.isMousedown) return;
      const { clientX } = e;
      this.left = this.leftData + (clientX - this.thisX);
    },
    onMouseup(e) {
      e.preventDefault();
      const { clientX } = e;
      this.thisX = clientX;
      this.isMousedown = false;
    }
  }
};
</script>
<style scoped>
.warp {
  width: 100%;
  height: 300px;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.warp-body {
  position: relative;
  width: 100%;
  height: 20px;
  background: rgb(34, 26, 26);
}
.ride {
  cursor: pointer;
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(201, 22, 22);
  top: -2.5px;
  left: 0;
  text-align: center;
}
</style>