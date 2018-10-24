<template>
  <div>
    <div>
      <app-bar/>
      <div class="page-wrap sizing">
      <mu-container v-if="products">
        <mu-row v-for="(item, idx) in products" :key="idx">
          <mu-col span="12" sm="12" md="6">
            <div>
                <img class="product-img-rel" v-if="item.img" :src="item.img">
              </div>
          </mu-col>
          <mu-col span="12" sm="12" md="6">
          <div class="product-info product">
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
                <mu-container>
                  <mu-flex justify-content="end">
                <mu-button @click="editRedirect(item['.key'])" small fab color="indigo400">
                  <mu-icon value="edit"></mu-icon>
                </mu-button>
                  </mu-flex>
                </mu-container>
              </div>
          </mu-col>
        </mu-row>
      </mu-container>
      <!--mu-container v-if="products">
        <mu-row>
          <mu-col v-for="(item, idx) in products" :key="idx">
            <div class="wrapper">
              <div class="product-img">
                <img v-if="item.img" :src="item.img" height="420" width="auto">
              </div>
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
                <mu-container>
                  <mu-flex justify-content="end">
                <mu-button @click="editRedirect(item['.key'])" small fab color="indigo400">
                  <mu-icon value="edit"></mu-icon>
                </mu-button>
                  </mu-flex>
                </mu-container>
              </div>
           </div>
          </mu-col>
        </mu-row>
      </mu-container-->
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

.prduct-image-rel {
  max-width: 80%
}

img {
  max-width: 100%;
}

.product {
  margin-left: 1rem;
}

/*
.productimage {
  width: auto;
  height: 14em;
}
.col {
    margin-bottom: 18px;
}

.wrapper {
  height: 420px;
  width: 654px;
  margin: 50px auto;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
  height: 420px;
  width: 327px;
  text-align: center;
  background-color: #ffffff;
}

.product-img-rel {
  float: left;
  height: 10rem;
  width: auto;
  text-align: center;
  background-color: #ffffff;
}

.product-img img {
  border-radius: 7px 0 0 7px;
  padding: 10px 0px 10px 0px;
}

.product-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 10px 7px;
  background-color: #fae1e1;
}

.product-text {
  height: 350px;
  width: 327px;
}

.product-text h1 {
  margin: 0 0 0 38px;
  font-size: 34px;
  color: #474747;
}

.product-text h1,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  margin: 0 0 47px 38px;
  font-size: 13px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #838383;
  letter-spacing: 0.2em;
}

.product-text p {
  height: 125px;
  margin: 0 10px 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-text-stars {
  text-align: center;
  margin: 0 0 0 38px;
  padding-top: 52px;
}
.product-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
}

.product-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 176px;
  margin: 0 40px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #142af3;
  cursor: pointer;
  outline: none;
}

.product-edit-btn {
  float: right;
  margin: 0 40px 0 5px;
  bottom: 0;
}

.product-price-btn button:hover {
  background-color: #638eeb;
}*/
</style>
