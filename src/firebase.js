import Firebase from 'firebase'
import firebasconf from './firebaseconf.js'

let firebaseApp = Firebase.initializeApp(firebasconf)
let db = firebaseApp.database()

export default db
