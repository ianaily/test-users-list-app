<template>
  <form>
    <div>
      <b>First name: </b>
      <b>Last name: </b>
      <b>Is active: </b>
      <b class="gap">Birth date: </b>
      <b>Sex: </b>
      <b>Job: </b>
      <b class="gap">Bio: </b>
    </div>
    <div>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.first_name.$error }]"
             maxlength="256"
             v-model="modelValue.first_name"
             @input="updateForm"/>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.last_name.$error }]"
             maxlength="256"
             v-model="modelValue.last_name"
             @input="updateForm"/>
      <input class="form-input"
             type="checkbox"
             v-model="modelValue.is_active"
             @input="updateForm"/>
      <datepicker :class="['form-input form-datepicker gap',{ 'is-invalid': v$.modelValue.birth_date.$error }]"
                  model-type="yyyy-MM-dd"
                  format="yyyy/MM/dd"
                  v-model="modelValue.birth_date"
                  :clearable="false"
                  @closed="updateForm"/>
      <select :class="['form-input', { 'is-invalid': v$.modelValue.gender.$error }]"
              v-model="modelValue.gender"
              @input="updateForm">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input :class="['form-input', { 'is-invalid': v$.modelValue.job.$error }]"
             maxlength="256"
             v-model="modelValue.job"
             @input="updateForm"/>
      <textarea :class="['form-input', 'gap', { 'is-invalid': v$.modelValue.biography.$error }]"
                rows="6"
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
      first_name: { required },
      last_name: { required },
      birth_date: { required },
      gender: { required },
      job: { required },
      biography: { required },
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
form {
  display: flex;
  flex-direction: row;

  & > div {
    display: flex;
    flex-direction: column;
    min-width: 128px;
    max-width: 756px;
    color: var(--accent-color);

    & b {
      margin-bottom: 8px;
      line-height: 36px;
    }
  }

  & .gap {
    margin-top: 24px;
  }
}

.form-input {
  width: 320px;
  margin-bottom: 8px;
  padding: 8px;
  border: 2px solid rgba(blue, .1);
  border-bottom: 2px solid var(--accent-color);
  border-radius: 4px;
  line-height: 16px;

  &[type=checkbox] {
    width: auto;
    height: 36px;
    accent-color: var(--accent-color);
  }

  &:focus, &:active {
    border: 2px solid var(--accent-color);
    outline: none;
  }
}

.form-datepicker {
  padding: 0;
}

.form-datepicker, select.form-input {
  width: 340px;
}

.dp__theme_light {
  --dp-border-color: transparent;
}

.is-invalid {
  border: 2px solid var(--red-color);
}
</style>
