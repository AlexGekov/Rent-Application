<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Apartment } from '../types/app';
import * as appService from "../services/appServive"

const route = useRoute()
const apId: string = String(route.params.id)
const apartment: Ref<Apartment | undefined> = ref()

onMounted(async () => {
    apartment.value = await appService.getApp(apId)
})
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
            </div>
            <div class="right">
                <p>El: loading...</p>
                <p>Heating: loading...</p>
                <p>Water: loading...</p>
            </div>
        </div>
        <div class="btn-box">
            <button class="button-1">Edit</button>
            <button class="button-1">Delete</button>
        </div>
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