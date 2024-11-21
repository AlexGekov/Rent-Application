<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Apartment } from '../types/app';
import * as appService from "../services/appServive"
import * as userService from "../services/userService"
import router from '../router';

const route = useRoute()
const apId: string = String(route.params.id)
const apartment: Ref<Apartment | undefined> = ref()

onMounted(async () => {
    apartment.value = await appService.getApp(apId)
})

async function Delete(e: Event){
    e.preventDefault()

    const confirm = window.confirm("Do you wish to delete this property?")

    if(userService.isLoggedIn.value && confirm){
        await appService.Delete(apId)
        router.push("/catalog")
    }
}
</script>

<template>
    <div class="box">
        <div class="image-box">
            <img :src="apartment?.image">
        </div>
        <div class="info-box">
            <div class="left">
                <p>Property name: {{ apartment?.name }}</p>
                <p>Location: {{ apartment?.location }}</p>
                <p>Tenants: {{ apartment?.tenants }}</p>
                <p>Rent: {{ apartment?.rent }}€</p>
                <p>Date of signature: {{ apartment?.sign_date }}</p>
            </div>
            <div class="right">
                <p>El: loading...</p>
                <p>Heating: loading...</p>
                <p>Water: loading...</p>
            </div>
        </div>
        <div class="btn-box">
            <router-link :to="{name: 'EditApartment', params:{id: `${apartment?._id}`}}" class="button-1">Edit</router-link>
            <button class="button-1" @click="Delete">Delete</button>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.902565361776!2d23.313946775490987!3d42.68460621453685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa851020e92bf9%3A0x15186325077796df!2z0KHQvtGE0LjRjyDRhtC10L3RgtGK0YAsINCx0YPQuy4g4oCe0JLQuNGC0L7RiNCw4oCcIDc5LCAxNDYzINCh0L7RhNC40Y8!5e0!3m2!1sbg!2sbg!4v1732219413200!5m2!1sbg!2sbg" width="400" height="300" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.info-box {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    padding: 30px 0px 30px 0px;
}

.btn-box{
    width: 60%;
    display: flex;
    justify-content: space-evenly;
}

button{
    border-radius: 6px;
    border-color: none;
}

.button-1 {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100px;
  will-change: transform;
}

.button-1:disabled {
  pointer-events: none;
}

.button-1:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-1:active {
  box-shadow: none;
  transform: translateY(0);
}

img {
    width: 650px;
    height: auto;
    object-fit: cover;
}
</style>