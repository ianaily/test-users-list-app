<template>
  <div>
    <create-user-link-component/>
    <div class="card" v-if="loaded">
      <div class="card-head">
        <div class="info-block">
          <div :class="user.is_active ? 'online' : 'offline'"/>
          <span class="user-name">{{user.last_name}} {{user.first_name}}</span>
        </div>
        <div class="control-block">
          <a class="btn-edit" :href="`/users/${user.id}/edit/`">Edit</a>
          <button class="btn-delete" @click.prevent.stop="showConfirmDeleteModal">Delete</button>
        </div>
      </div>
      <div class="card-content">
        <div>
          <b>Birth date: </b>
          <b>Sex: </b>
          <b>Job: </b>
          <b class="bio">Bio: </b>
        </div>
        <div>
          <p class="about-user">{{user.birth_date}}</p>
          <p class="about-user">{{user.gender}}</p>
          <p class="about-user">{{user.job}}</p>
          <p class="about-user bio">{{user.biography}}</p>
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

    this.user = await UsersService.getUser(id);
    this.loaded = true;
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

<style lang="scss" scoped>
.info-block {
  display: flex;
  align-items: center;
  justify-content: start;
}

.card-head {
  justify-content: space-between;
  padding: 8px 16px;

  & .user-name {
    font-weight: bold;
    color: black;
  }
}

.card-content {
  & > div {
    display: flex;
    flex-direction: column;
    min-width: 128px;
    max-width: 756px;
    color: var(--accent-color);

    & p, & b {
      margin-top: 6px;
    }
  }

  & .bio {
    margin-top: 24px;
  }
}
</style>
