<template>
  <div class="dropzone" :class="{ visible: showDropzone }">Drop your json file here !</div>
</template>

<script>
import { eventBus } from '../store'

export default {
  data () {
    return {
      showDropzone: false
    }
  },
  created () {
    window.addEventListener('dragenter', this.onDragEnter)
    // window.addEventListener('dragleave', this.onDragLeave)
    window.addEventListener('dragover', this.onDragOver)
    window.addEventListener('drop', this.onDrop)
  },
  beforeDestroy () {
    window.removeEventListener('dragenter', this.onDragEnter)
    // window.removeEventListener('dragleave', this.onDragLeave)
    window.removeEventListener('dragover', this.onDragOver)
    window.removeEventListener('drop', this.onDrop)
  },
  methods: {
    onDragEnter (event) {
      console.log('onDragEnter')
      // event.preventDefault()
      this.showDropzone = true
    },
    onDragLeave (event) {
      console.log('onDragLeave')
      event.preventDefault()
      this.showDropzone = false
    },
    onDragOver (event) {
      // console.log('onDragOver')
      event.preventDefault()
      // this.showDropzone = true
    },
    onDrop (event) {
      // console.log('onDrop', event)
      event.preventDefault()
      this.showDropzone = false
      // console.log('drop', event)
      var files = event.dataTransfer.files
      if (!files.length) {
        console.warn('droped no files')
      }
      if (!files[0].path) {
        console.error('cannot find path of file')
      }
      const path = files[0].path
      console.log('droped file :', path)
      eventBus.$emit('load-path', path)
    }
  }
}
</script>

<style>
.dropzone {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #00000099;
  z-index: 10;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  opacity: 0;
  pointer-events: none;
}
.dropzone.visible {
  opacity: 1;
  pointer-events: all;
}
</style>
