<script setup lang="ts"></script>

<template>
    <div class="frame">
        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>

        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>

        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>

        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>

        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>
        
        <div class="ap-box">
            <img src="../assets/download.jpg">
            <p>App_Name</p>
            <button>Details</button>
        </div>
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
