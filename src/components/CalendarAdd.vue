<template>
  <div class="autocomplete-container">
    <form @submit.prevent="addFood" class="input-wraper">
      <input
        v-model="foodTitle"
        @input="foodSelectedEnable"
        placeholder="Добавить"
        class="input-full"
        type="text"
      />
      <div class="input-mini-wraper">
        <input
          v-model="foodWeight"
          class="input-mini"
          type="number"
        >
        <span>
          гр
        </span>
      </div>
      <button class="input-button">+</button>
    </form>
    <ul v-if="filteredFoods.length > 0 && foodTitle.length > 0 && !foodSelected" class="suggestions-list">
      <li v-for="(food, index) in filteredFoods" :key="index" @click="selectFood(food.title)">
        {{ food.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useNotificationsStore } from '@/stores/useNotificationsStore';
import { fetchFoods } from '@/api/api'

import { type food } from '@/types/index';

const notificationsStore = useNotificationsStore();

const emit = defineEmits(['addToCalendar']);

const foodTitle = ref<string>('');
const foodArray = reactive<food[]>([]);
const foodWeight = ref<number>(0);
const foodSelected = ref<boolean>(false)


const resetInputs = () => {
  foodTitle.value = ''
  foodWeight.value = 0
}

const fetch = async () => {
  const { data, error } = await fetchFoods()
  if(error) notificationsStore.addNotification(error.message)
  Object.assign(foodArray, data);
}

const filteredFoods = computed(() => {
  return foodArray.filter(food =>
    food.title.toLowerCase().includes(foodTitle.value.toLowerCase())
  );
});

const selectFood = (food: string) => {
  if (typeof food === 'string') {
    foodTitle.value = food;
    foodSelected.value = true
  } else foodTitle.value = '';
}

const foodSelectedEnable = () => foodSelected.value = false

const addFood = async () => {
  const foodIdx = foodArray.findIndex(item => item.title === foodTitle.value)
  if (foodIdx === -1) {
    notificationsStore.addNotification('Не выбран продукт')
    return
  }

  emit('addToCalendar', foodTitle.value, foodWeight.value);
  resetInputs()
  fetch()
}

onMounted(() => {
  fetch()
});

</script>

<style scoped>
.autocomplete-container {
  position: relative;
  margin: 6px;
  margin-top: 18px;
}
.suggestions-list {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
}
.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}
.suggestions-list li:hover,
.active-suggestion {
  background-color: #f0f0f0;
}
  button {
    font-size: 20px;
  }
</style>