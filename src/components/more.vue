<template>
  <div>
    <el-row :gutter="3">
      <el-col :span="2">
        <div style="width: 100%;height: 300px;"></div>
        <div class="jungle_button">
          <el-button type="primary" @click='before'
            :disabled="pageData.currentPage === 0 || testForm.sign.length === 1">上一张</el-button> <br />
        </div>
        <div class="jungle_button">
          <el-button type="primary" @click='turnNext'
            :disabled="pageData.currentPage === (testForm.sign.length - 1) || testForm.sign.length === 1">下一张
          </el-button> <br />
        </div>
        <div class="jungle_button">
          <el-button type="danger" @click="clearAll">清空</el-button> <br />
        </div>
        <div class="jungle_button">
          <el-button type="warning" @click="handleHiddenData">{{isHidden ? '显示' : '隐藏'}}</el-button>
        </div>
        <div class="jungle_button" v-show="pageData.currentPage === (testForm.sign.length - 1)">
          <el-button type="success" @click="submitForm">完成</el-button>
        </div>
      </el-col>
      <ui-marker ref="aiPanel-editor" class="ai-observer" v-bind:uniqueKey="'dsadsahdjklsaj'" :ratio="4/3"
                    @vmarker:selectOne="selectOne" @vmarker:onUpdated="onUpdated" @vmarker:onDrawOne="onDrawOne"
                    @vmarker:onReady="onReady" @vmarker:onImageLoad="onImageLoad" v-bind:readOnly="readOnly"
                    :imgUrl="currentInfo.currentBaseImage">
                  </ui-marker>
      <!-- <el-col :span="16">
        <el-form id="el-form" ref="testForm" label-position="left" label-width="30px">
          <el-row style="width: 100%; height: 90%">
            <el-form-item>
              <h3 class="image_title"> 标注图片 （{{testForm.sign[this.pageData.currentPage].name}}）</h3>
              <div ref="imageWrapper" class="signBox">
                <div class="sign-main">
                  <ui-marker ref="aiPanel-editor" class="ai-observer" v-bind:uniqueKey="'dsadsahdjklsaj'" :ratio="4/3"
                    @vmarker:selectOne="selectOne" @vmarker:onUpdated="onUpdated" @vmarker:onDrawOne="onDrawOne"
                    @vmarker:onReady="onReady" @vmarker:onImageLoad="onImageLoad" v-bind:readOnly="readOnly"
                    :imgUrl="currentInfo.currentBaseImage">
                  </ui-marker>
                </div>
              </div>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col> -->
      <el-col :span="4">
        <div style="width: 100%;height: 300px;"></div>
        <div id="headBtnOuter">
          <div v-for="(item,index) in label" class="headBtn" :class="[index === selected.index ? 'current' : '']"
            :code="item.value" :name="item.name" minbdlength="0" limitbdnum="1" :key="index" currentcolor="#FF0000"
            style="border-left: 5px solid #2c62a3;border-color:#2c62a3" @click="handleTabClick(index, $event)">
            {{item.name}}
            <!--<i class="el-icon-delete" @click="handleDeleteTab(index)"></i>-->
          </div>
        </div>
        <!--<div class="add_tab">
        <el-button @click="handleAddTab"> 新增标签 </el-button>
      </div>-->
        <el-dialog title="新增标签" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
          <el-form ref="addTabForm" label-position="left" label-width="120px" class="demo-form-inline">
            <el-form-item label="名称" prop="name">
              <el-input v-model="newTab.name" type="text" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="值" prop="value">
              <el-input v-model="newTab.value" type="text" placeholder="请输入内容" maxlength="100" show-word-limit>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click.stop="saveTab">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { AIMarker } from 'Vue-Picture-BD-Marker'
