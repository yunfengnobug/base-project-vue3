import { createRouter } from 'vue-router'
import { historyMode } from './historyMode'

const router = createRouter({
  history: historyMode,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

export default router
