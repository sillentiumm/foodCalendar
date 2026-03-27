<template>
  <div class="calendar-food-container">
    <div class="input-wraper">
      <div @click="openFood" class="input-full food-title">
        <div>{{ food.title }}</div>
        <div v-if="foodCalories">{{ foodCalories }} кл</div>
      </div>
      <div class="input-mini-wraper">
        <div class="input-mini">{{ food.foodWeight }}</div>
        <span>гр</span>
      </div>
      <button @click="deletefood" class="input-button">×</button>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  food: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter()
const emit = defineEmits(['deleteFood']);

const foodCalories = computed(() => {
  return props.food.calories?? 0 * props.food.foodWeight / 100
});

const deletefood = () => {
  emit('deleteFood', props.food.id);
}

const openFood = () => {
  router.push({
    name: 'active-food',
    query: {
      title: props.food.title
    }
  });
}

</script>

<style scoped>
.food {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 6px;
  padding: 6px;
  margin: 6px;
}

.food-title {
  display: flex;
  justify-content: space-between;
  padding-right: 6px !important;
}

button {
  background-color: #D8321E;
  font-size: 20px;
}

.calendar-food-container {
  margin: 6px;
}
</style>