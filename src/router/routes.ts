import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/tv-show', component: () => import('pages/TvShowPage.vue') },
      {
        path: '/view/movie/:title/:id',
        name: 'view-movie',
        component: () => import('pages/view/MoviePage.vue'),
        // props: route => ({ ...route.params, id: parseInt(route.params.id) })
      },
      { path: '/view/tv/:name/:id', name: 'view-tv', component: () => import('pages/view/TvShowPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
