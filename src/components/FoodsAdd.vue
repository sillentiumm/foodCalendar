<template>
  <div class="foods-add">
    <h3>Название</h3>
    <input
      v-model="title"
      class="input"
      type="text"
    >

    <h3>Ингридиенты</h3>
    <div
      v-for="ingridient in ingredients"
      class="input-wraper form"
    >
      <div class="input">
        {{ ingridient }}
      </div>
      <button
        @click.prevent="deleteIngridient(ingridient)"
        class="input-button-add input-button-delete"
      >×</button>
    </div>
    <form action="" class="input-wraper form">
      <input
        v-model="newIngridient"
        class="input"
        type="text"
      >
      <button
        @click.prevent="addIngridient"
        class="input-button-add"
      >✔</button>
    </form>

    <h3>Описание</h3>
    <textarea
      ref="textarea"
      v-model="descr"
      @input="autoResize"
    ></textarea>

    <h3>Калорийность в 100 гр</h3>
    <input
      v-model="calories"
      class="input"
      type="number"
    >
    <div class="foods-add-buttons">
      <button @click="addFood" class="button_save">Сохранить</button>
      <button @click="close" class="button_delete">Отменить</button>
    </div>
    <button @click="close" class="close">×</button>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue';
import { addFoodToFoodlist } from '@/api/api'
import { useNotificationsStore } from '@/stores/useNotificationsStore';

const emit = defineEmits(['close',]);

const notificationsStore = useNotificationsStore();

const textarea = ref<HTMLTextAreaElement | null>(null);
const newIngridient = ref<string>('')
const title = ref<string>('')
const descr = ref<string>('')
const calories = ref<number>(0)
const ingredients = reactive<string[]>([])

const addIngridient = () => {
  if(newIngridient.value) {
    ingredients.push(newIngridient.value)
    newIngridient.value = ''
  }
}

const deleteIngridient = (ingridient:string) => {
  const idx = ingredients.findIndex(el => el === ingridient)
  ingredients.splice(idx, 1)
}

const close = () => emit('close')

const addFood = async () => {
  if(!title.value) return
  const foodData = {
    title: title.value,
    description: descr.value,
    calories: calories.value,
    ingredients: ingredients
  }
  const data = await addFoodToFoodlist(foodData)
  if(data.error) notificationsStore.addNotification(data.error.message)
  else close()
}

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight + 8}px`;
  }
};

onMounted(autoResize);

</script>

<style scoped>
.foods-add {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: azure;
  padding: 8px;
  padding-top: 20px;
}

.foods-add > * {
  margin-bottom: 12px;
}

form {
  display: flex;
  flex-direction: column;
}

.foods-add-buttons {
  display: flex;
}
.foods-add-buttons button {
  width: 100%;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 4px;
  margin: 4px;
  padding: 8px;
}

</style>