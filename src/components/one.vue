<template>
  <div>
    <div id="mlin" :style="{ width: width + 'px', height: height + 'px',transform: 'rotate('+jiaodu+'deg)'}"
      style="position: relative;">
      <ui-marker ref="aiPanel-editor" class="ai-observer" v-bind:uniqueKey="uuid" :ratio="16/9"
        v-bind:imgUrl="currentImage" @vmarker:onImageLoad="onImageLoad" @vmarker:onAnnoAdded="onAnnoAdded"
        @vmarker:onAnnoSelected="onAnnoSelected" @vmarker:onAnnoRemoved="onAnnoRemoved">
      </ui-marker>
    </div>
    <p id="html"></p>
    <button @click="toTag">小蜜蜂</button>
    <button @click="renderData">渲染</button>
    <button @click="getMarker">获取getMarker</button>
    <button @click="toBig">放大</button>
    <button @click="toSmall">缩小</button>
    <button @click="toR">旋转</button>
    <button @click="cancelRect">取消画画</button>
    <button @click="toRect" style="position:relative; z-index:99999;">开始画画</button>
  </div>
</template>
<script>

// "build:lib": "vue-cli-service build --target lib --name m_ai_marker --dest lib ./src/index.js"
// "vue-picture-bd-marker": "^1.4.6"
// import { AIMarker } from 'Vue-Picture-BD-Marker'
import { AIMarker } from 'vue-picture-bd-marker'
export default {
  name: "stagePicPage",
  components: { 'ui-marker': AIMarker },
  data() {
    return {
      domTop: 0,
      height: 340,
      jiaodu: 0,
      width: 600,
      uuid: '0da9130',
      currentImage: require("../assets/mao.jpg")  // url 或者 base64
    }
  },
  mounted() {
    this.domTop = document.getElementById('mlin').getBoundingClientRect().top;
    this.cancelRect();
    this.showCross();
    document.onkeydown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      var ctrlKey = event.ctrlKey || event.metaKey;
      if (ctrlKey && e.keyCode == 27) { // 按 Esc 
        //要做的事情
        alert(1);
      }
      if (e && e.keyCode == 113) { // 按 F2 
        //要做的事情
        alert(2);
      }
      if (e && e.keyCode == 13) { // enter 键
        //要做的事情
        alert(3);
      }
    };
    // document.onkeydown = function (e) {
    //   var keyCode = e.keyCode || e.which || e.charCode;
    //   var ctrlKey = e.ctrlKey || e.metaKey;
    //   if (ctrlKey && keyCode == 83) {
    //     alert('按住了 CTRL+S');
    //   }
    //   e.preventDefault();
    //   return false;
    // }
  },
  methods: {
    showCross() {
      var ox = document.createElement('p');
      var oy = document.createElement('p');
      ox.style.width = '100%';
      ox.style.height = '0px';
      ox.style.backgroundColor = '#f00';
      ox.style.position = 'absolute';
      ox.style.left = 0;
      document.getElementById('mlin').appendChild(ox);
      oy.style.height = '100%';
      oy.style.width = '0px';
      oy.style.backgroundColor = '#f00';
      oy.style.position = 'absolute';
      oy.style.top = 0;

      document.getElementById('mlin').appendChild(oy);
      document.getElementById('mlin').onmousemove = (el) => {
        oy.style.width = '1px';
        ox.style.height = '1px';
        var e = el || event;
        var x = e.pageX;
        var y = e.pageY;
        ox.style.top = y - this.domTop + 'px';
        oy.style.left = x + 'px';
        document.getElementById('html').innerHTML = 'x : ' + x + '<br/>y : ' + y;
      };
      document.getElementById('mlin').onmouseout = () => {
        oy.style.width = '0px';
        ox.style.height = '0px';
      };
    },
    cancelRect() {
      var config = {
        options: {
          supportDelKey: true,
          editable: false
        },
      }
      setTimeout(() => {
        this.$refs["aiPanel-editor"].getMarker().updateConfig(config)
      }, 0)
    },
    toRect() {
      var config = {
        options: {
          supportDelKey: true,
          editable: true
        },
      }
      this.$refs["aiPanel-editor"].getMarker().updateConfig(config)
    },
    toR() {
      this.jiaodu = 90;
    },
    toBig() {
      this.width = 800;
    },
    toSmall() {
      this.width = 400;
    },
    onAnnoRemoved(annoData, element) {
      console.log(annoData + ":" + element)
    },
    onAnnoSelected(e) {
      console.log("选中选框", e)
    },
    onAnnoAdded(e) {
      console.log("添加选框", e);
      // this.dialogVisible = true
      // this.uuid = e.uuid
      // //选中区域后展示select，在对应的区域下方
      // this.markSelect = true
      // this.tranLeft = Number(e.position.x.replace('%', '')) / 100 * document.querySelector('.imgbox').offsetWidth + 'px'
      // this.tranTop = Number(e.position.y1.replace('%', '')) / 100 * document.querySelector('.imgbox').offsetHeight + 20 + 'px'
      // //限制标注个数超过5个时隐藏select
      // if (this.total > 5) {
      //   this.markSelect = false
      // }
    },
    getMarker() {
      let marker = this.$refs['aiPanel-editor'].getMarker();
      console.info(marker.getData(), "get current marker")
    },
    onImageLoad(imageInfo, uuid) {
      // this.width = imageInfo.rawW;
      // this.height = imageInfo.rawH;
      console.info(imageInfo, "this is imageInfo")
      console.info(uuid, "this is uuid")
      // if (!this.imageInfo[this.pageData.currentPage]) {
      //   this.imageInfo[this.pageData.currentPage] = imageInfo
      // }
      // console.info(this.imageInfo)
    },
    toTag() {
      this.$refs['aiPanel-editor'].setTag({
        tagName: "小蜜蜂",
        tag: "0x0001"
      });
    },
    renderData() {
      this.$refs['aiPanel-editor'].renderData([
        {
          tag: "id04",
          tagName: "蜜蜂",
          position: {
            x: '54.5%', y: '17.778%', x1: '78.125%', y1: '46.000%'
          },
          uuid: "5559A20B25712D9D"
        },
        {
          tag: "id05",
          tagName: "蜜蜂",
          position: {
            x: "41.026%",
            x1: "53.790000000000006%",
            y: "22.678%",
            y1: "40.496%"
          },
          uuid: "5559A20B25712D9"
        }
      ]);
    }
  }
}
</script>

<style>
.vmr-ai-panel .vmr-ai-raw-image-mask {
  z-index: 9999999;
}

/* .vmr-ai-panel {
  height: 100% !important;
}
.vmr-ai-panel .vmr-g-image {
  height: 100% !important;
}
.vmr-ai-panel .vmr-ai-raw-image {
  height: 100% !important;
}
.vmr-ai-panel .vmr-ai-raw-image-mask {
  height: 100% !important;
} */
</style>
