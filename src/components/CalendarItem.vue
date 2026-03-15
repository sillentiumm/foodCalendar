<template>
  <div class="item">
    {{ item.title }}
    <button @click="deleteItem">×</button>
  </div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['deleteItem']);

const deleteItem = () => {
  emit('deleteItem', props.item.id);
}

</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 6px;
  padding: 6px;
  margin: 6px;
}
button {
  width: 24px;
  height: 24px;
  background-color: #D8321E;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 2px;
  z-index: 100;
}
</style>