<script setup lang="ts">
import router from '../router';

function goToCatalog(e:Event){
  e.preventDefault()
  router.push("/catalog")
}
</script>

<template>
  <header class="header">
    <a class="logo" href="/catalog">#<img @click="goToCatalog"></a>
    <nav class="nav">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 40px 100px;
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
  color: #FFF;
  justify-content: space-between;
  text-decoration: none;
  transition: 0.3s ease;   
}

.nav a:hover {
  transform: scale(1.2);
  text-shadow: 0px 0px 10px black;
}
</style>