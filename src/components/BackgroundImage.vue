<template>
  <mu-container fluid>
    <div class="imgBackground" :style="img">
  <mu-row>
    <mu-col>
      <h1>Hallo</h1>
    </mu-col>
  </mu-row>
    </div>
  </mu-container>
</template>

<script>
export default {
  name: 'BackgroundImage',
  computed: {
    backgroundImgUrl () {
      return require('@/assets/bar2.jpg')
    },
    img () {
      return 'background-image: url(' + this.backgroundImgUrl + ');'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgBackground {
  /*background-image: url('http://fevertree1.d3r-cdn.com/images/default/12411-1639-fever-tree-mediterranean-mare-press-web.jpg');*/
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  height: auto;
}
</style>
