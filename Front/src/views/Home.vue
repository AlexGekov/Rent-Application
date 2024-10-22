<script setup lang="ts">
</script>

<template>
    <div class="centered-window">
        <div class="image-container">
            <img src="../assets/DALL·E 2024-10-18 22.42.50 - A dark-themed futuristic home with sleek, modern architecture. The exterior features a combination of dark materials like metal and glass. Warm light .webp">
        </div>
        <p>Welcome!</p>
    </div>
</template>

<style scoped>
.centered-window {
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    font-size: 18px;
    text-align: center;
    z-index: 1000;
    width: 800px;
    height: 450px;
}

.image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the entire container */
    opacity: 0.5; /* Adjust opacity for fading effect */
    transition: opacity 0.5s ease-in-out; /* Smooth transition */
}
</style>