import { createRouter, createWebHistory } from 'vue-router'
import MinesView from '../views/MinesView.vue'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: MinesView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    }
  ]
})

export default router
