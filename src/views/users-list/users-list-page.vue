<template>
  <div>
    <create-user-link-component/>
    <div v-if="loaded">
      <user-item v-for="user in users" :user="user" :key="user.id"/>
    </div>
    <div class="card" v-else>
      <p class="card-head">loading...</p>
    </div>
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
  public loaded = false;

  public async mounted() {
    try {
      this.users = await UsersService.getUsers();
    } catch (e: any) {
      this.$notify({type: 'error', text: e.message});
    }

    this.loaded = true;
  }
}
</script>
