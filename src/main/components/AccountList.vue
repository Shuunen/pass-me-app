<template>
  <div class="account-list col parent-width">
    <input v-model="filter" class="filter" placeholder="Filter">
    <div class="scroll-area parent-width">
      <Account :account="account" :key="account.id" v-for="account in accounts" v-show="account.slug.includes(filterSlug)" />
    </div>
  </div>
</template>

<script>

import Account from './Account'

const getSlug = require('speakingurl')
const debounce = require('lodash/debounce')
const minimist = require('minimist')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const config = minimist(process.argv.slice(2), {
  default: {
    path: './sample.json',
    verbose: false,
  },
})
// console.log('start with process.argv', process.argv)
console.log('start with config', config)
let adapter = null
let db = null
let accounts = []
try {
  adapter = new FileSync(config.path)
  db = low(adapter)
  accounts = db.get('accounts').value()
  if (!accounts.length) {
    console.error('Missing accounts in : ' + config.path)
    process.exit(1)
  } else {
    console.log('Found ' + accounts.length + ' accounts in : ' + config.path)
    let infosRequired = ['login', 'pass', 'url', 'since']
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
  }
} catch (e) {
  console.error('Db init failed : ', e.message)
  process.exit(1)
}

export default {
  data () {
    return {
      accounts,
      filter: '',
      filterSlug: ''
    }
  },
  created () {
    this.filterAccountsDebounced = debounce(this.filterAccounts, 300)
    this.filterAccountsDebounced('')
  },
  methods: {
    filterAccounts (value) {
      this.filterSlug = getSlug(value)
      console.log('filter slug updated : ' + this.filterSlug)
    }
  },
  watch: {
    filter: function (value) {
      this.filterAccountsDebounced(value)
    }
  },
  components: { Account }
}
</script>

<style>
.account-list.col {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  max-width: 800px;
}
.scroll-area {
  overflow-y: visible;
  overflow-x: hidden;
}
.filter {
  border: 2px solid #ddd;
  margin-bottom: 15px;
}
</style>