import { AIMarker } from 'vue-picture-bd-marker'
export default {
  name: "stagePicPages",
  components: { 'ui-marker': AIMarker },
  data() {
    return {
      testForm: {       //  # 需要标记的图片的集合
        sign: []
      },
      currentInfo: {       // # 当前图片的信息，包含图片原本的高矮胖瘦尺寸
        currentBaseImage: '',
        rawW: 0,
        rawH: 0,
        currentW: 0,
        currentH: 0,
        checked: false,     // # false表示当前图片还没有标记过
        data: []           //  # 表示图片矩形标记信息
      },
      pageData: {       // # 辅助信息，记录图片的编号，判断是不是第一张或者最后一张等
        currentPage: 0
      },
      readOnly: false,
      label: [],     //   # 右侧标签集合
      selected: {    //  # 当前选中的标签的信息
        name: '',
        value: '',
        index: 0
      },
      allInfo: [],    // # 存储过程中的图片的矩形标记信息
      imageInfo: [],   // # 存储图片原始信息
      marker: null,
      dialogVisible: false, //  # dialog显示与否
      newTab: {              // # 新增标签信息
        name: '',
        value: ''
      },
      isHidden: false,      //  # 切换隐藏功能
      searchDataDetail: {    //  # 获取图片信息的参数表单
        id: '',
        isAdmin: '',
        page_no: 0,
        page_size: 10,
        updateType: '',
        startKey: ''
      },
      labelArr: '',      //  # 初始化的标签信息
      dataId: null     // # 与上面表单的id对应
    }
  },
  methods: {
    /**
     * 图片加载完成后回调, 记录图片当前的大小和原始大小 data={rawW,rawH,currentW,currentH}
     */
    onImageLoad(imageInfo) {
      if (!this.imageInfo[this.pageData.currentPage]) {
        this.imageInfo[this.pageData.currentPage] = imageInfo
      }
      console.info(this.imageInfo)
    },
    /**
     * 当控件准备完成后回调，参数为 uniqueKey
     */
    onReady() {
      // let markerDiv = document.getElementsByClassName('vmr-ai-panel')
      // let innnerDiv = markerDiv[0].firstChild
      // let markerImg = document.getElementsByClassName('vmr-ai-raw-image')
      // let markerMask = document.getElementsByClassName('vmr-ai-raw-image-mask')
      // markerDiv[0].setAttribute('style', 'position: relative; overflow: hidden; width: 60%; height: 60%;')
      // innnerDiv.setAttribute('style', 'position: relative; overflow: hidden;')
      // markerImg[0].setAttribute('style', 'display: block; position: absolute; user-select: none; width:700px; height: 500px;')
      // markerMask[0].setAttribute('style', 'user-select: none; position: absolute; cursor: crosshair; left: 0px; top: 0px;width:700px; height: 500px;')
    },
    /**
     * 画框后回调,data 和 uniqueKey先不用了
     */
    onDrawOne(data) {
      console.log(data, "------------")
      if (!this.selected.name || !this.selected.value) {
        this.$message.info('请先设置标签')
        this.$refs['aiPanel-editor'].getMarker().clearData()
        return
      }
      let name = data.tagName === '请选择或添加新标签' ? this.selected.name : data.tagName
      let tagValue = data.tagName === '请选择或添加新标签' ? this.selected.value : data.tag
      this.$refs['aiPanel-editor'].getMarker().setTag({
        tagName: name,
        tag: tagValue
      })
    },
    /**
     * 当选中图片上的标注框时回调，参数为data【标注数据】, uniqueKey
     */
    selectOne(data) {
      console.log(data,"================")
    },
    /**
     * 当标注框位置或者标框属性发生改动时回调，参数为data【标注数据】, uniqueKey
     */
    onUpdated() {
    },
    /**
     * 切换下一张图片
     */
    turnNext() {
      let marker = this.$refs['aiPanel-editor'].getMarker()
      this.saveCurrentPageData(marker)
      marker.clearData()
      if ((this.pageData.currentPage + 1) < this.testForm.sign.length) {
        this.pageData.currentPage += 1
      }
      this.currentInfo.currentBaseImage = this.testForm.sign[this.pageData.currentPage].src
      // 页数+1了之后，如果之前是有data的，就加载进去
      if (this.allInfo[this.pageData.currentPage]) {
        marker.renderData(this.allInfo[this.pageData.currentPage])
      }
    },
    /**
     * 清空当前marker的标记信息
     */
    clearAll() {
      this.$refs['aiPanel-editor'].getMarker().clearData()
      if (this.allInfo[this.pageData.currentPage]) {
        this.allInfo[this.pageData.currentPage] = null
      }
    },
    /**
     * 切换上一张图片
     */
    before() {
      let marker = this.$refs['aiPanel-editor'].getMarker()
      this.saveCurrentPageData(marker)
      marker.clearData()
      if (this.pageData.currentPage > 0) {
        this.pageData.currentPage -= 1
      }
      this.currentInfo.currentBaseImage = this.testForm.sign[this.pageData.currentPage].src
      // 页数-1了之后，如果之前是有data的，就加载进去
      if (this.allInfo[this.pageData.currentPage]) {
        marker.renderData(this.allInfo[this.pageData.currentPage])
      }
    },
    /**
     * click标签切换，切换当前图标
     * @param index
     * @param event
     */
    handleTabClick(index, event) {
      this.selected.index = index
      let el = event.currentTarget
      this.selected.name = el.getAttribute('name')
      this.selected.value = el.getAttribute('code')
    },
    /**
     * 删除标签：1.至少保留一个标签，不能删除最后一个  2.删除系统选中的，需要
     */
    handleDeleteTab(index) {
      if (this.label.length <= 1) {
        this.$message.warning('至少保留一个标签')
        return
      }
      this.label.splice(index, 1)
      if (index === this.selected.index) {
        this.selected.index = 0
        this.selectTab()
      }
    },
    handleAddTab() {
      this.newTab.name = ''
      this.newTab.value = ''
      this.dialogVisible = true
    },
    /**
     * 保存新增的标签
     */
    saveTab() {
      if (!this.newTab.name || !this.newTab.value) {
        this.$message.warning('标签名或标签值不能为空')
        return
      }
      for (let index in this.label) {
        let item = this.label[index]
        if (item.name === this.newTab.name || item.value === this.newTab.value) {
          this.$message.warning('标签名或标签值已存在，请重新输入')
          return
        }
      }
      this.label.push({ name: this.newTab.name, value: this.newTab.value })
      if (this.label.length === 1) {
        this.selected.name = this.label[0].name
        this.selected.value = this.label[0].value
      }
      this.dialogVisible = false
    },
    /**
     * 加载默认的标签
     */
    selectTab() {
      this.selected.name = this.label[this.selected.index].name
      this.selected.value = this.label[this.selected.index].value
    },
    /**
     * 切换隐藏
     */
    handleHiddenData() {
      let el = document.getElementsByClassName('vmr-ai-raw-image-mask')
      let isable = this.isHidden
      if (!isable) {
        el[0].style['display'] = 'none'
      } else {
        el[0].style['display'] = 'block'
      }
      this.isHidden = !isable
      console.info('this.isHidden : ' + this.isHidden)
    },
    /**
     * 完成标记，提交标记集合
     */
    submitForm() {
      this.saveCurrentPageData(null)
      let result = []
      for (let index in this.allInfo) {
        let labelArr = this.allInfo[index]
        let image = this.imageInfo[index]
        let otherInfo = this.testForm.sign[index]
        let param = {}
        param.src = otherInfo.src
        param.originalUrl = otherInfo.originalUrl
        param.name = otherInfo.name
        let size = {
          width: image.rawW,
          height: image.rawH
        }
        param.size = size
        let text = []
        if (labelArr && labelArr.length > 0) {
          labelArr.forEach(item => {
            let oneInfo = {}
            oneInfo.id = item.uuid
            oneInfo.type = item.tag
            oneInfo.name = item.tagName
            oneInfo.xmin = parseInt(item.position.x.substring(0, item.position.x.length - 1)) * size.width / 100
            oneInfo.ymin = parseInt(item.position.y.substring(0, item.position.y.length - 1)) * size.height / 100
            oneInfo.xmax = parseInt(item.position.x1.substring(0, item.position.x1.length - 1)) * size.width / 100
            oneInfo.ymax = parseInt(item.position.y1.substring(0, item.position.y1.length - 1)) * size.height / 100
            oneInfo.width = (oneInfo.xmax - oneInfo.xmin).toFixed(2)
            oneInfo.height = (oneInfo.ymax - oneInfo.ymin).toFixed(2)
            text.push(oneInfo)
          })
        }
        param.text = text
        result.push(param)
      }
      let req = {}
      req.labelInfoVOList = result
      req.dataId = this.dataId
      req.labelArr = this.labelArr
      // completeLabel(req).then(res => {
      //   this.$router.back()
      // })
    },
    /**
     * 保存当前页面的标记信息当data-allInfo
     * @param marker
     */
    saveCurrentPageData(marker) {
      if (!marker) {
        marker = this.$refs['aiPanel-editor'].getMarker()
      }
      this.allInfo[this.pageData.currentPage] = marker.getData()
    }
  },
  mounted() {
    /**
     * 刚刚切进来的时候，初始化内容
     */
    // if (this.$route.query.dataId) {
    //   this.searchDataDetail.id = this.$route.query.dataId
    //   this.searchDataDetail.isAdmin = this.$route.query.ossType
    //   this.dataId = this.$route.query.dataId
    // } else {
    //   this.$message.error('获取样本失败，请重新尝试')
    //   return
    // }
    this.searchDataDetail.updateType = 'original'
    this.searchDataDetail.page_no = 0
    this.searchDataDetail.page_size = 100000
    // 初始化内容
    // listOssData(this.searchDataDetail).then(res => {
    //   if (res.code === 100) {
    //     // 加载图片
    //     let dataList = res.result.data
    //     let formats = ['bmp', 'jpg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp']
    //     dataList.forEach(item => {
    //       let itemName = item.name
    //       let ending = itemName.substring(itemName.lastIndexOf('.') + 1)
    //       if (formats.indexOf(ending) > -1) {
    //         this.testForm.sign.push({ src: item.url, uuid: getUUid(12, 9), name: itemName, originalUrl: item.originalUrl })
    //       }
    //     })
    //     if (this.testForm.sign.length === 0) {
    //       this.$message.info('没有可以标记的内容')
    //     }
    //     this.allInfo = new Array(this.testForm.sign.length)
    //     this.imageInfo = new Array(this.testForm.sign.length)
    //     // 设置初始图片
    //     this.currentInfo.currentBaseImage = this.testForm.sign[this.pageData.currentPage].src
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })
    /**
     * 初始化标签
     */
    // detailData(this.$route.query.dataId).then(res => {
    //   if (res.result.labelClassify === 1) {
    //     this.labelArr = res.result.labelArr
    //     if (this.labelArr) {
    //       let labels = JSON.parse(this.labelArr)
    //       labels.forEach(item => {
    //         this.label.push(item)
    //       })
    //       this.selectTab()
    //     }
    //   }
    // })
  },
  created() { }
}
</script>

<style>

</style>
