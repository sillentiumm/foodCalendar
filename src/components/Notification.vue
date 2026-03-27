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
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 4px;
  padding: 10px;
  transition: all 1s ease;
}


</style>