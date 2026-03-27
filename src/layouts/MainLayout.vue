<template>
  <div class="wraper">
    <div class="main-layout">
      <div class="main-layout-navigation">
        <nav>
          <router-link to="/foods">Блюда</router-link>
          <router-link to="/">Календарь</router-link>
        </nav>
        <button @click="signOut">Выйти</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import supabase from '../supabase';

const signOut = () => supabase.auth.signOut()

</script>

<style scoped>
.wraper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.main-layout-navigation {
  display: flex;
}

a {
  color: #000;
  text-decoration: none;
  font-size: 16px;
  margin-right: 8px;
}
button {
  width: 80px;
  border: none;
  background-color: transparent;
  font-size: 16px;
}
nav {
  flex: 1;
}
</style>