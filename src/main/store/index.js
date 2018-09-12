import Vue from 'vue'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const getSlug = require('speakingurl')
const infosRequired = ['login', 'pass', 'url', 'since']
let db = null

export const eventBus = new Vue()

function load (path) {
  try {
    let adapter = new FileSync(path)
    db = low(adapter)
    let accounts = db.get('accounts').value()
    if (!accounts.length) {
      throw 'Missing accounts in : ' + path
    }
    console.log('Found ' + accounts.length + ' accounts in : ' + path)
    accounts.forEach(function (account) {
      let noError = true
      account.showPass = false
      account.slug = getSlug(account.title + ' ' + account.url + ' ' + account.comment)
      infosRequired.forEach((infoRequired) => {
        if (!account[infoRequired] || !account[infoRequired].length) {
          console.error('Missing "' + infoRequired + '" on account : "' + account.title + '"')
          noError = false
        }
      })
      if (noError) {
        account.loginSource = account.login
        account.passSource = account.pass
      }
    })
    eventBus.$emit('fetched-accounts', accounts)
  } catch (error) {
    console.error('failed at loading path :', path)
    console.error(error)
  }
}

eventBus.$on('load-path', path => {
  console.log('user wants to load path :', path)
  load(path)
})

eventBus.$on('save-account', account => {
  console.log('user wants to save account :', account)
  // save(account)
})

