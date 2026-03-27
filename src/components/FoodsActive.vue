<template>
  <div style="position: relative;">
    <h3 v-if="foodError" style="padding-top: 12px; padding-left: 8px;">
      {{ foodError }}
    </h3>
    <div v-else class="food-active">
      <div class="foods-add">
        <h3>
          Название
        </h3>
        <input v-model="foodNew.title" class="input" type="text">

        <h3>
          Ингридиенты
        </h3>
        <div v-for="ingredient in foodNew.ingredients" class="input-wraper form">
          <div class="input">
            {{ ingredient }}
          </div>
          <button @click.prevent="deleteIngridient(ingredient)" class="input-button-add input-button-delete">
            ×
          </button>
        </div>
        <form action="" class="input-wraper form">
          <input v-model="newIngridient" class="input" type="text">
          <button @click.prevent="addNewIngrediens" class="input-button-add">
            ✔
          </button>
        </form>

        <h3>
          Описание
        </h3>
        <textarea ref="textarea" v-model="foodNew.description" @input="autoResize" @click="autoResize"></textarea>
        <h3>
          Калорийность в 100 гр
        </h3>
        <input v-model="foodNew.calories" class="input" type="number">
      </div>
      <div class="foods-active-buttons">
        <button @click="saveChanges" class="button_save">
          Сохранить
        </button>
        <button @click="cancelChanges" class="button_cancel">
          Отменить
        </button>
        <button @click="deleteFood" class="button_delete">
          Удалить
        </button>
      </div>
    </div>
    <button @click="close" class="close">×</button>
  </div>
</template>

<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import { fetchFood, updateFoodInFoodlist, deleteFoodFromFoodlist } from '@/api/api'
import { useNotificationsStore } from '@/stores/useNotificationsStore';

import { type food } from '@/types/index';

const notificationsStore = useNotificationsStore();

const router = useRouter()
const route = useRoute()

const foodNew = reactive<food>({} as food)
const foodOld = reactive<food>({} as food)
const newIngridient = ref<string>('')
const textarea = ref<HTMLTextAreaElement | null>(null);
const foodError = ref<string>('')
const foodTitle = ref<string>('');

const addNewIngrediens = () => {
  if (!newIngridient.value) return
  foodNew.ingredients.push(newIngridient.value)
  newIngridient.value = ''
}

const deleteIngridient = (ingredient:string) => {
  const idx = foodNew.ingredients.findIndex(el => el === ingredient)
  foodNew.ingredients.splice(idx, 1)
}

const saveChanges = async () => {
  const foodData = {
    title: foodNew.title,
    description: foodNew.description,
    calories: foodNew.calories,
    ingredients: foodNew.ingredients
  }
  const { data, error } = await updateFoodInFoodlist(foodData, foodNew.id)
  if(!error) {
    Object.assign(foodOld, JSON.parse(JSON.stringify(foodNew)));
    notificationsStore.addNotification('Сохранено')
  }
  else notificationsStore.addNotification(error.message)
}

const cancelChanges = () => {
  Object.assign(foodNew, JSON.parse(JSON.stringify(foodOld)));
}

const deleteFood = async () => {
  const data = await deleteFoodFromFoodlist(foodNew.id)
  if(data.error) notificationsStore.addNotification(data.error.message)
  else router.back()
}

const close = () => {
  router.back()
}

const fetchActiveFood = async () => {
  const { data, error } = await fetchFood(foodTitle.value)
  if (error) {
    notificationsStore.addNotification(error.message)
  } else if(data[0]) {
    Object.assign(foodOld, structuredClone(data[0]));
    Object.assign(foodNew, structuredClone(data[0]));
  } else {
    foodError.value = 'Данного названия нет в базе'
  }
}

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight + 8}px`;
  }
};

onMounted(() => {
  if(typeof route.query.title === 'string') foodTitle.value = route.query.title
  if (foodTitle.value) fetchActiveFood()
  autoResize()
})

</script>

<style scoped>
.food-active {
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background-color: azure;
  padding-top: 12px;
  padding-bottom: 12px;
}

.foods-add {
  padding: 8px;
}

.foods-add>* {
  margin-bottom: 12px;
}

form {
  display: flex;
  flex-direction: column;
}

.foods-active-buttons {
  display: flex;
}

.foods-active-buttons button {
  width: 100%;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 4px;
  margin: 4px;
  padding: 8px;
}
</style>