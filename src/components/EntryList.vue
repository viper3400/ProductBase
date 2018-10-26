<template>
  <div>
    <div>
      <app-bar/>
      <div class="page-wrap sizing">
      <mu-container v-if="products">
        <mu-row gutter class="product-card" v-for="(item, idx) in products" :key="idx">
          <mu-col span="12" sm="12" md="6">
            <div class="product-img-container">
              <img class="product-img-rel" v-if="item.img" :src="item.img">
            </div>
          </mu-col>
          <mu-col span="12" sm="12" md="6">
          <div class="product-info">
                <div class="product-text">
                  <vue-stars :name="'star' + idx" class="product-text-stars" :value="item.rating" :readonly="true" shadowColor="black"/>
                  <h1>{{item.brand}}</h1>
                  <h2 v-if="item.name">{{item.name}}</h2>
                  <p>
                  {{$ml.get('fillingQuantity')}}: {{item.fillingQuantity}}<br>
                  {{$ml.get('alcoholStrength')}}: {{item.alcoholStrength}}<br>
                  {{$ml.get('price')}}: {{item.price}}<br>
                  {{$ml.get('description')}}: {{item.description}}</p>
                </div>
                <mu-container class="product-info-button">
                  <mu-flex justify-content="start">
                <mu-button @click="editRedirect(item['.key'])" color="indigo400">
                  <mu-icon left value="edit"></mu-icon>
                  {{$ml.get('edit')}}
                </mu-button>
                  </mu-flex>
                </mu-container>
              </div>
          </mu-col>
        </mu-row>
      </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@/Components/AppBar'
import VueStars from 'vue-stars'
import db from '../firebase.js'

export default {
  name: 'EntryList',
  firebase: {
    products: {
      source: db.ref('products'),
      readyCallback: function () {
        this.products = this.products.sort(function (o1, o2) {
          return o2.rating - o1.rating
        })
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    AppBar,
    VueStars
  },
  methods: {
    editRedirect: function (id) {
      this.$router.push('/editproduct/' + id)
    }
  },
  created () {
    console.log(this.products)
  }
}
</script>

<style scoped>
.sizing {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
}

.product-card {
  padding: 0 0 1rem 0;
}

.prduct-image-rel {
  max-width: 80%
}

.product-info-button {
 padding: 1rem 0 0 0;
}

img {
  max-width: 100%;
}

.product-img-container {
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
}

.product-info {
  margin: 0.3rem 0.3rem 1.3rem 0.3rem;
}
</style>
