<template>
  <div id="app" class="parent-height">
    <landing-page></landing-page>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage'

export default {
  name: 'app',
  components: { LandingPage }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: sans-serif;
  text-align: center;
  color: #2c3e50;
}
.line, .col {
  display: flex;
}
.col {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.parent-height {
  height: 100%;
}
.parent-width {
  width: 100%;
}
input, button {
  padding: 4px 6px;
  border-radius: 3px;
  border: 0;
  background-color: white;
}
button {
  cursor: pointer;
}
</style>
