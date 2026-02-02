import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddModel from '../views/AddModel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddModel',
    component: AddModel
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
