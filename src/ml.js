import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'german',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      title: 'Gin, please ...',
      userEmail: 'Mail Adress',
      password: 'Password',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      createNewProduct: 'Create New Product',
      productList: 'Product List',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      brand: 'Brand',
      productName: 'Name',
      imageLink: 'Image Link',
      rating: 'Rating',
      description: 'Description / Taste',
      alcoholStrength: 'Alcohol Strength',
      fillingQuantity: 'Filling Quantity',
      price: 'Price'
    }),

    new MLanguage('german').create({
      title: 'Gin, bitte ...',
      userEmail: 'E-Mail Adresse',
      password: 'Passwort',
      signIn: 'Anmelden',
      signOut: 'Abmelden',
      createNewProduct: 'Hinzufügen',
      productList: 'Übersicht',
      edit: 'Bearbeiten',
      save: 'Speichern',
      delete: 'Löschen',
      brand: 'Marke',
      productName: 'Name / Bezeichnung',
      imageLink: 'Link zum Bild',
      rating: 'Bewertung',
      description: 'Geschmack',
      alcoholStrength: 'Alkoholgehalt',
      fillingQuantity: 'Inhalt',
      price: 'Preis'
    })
  ]
})
