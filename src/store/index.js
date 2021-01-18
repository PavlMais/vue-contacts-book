import Vue from 'vue'
import Vuex from 'vuex'
import VuexUndoRedo from '@/store/undo'

Vue.use(Vuex)

Vue.use(VuexUndoRedo)

function initalState () {
  return {
    contacts: [
      {
        id: 1,
        name: 'Pavlo Maistruk',
        fields: [
          {
            field: 'Phone',
            value: 3809123323
          },
          {
            field: 'Skype',
            value: 'PaulMais'
          },
          {
            field: 'Telegram',
            value: 'PavlMais'
          }
        ]
      },
      {
        id: 2,
        name: 'James Smith',
        fields: [
          {
            field: 'Phone',
            value: 4332543
          },
          {
            field: 'Email',
            value: 'jamessmith@emain.dot'
          }
        ]
      },
      {
        id: 3,
        name: 'Maria Garcia',
        fields: [
          {
            field: 'Email',
            value: 'maria@mail.dot'
          }
        ]
      },
      {
        id: 4,
        name: 'Jack Ellis',
        fields: [
          {
            field: 'Email',
            value: 'jackellis@emain.dot'
          },
          {
            field: 'Skype',
            value: 'jackellis'
          },
          {
            field: 'Phone',
            value: 135203232
          }
        ]
      }
    ],
    lastId: 5
  }
}
export default new Vuex.Store({
  state: initalState(),
  getters: {
    allContact: state => state.contacts,
    getContact: state => id => {
      return state.contacts.find(contact => contact.id === id)
    }
  },
  mutations: {
    emptyState () {
      this.replaceState(initalState())
    },
    addContact (state, contact) {
      contact.id = state.lastId++
      state.contacts.push(contact)
    },
    editContactName (state, payload) {
      payload.contact.name = payload.newName
    },
    deleteContact (state, payload) {
      state.contacts.splice(payload.index, 1)
    },
    addContactField (state, payload) {
      const contact = state.contacts.find(contact => contact.id === payload.contactId)
      contact.fields.push(payload.field)
    },
    editContactField (state, payload) {
      const contact = state.contacts.find(contact => contact.id === payload.contactId)
      Vue.set(contact.fields, payload.fieldIndex, payload.field)
    },
    deleteContactField (state, payload) {
      const contact = state.contacts.find(contact => contact.id === payload.contactId)
      contact.fields.splice(payload.fieldIndex, 1)
    }
  }
})
