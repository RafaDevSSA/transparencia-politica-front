import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Dashboard — Transparência Política' },
    },
    {
      path: '/busca',
      name: 'busca',
      component: () => import('@/views/BuscaView.vue'),
      meta: { title: 'Busca — Transparência Política' },
    },
    {
      path: '/politico/:id',
      name: 'politico',
      component: () => import('@/views/PoliticoView.vue'),
      meta: { title: 'Perfil do Político — Transparência Política' },
    },
    {
      path: '/lei/:id',
      name: 'lei',
      component: () => import('@/views/LeiView.vue'),
      meta: { title: 'Lei — Transparência Política' },
    },
    {
      path: '/estados',
      name: 'estados',
      component: () => import('@/views/EstadoView.vue'),
      meta: { title: 'Estados — Transparência Política' },
    },
    {
      path: '/estados/:uf',
      name: 'estado',
      component: () => import('@/views/EstadoView.vue'),
      meta: { title: 'Estado — Transparência Política' },
    },
    {
      path: '/cidades/:id',
      name: 'cidade',
      component: () => import('@/views/CidadeView.vue'),
      meta: { title: 'Cidade — Transparência Política' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Transparência Política'
})

export default router
