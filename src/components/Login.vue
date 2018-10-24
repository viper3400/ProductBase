<template>
  <div>
    <mu-flex class="flex-wrapper page-wrap" justify-content="center">
      <mu-flex class="flex-demo" justify-content="center">
        <mu-form ref="form" :model="validateForm" class="mu-login-form">
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
      }
    }
  },
  components: {
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.validateForm.username, this.validateForm.password).then(
        (user) => {
          this.$router.replace('entrylist')
        },
        (err) => {
          this.$emit('propagate-event', 'error', err.message)
        }
      )
    }
  }
}
</script>

<style>
.flex-wrapper {
  width: 100%;
  margin-top: 10%;
}

.flex-demo {
  width: 60%;
  height: 100%;
  background-color: #e0e0e0;
  text-align: left;
  line-height: 32px;
}

.mu-login-form {
  width: 60%;
}
</style>
