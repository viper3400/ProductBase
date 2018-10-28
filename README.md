# jaxx.vue.productbase

> A Vue.js project

## Firebase Setup

A [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/) will be required in oder to run and operate ProductBase. You need to setup authentification method E-Mail & Password and create a user account for each user who should have access to the database.

Copy or rename src/firebaseconf.example.js to src/firebaseconf.js and fill the authentification parameters as provided by Firebase.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Multi Language Setup

ProductBase uses [vue-multilanguage](https://github.com/leonardovilarinho/vue-multilanguage) for multi language support. You need to setup your prefered language in src/ml.js as "inital". Default is german (actual it's swiss german) but ProductBase also supports english.