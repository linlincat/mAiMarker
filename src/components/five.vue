<template>
  <!-- "node-sass": "^4.14.1",
    "sass-loader": "^7.3.1", -->
  <!-- :cell-style="tableRowStyle" :row-style="{fontSize: '12px'}"  -->
  <el-table :data="tableData" style="width: 100%" id="go" >
    <el-table-column prop="date" label="日期" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div class="wrapBox">
          <el-button v-if="currentId != scope.row.id" class="wrapOne" v-on:mouseenter.native="handleEnter(scope.row)"
            type="text" size="small">查看</el-button>
          <div v-if="currentId == scope.row.id" class="wrapTwo" v-on:mouseleave="handleLeave">
            <p style="height: 32px; width: 100px; background: red; cursor: pointer;">我一版本</p>
            <ul>
              <!-- <li v-for="(item, index) in scope.row.arrs" :key="index" style="cursor:pointer;">{{item.name}}</li> -->
              <li style="cursor:pointer;" @click="goHandle1(scope.row)">{{scope.row.arrs[0].name}}</li>
              <li style="cursor:pointer;" @click="goHandle2(scope.row)">{{scope.row.arrs[1].name}}</li>
              <li style="cursor:pointer;" @click="goHandle3(scope.row)">{{scope.row.arrs[2].name}}</li>
            </ul>
          </div>
          <!-- <el-dropdown v-if="currentId == scope.row.id" class="wrapTwo" trigger="click"
            v-on:mouseleave.native="handleLeave">
            <span class="el-dropdown-link">下拉菜单</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in scope.row.arrs" :key="index">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "fiveCom",
  // register the component
  // components: { Treeselect },
  data() {
    return {
      currentId: null,
      showIndex: 3,
      tableData: [
        {
          id: 1122,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          arrs: [
            {
              name: '一虎'
            },
            {
              name: '二虎'
            },
            {
              name: '三虎'
            }]
        },
        {
          id: 2233,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          arrs: [
            {
              name: '1虎'
            },
            {
              name: '2虎'
            },
            {
              name: '3虎'
            }
          ]
        }
      ]
    }
  },
  methods: {
    goHandle1(row) {
      console.log(row + "1")
      this.currentId = null;
    },
    goHandle2(row) {
      console.log(row + "2")
      this.currentId = null;
    },
    goHandle3(row) {
      console.log(row + "3")
      this.currentId = null;
    },
    // 移入
    handleEnter(row) {
      // console.log(row)
      this.currentId = row.id;
    },
    // 移出
    handleLeave() {
      // console.log("wo yi chu")
      this.currentId = null;
    }
  }
}
</script>
<style  lang="less">
  .el-table__body-wrapper,
.el-table {
overflow: visible !important;
}
/* .wrapBox {}

.wrapBox .wrapOne {} */

.wrapBox .wrapTwo {
  position: relative;
}
.wrapBox .wrapTwo ul {
  position: absolute;
  top: 30px;
  left: 0;
  width: 100px;
  background-color: yellow;
  z-index: 9999;
  border: 1px solid blueviolet;
}
</style>