<template>
  <div id="app">
    <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
      :props="defaultProps">
    </el-tree>

    <div class="buttons">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "threeCom",
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }

  },
  methods: {
    // 返回当前节点的 节点的对象, 节点对象的规律，子节点全部被选中对应的父节点中有children，
    // 如果子节点没有全部选中则没有children字段
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    // 返回当前节点key的 node-key="id" 以id显示的数组
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  },
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