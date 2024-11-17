<script setup lang="ts">
import { Apartment } from '../types/app';
import { onMounted, ref, type Ref } from 'vue';
import * as apService from "../services/appServive"
const apartments: Ref<Apartment[]> = ref([])
let isEmpty: Ref<boolean> = ref(true)
let searchQuery: Ref<string> = ref('')
const search = ref([])

onMounted(async () => {
    try {
        apartments.value = await apService.getApartments();
        if (apartments.value == undefined) {
            isEmpty.value = false
        }
        console.log(apartments.value)
    } catch (err) {
        console.log(err);
    }
});

async function Search() {
    let Query: string = searchQuery.value
    if (Query != "") {
        try {
            apartments.value = []
            apartments.value = await apService.search(Query)
        } catch (err) {
            console.log(err)
        }
    }else{
        apartments.value = await apService.getApartments();
        if (apartments.value == undefined) {
            isEmpty.value = false
        }
    }
}
</script>

<template>
    <div class="box">
        <form name="search">
            <input type="text" class="input" name="txt" placeholder="⌕" :oninput="Search" v-model="searchQuery"
                onmouseout="this.value = ''; this.blur();">
        </form>
        <i class="fa fa-search"></i>
    </div>
    <div v-if="isEmpty.valueOf()" class="frame">
        <template v-for="apartment in apartments">
            <div class="ap-box">
                <img :src="apartment.image" />
                <p>{{ apartment.name }}</p>
                <router-link :to="{ name: 'Details', params: { id: apartment._id } }"><button
                        class="button-1">Details</button></router-link>
            </div>
        </template>
    </div>

    <div v-if="!isEmpty.valueOf()" class="empty">
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

button {
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

.box {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
}

.input {
    padding: 10px;
    width: 50px;
    height: 50px;
    background: none;
    border: 4px solid #1A1A1A;
    border-radius: 50px;
    box-sizing: border-box;
    font-size: 26px;
    color: #fff;
    outline: none;
    transition: .5s;
}

.input:hover {
    width: 350px;
    background: #1A1A1A;
    border-radius: 10px;
}

.box i {
    position: relative;
    top: 50%;
    right: 15px;
    transform: translate(-50%, -50%);
    font-size: 26px;
    color: #1A1A1A;
    transition: .2s;
}

.box:hover i {
    opacity: 0;
    z-index: -1;
}

::placeholder {
    text-align: center;
}
</style>
