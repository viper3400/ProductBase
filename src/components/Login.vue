<template>
  <div>
    <background-image/>
    <mu-container>
    <mu-flex class="flex-wrapper page-wrap" justify-content="center" >
      <h1>Login</h1>
    </mu-flex>
    <mu-flex class="flex-wrapper page-wrap" justify-content="center" >
      <mu-form ref="form" :model="validateForm" class="mu-login-form">
        <mu-form-item label="username" help-text="help text" prop="username">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="password" prop="password">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
      </mu-form>
    </mu-flex>
    </mu-container>
  </div>
</template>

<script>
import BackgroundImage from '@/Components/BackgroundImage'

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
    BackgroundImage
  }
}
</script>

<style>
.flex-wrapper {
  width: 100%;  
  margin-top: 10%;
}

.mu-login-form {
  width: 60%;
}
</style>
