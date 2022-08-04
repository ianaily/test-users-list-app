<template>
  <div class="row">
    <p>Didn't find yourself?</p>
    <a class="btn-create" href="/users/create/">Create</a>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";

@Options({})
export default class CreateUserLinkComponent extends Vue {}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  margin: 16px auto;
}

.row p {
  padding-right: 16px;
  color: var(--accent-color);;
}
</style>
