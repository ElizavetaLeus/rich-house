import { createRouter, createWebHistory } from 'vue-router';
import { EnumRouteName } from '@/enums/enum-route-name';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: EnumRouteName.HOME,
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: 'projects',
      name: EnumRouteName.PROJECTS,
      component: () => import('@/pages/ProjectsPage.vue'),
    },
    {
      path: '/built-houses',
      name: EnumRouteName.BUILT_HOUSES,
      component: () => import('@/pages/BuiltHousesPage.vue'),
    },
    {
      path: '/contscts',
      name: EnumRouteName.CONTACTS,
      component: () => import('@/pages/ContactsPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;