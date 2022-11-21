import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Login from "../components/Auth/Login.vue";
import ForgotPassword from "../components/Auth/ForgotPassword.vue";
import ResetPassword from "../components/Auth/ResetPassword.vue";
import AppLayout from "../components/Layouts/AppLayout.vue";
import Products from "../components/Products.vue";
import NotFound from "../components/NotFound.vue";
import store from "../store/index.js";

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            {
                path: '/products',
                name: 'app.products',
                component: Products
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            requiresGuest: true
        },
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword,
        meta: {
            requiresGuest: true
        },
    },
    {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        component: NotFound,
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
);

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'login'})
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({name: 'app.dashboard'})
    } else {
        next();
    }
})

export default router;
