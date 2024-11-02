<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { formUserData } from '../types/user';
import { userErrObj } from '../types/errors';
import * as userService from "../services/userService"
import router from '../router';

const location: Ref<string> = ref('')
const image: Ref<string> = ref('')
const confpassword: Ref<string> = ref('')    
const username: Ref<string> = ref('')
const errors = ref<userErrObj>({})

async function create() {
 
}

</script>

<template>
    <div class="box">
        <section class="registerPage" @submit.prevent="create">
        <form class="form" >
        <h2>Appartment information</h2>
        <div class="input-box">
            <input type="location" name="location" placeholder="Location" id="location" v-model="location">
        </div>
        <div class="input-box">
            <input type="text" name="image" placeholder="Image" id="image" v-model="image">
        </div>
        <div class="input-box">
            <input type="text" name="tenant" placeholder="Tenat/s" id="tenants" v-model="confpassword">
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
