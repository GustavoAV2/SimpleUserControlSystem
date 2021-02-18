import Vue from 'vue'
import Router from 'vue-router'
import { http } from '../services/config'

import Home from '../views/Home'
import Register from '../views/RegisterUser'
import Login from '../views/LoginUser'

Vue.use(Router)

const routes = [  
  {
    // Rota
    path: '/',
    // Componente que sera rendezirado
    component: Home,
    // A rota necessita de autorização para acesso
    meta: { requiresAuth: true },
    // Executar antes de entrar na rota
    beforeEnter(to, from, next) {
      http.get('users/me').then(() => {
          next();
      }).catch(() => {
          localStorage.clear()
          next('/login');
      });
    }
  },    
  
  {
    path: '/login',
    component: Login,
    beforeEnter(to, from, next){
      http.get('users/me').then(() => {
        next('/');
      }).catch(() => {
          localStorage.clear()
          next();
      });
    }
  },  

  {
    path: '/register',
    component: Register,
    beforeEnter(to, from, next){
      http.get('users/me').then(() => {
        next('/');
      }).catch(() => {
          localStorage.clear()
          next();
      })
    }
  },
]    

const router = new Router({
  mode: 'history',
  routes: routes
})


// Controle sobre todas as trocas de rotas 
router.beforeEach((to, from, next) => {
  console.log('from (de)'+ from.path)
  console.log('to (para)'+ to.path)
  // Next passa para to caso não seja passado outra rota nos parametros

  let token = localStorage.getItem('token');
  let requireAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!requireAuth) {
    next();
  }

  if (requireAuth && !token) {
    next('/login');
  }

  if (requireAuth && token) {
    next();
  }
  
});

export default router