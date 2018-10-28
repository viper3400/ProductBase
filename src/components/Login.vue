<template>
  <div>
    <mu-flex :class="styleClasses.mainwrapper" justify-content="center">
      <mu-flex class="flex-demo" justify-content="center">
        <mu-form ref="form" :model="validateForm">
          <mu-form-item>
            <h2>{{$ml.get('signIn')}}</h2>
          </mu-form-item>
          <mu-form-item :label="$ml.get('userEmail')" prop="username">
            <mu-text-field v-model="validateForm.username" prop="username" @keyup.enter="signIn"></mu-text-field>
          </mu-form-item>
          <mu-form-item :label="$ml.get('password')" prop="password">
            <mu-text-field type="password" v-model="validateForm.password" prop="password" @keyup.enter="signIn"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
             <mu-button color="primary" @click="signIn">{{$ml.get('signIn')}}</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      validateForm: {
        username: '',
        password: ''
      },
      styleClasses: {
        mainwrapper: 'flex-wrapper page-wrap sizing'
      }
    }
  },
  components: {
  },
  methods: {
    signIn: function () {
      var trimmedUsername = this.validateForm.username.trim()
      firebase.auth().signInWithEmailAndPassword(trimmedUsername, this.validateForm.password).then(
        (user) => {
          this.$router.replace('entrylist')
        },
        (err) => {
          this.$emit('propagate-event', 'error', err.message)
        }
      )
    },
    styleToViewport: function () {
      // set style classes depending on viewport to create a repsonsive user xp
      switch (this.$currentViewport.label) {
        case 'mobile':
        case 'tablet':
          this.styleClasses.mainwrapper = 'flex-wrapper page-wrap'
          break
        default:
          this.styleClasses.mainwrapper = 'flex-wrapper page-wrap sizing'
          break
      }
    }
  },
  mounted () {
    this.styleToViewport()
  }
}
</script>

<style>
.flex-wrapper {
  width: 100%;
  margin-top: 10%;
}

.flex-demo {
  width: 80%;
  height: 100%;
  background-color: #e0e0e0;
  text-align: left;
  line-height: 32px;
}
.sizing {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>
