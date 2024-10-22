<script setup lang="ts">
import { ref, type Ref } from 'vue';

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const username: Ref<string> = ref('')
</script>

<template>
    <form class="form" >
        <h2>Register</h2>
        <div class="input-box">
            <input type="email" name="email" placeholder="" id="email" v-model="email">
            <span>email</span>
        </div>
        <div class="input-box">
            <input type="username" name="username" placeholder="" id="username" v-model="username">
            <span>username</span>
        </div>
        <div class="input-box">
            <input type="passsword" name="passsword" placeholder="" id="password" v-model="password">
            <span>passsword</span>
        </div>

        <button class="formBtn">Register</button>

        <div class="switch-link">
            <p>Already have an account? <router-link to="/register">Register</router-link></p>
        </div>
    </form>
</template>

<style>
</style>