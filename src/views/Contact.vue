<template>
  <div class="contact">
      <div class="contact-header">
        <div class="contact-header-back">
          <router-link to="/" tag="button" class="btn">Back</router-link>
        </div>
        <div class="contact-header-info" v-if="editingName">
          <input class="contact-header-field" v-model="newName" type="text">
          <button class="btn contact-header-btn" @click="editName" >Save</button>
        </div>
        <div class="contact-header-info" v-else>
          <h3 class="contact-header-field">{{contact.name}}</h3>
          <button class="btn contact-header-btn" @click="editingName = true">Edit</button>
        </div>
      </div>
    <KeyValue
      :items="contact.fields"
      @newItemAdded="addField"
      @itemEdited="editField"
      @deleteField="deleteField"
    />
    <ConfirmModal
      title="Delete field?"
      v-show="showConfirmModal"
      @closed="confirmModelClosed"
      confirmBtnTitle="Delete"
    />
    <div class="contact-footer">
      <p class="hint">Use Ctrl+Z to undo</p>

    </div>
  </div>
</template>
<script>
import KeyValue from '@/components/KeyValueList.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
export default {
  name: 'Contact',
  data () {
    return {
      editingName: false,
      newName: null,
      showConfirmModal: false,
      deleteFieldIndex: null
    }
  },
  components: {
    KeyValue,
    ConfirmModal
  },
  methods: {
    editName () {
      this.editingName = false
      this.$store.commit('editContactName', {
        contact: this.contact,
        newName: this.newName
      })
    },
    addField (field) {
      this.$store.commit('addContactField', {
        contactId: parseInt(this.$route.params.id),
        field
      })
    },
    editField (field) {
      this.$store.commit('editContactField', {
        contactId: parseInt(this.$route.params.id),
        field
      })
    },
    deleteField (fieldIndex) {
      this.showConfirmModal = true
      this.deleteFieldIndex = fieldIndex
    },
    confirmModelClosed (confirm) {
      if (confirm) {
        this.$store.commit('deleteContactField', {
          contactId: parseInt(this.$route.params.id),
          fieldIndex: this.deleteFieldIndex
        })
      } else {
        this.deleteFieldIndex = null
      }
      this.showConfirmModal = false
    }
  },
  created () {
    this.newName = this.contact.name
  },
  computed: {
    contact () {
      return this.$store.getters.getContact(parseInt(this.$route.params.id))
    }
  }
}
</script>

<style scoped>
.contact{
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.contact-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.contact-header-back{
  flex-grow: 2;
}
.contact-header-info{
  flex-grow: 2;

  display: flex;
  align-items: center;
}
.contact-header-info > button{
  margin-left: 10px;
}
.contact-header-info > input{
  margin: 16px 0;
  height: 22px;
}
.contact-footer{
  display: flex;
  justify-content: center;
}
</style>
