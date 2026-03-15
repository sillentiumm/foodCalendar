<template>
  <Auth v-if="!isLoggedIn"></Auth>
  <Calendar v-else></Calendar>
  <NotificationList></NotificationList>
</template>

<script setup>
import Auth from '@/components/Auth.vue';
import Calendar from './Calendar.vue';
import NotificationList from '@/components/NotificationList.vue';

import { ref, onMounted } from 'vue';
import supabase from '../supabase';

const isLoggedIn = ref(false)

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    isLoggedIn.value = session?.access_token? true: false
    // console.log('Состояние аутентификации:', event, session);
  });
});

</script>