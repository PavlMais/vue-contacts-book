<template>
  <div>
    <div class="field-item" @mouseover="hover = true" @mouseleave="hover = false">
      <div v-if="isEditing">
        <input v-model="loc_field" type="text" placeholder="Field">
        <input v-model="loc_value" type="text" placeholder="Value">
        <button :disabled="!loc_field || !loc_value" @click="saveItem()">Save</button>
      </div>
      <div v-else>
        {{loc_field}}: {{loc_value}}
        <button v-if="hover && canEdit" @click="startEdition()">Edit</button>
        <button v-if="hover && canEdit" @click="deleteField()">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: ['field', 'value', 'canEdit', 'isEdition'],
  data () {
    return {
      isEditing: false,
      loc_field: this.field,
      loc_value: this.value,
      hover: false
    }
  },
  components: {
  },
  methods: {
    startEdition () {
      this.isEditing = true
      this.$emit('isEditiongChanged', true)
    },
    saveItem () {
      this.isEditing = false
      this.$emit('itemSaved', { key: this.loc_field, value: this.loc_value })
      this.$emit('isEditiongChanged', false)
    },
    deleteField (fieldKey) {
      this.$emit('itemDeleted', this.loc_field)
    }
  }
}
</script>

<style scoped>
.field-item {
  border: 1px solid black;
}
</style>
