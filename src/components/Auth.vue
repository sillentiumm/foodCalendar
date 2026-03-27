<template>
  <div class="auth">
    <h3>Войдите в аккаунт</h3>
    <input
      v-model="email"
      class="input-full"
      placeholder="Email"
    />
    <input
      v-model="password"
      class="input-full"
      type="password"
      placeholder="Пароль"
    />
    <button @click="signUp" class="input-full">Зарегистрироваться</button>
    <button @click="signIn" class="input-full">Войти</button>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import supabase from '../supabase';

import { useNotificationsStore } from '@/stores/useNotificationsStore';
import { useRouter } from 'vue-router'

const notificationsStore = useNotificationsStore();
const router = useRouter()
const email = ref('');
const password = ref('');

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) notificationsStore.addNotification(error.message);
  else notificationsStore.addNotification('Проверьте почту для подтверждения!')
 
};

const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) notificationsStore.addNotification(error.message)
  else router.push('/')
};

</script>

<style scoped>

.auth {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

h3 {
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
}


</style>