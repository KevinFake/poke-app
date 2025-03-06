<template>
    <div class="py-6 h-screen overflow-hidden flex flex-col">
        <Loader v-if="loading" />

        <PokemonList class="flex-1 overflow-hidden" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PokemonList from "../components/PokemonList.vue";
import Loader from "../components/Loader.vue";

const loading = ref(false);

onMounted(() => {
    const hasSeenLoader = localStorage.getItem("hasSeenLoader");

    if (!hasSeenLoader) {
        loading.value = true;
        localStorage.setItem("hasSeenLoader", "true");
    }

    setTimeout(() => {
        loading.value = false;
    }, 2000);
});
</script>
