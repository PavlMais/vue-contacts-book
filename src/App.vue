<template>
  <div class="app">
    <router-view/>
    <ConfirmModal title="Undo?" v-show="showModalUndo" @closed="confirmUndo" confirmBtnTitle="Yes"/>
  </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
export default {
  components: {
    ConfirmModal
  },
  data () {
    return {
      showModalUndo: false
    }
  },
  mounted () {
    document.addEventListener('keyup', this.keyupHandler)
  },
  destroyed () {
    document.removeEventListener('keyup', this.keyupHandler)
  },
  methods: {
    keyupHandler (event) {
      if (event.ctrlKey && event.code === 'KeyZ') {
        this.showModalUndo = true
      }
    },
    confirmUndo (confirm) {
      if (confirm) this.undo()
      this.showModalUndo = false
    }
  }
}
</script>
<style>
.app{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
}
.btn{
  border-radius: 3px;
  padding: 5px;
}
.btn:hover{
  background-color: #ccc;
}
.hint{
  color: #ccf;
}
</style>
