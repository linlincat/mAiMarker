<template>
  <div class="parent">
    ddd
    <div v-handsister="config">dddd</div>
  </div>
</template>

<script>
export default {
  name: "sixCom",
  // register the component
  // components: { Treeselect },
  data() {
    return {
      config: {
        x: '10%',
        y: '10%',
        width: '20%',
        height: '20%'
      }
    }
  },
  methods: {

  }
}
</script>
<style  lang="less">

</style>