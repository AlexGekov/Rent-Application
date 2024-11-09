<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Apartment } from '../types/app';
import * as appService from "../services/appServive"

const route = useRoute()
const apId: string = String(route.params.id)
const apartment: Ref<Apartment | undefined> = ref()

onMounted( async () => {
    apartment.value = await appService.getApp(apId)
    console.log(apartment.value)
})
</script>

<template>
    <div class="box">
        <div class="image-box">
            <img :src="apartment?.image">
        </div>
        <div class="info-box">
            <div class="left">
            <p>{{ apartment?.name }}</p>
            <p>{{ apartment?.location }}</p>
            <p>{{ apartment?.tenants }}</p>
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
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.info-box{
    display: flex;
    justify-content: center;
    flex-direction: row;
}
</style>