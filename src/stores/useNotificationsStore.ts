import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  actions: {
    // Метод для добавления элемента в массив
    addItem(name) {
      this.notifications.push(name);
      setTimeout(() => {
        if (this.notifications.length > 0) {
          this.notifications.shift(); // удаляем первый элемент
        }
      }, 5000);
    },
  },
});