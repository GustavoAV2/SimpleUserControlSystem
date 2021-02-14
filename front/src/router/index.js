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
    // Component que sera rendezirado
    component: Home,
    // A rota necessita de autorização para acesso
    meta: { requiresAuth: true }
  },    
  
  {
    path: '/login',
    component: Login
  },  

  {
    path: '/register',
    component: Register
  },
]    

const router = new Router({
  mode: 'history',
  routes: routes
})


// Controle sobre a troca de rotas
router.beforeEach((to, from, next) => {
  console.log('from (de)'+ from.path)
  console.log('to (para)'+ to.path)

  let token = localStorage.getItem('token');
  let requireAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requireAuth) {
      next();
  }

  if (requireAuth && !token) {
      next('/login');
  }
  
  if (to.path === '/') {
    if (token) {
        http.get('users/me').then(() => {
            next();
        }).catch(() => {
            localStorage.clear()
            next('/login');
        });
    }
      else {
        next();
      }
  }

  if (to.path === '/login') {
      if (token) {
          http.get('users/me').then(() => {
              next('/');
          }).catch(() => {
              localStorage.clear()
              next();
          });
      }
      else {
        next();
      }
  }
  
  if (to.path === '/register') {
      if (token) {
          http.get('users/me').then(() => {
              next('/');
          }).catch(() => {
              console.log('Error')
              localStorage.clear()
              next();
          });
      }
      else {
          console.log('Else')
          next();
      }
  }

});

export default router