import { createRouter, createWebHistory } from 'vue-router'
import FrontpageView from '../views/FrontpageView.vue'
import CommunityView from '@/views/CommunityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontpage',
      component: FrontpageView,
    },
    {
      path: '/!:communityIdentifier',
      name: 'community',
      component: CommunityView,
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
      path: '/@:username@:instance',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
  ],
})

export default router
