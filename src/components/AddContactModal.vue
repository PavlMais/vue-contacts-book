<template>
  <ConfirmModal title="Add new contact" confirmBtnTitle="Add" @closed="closed">
      <div class="name-field">
        <div>
          Name:
          <input v-model="name" type="text">
        </div>
        <p class="name-required" v-show="showNameRequired">Name required</p>
      </div>
      <KeyValueList
        :items="fields"
        @newItemAdded="newItemAdded"
        @itemEdited="itemEdited"
        @deleteField="deleteItem"
      />
      <p class="name-required" v-show="showFieldRequired">At least one field is required</p>

  </ConfirmModal>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import KeyValueList from '@/components/KeyValueList.vue'

function initData () {
  return {
    name: '',
    showNameRequired: false,
    showFieldRequired: false,
    fields: []
  }
}

export default {
  name: 'AddContactModal',
  components: {
    KeyValueList,
    ConfirmModal
  },
  data () {
    return initData()
  },
  methods: {
    closed (confirm) {
      if (confirm) {
        if (!this.fields.length) {
          this.showFieldRequired = true
          return
        }
        if (this.name === '') {
          this.showNameRequired = true
          return
        }
      }
      this.$emit('closed', { confirm, contact: { name: this.name, fields: this.fields } })
      Object.assign(this.$data, initData())
    },
    newItemAdded (field) {
      this.showFieldRequired = false
      this.fields.push(field)
    },
    itemEdited (payload) {
      this.fields[payload.fieldIndex] = payload.field
    },
    deleteItem (item, index) {
      this.field.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.name-field{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.name-required{
  color: red;
  padding: 0;
  margin: 0;
}
</style>
