<template>
  <mu-appbar style="width: 100%;" color="indigo400">
  <mu-button icon slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Gin, please!
  <mu-menu slot="right">
    <mu-button flat>MENU</mu-button>
    <mu-list slot="content">
      <mu-list-item button @click="signOut">
        <mu-list-item-content>
          <mu-list-item-title>SignOut</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
      <!--<mu-list-item button>
        <mu-list-item-content>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>-->
    </mu-list>
  </mu-menu>
</mu-appbar>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'AppBar',
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>
