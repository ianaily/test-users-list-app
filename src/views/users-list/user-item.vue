<template>
  <div class="user-item card" @click="goToUser">
    <div class="info-block">
      <div :class="user.is_active ? 'online' : 'offline'"/>
      <span class="user-name">{{user.last_name}} {{user.first_name}}</span>
      <span class="about-user">{{user.birth_date}}</span>
      <span class="about-user">{{user.gender}}</span>
    </div>
    <div class="control-block">
      <button class="btn-edit" @click.prevent.stop="editUser">Edit</button>
      <button class="btn-delete" @click.prevent.stop="showConfirmDeleteModal">Delete</button>
    </div>
    <confirm-delete-modal :is-show="isShowConfirmDeleteModal"
                          :user-name="`${user.first_name} ${user.last_name}`"
                          @confirm="deleteUser"
                          @close-modal="closeConfirmModal"/>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'

import { User } from '@/domains/user';
import UsersService from '@/services/users-service';
import ConfirmDeleteModal from '@/components/confirm-delete-modal.vue';

@Options({
  components: {
    ConfirmDeleteModal,
  },
  props: {
    user: Object,
  },
})
export default class UserItem extends Vue {
  public user!: User;
  public isShowConfirmDeleteModal = false;

  public goToUser() {
    window.location.href = `/users/${this.user.id}/`;
  }

  public editUser() {
    window.location.href = `/users/${this.user.id}/edit/`;
  }

  public showConfirmDeleteModal(): void {
    this.isShowConfirmDeleteModal = true;
  }

  public closeConfirmModal(): void {
    this.isShowConfirmDeleteModal = false;
  }

  public async deleteUser() {
    await UsersService.deleteUser(this.user.id);
    this.isShowConfirmDeleteModal = false;
    window.location.href = '/';
  }
}
</script>

<style scoped>
.user-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 1024px;
  margin-bottom: 8px;
  cursor: pointer;
}

.user-item:hover {
  background: rgb(248, 248, 248);
}

.info-block {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 8px 16px;
}

.user-name {
  min-width: 160px;
  margin-left: 16px;
  margin-right: 16px;
  font-weight: bold;
  color: black;
}

.about-user {
  margin-left: 24px;
  color: var(--accent-color);
}

.control-block {
  justify-content: end;
}
</style>
