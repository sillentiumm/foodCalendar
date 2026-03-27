<template>
   <div class="container">
    <router-view />
    <NotificationList></NotificationList>
   </div>
</template>

<script setup>

import supabase from './supabase';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import NotificationList from './components/NotificationList.vue';

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    isLoggedIn.value = session?.access_token? true: false
    if(!isLoggedIn.value) router.push('/auth')
  });
});

</script>