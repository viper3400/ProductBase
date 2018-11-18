import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'german',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('english').create({
      title: 'Gin, please ...',
      userEmail: 'Mail Address',
      password: 'Password',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      createNewProduct: 'Create New Product',
      productList: 'Product List',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      abort: 'Abort',
      brand: 'Brand',
      productName: 'Name',
      imageLink: 'Image Link',
      rating: 'Rating',
      description: 'Description / Taste',
      alcoholStrength: 'Alcohol Strength',
      fillingQuantity: 'Filling Quantity',
      fillingUnit: 'cl',
      price: 'Price',
      currency: '€',
      bottleFinished: 'Finished',
      confirmDeleteDialogTitle: 'Confirm Delete',
      confirmDeleteDialogContent: 'Do you really want to delete this item?',
      sortOrder: 'Sort Order',
      sortByBrand: 'Sort by brand',
      sortByRating: 'Sort by rating',
      asc: 'ascending',
      desc: 'descending'
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
      abort: 'Abbrechen',
      brand: 'Marke',
      productName: 'Name / Bezeichnung',
      imageLink: 'Link zum Bild',
      rating: 'Bewertung',
      description: 'Geschmack',
      alcoholStrength: 'Alkoholgehalt',
      fillingQuantity: 'Inhalt',
      fillingUnit: 'cl',
      price: 'Preis',
      currency: 'CHF',
      bottleFinished: 'Ausgetrunken',
      confirmDeleteDialogTitle: 'Löschen bestätigen',
      confirmDeleteDialogContent: 'Willst du diesen Eintrag wirklich löschen?',
      sortOrder: 'Sortierung',
      sortByBrand: 'Sortiere nach Marke',
      sortByRating: 'Sortiere nach Bewertung',
      asc: 'aufsteigend',
      desc: 'absteigend'
    })
  ]
})
