<template>
  <div class="notifications">
    <transition-group name="notification">
      <Notification v-for="notification in notificationsStore.notifications" :title="notification">
      </Notification>
    </transition-group>

  </div>
</template>

<script setup>

import Notification from '@/components/Notification.vue';
import { useNotificationsStore } from '@/stores/useNotificationsStore';
const notificationsStore = useNotificationsStore();

</script>

<style scoped>
.notifications {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 180px;
  transition: all 1s ease;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(180px);
}
</style>