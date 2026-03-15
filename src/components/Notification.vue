<template>
  <div class="notification">
    {{ title }}
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String
  },
});

</script>


<style scoped>

.notification {
  width: 100%;
  background-color: #ccc;
  border-radius: 8px;
  margin-bottom: 4px;
  padding: 8px;
}

</style>