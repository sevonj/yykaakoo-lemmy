import { createRouter, createWebHistory } from 'vue-router'
import CommunityView from '@/views/CommunityView.vue'
import FeedView from '../views/FeedView.vue'
import TempNotLoggedInView from '@/views/TempNotLoggedInView.vue'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'browse_frontpage',
      component: FeedView,
    },
    {
      path: '/!:communityIdentifier?',
      name: 'browse_community',
      component: CommunityView,
    },
    {
      path: '/messages',
      name: 'messages',
      component: TempNotLoggedInView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: TempNotLoggedInView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: TodoView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/@:personIdentifier',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
  ],
})

export default router
