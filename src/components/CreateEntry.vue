<template>
  <div class="hello">
    <background-image />
    <mu-flex justify-content="center">
    <div class="page-wrap">
      <div>
        <mu-text-field label="Name" v-model="name"/>
      </div>
      <div>
        <mu-text-field label="Bewertung" v-model="rating"/>
      </div>
      <div>
        <button @click="writeData">Write Data</button>
      </div>
      </div>
    </mu-flex>
  </div>
</template>

<script>
import firebase from 'firebase'
import BackgroundImage from '@/Components/BackgroundImage'

export default {
  name: 'CreateEntry',
  components: {
    BackgroundImage
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      rating: 0,
      name: 'GinName'
    }
  },
  methods: {
    writeData: function () {
      var ref = firebase.database().ref('products/').push({
        name: this.name,
        rating: this.rating
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
    var email = ''
    var password = ''
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
    })
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

.page-wrap {
  position: relative;
  margin-top: 10%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  -moz-box-shadow: 0 0 20px black;
  -webkit-box-shadow: 0 0 20px black;
  box-shadow: 0 0 20px black;
  color: black;
}
</style>
