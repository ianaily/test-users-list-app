<template>
  <form>
    <div class="form-control">
      <label>First name: </label>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.first_name.$error }]"
             maxlength="256"
             v-model="modelValue.first_name"
             @input="updateForm"/>
    </div>
    <div class="form-control">
      <label>Last name: </label>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.last_name.$error }]"
             maxlength="256"
             v-model="modelValue.last_name"
             @input="updateForm"/>
    </div>
    <div class="form-control">
      <label>Is active: </label>
      <input type="checkbox"
             v-model="modelValue.is_active"
             @input="updateForm"/>
    </div>
    <div class="form-control mt-24">
      <label>Birth date: </label>
      <datepicker
          :class="['form-input form-datepicker',{ 'is-invalid': v$.modelValue.birth_date.$error }]"
          model-type="yyyy-MM-dd"
          format="yyyy/MM/dd"
          v-model="modelValue.birth_date"
          :clearable="false"
          @closed="updateForm"/>
    </div>
    <div class="form-control">
      <label>Sex: </label>
      <select :class="['form-input', { 'is-invalid': v$.modelValue.gender.$error }]"
              v-model="modelValue.gender"
              @input="updateForm">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div class="form-control">
      <label>Job: </label>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.job.$error }]"
             maxlength="256"
             v-model="modelValue.job"
             @input="updateForm"/>
    </div>
    <div class="form-control mt-24">
      <label>Bio: </label>
      <textarea :class="['form-input', { 'is-invalid': v$.modelValue.biography.$error }]"
                rows="10"
                maxlength="1024"
                v-model="modelValue.biography"
                @input="updateForm"/>
    </div>
  </form>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Datepicker from '@vuepic/vue-datepicker';

import { UserData } from '@/domains/user-data';

@Options({
  components: {
    Datepicker,
  },
  props: {
    modelValue: Object,
  },
  validations: {
    modelValue: {
      first_name: {required},
      last_name: {required},
      birth_date: {required},
      gender: {required},
      job: {required},
      biography: {required},
    }
  },
})
export default class UserFormComponent extends Vue {
  public v$ = useVuelidate();

  public modelValue!: UserData;

  public updateForm(): void {
    this.$emit('modelValue', this.modelValue);
  }

  public validate(): boolean {
    (this.v$ as any).$touch();
    return !(this.v$ as any).$error;
  }
}
</script>

<style lang="scss" scoped>
.form-control > label {
  padding-top: 8px;
}

.form-input {
  padding: 8px;
  border: 2px solid rgba(blue, .1);
  border-bottom: 2px solid var(--accent-color);
  border-radius: 4px;
  line-height: 16px;

  &:focus, &:active {
    border: 2px solid var(--accent-color);
    outline: none;
  }
}

input[type=checkbox] {
  width: 16px;
  height: 16px;
  accent-color: var(--accent-color);
}

.form-datepicker {
  padding: 0;
}

.dp__theme_light {
  --dp-border-color: transparent;
}

.is-invalid {
  border: 2px solid var(--red-color);
}
</style>
