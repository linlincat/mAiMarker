<template>
  <div class="m-box">
    <!-- ::-webkit-scrollbar — 整个滚动条
::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头)
::-webkit-scrollbar-thumb — 滚动条上的滚动滑块
::-webkit-scrollbar-track — 滚动条轨道
::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分
::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分
::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮) -->
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
    <p>你是一个小可爱</p>
  </div>
</template>

<script>
export default {
  name: "sevenCom",
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style  lang="less">
.m-box {
  width: 150px;
  height: 400px;
  background-color: rgb(164, 255, 196);
  overflow-y: auto;
  overflow-x: auto;

  p {
    color: #fff;
    width: 400px;
  }
}
/* 整个滚动条 */
::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 10px;
    /* 对应横向滚动条的宽度 */
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}
// /* 整个滚动条 */
// ::-webkit-scrollbar {
//     width: 50px;
// }

// /* 滚动条上的滚动滑块 */
// ::-webkit-scrollbar-thumb {
//     background-color: orange;
// }

// /* 滚动条轨道 */
// ::-webkit-scrollbar-track {
//     background-color: hotpink;
// }

// /* 滚动条没有滑块的轨道部分 */
// ::-webkit-scrollbar-track-piece {
//     background-color: purple;
// }
// /* 整个滚动条 */
// ::-webkit-scrollbar {
//     width: 50px;
//     background-color: skyblue;
// }
// /* 滚动条上的箭头按钮 */
// ::-webkit-scrollbar-button {
//     background-color: slateblue;
// }
// /* 滚动条上的滚动滑块 */
// ::-webkit-scrollbar-thumb {
//     background-color: orange;
// }
// /* 滚动条轨道 */
// ::-webkit-scrollbar-track {
//     background-color: hotpink;
// }
</style>