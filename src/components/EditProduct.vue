<template>
  <div class="hello">
    <div>
      <app-bar/>
      <div class="page-wrap sizing">
        <mu-flex justify-content="center">
          <mu-form class="edit-form" :model="product">
            <mu-form-item prop="input" :label="$ml.get('brand')">
              <mu-text-field v-model="product.brand"/>
            </mu-form-item>
            <mu-form-item prop="input" :label="$ml.get('productName')">
              <mu-text-field v-model="product.name"/>
            </mu-form-item>
            <mu-form-item prop="input" :label="$ml.get('imageLink')">
              <mu-text-field v-model="product.img"/>
            </mu-form-item>
            <mu-container fluid style="padding: 0 0 0 0;">
              <mu-row gutter>
                <mu-col>
              <mu-form-item prop="input" :label="$ml.get('fillingQuantity')">
                <mu-text-field v-model="product.fillingQuantity"/>
              </mu-form-item>
                </mu-col>
                <mu-col>
              <mu-form-item prop="input" :label="$ml.get('alcoholStrength')">
                <mu-text-field v-model="product.alcoholStrength"/>
              </mu-form-item>
                </mu-col>
                <mu-col>
              <mu-form-item prop="input" :label="$ml.get('price')">
                <mu-text-field v-model="product.price"/>
              </mu-form-item>
                </mu-col>
              </mu-row>
            </mu-container>
            <mu-form-item prop="input" :label="$ml.get('description')">
              <mu-text-field :rows-max="5" multi-line v-model="product.description"/>
            </mu-form-item>
            <mu-form-item prop="textarea" :label="$ml.get('rating')">
              <vue-stars class="stars" name="stars" v-model="product.rating" shadowColor="black" hoverColor="orange"/>
            </mu-form-item>
            <mu-form-item >
              <mu-container class="button-wrapper">
                <mu-button color="primary" @click="writeData">{{$ml.get('save')}}</mu-button>
                <mu-button color="primary" :disabled="!this.isProductIdSet" @click="deleteData">{{$ml.get('delete')}}</mu-button>
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
import AppBar from '@/Components/AppBar'
import VueStars from 'vue-stars'
import db from '../firebase.js'

export default {
  name: 'EditProduct',
  components: {
    AppBar,
    VueStars
  },
  firebase: {
  },
  data () {
    return {
      productId: null,
      product: {
        name: '',
        brand: '',
        rating: 0,
        img: '',
        description: '',
        alcoholStrength: '',
        fillingQuantity: '',
        price: ''
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
      const copy = {...this.product}
      delete copy['.key']
      db.ref('products').child(this.productId).set(copy)
    },
    createData: function () {
      var ref = db.ref('products').push(this.product)
      this.$emit('propagate-event', 'success', 'Created new entry.' + ref.key)
      this.productId = ref.key
      this.$router.push({ path: '/editproduct/' + ref.key })
    },
    readData: function (productId) {
      this.$bindAsObject('product', db.ref('products').child(this.productId), null, () => console.log(this.product))
    },
    deleteData: function () {
      db.ref('products').child(this.productId).remove()
      this.$emit('propagate-event', 'success', 'Removed item')
      this.$router.push({ path: '/entrylist' })
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
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
}
.edit-form {
  width: 80%;
}

.stars {
  font-size: 2rem;
}

.button-wrapper {
  text-align: right;
  margin: 8px;
}
</style>
