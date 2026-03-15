<template>
  <div class="notifications">
    <Notification
      v-for="notification in notificationsStore.notifications"
      :title="notification"
    >
    </Notification>
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
}
</style>