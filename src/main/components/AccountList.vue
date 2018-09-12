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
import { eventBus } from '../store'
const debounce = require('lodash/debounce')
const getSlug = require('speakingurl')

export default {
  data () {
    return {
      accounts: [],
      filter: '',
      filterSlug: ''
    }
  },
  created () {
    this.filterAccountsDebounced = debounce(this.filterAccounts, 300)
    this.filterAccountsDebounced('')

    eventBus.$on('fetched-accounts', accounts => {
      console.log('account list fetched', accounts.length, 'accounts')
      this.accounts = accounts
    })

    eventBus.$emit('load-path', './sample.json')
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
