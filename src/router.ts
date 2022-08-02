import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/user-list",
        name: "user list",
        component: () => import("./views/users-list/users-list-page.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
