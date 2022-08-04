<template>
  <div>
    <create-user-link-component/>
    <user-item v-for="user in users" :user="user" :key="user.id"/>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { User } from '@/domains/user';
import UsersService from '@/services/users-service';
import CreateUserLinkComponent from '@/components/create-user-link-component.vue';
import UserItem from '@/views/users-list/user-item.vue';

@Options({
  components: {
    UserItem,
    CreateUserLinkComponent,
  }
})
export default class UsersListPage extends Vue {
  public users: User[] = [];

  public async mounted() {
    this.users = await UsersService.getUsers();
  }
}
</script>
