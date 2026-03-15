<template>
  <div class="calendar">
    <div class="calendar-title">
      <ArrowLeft></ArrowLeft>
        <input
          class="input_hide"
          ref="dateInput"
          v-model="formattedDate"
          type="date"
          @input="fetchCalendar"
        >
        <div @click="openDatePicker">
           {{ formattedDate }}
        </div>
      <ArrowRight></ArrowRight>
    </div>
    <div v-for="item in calendarList">
      <CalendarItem
        :item="item"
        @deleteItem="deleteFromCalendar"
      >
      </CalendarItem>
    </div>
    <InputFood
      @addToCalendar="addToCalendar"
    >
    </InputFood>
  </div>
</template>

<script setup>

import { ref, onMounted, reactive } from 'vue';
import supabase from '../supabase';

import InputFood from '@/components/inputFood.vue';
import CalendarItem from '@/components/CalendarItem.vue';
import ArrowLeft from '@/components/icons/ArrowLeft.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';

import { useNotificationsStore } from '@/stores/useNotificationsStore';
const notificationsStore = useNotificationsStore();

const formattedDate = ref('')
const calendarList = reactive([])
const dateInput = ref(null);

const calendarToday = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  formattedDate.value = `${year}-${month}-${day}`;
}

const fetchCalendar = async () => {
  calendarList.splice(0)
  const { data, error } = await supabase
    .from('calendar')
    .select()
    .eq('date', formattedDate.value);
  if (error) {
    console.error('Ошибка при получении данных:', error.message);
  } else {
    calendarList.push(...data)
  }
}

const addToCalendar = async (title) => {
  const { data, error } = await supabase
    .from('calendar')
    .insert([{ title: title, index: 1, date: formattedDate.value }]);
  if (error) notificationsStore.addItem(error.message);
  else notificationsStore.addItem('Еда успешно добавлена!');
  fetchCalendar()
}

const deleteFromCalendar = async (id) => {
  console.log(id)
  try {
    const { error } = await supabase
      .from('calendar')
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    fetchCalendar()
  } catch (error) {
    console.error('Ошибка при удалении поста:', error.message);
  }
}

const openDatePicker = () => {
  dateInput.value.showPicker();
};

onMounted(() => {
  calendarToday()
  fetchCalendar()
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