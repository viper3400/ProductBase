<template>
  <img class="bg" :src="backgroundImgUrl"/>
</template>

<script>
export default {
  name: 'BackgroundImage',
  computed: {
    backgroundImgUrl () {
      return require('@/assets/bar2.jpg')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
