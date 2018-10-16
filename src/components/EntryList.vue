<template>
  <div>
    <background-image />
    <div class="overlay">
      <app-bar/>
      <div class="page-wrap sizing">
        <!--<mu-list v-if="products">
          <mu-list-item v-for="(item, idx) in products" :key="idx">
            <mu-list-item-title  @click="editRedirect(idx)">{{item.name}} ({{item.rating}})</mu-list-item-title>
          </mu-list-item>
        </mu-list>-->
      <mu-container v-if="products">
        <mu-row gutter>
          <mu-col span="4" v-for="(item, idx) in products" :key="idx">
            <mu-card style="width: 100% height: 50px; margin: 0 auto;">
             <!--<mu-card-header :title="item.name" sub-title="sub title">
              </mu-card-header>-->
              <mu-card-media>
                <img width="120px" src="https://d17gnwn89zo776.cloudfront.net/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/g/i/gin-mare-mediterranean-gin-70cltest.jpg">
              </mu-card-media>
              <mu-card-title :title="item.name" :sub-title="item.rating"></mu-card-title>
              <mu-card-text>
              </mu-card-text>
              <mu-card-actions>
                <mu-button flat @click="editRedirect(idx)">Edit</mu-button>
                <mu-button flat>Remove</mu-button>
              </mu-card-actions>
            </mu-card>
          </mu-col>
      </mu-row>
      </mu-container>
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

.col {
    margin-bottom: 18px;
    }
</style>
