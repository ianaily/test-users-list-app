<template>
  <div class="card">
    <div class="card-head">
      Update the user {{fullName}}
    </div>
    <div class="card-content">
      <user-form-component v-model="user" ref="form"/>
    </div>
    <div class="card-foot">
      <a class="btn" href="/">Cancel</a>
      <button class="btn-create" @click="updateUser">Update</button>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import Datepicker from '@vuepic/vue-datepicker';

import { UserData } from '@/domains/user-data';
import UsersService from '@/services/users-service';
import UserFormComponent from '@/components/user-form-component.vue';

@Options({
  components: {
    Datepicker,
    UserFormComponent,
  },
})
export default class UserEditPage extends Vue {
  public user: UserData = {
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    job: '',
    biography: '',
    is_active: false,
  };
  public fullName = '';
  public loaded = true;

  public get form(): UserFormComponent {
    return this.$refs.form as UserFormComponent;
  }

  private id!: number;

  public async mounted() {
    this.id = +this.$route.params.id;

    this.user = await UsersService.getUser(this.id);
    this.fullName = `${this.user.first_name} ${this.user.last_name}`;
    this.loaded = true;
  }

  public async updateUser() {
    if (!this.form.validate()) {
      return;
    }

    this.loaded = false;
    this.user = await UsersService.updateUser(this.id, this.user);
    this.loaded = true;
    window.location.href = '/';
  }
}
</script>

<style scoped>
.card-head {
  font-weight: bold;
}
</style>
