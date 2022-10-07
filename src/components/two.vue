<template>
  <div id="app">
    <!-- 
      1. 颜色 - success
      2. 限制 - success
     -->
    <treeselect v-model="value" @input="inputarr" :multiple="true" :options="options" />
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "towCom",
  // register the component
  components: { Treeselect },
  data() {
    return {
      // define the default value
      value: null,
      // define options
      options: [{
        id: 'a',
        label: 'a',
        children: [{
          id: 'aa',
          label: 'aa',
        }, {
          id: 'ab',
          label: 'ab',
        }],
      }, {
        id: 'b',
        label: 'b',
      }, {
        id: 'c',
        label: 'c',
      }],
    }

  },
  methods: {
    inputarr(n) {
      console.log(n, "look look n see see")
      // 限制多选条数
      if (n.length > 2) {
        console.log("最多可选择3条数据");
        delete n[n.length - 1];
      }
    },
  }
}
</script>
<style>
.vue-treeselect__checkbox--unchecked {
  border-color: #e0e0e0 !important;
  background: red !important;
}

.vue-treeselect__label-container:hover .vue-treeselect__checkbox--unchecked {
  border-color: #039be5 !important;
  background: red !important;
}
</style>