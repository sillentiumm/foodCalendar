<template>
  <div @click="setActiveItem" class="item">
    {{ food.title }}
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

import { type food } from '@/types/index';

const router = useRouter()

const props = defineProps<{
  food: food;
}>();

const setActiveItem = () => {
  router.push({
    name: 'active-food',
    query: {
      title: props.food.title,
    }
  });
}

</script>

<style scoped>

.item {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  padding: 11px;
  padding-right: 40px;
  margin: 8px;
  cursor: pointer;
}

</style>