<template>
  <div class="account line">
    <div class="title">{{ account.title }}</div>
    <input class="login" :value="account.login" />
    <input class="pass" :value="account.showPass ? account.pass : '*****'" />
    <button class="btn btn-toggle" @click="togglePass">{{ account.showPass ? 'Hide' : 'Show' }}</button>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true
    },
  },
  methods: {
    togglePass () {
      console.log(`user wants to ${this.account.showPass ? 'hide' : 'show'} pass of : ` + this.account.title)
      this.account.showPass = !this.account.showPass
    }
  },
}
</script>

<style>
.account.line {
  justify-content: space-between;
  background-color: #dedede;
  padding: 8px 12px;
  flex-shrink: 0;
  transition: background-color .3s;
}
.account.line:hover {
  background-color: lightblue;
}
.account.line:nth-child(odd) {
  background-color: slategray;
  color: white;
}
.account.line:hover:nth-child(odd) {
  background-color: slateblue;
}
.account .title {
  width: 30%;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.account input {
  width: 20%;
}
.account .btn-toggle {
  width: 10%;
}
</style>
