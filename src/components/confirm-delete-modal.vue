<template>
  <Modal v-model="isShow" :close="closeModal">
    <div class="card modal">
      <div class="card-content">
        Confirm delete the user {{userName}}
      </div>
      <div class="card-foot">
        <button class="btn" @click="closeModal">Cancel</button>
        <button class="btn-delete" @click="confirm">Delete</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";

@Options({
  props: {
    isShow: Boolean,
    userName: String,
  }
})
export default class ConfirmDeleteModal extends Vue {
  public confirm(): void {
    this.$emit('confirm');
  }

  public closeModal(): void {
    this.$emit('close-modal');
  }
}
</script>

<style scoped>
.card-content {
  justify-content: center;
  padding-right: 16px;
  color: var(--accent-color);;
}
</style>
