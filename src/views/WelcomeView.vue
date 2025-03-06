<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 text-center">
        <div
            class="relative w-[219px] h-[219px] bg-primary border-[3px] border-black rounded-full overflow-visible flex justify-center items-center">
            <img :src="pikawelcome" alt="Pokéball" class="absolute max-w-none mb-[46px] ml-7" />
        </div>

        <h1 class="text-[26px] text-[#353535] font-bold mb-5 mt-12">Welcome to Pokédex</h1>
        <p class="text-[#5E5E5E] text-lg font-medium mt-2 mb-5">
            The digital encyclopedia created by Professor Oak is an invaluable tool <br>
            to Trainers in the Pokémon world.
        </p>

        <button @click="startApp" class="btn btn-primary hover:bg-[#C00E20] mt-6 rounded-full font-bold">
            Get Started</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import pikawelcome from "../assets/welcome/PikaWelcome.svg"

const router = useRouter();

const startApp = () => {
    localStorage.setItem("welcomeSeen", "true");
    router.push("/");
};

onMounted(() => {
    if (localStorage.getItem("welcomeSeen") === "true") {
        router.push("/");
    }
});
</script>