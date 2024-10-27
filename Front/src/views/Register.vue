<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { formUserData } from '../types/user';
import { userErrObj } from '../types/errors';
import * as userService from "../services/userService"
import router from '../router';

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
            router.push("/catalog")
        }catch(err){
            errors.value.generalError = String(err)
        }
    }

    
}

</script>

<template>
    <div class="box">
        <section class="registerPage" @submit.prevent="register">
        <form class="form" >
        <h2>Register</h2>
        <div class="input-box">
            <input type="email" name="email" placeholder="Email" id="email" v-model="email">
        </div>
        <div class="input-box">
            <input type="username" name="username" placeholder="Username" id="username" v-model="username">
        </div>
        <div class="input-box">
            <input type="passsword" name="passsword" placeholder="Password" id="password" v-model="password">
        </div>
        <div class="input-box">
            <input type="confpassword" name="confpassword" placeholder="Repeat Password" id="confpassword" v-model="confpassword">
        </div>

        <div class="btn-box">
            <button class="formBtn">Register</button>
        </div>

        <div class="switch-link">
            <router-link style="text-decoration: none; color: inherit;" to="/login">Alredy have an account?</router-link>
        </div>
    </form>
    </section>
    </div>
</template>

<style scoped>
    .box {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        justify-self: center;
        height: 20em;
        width: 25em;
        background-color: grey;
        border-color: white;
        border-radius: 7px;
        text-align: center;
    }

    input{
        border-radius: 5px;
        background: none;
        border-color: #fff;
        color: #fff;
    }

    .input-box {
        padding-bottom: 5px;
    }

    ::placeholder {
        text-align: center;
        color:#fff
    }

    input:focus {
        color: #fff;
    }

    .btn-box {
        padding-top: 20px;
    }

    .formBtn {
        height: 40px;
        width: 80px;
        background-color: #fff;
        color: grey;
        border-radius: 10px;
        border-color: #fff;
        transition: 0.3s;
    }

    .formBtn:hover {
        cursor: pointer;
        height: 45px;
        width: 85px;
    }

    .switch-link {
        padding-top: 20px;
    }
</style>
