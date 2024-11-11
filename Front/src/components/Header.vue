<script setup lang="ts">
import { ref, type Ref } from 'vue';
import router from '../router';
import * as userService from '../services/userService';
import { onMounted } from 'vue';
const user = ref()
const username: Ref<string> = ref('') 

onMounted( async () => {
  user.value = await userService.getUser()
  username.value = user?.value[0].username
})

function logout(e: Event){
  e.preventDefault()
  userService.logoutUser()
  router.push("/")
}
</script>

<template>
  <header class="header">
    <router-link to="/catalog"><img src="../assets/House.png" alt="#"></router-link>
    <nav class="nav">
      <template v-if="!userService.isLoggedIn.value">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
      <template v-if="userService.isLoggedIn.value">
        <a>Hello, {{username.valueOf()}}</a>
        <router-link to="create">Add an apartment</router-link>
        <router-link to="" @click="logout($event)" >Logout</router-link>
      </template>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 30px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.nav {
  display: flex;
  gap: 2.5rem;
}

.nav a{
  color: #000;
  justify-content: space-between;
  text-decoration: none;
  transition: 0.3s ease;   
}

.nav a:hover {
  transform: scale(1.2);
  text-shadow: 0px 0px 10px black;
}

img {
  transition: 0.3s ease;   
  height: 60px;
  width: 60px;
}

img:hover{
  transform: scale(1.15);
}
</style>