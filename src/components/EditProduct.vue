<template>
  <div class="hello">
    <background-image />
    <div class="overlay">
      <app-bar/>
      <div class="page-wrap sizing">
        <mu-flex justify-content="center">
          <mu-form class="edit-form" :model="product">
            <mu-form-item prop="input" label="Brand">
              <mu-text-field v-model="product.brand"/>
            </mu-form-item>
            <mu-form-item prop="input" label="Name">
              <mu-text-field v-model="product.name"/>
            </mu-form-item>
            <mu-form-item prop="input" label="Image Link">
              <mu-text-field v-model="product.img"/>
            </mu-form-item>
            <mu-form-item prop="input" label="Description">
              <mu-text-field :rows-max="5" multi-line v-model="product.description"/>
            </mu-form-item>
            <mu-form-item prop="textarea" label="Rating">
              <vue-stars class="stars" name="stars" v-model="product.rating" shadowColor="black" hoverColor="orange"/>
            </mu-form-item>
            <mu-form-item >
              <mu-container class="button-wrapper">
                <mu-button color="primary" @click="writeData">Save</mu-button>
                <mu-button color="primary" :disabled="!this.isProductIdSet" @click="deleteData">Delete</mu-button>
              </mu-container>
            </mu-form-item>
          </mu-form>
        </mu-flex>
        </div>
      </div>
    </div>
</template>

<script>
// https://github.com/richardtallent/vue-stars
import firebase from 'firebase'
import AppBar from '@/Components/AppBar'
import BackgroundImage from '@/Components/BackgroundImage'
import VueStars from 'vue-stars'

export default {
  name: 'EditProduct',
  components: {
    BackgroundImage,
    AppBar,
    VueStars
  },
  data () {
    return {
      productId: null,
      product: {
        name: '',
        brand: '',
        rating: 0,
        img: '',
        description: ''
      }
    }
  },
  methods: {
    writeData: function () {
      if (this.isProductIdSet) {
        this.updateData()
      } else this.createData()
    },
    updateData: function () {
      var ref = firebase.database().ref('products/' + this.productId)
      ref.set({
        brand: this.product.brand,
        name: this.product.name,
        rating: this.product.rating,
        img: this.product.img,
        description: this.product.description
      }).then(() => {
        this.$emit('propagate-event', 'success', 'Saved successfully. ' + this.productId.toString())
      })
    },
    createData: function () {
      var productListRef = firebase.database().ref('products/')
      var ref = productListRef.push()
      ref.set({
        brand: this.product.brand,
        name: this.product.name,
        rating: this.product.rating,
        img: this.product.img,
        description: this.product.description
      }).then(() => {
        this.$emit('propagate-event', 'success', 'Created successfully. ' + ref.key)
        this.productId = ref.key
        this.$router.push({ path: '/editproduct/' + ref.key })
      })
    },
    readData: function (productId) {
      var ref = firebase.database().ref('products/' + productId)
      ref.once('value').then((snapshot) => {
        this.product = snapshot.val()
      })
    },
    deleteData: function () {
      var adaRef = firebase.database().ref('products/' + this.productId)
      adaRef.remove()
        .then(() => {
          console.log('removed')
          this.$emit('propagate-event', 'success', 'Removed successfully.')
          this.$router.push({ path: '/entrylist' })
        })
        .catch(function (error) {
          this.$emit('propagate-event', 'error', 'Remove failed: ' + error.message)
        })
    }
  },
  mounted () {
    this.productId = this.$route.params.id
    if (this.isProductIdSet) {
      this.readData(this.productId)
    } else this.$emit('propagate-event', 'info', 'Creating new entry.')
  },
  computed: {
    isProductIdSet: function () {
      if (this.productId != null) {
        this.$emit('propagate-event', 'info', 'New id ' + this.productId)
        return true
      } else return false
    }
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
.edit-form {
  width: 80%;
}

.stars {
  font-size: 3em;
}

.button-wrapper {
  text-align: right;
  margin: 8px;
}
</style>
