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
            </div>
            <div class="right">
                <p>El</p>
                <p>Heating</p>
                <p>Water</p>
            </div>
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
    padding: 30px;
}

img {
    width: 650px;
    height: auto;
    object-fit: cover;
}
</style>