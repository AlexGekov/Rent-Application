<script setup lang="ts">
import { Apartment } from '../types/app';
import { onMounted, ref, type Ref } from 'vue';
import * as userService from "../services/userService"
const apartments: Ref<Apartment[] | undefined> = ref()
let isEmpty: Ref<boolean> = ref(false)

onMounted(async () => {
  try {
    apartments.value = await userService.getApartments();
    if (apartments.value == undefined){
        isEmpty.value = true
    }
  } catch (err) {
    console.log(err);
  }
});

</script>

<template>
    <div v-if="!isEmpty" class="frame">
        <template v-for="apartment in apartments">
        <div class="ap-box">
            <img :src="apartment.image"/>
            <p>{{ apartment.name }}</p>
            <router-link :to="{name: 'Details', params:{id: apartment._id}}"><button >Details</button></router-link>
        </div>
        </template>
    </div>

    <div v-if="isEmpty" class="empty">
        <h1>Add apartments!</h1>
    </div>
</template>

<style scoped>
    .frame{
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 30px;
        flex-wrap: wrap;
        align-items: center;
        align-content: space-evenly;
    }

    .ap-box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 300px;
        height: 400px;
        border-radius: 5px;
        box-shadow: 5px 5px #666;
        margin: 60px;
    }

    .empty{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img{
        width: 80%;
        height: auto;
        object-fit: cover;
    }

    button {
      width: 80px;
      height: 40px;  
    }
</style>
