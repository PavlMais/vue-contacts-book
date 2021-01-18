<template>
  <div class="contacts">
    <h2>Contacts</h2>
    <button class="btn btn-add-contact" @click="showAddContact = true">Add contact</button>
    <div v-for="contact of contacts" :key="contact.id" @click="open(contact.id)">
      <div class="contact-item">
        <div class="contact-info">
          <div class="contact-name">{{contact.name}}</div>
          <div v-if="contact.fields.length">{{contact.fields[0].field}}: {{contact.fields[0].value}}</div>
        </div>
        <div class="contact-actions">
          <button class="btn" @click.stop="deleteContact(contact.id)">Delete</button>
        </div>
      </div>
    </div>
    <ConfirmModal title="Delete contact?" v-show="showModalDelete" @closed="confirmDelete" confirmBtnTitle="Delete"/>
    <AddContactModal v-show="showAddContact" @closed="addContactModelClosed"/>
    <div class="contacts-footer">
      <p class="hint">Use Ctrl+Z to undo</p>

    </div>
  </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'
import AddContactModal from '@/components/AddContactModal.vue'

export default {
  name: 'Home',
  components: {
    ConfirmModal,
    AddContactModal
  },
  data () {
    return {
      showModalDelete: false,
      deleteingId: null,
      showAddContact: false
    }
  },
  methods: {
    open (id) {
      this.$router.push({ name: 'Contact', params: { id } })
    },
    deleteContact (id) {
      this.showModalDelete = true
      this.deleteingId = id
    },
    confirmDelete (ok) {
      this.showModalDelete = false
      if (ok) this.$store.commit('deleteContact', this.deleteingId)
    },
    addContactModelClosed (payload) {
      if (payload.confirm) {
        this.$store.commit('addContact', payload.contact)
      }
      this.showAddContact = false
    }
  },
  computed: {
    contacts () {
      return this.$store.state.contacts
    }
  }
}
</script>

<style scoped>

.contacts{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-name{
  font-weight: bold;
  font-size: 1.2rem;
}
.btn-add-contact {
  margin: 5px;
  height: 30px;
}
.contact-item {
  margin: 5px;
  display: flex;
  border: 1px solid black;
  width: 270px;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
}
.contact-item:hover {
  margin: 5px 0;
}
.contact-actions{
  display: none;
  z-index: 4;
}
.contact-item:hover .contact-actions {
  display: initial;
}
.contacts-footer{
  display: flex;
  justify-content: center;
}
</style>
