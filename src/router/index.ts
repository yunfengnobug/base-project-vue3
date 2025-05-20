import { createRouter } from 'vue-router'
import { historyMode } from './historyMode'

const router = createRouter({
  history: historyMode,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: '首页',
      },
    },
  ],
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ${import.meta.env.VITE_PROJECT_NAME}`
  next()
})

export default router
