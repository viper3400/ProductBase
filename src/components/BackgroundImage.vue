<template>
  <img class="bg" :src="backgroundImgUrl"/>
</template>

<script>
export default {
  name: 'BackgroundImage',
  data () {
    return {
      backgroundImgUrl: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
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
