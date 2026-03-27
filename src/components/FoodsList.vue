<template>
  <h3>
    Список блюд
  </h3>
  <div class="input-wraper">
    <input
      v-model="searchingFood"
      class="input-full"
      style="margin: 8px;"
      placeholder="Поиск"
      type="text"
    >
  </div>
  <FoodsItem
    v-for="food in filteredFoodsList"
    :food="food"
  >
  </FoodsItem>
</template>

<script setup lang="ts">

import { ref, reactive, computed, onMounted } from 'vue'

import FoodsItem from './FoodsItem.vue';
import { fetchFoods } from '@/api/api.ts'
import { useNotificationsStore } from '@/stores/useNotificationsStore';

import { type food } from '@/types/index';

const notificationsStore = useNotificationsStore();
const foods = reactive<food[]>([]);
const searchingFood = ref<string>('')

const downloadFoods = async () => {
  const { data, error } = await fetchFoods()
  if(error) notificationsStore.addNotification(error.message)
  foods.splice(0)
  foods.push(...data)
}

const filteredFoodsList = computed(() => {
  return foods.filter(food => food.title.includes(searchingFood.value))
});

onMounted(() => {
  downloadFoods()
});

</script>

<style scoped>

h3 {
  margin-bottom: 12px;
  padding-top: 8px;
  padding-left: 12px;
}

</style>