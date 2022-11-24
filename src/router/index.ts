import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/middleware/auth'
import Login from '@/views/Login.vue'
import Mock from '@/views/Mock.vue'
import MockForm from '@/views/MockForm.vue'
import Setting from '@/views/Setting.vue'
import Avatar from '@/views/Avatar.vue'
import Report from '@/views/Report.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/mock', name: 'Mock', component: Mock, meta: { layout: 'AppLayoutDefault', middleware: [auth] }},
    { path: '/mock/:id', name: 'MockForm', component: MockForm, meta: { layout: 'AppLayoutDefault', middleware: [auth] }},
    { path: '/setting', name: 'Setting', component: Setting, meta: { layout: 'AppLayoutDefault', middleware: [auth] }},
    { path: '/avatar', name: 'Avatar', component: Avatar, meta: { layout: 'AppLayoutDefault', middleware: [auth] }},
    { path: '/report', name: 'Report', component: Report, meta: { layout: 'AppLayoutDefault', middleware: [auth] }},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { layout: 'AppLayoutDefault', middleware: [auth] } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
/*
router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
 
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/');
    } else {
      next();
    }
  });
*/

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context:any, middleware:any, index:any) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;
  
    return (...parameters:any) => {
      // Run the default Vue Router `next()` callback first.
      context.next(...parameters);
      // Then run the subsequent Middleware with a new
      // `nextMiddleware()` callback.
      const nextMiddleware = nextFactory(context, middleware, index + 1);
      subsequentMiddleware({ ...context, next: nextMiddleware });
    };
  }
  
  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
  
      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);
  
      return middleware[0]({ ...context, next: nextMiddleware });
    }
  
    return next();
  });
  
export default router