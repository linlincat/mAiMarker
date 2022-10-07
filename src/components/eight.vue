<template>
  <div class="m-box">
    <div id="parent" style="width: 300px; height: 300px; background: red; position: relative;">
      <!-- <p style="width: 100%; height: 2px; background: yellow; position: absolute; top: 20px; left: 0px;"></p>
      <p style="width: 2px; height: 100%; background: yellow; position: absolute; top: 0px; left: 20px;"></p> -->
    </div>
    <div id="html"></div>
  </div>
</template>

<script>
export default {
  name: "eightCom",
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    var ox = document.createElement('p');

    var oy = document.createElement('p');

    ox.style.width = '100%';

    ox.style.height = '2px';

    ox.style.backgroundColor = 'blue';

    ox.style.position = 'absolute';

    ox.style.left = 0;

    document.getElementById('parent').appendChild(ox);

    oy.style.height = '100%';

    oy.style.width = '2px';

    oy.style.backgroundColor = 'blue';

    oy.style.position = 'absolute';

    oy.style.top = 0;

    document.getElementById('parent').appendChild(oy);

    document.getElementById('parent').onmousemove = function (el) {

      var e = el || event;

      var x = e.pageX;

      var y = e.pageY;

      ox.style.top = y - 60 + 'px';

      oy.style.left = x + 'px';

      document.getElementById('html').innerHTML = 'x : ' + x + '<br/>y : ' + y;

    };
  }
}
</script>
<style  lang="less">

</style>