<template>
  <table class="key-value-table" border=1 frame=void rules=rows>
    <template  v-for="(item, index) in items">
      <tr class="key-value-item" :key="index">
      <template v-if="isEditing == index">
        <td>
          <input v-model="item.field" type="text" placeholder="Field">
        </td>
        <td>
          <input v-model="item.value" type="text" placeholder="Value">
        </td>
        <td>
          <button class="btn" :disabled="!item.field || !item.value" @click="itemEdited({fieldIndex: index, field: item})">Save</button>
        </td>
      </template>
      <template v-else>
        <td>
          {{item.field}}
        </td>
        <td>
          {{item.value}}
        </td>
        <td>
          <button class="btn" hiden v-if="!isEditing" @click="isEditing = index">Edit</button>
          <button class="btn second-btn" hiden v-if="!isEditing" @click="deleteItem(item, index)">Delete</button>
        </td>
      </template>
    </tr>
    </template>
    <tr>
      <td>
        <input v-model="newItem.field" type="text" placeholder="Field">
      </td>
      <td>
        <input v-model="newItem.value" type="text" placeholder="Value">
      </td>
      <td>
        <button class="btn" :disabled="!newItem.field || !newItem.value || isEditing" @click="addField()">Add field</button>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      hover: null,
      isEditing: null,
      newItem: {}
    }
  },
  methods: {
    addField () {
      this.$emit('newItemAdded', this.newItem)
      this.newItem = {}
    },
    itemEdited (payload) {
      this.isEditing = null
      this.$emit('itemEdited', payload)
    },
    deleteItem (item, index) {
      this.$emit('deleteField', index)
    }
  }
}
</script>

<style scoped>
td {
  padding-top:10px;
  padding-bottom:10px;
  padding-right:10px;
}
td:first-child {
  padding-left:10px;
  padding-right:0;
}
tr button[hiden]{
  display: none;
}

tr:hover button{
  display: initial;
}
.second-btn{
  margin-left: -4px;
}
input {
  height: 22px;
}

</style>
