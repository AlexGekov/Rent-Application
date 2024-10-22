<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { formUserData } from '../types/user';
import { userErrObj } from '../types/errors';
import * as userService from "../services/userService"
// import router from '../router';

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const confpassword: Ref<string> = ref('')    
const username: Ref<string> = ref('')
const errors = ref<userErrObj>({})

async function register() {
    const userData: formUserData = {
        email: email.value,
        username: username.value,
        password: password.value,
    }

    errors.value = userService.validateData(userData, confpassword.value)

    if(!errors.value.email && !errors.value.username && !errors.value.password){
        try{
            await userService.register(userData, confpassword.value)
            // router.push("/catalog")
        }catch(err){
            // errors.value.generalError = String(err)
        }
    }

    
}

</script>

<template>
    <section class="registerPage center" @submit.prevent="register">
        <form class="form" >
        <h2>Register</h2>
        <div class="input-box">
            <input type="email" name="email" placeholder="" id="email" v-model="email">
            <span>Email</span>
        </div>
        <div class="input-box">
            <input type="username" name="username" placeholder="" id="username" v-model="username">
            <span>Username</span>
        </div>
        <div class="input-box">
            <input type="passsword" name="passsword" placeholder="" id="password" v-model="password">
            <span>Passsword</span>
        </div>
        <div class="input-box">
            <input type="confpassword" name="confpassword" placeholder="" id="confpassword" v-model="confpassword">
            <span>Repeat password</span>
        </div>

        <button class="formBtn">Register</button>

        <div class="switch-link">
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </form>
    </section>
</template>