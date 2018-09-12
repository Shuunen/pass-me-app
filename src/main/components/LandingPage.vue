<template>
  <div id="landing-page" class="parent-height">
    <DropZone />
    <div class="col parent-height">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
      <AccountList />
      <img class="logo" src="@/assets/images/logo.png">
    </div>
  </div>
</template>

<script>
import AccountList from './AccountList'
import DropZone from './DropZone'

export default {
  name: 'landing-page',
  data () {
    return {
      title: 'Pass Me',
      subtitle: 'Your personal password manager'
    }
  },
  components: { AccountList, DropZone }
}
</script>

<style>
h1 {
  margin-top: 10px;
  margin-bottom: 0px;
}
h2 {
  margin-top: 10px;
}
.logo {
  height: 100px;
  margin: 20px;
}
</style>
