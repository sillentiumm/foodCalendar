import { defineStore } from 'pinia';

interface NotificationsState {
  notifications: string[];
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsState => ({
    notifications: [],
  }),
  actions: {
    addNotification(name:string) {
      this.notifications.push(name);
      setTimeout(() => {
        if (this.notifications.length > 0) this.notifications.shift();
      }, 3000);
    },
  },
});