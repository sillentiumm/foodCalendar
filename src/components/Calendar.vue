<template>
  <div class="calendar">
    <div class="calendar-title">
      <ArrowLeft></ArrowLeft>
      <input class="input_hide" ref="dateInput" v-model="formattedDate" type="date" @input="downloadCalendar">
      <div @click="openDatePicker">
        {{ formattedDate }}
      </div>
      <ArrowRight></ArrowRight>
    </div>
    <div v-for="food in calendarList">
      <CalendarItem :food="food" @deleteFood="deleteFromCalendar">
      </CalendarItem>
    </div>
    <div v-if="globalCalories" class="input-wraper">
      <div class="input-full" style="margin: 8px;">
        <span>
          Итого: {{ globalCalories }} кл.
        </span>
        <span v-if="globalCalories > 2000">
          Обнаружен форс-зажор
        </span>
      </div>
    </div>
    <CalendarAdd @addToCalendar="addToCalendar">
    </CalendarAdd>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import CalendarAdd from './CalendarAdd.vue';
import CalendarItem from '@/components/CalendarItem.vue';
import ArrowLeft from '@/components/icons/ArrowLeft.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import { useNotificationsStore } from '@/stores/useNotificationsStore';
import { fetchFood, fetchCalendar, addFoodToCalendar, deleteFoodFromCalendar } from '@/api/api'

import { type calendarElement } from '@/types/index';

const notificationsStore = useNotificationsStore();
const router = useRouter()
const route = useRoute()

const formattedDate = ref<string>('')
const calendarList = reactive<calendarElement[]>([])
const dateInput = ref<HTMLInputElement | null>(null);

const globalCalories = computed(() => {
  return calendarList.reduce((sum, food) => sum + food.calories * food.foodWeight / 100, 0);
});

const calendarToday = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  formattedDate.value = `${year}-${month}-${day}`;
}

const downloadCalendar = async () => {
  router.push({
    name: 'calendar',
    query: {
      date: formattedDate.value
    }
  });
  calendarList.splice(0)
  const { data, error } = await fetchCalendar(formattedDate.value)
  if (error) {
    console.error('Ошибка при получении данных:', error.message);
  } else {
    calendarList.push(...data)
    for (let i = 0; i < calendarList.length; i++) {
      const { data, error } = await fetchFood(calendarList[i]!.title)
      if (error) notificationsStore.addNotification(error.message)
      calendarList[i]!.calories = data[0]?.calories || 0
    }
  }
}

const addToCalendar = async (title: string, weight: number) => {
  if (!title || !formattedDate.value) return
  const calendarData = {
    title: title,
    date: formattedDate.value,
    foodWeight: weight
  }
  const data = await addFoodToCalendar(calendarData)
  if (data.error) notificationsStore.addNotification(data.error.message)
  else downloadCalendar()
}

const deleteFromCalendar = async (id: number) => {
  const data = await deleteFoodFromCalendar(id)
  if (data.error) notificationsStore.addNotification(data.error.message)
  else downloadCalendar()
}

const openDatePicker = () => {
  if (dateInput.value) dateInput.value.showPicker();
};

onMounted(() => {
  if (route.query.date) formattedDate.value = route.query.date as string
  else calendarToday()
  downloadCalendar()
});

</script>

<style scoped>
.calendar {
  height: 400px;
  margin-top: 16px;
}

.calendar-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
}

.calendar-title * {
  cursor: pointer;
}

.input_hide {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 100px;
}
</style>