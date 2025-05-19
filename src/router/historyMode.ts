import { createWebHistory, createWebHashHistory } from 'vue-router'

export const historyMode =
  import.meta.env.VITE_PATH_MODE === 'hash'
    ? createWebHashHistory(import.meta.env.VITE_BASE_PATH)
    : createWebHistory(import.meta.env.VITE_BASE_PATH)
