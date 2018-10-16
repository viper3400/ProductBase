<template>
  <div class="hello">
    <background-image />
    <div class="overlay">
      <app-bar/>
      <div class="page-wrap sizing">
      <mu-flex justify-content="center">
          <mu-text-field label="Name" v-model="name"/>
      </mu-flex>
      <mu-flex justify-content="center">
        <mu-text-field label="Bewertung" v-model="rating"/>
      </mu-flex>
       <mu-flex justify-content="center">
        <mu-text-field label="Image Link" v-model="img"/>
      </mu-flex>
        <mu-flex justify-content="center">
          <mu-button @click="writeData">Write Data</mu-button>
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
  name: 'CreateEntry',
  components: {
    BackgroundImage,
    AppBar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      rating: 0,
      name: null,
      img: null
    }
  },
  methods: {
    writeData: function () {
      var ref = firebase.database().ref('products/').push({
        name: this.name,
        rating: this.rating,
        img: this.img
      })
      console.log(ref.toString())
    },
    readData: function () {
      var ref = firebase.database().ref('products')
      ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          console.log(childKey + ' : ' + childData)
          console.log(childData.name)
        })
      })
    }
  },
  mounted () {
    // var email = ''
    // var password = ''
    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    //   // Handle Errors here.
    //   // var errorCode = error.code
    //   var errorMessage = error.message
    //   console.log(errorMessage)
    // })
    this.readData()
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
