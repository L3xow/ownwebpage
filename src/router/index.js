import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Page from '../views/About.vue'
import Blog from '../views/blog.vue';
import BlogPost from '../views/BlogPost.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:slug',
    name: 'page',
    component: Page,
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPost,
  },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
