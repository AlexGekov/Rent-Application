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
    console.log(apartment)
})
</script>

<template>
    <h1>Details!</h1>
</template>

<style scoped>
</style>