<template>
  <div>
    <div>
      <app-bar/>
      <div :class="styleClasses.mainwrapper">
      <mu-container v-if="products">
        <mu-row class="navigation-pane">
            <mu-col>
              <mu-menu :open.sync="sortMenuOpen">
              <mu-button color="indigo400">
                  <mu-icon left value="sort"></mu-icon>
                  {{$ml.get('sortOrder')}}
                </mu-button>
                <mu-list slot="content">
                  <mu-list-item button @click="sortProductList('sortbyratingdesc'); sortMenuOpen=false">
                    <mu-list-item-content>
                      <mu-list-item-title>{{$ml.get('sortByRating')}} ({{$ml.get('desc')}})</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item button @click="sortProductList('sortbyratingasc'); sortMenuOpen=false">
                    <mu-list-item-content>
                      <mu-list-item-title>{{$ml.get('sortByRating')}} ({{$ml.get('asc')}})</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item button @click="sortProductList('sortbybrandasc'); sortMenuOpen=false">
                    <mu-list-item-content>
                      <mu-list-item-title>{{$ml.get('sortByBrand')}} ({{$ml.get('asc')}})</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                   <mu-list-item button @click="sortProductList('sortbybranddesc'); sortMenuOpen=false">
                    <mu-list-item-content>
                      <mu-list-item-title>{{$ml.get('sortByBrand')}} ({{$ml.get('desc')}})</mu-list-item-title>
                    </mu-list-item-content>
                  </mu-list-item>
                </mu-list>
              </mu-menu>
            </mu-col>
        </mu-row>
        <mu-row gutter :class="styleClasses.productRows" v-for="(item, idx) in products" :key="idx">
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
                  <span v-if="item.fillingQuantity"><strong>{{$ml.get('fillingQuantity')}}</strong> {{item.fillingQuantity}} cl<br></span>
                  <span v-if="item.alcoholStrength"><strong>{{$ml.get('alcoholStrength')}}</strong> {{item.alcoholStrength}}%<br></span>
                  <span v-if="item.price"><strong>{{$ml.get('price')}}</strong> {{item.price}} {{$ml.get('currency')}}</span>
                  </p>
                  <h3 v-if="item.description">{{$ml.get('description')}}</h3>
                  <p v-if="item.description">{{item.description}}</p>
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

var SortOrderEnum = {
  SortByRatingAsc: 'sortbyratingasc',
  SortByRatingDesc: 'sortbyratingdesc',
  SortByBrandAsc: 'sortbybrandasc',
  SortByBrandDesc: 'sortbybranddesc'
}

export default {
  name: 'EntryList',
  firebase: {
    products: {
      source: db.ref('products'),
      readyCallback: function () {
        this.sortProductList(this.sortOrder)
      }
    }
  },
  data () {
    return {
      sortOrder: SortOrderEnum.SortByRatingDesc,
      sortMenuOpen: false,
      styleClasses: {
        mainwrapper: 'page-wrap sizing',
        productRows: 'product-rows'
      }
    }
  },
  components: {
    AppBar,
    VueStars
  },
  methods: {
    editRedirect: function (id) {
      this.$router.push('/editproduct/' + id)
    },
    sortProductList: function (sortOrder) {
      this.sortOrder = sortOrder
      this.persistSettings()
      switch (sortOrder) {
        case SortOrderEnum.SortByRatingDesc:
        default:
          this.products = this.sortByRatingDesc(this.products)
          break
        case SortOrderEnum.SortByRatingAsc:
          this.products = this.sortByRatingAsc(this.products)
          break
        case SortOrderEnum.SortByBrandDesc:
          this.products = this.sortByBrandDesc(this.products)
          break
        case SortOrderEnum.SortByBrandAsc:
          this.products = this.sortByBrandAsc(this.products)
          break
      }
    },
    sortByRatingDesc: function (productlist) {
      productlist = productlist.sort(function (p1, p2) {
        return p2.rating - p1.rating
      })
      return productlist
    },
    sortByRatingAsc: function (productlist) {
      productlist = productlist.sort(function (p1, p2) {
        return p1.rating - p2.rating
      })
      return productlist
    },
    sortByBrandAsc: function (productlist) {
      productlist = productlist.sort(function (p1, p2) {
        return p1.brand.localeCompare(p2.brand)
      })
      return productlist
    },
    sortByBrandDesc: function (productlist) {
      productlist = productlist.sort(function (p1, p2) {
        return p2.brand.localeCompare(p1.brand)
      })
      return productlist
    },
    readSettings: function () {
      var storeObject = JSON.parse(sessionStorage.getItem('ch.jaxx.prodcutbase.gin'))
      if (storeObject) {
        this.sortOrder = storeObject.sortOrder
      }
    },
    persistSettings: function () {
      var storeObject = {
        sortOrder: this.sortOrder
      }
      sessionStorage.setItem('ch.jaxx.prodcutbase.gin', JSON.stringify(storeObject))
    },
    styleToViewport: function () {
      // set style classes depending on viewport to create a repsonsive user xp
      switch (this.$currentViewport.label) {
        case 'mobile':
        case 'tablet':
          this.styleClasses.mainwrapper = 'page-wrap'
          this.styleClasses.productRows = 'product-rows-mobile'
          break
        default:
          this.styleClasses.mainwrapper = 'page-wrap sizing'
          this.styleClasses.productRows = 'product-rows'
          break
      }
    }
  },
  mounted () {
    this.readSettings()
    this.styleToViewport()
  }
}
</script>

<style scoped>
.sizing {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
}

.navigation-pane {
  margin-bottom: 1rem;
}

.product-rows {
  padding: 1em 0 1em 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  -moz-box-shadow: 0 0 5px gray;
  -webkit-box-shadow: 0 0 5px gray;
  box-shadow: 0 0 5px gray;
}

.product-rows-mobile {
  padding: 0 0 1em 0;
}

.prduct-image-rel {
  max-width: 80%;
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

.product-text-stars {
  font-size: 2rem;
}
</style>
