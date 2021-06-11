import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInSignUp from '../pages/SignInSignUp.vue';
import NormalUserDashboard from '../components/NormalUserDashboard.vue'
import ContributerDashboard from '../components/ContributerDashboard'

Vue.use(VueRouter)

let routes = [
    {
        path: "/",
        name: "registerLoginPage",
        component: SignInSignUp
    },
    {
        path: "/user/dashboard",
        name: "normalUserDashboard",
        component: NormalUserDashboard
    },
    {
        path: "/contributer/dashboard",
        name: "contributerDashboard",
        component: ContributerDashboard
    },
];

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes
});

export default router;