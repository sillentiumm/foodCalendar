<template>
  <div v-if="FoodAddIsHidden" class="foods">
    <FoodsList></FoodsList>
    <div class="foods-add-button-wraper">
      <button @click="changeFoodAddVisible" class="foods-add-button">Добавить</button>
    </div>
  </div>
  <FoodsAdd
    v-else
    @close = changeFoodAddVisible
  >
  </FoodsAdd>
</template>

<script setup>
import { ref } from 'vue';

import FoodsList from '@/components/FoodsList.vue';
import FoodsAdd from '@/components/FoodsAdd.vue';

const FoodAddIsHidden = ref(true)

const changeFoodAddVisible = () => FoodAddIsHidden.value = !FoodAddIsHidden.value

</script>

<style scoped>

button {
  height: 42px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #fff;
  border-radius: 4px;
  margin: 8px;
  padding: 8px;
}

.foods-add-button-wraper {
  position: sticky;
  bottom: 6px;
  display: flex;
  justify-content: end;
  flex: 1;
  padding-right: 2px;
}

</style>