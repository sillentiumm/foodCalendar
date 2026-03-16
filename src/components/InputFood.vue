<template>
  <div class="autocomplete-container">
    <form @submit.prevent="addFood" class="input-wrapper">
      <input
        v-model="inputValue"
        @input="filterfoods"
        placeholder="Введите текст..."
        class="autocomplete-input"
        type="text"
      />
      <button class="input-button">+</button>
    </form>
    <ul v-if="filteredFoods.length > 0 && inputValue.length > 0" class="suggestions-list">
      <li v-for="(food, index) in filteredFoods" :key="index" @click="selectFood(food)"
        :class="{ 'active-suggestion': index === activeSuggestionIndex }">
        {{ food }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import supabase from '../supabase';

import { useNotificationsStore } from '@/stores/useNotificationsStore';
const notificationsStore = useNotificationsStore();

const emit = defineEmits(['addToCalendar']);

const inputValue = ref('');
const activeSuggestionIndex = ref(-1);
const foodArray = reactive([])

const filteredFoods = computed(() => {
  return foodArray.filter(food =>
    food.toLowerCase().includes(inputValue.value.toLowerCase())
  );
});

function filterfoods() {
  activeSuggestionIndex.value = -1;
}

function selectFood(food) {
  if (typeof food === 'string') {
    inputValue.value = food;
  } else {
    inputValue.value = filteredSuggestions.value[activeSuggestionIndex.value];
  }
  activeSuggestionIndex.value = -1;
}

const fetchFoods = async () => {
  const { data, error } = await supabase
    .from('foodsList')
    .select();

  if (error) {
    console.error('Ошибка при получении данных:', error.message);
  } else {
    if (!data.length) return
    data.forEach(el => {
      foodArray.push(el.title)
    })
  }
}

const addFood = async () => {
  console.log(foodArray)
  if (!(foodArray.some(item => item === inputValue.value))) {
    const { data, error } = await supabase
      .from('foodsList')
      .insert([{ title: inputValue.value }]);

    if (error) notificationsStore.addItem(error.message);
    else  notificationsStore.addItem('Еда успешно добавлен!')
  }
  emit('addToCalendar', inputValue.value);
  fetchFoods()
}

onMounted(() => {
  fetchFoods()
});

</script>

<style scoped>
.autocomplete-container {
  position: relative;
  margin: 6px;
  margin-top: 18px;
}
.autocomplete-input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.suggestions-list {
  position: absolute;
  top: 100%;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
.input-wrapper {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}
.input-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background-color: #78fa78;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>