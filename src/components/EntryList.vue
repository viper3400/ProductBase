<template>
  <div>
    <background-image />
    <div class="overlay">
      <app-bar/>
      <div class="page-wrap sizing">
        <mu-list v-if="products">
          <mu-list-item v-for="(item, idx) in products" :key="idx">
            <mu-list-item-title  @click="editRedirect(idx)">{{item.name}} ({{item.rating}})</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import AppBar from '@/Components/AppBar'
import BackgroundImage from '@/Components/BackgroundImage'

export default {
  name: 'EntryList',
  data () {
    return {
      products: []
    }
  },
  components: {
    BackgroundImage,
    AppBar
  },
  methods: {
    readData: function () {
      var ref = firebase.database().ref('products')
      ref.once('value').then((snapshot) => {
        this.products = snapshot.val()
      })
    },
    editRedirect: function (id) {
      this.$router.push('/editproduct/' + id)
    }
  },
  mounted () {
    this.readData()
  }
}
</script>

<style scoped>
.sizing {
  width: 60%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>
