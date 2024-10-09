<template>
  <div v-if="show" class="modal-window">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(['show'])
</script>

<style>
.modal-window {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  box-sizing: border-box;
  background-color: #fff;
  margin: auto;
  padding: 20px;
  max-width: 500px;
  text-align: center;
}

@media (max-width: 500px) {
  .modal-content {
    max-width: 350px;
  }
}
</style>
