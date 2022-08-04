import { createWebHistory, createRouter } from "vue-router";
import UsersListPage from "@/views/users-list/users-list-page.vue";
import UserDetailPage from "@/views/user-detail/user-detail-page.vue";
import UserCreatePage from "@/views/user-create/user-create-page.vue";
import UserEditPage from "@/views/user-edit/user-edit-page.vue";

const routes = [
  {
    path: "/",
    alias: "/users/",
    name: "users list",
    component: UsersListPage,
  },
  {
    path: "/users/:id/",
    name: "user detail",
    component: UserDetailPage,
  },
  {
    path: "/users/create/",
    name: "create user",
    component: UserCreatePage,
  },
  {
    path: "/users/:id/edit/",
    name: "edit user",
    component: UserEditPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
