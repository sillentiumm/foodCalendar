<template>
  <div class="wraper">
    <div class="auth">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Пароль" />
      <button @click="signUp">Зарегистрироваться</button>
      <button @click="signIn">Войти</button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../supabase';

import { useNotificationsStore } from '@/stores/useNotificationsStore';
const notificationsStore = useNotificationsStore();

const email = ref('');
const password = ref('');
// const authStatus = ref('SIGNED_OUT')

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) notificationsStore.addItem(error.message);
  else notificationsStore.addItem('Проверьте почту для подтверждения!')
 
};

const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) notificationsStore.addItem(error.message)
};

const signOut = () => {
  supabase.auth.signOut()
  console.log('out')
}

// onMounted(() => {
//   supabase.auth.onAuthStateChange((event, session) => {
//     authStatus.value = event
//     console.log('Состояние аутентификации:', event, session);
//   });
// });

</script>

<style scoped>
.wraper {
  max-width: 360px;
}
.auth {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
input, button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

</style>