<template>
  <Window title="Pass Me - Your personal password manager" width="400" height="600" margined :close="exit">
    <Tab margined>
      <Box label="Passwords" vertical padded>
        <TextInput v-on:input="searchDebounced" type="search"></TextInput>
        <Separator horizontal/>
        <Group :title="account.title" margined :key="account.id" v-for="account in accounts" v-if="account.displayed">
          <Box padded vertical>
            <Box horizontal>
              <TextInput v-model="account.login"></TextInput>
              <TextInput v-model="account.pass"></TextInput>
              <Button v-on:click="showPass(account)">{{ account.showPass ? ' Hide ' : ' Show ' }}</Button>
              <Button v-if="changed(account)" v-on:click="update(account)">Update</Button>
            </Box>
            <Box horizontal>
              <Box horizontal stretchy>
                <Text>https://{{ account.url }}</Text>
              </Box>
              <Button> Open </Button>
            </Box>
          </Box>
        </Group>
        <Text v-if="found > config.entries">{{ `Hidding ${found - config.entries} results for a correct display` }}</Text>
      </Box>
      <Box label="Actions" padded>
        <Text>Display actions to be done</Text>
      </Box>
    </Tab>
  </Window>
</template>

<script>
const getSlug = require('speakingurl')
const debounce = require('lodash/debounce')
const minimist = require('minimist')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const config = minimist(process.argv.slice(2), {
  default: {
    path: './sample.json',
    entries: 5,
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
      account.displayed = true
      account.showPass = false
      account.slug = getSlug(account.title + ' ' + account.url + ' ' + account.comment)
      infosRequired.forEach((infoRequired) => {
        if (!account[infoRequired] || !account[infoRequired].length) {
          console.error('Missing "' + infoRequired + '" on account : "' + account.title + '"')
          noError = false
        }
      })
      if (noError){
        account.loginSource = account.login
        account.passSource = account.pass
        account.pass = '*****'
      }
    })
  }
} catch (e) {
  console.error('Db init failed : ', e.message)
  process.exit(1)
}


export default {
  data() {
    return {
      accounts,
      config,
      found: 0,
      searchDebounced: null,
      total: accounts.length,
      error: false
    };
  },
   created() {
    this.searchDebounced = debounce(this.search, 500)
    this.searchDebounced('')
  },
  methods: {
    exit() {
      this.$exit();
    },
    changed(account) {
      const loginChanged = (account.loginSource !== account.login)
      const passChanged = (account.passSource !== account.pass)
      return account.showPass && (loginChanged || passChanged)
    },
    update(account){
      console.log('updating account : ' + account.title)
    },
    showPass(account) {
      account.showPass = !account.showPass
      account.pass = account.showPass ? account.passSource : '*****'
    },
    search(value) {
      const filter = getSlug(value)
      let slots = parseInt(config.entries)
      // console.log('slots available : ' + slots)
      this.found = accounts.filter(account => {
        const match = (account.slug.indexOf(filter) !== -1)
        account.displayed = false
        if(slots && match){
          slots--
          account.displayed = true
        }
        return match
      }).length
      // console.log('search found : ' + this.found)
    }
  }
};
</script>
