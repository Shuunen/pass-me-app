<template>
  <Window title="Pass Me - Your personal password manager" width="400" height="600" margined :close="exit">
    <Tab margined>
      <Box label="Passwords" vertical padded>
        <TextInput v-model="filter"></TextInput>
        <Separator horizontal/>
        <Text>{{ filter.length ? 'Displaying results for "' + filter + '"' : 'Hint : type a word to filter out below results' }}</Text>
        <Group :title="account.title" margined :key="account.id" v-for="account in accounts" v-if="filter.length ? match(account) : true">
          <Box padded horizontal>
            <TextInput v-model="account.login"></TextInput>
            <TextInput v-model="account.pass"></TextInput>
            <Button v-on:click="show(account)">{{ account.show ? ' Hide ' : ' Show ' }}</Button>
            <Button v-if="changed(account)" v-on:click="update(account)">Update</Button>
          </Box>
        </Group>
      </Box>
      <Box label="Actions" padded>
        <Text>Display actions to be done</Text>
      </Box>
    </Tab>
  </Window>
</template>

<script>
const getSlug = require('speakingurl')
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
      account.show = false
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
      filter: '',
      error: false
    };
  },
  methods: {
    exit() {
      this.$exit();
    },
    changed(account) {
      const loginChanged = (account.loginSource !== account.login)
      const passChanged = (account.passSource !== account.pass)
      return account.show && (loginChanged || passChanged)
    },
    match(account){
      const str = getSlug(account.title + ' ' + account.url + ' ' + account.comment)
      return str.indexOf(getSlug(this.filter)) !== -1
    },
    update(account){
      console.log('updating account : ' + account.title)
    },
    show(account) {
      account.show = !account.show
      if(account.show){
        account.pass = account.passSource
      } else {
        account.pass = '*****'
      }
    }
  },
};
</script>
