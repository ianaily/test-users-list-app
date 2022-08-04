<template>
  <div>
    <create-user-link-component/>
    <div class="card" v-if="loaded">
      <div class="card-head">
        <div class="info-block">
          <div :class="user.is_active ? 'online' : 'offline'"/>
          <span class="user-name">{{ user.last_name }} {{ user.first_name }}</span>
        </div>
        <div class="control-block">
          <a class="btn-edit" :href="`/users/${user.id}/edit/`">Edit</a>
          <button class="btn-delete" @click.prevent.stop="showConfirmDeleteModal">Delete</button>
        </div>
      </div>
      <div class="card-content">
        <div class="form-control">
          <label>Birth date: </label>
          <span>{{ user.birth_date }}</span>
        </div>
        <div class="form-control">
          <label>Sex: </label>
          <span>{{ user.gender }}</span>
        </div>
        <div class="form-control">
          <label>Job: </label>
          <span>{{ user.job }}</span>
        </div>
        <div class="form-control mt-24">
          <label>Bio: </label>
          <span>{{ user.biography }}</span>
        </div>
      </div>
      <div class="card-foot">
        <a class="btn" href="/">Back</a>
      </div>
      <confirm-delete-modal :is-show="isShowConfirmDeleteModal"
                            :user-name="`${user.first_name} ${user.last_name}`"
                            @confirm="deleteUser"
                            @close-modal="closeConfirmModal"/>
    </div>
    <div class="card" v-else>
      <p class="card-head">loading...</p>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'

import { User } from '@/domains/user';
import UsersService from '@/services/users-service';
import CreateUserLinkComponent from '@/components/create-user-link-component.vue';
import ConfirmDeleteModal from '@/components/confirm-delete-modal.vue';

@Options({
  components: {
    CreateUserLinkComponent,
    ConfirmDeleteModal,
  }
})
export default class UserDetailPage extends Vue {
  public user!: User;
  public loaded = false;
  public isShowConfirmDeleteModal = false;

  public async mounted() {
    const id = +this.$route.params.id;

    try {
      this.user = await UsersService.getUser(id);
    } catch (e: any) {
      this.$notify({type: 'error', text: e.message});
    }

    this.loaded = true;
  }

  public showConfirmDeleteModal(): void {
    this.isShowConfirmDeleteModal = true;
  }

  public closeConfirmModal(): void {
    this.isShowConfirmDeleteModal = false;
  }

  public async deleteUser() {
    try {
      await UsersService.deleteUser(this.user.id);
      window.location.href = '/';
    } catch (e: any) {
      this.$notify({type: 'error', text: e.message});
    }

    this.isShowConfirmDeleteModal = false;
  }
}
</script>

<style scoped>
.info-block {
  display: flex;
  align-items: center;
  justify-content: start;
}

.card-head {
  justify-content: space-between;
  padding: 8px 16px;
}

.user-name {
  font-weight: bold;
  color: black;
}
</style>
