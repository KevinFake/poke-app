<template>
    <div v-if="isLoading"
        class="fixed inset-0 flex justify-center items-center bg-white transition-opacity duration-1000 z-50"
        :class="{ 'opacity-0': isFadingOut, 'opacity-100': !isFadingOut }">

        <img :src="imageSrc" alt="Cargando" class="w-40 h-40 transition-transform duration-700 tilt-pivot"
            @load="handleLoad" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import loaderImage from "../assets/loader.svg";

const isLoading = ref(true);
const isFadingOut = ref(false);
const imageSrc = loaderImage;

const handleLoad = () => {
    setTimeout(() => {
        isFadingOut.value = true;
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }, 500);
};
</script>