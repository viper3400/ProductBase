<template>
  <div class="hello">
    <background-image />
    <div class="overlay">
      <app-bar/>
      <div class="page-wrap sizing">
      <mu-flex justify-content="center">
          <mu-text-field label="Name" v-model="product.name"/>
      </mu-flex>
      <mu-flex justify-content="center">
        <mu-text-field label="Bewertung" v-model="product.rating"/>
      </mu-flex>
        <mu-flex justify-content="center">
          <mu-button @click="writeData">Save</mu-button>
        </mu-flex>
        </div>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import AppBar from '@/Components/AppBar'
import BackgroundImage from '@/Components/BackgroundImage'

export default {
  name: 'EditProduct',
  components: {
    BackgroundImage,
    AppBar
  },
  data () {
    return {
      productId: null,
      product: {
        name: null,
        rating: null
      }
    }
  },
  methods: {
    writeData: function () {
      var ref = firebase.database().ref('products/' + this.productId).set({
        name: this.product.name,
        rating: this.product.rating
      })
      console.log(ref.toString())
    },
    readData: function (productId) {
      var ref = firebase.database().ref('products/' + productId)
      ref.once('value').then((snapshot) => {
        this.product = snapshot.val()
      })
    }
  },
  mounted () {
    this.productId = this.$route.params.id
    this.readData(this.productId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.sizing {
  width: 60%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>
