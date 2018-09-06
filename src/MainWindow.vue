<template>
  <Window title="pass-me-app" width="400" height="100" margined v-on:close="exit">
    <Box>
      <Text>Welcome to your Vuido application dudo :p</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$exit();
    }
  }
}
</script>
