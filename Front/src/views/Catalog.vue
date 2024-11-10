<script setup lang="ts">
import { Apartment } from '../types/app';
import { onMounted, ref, type Ref } from 'vue';
import * as appService from "../services/appServive"
const apartments: Ref<Apartment[] | undefined> = ref()
let isEmpty: Ref<boolean> = ref(false)

onMounted(async () => {
    try {
        apartments.value = await appService.getApartments();
        if (apartments.value == undefined) {
            isEmpty.value = true
        }
        console.log(isEmpty.value)
    } catch (err) {
        console.log(err);
    }
});

</script>

<template>
    <div v-if="!isEmpty.valueOf()" class="frame">
        <template v-for="apartment in apartments">
            <div class="ap-box">
                <img :src="apartment.image" />
                <p>{{ apartment.name }}</p>
                <router-link :to="{ name: 'Details', params: { id: apartment._id } }"><button class="button-1">Details</button></router-link>
            </div>
        </template>
    </div>

    <div v-if="isEmpty.valueOf()" class="empty">
        <h1>Add apartments!</h1>
    </div>
</template>

<style scoped>
.frame {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 30px;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-evenly;
}

.ap-box {
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

.empty {
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 80%;
    height: auto;
    object-fit: cover;
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
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 40px;
  min-width: 0;
  outline: none;
  padding: 10px 18px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 85px;
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
</style>
