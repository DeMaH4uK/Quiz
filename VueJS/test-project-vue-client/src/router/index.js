import Vue from 'vue'
import VueRouter from 'vue-router'
import MainWrapper from '../components/main-wrapper'
import LogIn from '../components/log-in'
import About from '../views/About.vue'
import Quiz from '../components/quiz'
import state from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: MainWrapper
  },
  {
    path: '/login',
    name: 'Login',
    component: LogIn
    // ,props: true
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogIn
    // ,props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },

  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = state.getters.CREDENTIALS.login;
  // console.log(loggedIn);

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
