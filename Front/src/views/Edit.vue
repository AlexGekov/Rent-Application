<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import * as appService from '../services/appServive'

const route = useRoute()
const apId: string = String(route.params.id)
const name: Ref<string> = ref('')
const location: Ref<string> = ref('')
const image: Ref<string> = ref('')
const tenants: Ref<string> = ref('')    
const rent: Ref<string> = ref('')
const sign_date: Ref<string> = ref('')

onMounted( async () => {
    const data = await appService.getApp(apId)

    console.log(data)

    name.value = data.name
    location.value = data.location
    image.value = data.image
    tenants.value = data.tenants
    rent.value = data.rent
    sign_date.value = data.sign_date
})

async function edit(){

}
</script>

<template>
    <div class="box">
        <section class="registerPage" @submit.prevent="edit">
        <form class="form" >
        <h2>Apartment information</h2>
        <div class="input-box">
            <input type="text" name="name" placeholder="Name" id="name" v-model="name">
        </div>
        <div class="input-box">
            <input type="location" name="location" placeholder="Location" id="location" v-model="location">
        </div>
        <div class="input-box">
            <input type="text" name="image" placeholder="Image" id="image" v-model="image">
        </div>
        <div class="input-box">
            <input type="text" name="tenant" placeholder="Tenat/s" id="tenants" v-model="tenants">
        </div>
        <div class="input-box">
            <input type="text" name="rent" placeholder="Rent" id="rent" v-model="rent">
        </div>
        <div class="input-box">
            <input type="text" name="sign_date" placeholder="Sign date" id="sign_date" v-model="sign_date">
        </div>

        <div class="btn-box">
            <button class="formBtn">Update!</button>
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