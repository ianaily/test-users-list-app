<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'

@Options({})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightblue;
}

.container {
  display: flex;
  justify-content: center;
  margin: 64px 128px;
}

.card {
  width: 1024px;
  border-radius: 4px;
  background-color: white;
}

.card.modal {
  width: 512px;
}

.card-head {
  display: flex;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(blue, .2);
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: 24px 36px;
}

.card-foot {
  display: flex;
  flex-direction: row;
  justify-content: end;
  border-top: 1px solid rgba(blue, .2);
}

.form-control {
  display: flex;
  min-width: 128px;
  max-width: 756px;
  margin-top: 8px;
  color: var(--accent-color);

  & > label {
    flex: 0 5 20%;
    font-weight: bold;
  }

  & > span, & > .form-input {
    flex: 0 5 80%;
  }
}

.online, .offline {
  width: 8px;
  height: 8px;
  margin: 8px;
  display: inline-block;
  border-radius: 25px;
  background-color: lightgreen;
}

.offline {
  background-color: lightcoral;
}

.btn, .btn-create, .btn-edit, .btn-delete {
  padding: 12px 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  background-color: white;
  color: dimgrey;
  cursor: pointer;

  &:hover {
    background: rgb(224, 224, 224);
    color: black;
  }
}

.btn-create {
  color: limegreen;

  &:hover {
    color: darkgreen;
  }
}

.btn-edit {
  color: var(--accent-color);

  &:hover {
    color: darkblue;
  }
}

.btn-delete {
  color: var(--red-color);

  &:hover {
    color: brown;
  }
}

.mt-24 {
  margin-top: 24px !important;
}

:root {
  --accent-color: rgb(82, 148, 178);
  --red-color: #dc3545;
}
</style>
