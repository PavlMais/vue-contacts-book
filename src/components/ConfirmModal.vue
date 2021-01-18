<template>
    <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header">
                <h2>{{title}}</h2>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button class="btn" v-on:click="$emit('closed', false)">Cancel</button>
                <button class="btn" v-on:click="$emit('closed', true)">{{confirmBtnTitle}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: ['title', 'confirmBtnTitle']
}
</script>

<style scoped>
.modal-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color:red;
    background-color: rgba(0,0,0,0.4);
}
.modal-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
}
.modal-header{
    color: black;
    padding: 5px;
}
.btn{
    margin: 5px;
}
</style>
