<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#f9f9f9]" data-theme="mytheme">
    <router-view class="flex-grow"></router-view>

    <nav v-if="route.path !== '/welcome'"
      class="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-around shadow-2xl">
      <RouterLink to="/"
        class="flex items-center h-11 w-[40%] text-lg font-bold justify-center rounded-full transition-all duration-300"
        :class="route.path === '/' ? 'bg-primary hover:bg-[#C00E20]' : 'bg-[#BFBFBF]'">
        <img :src="allIcon" alt="all" class="mr-2" />
        Inicio
      </RouterLink>

      <RouterLink to="/favorites"
        class="flex items-center h-11 w-[40%] text-lg font-bold justify-center rounded-full transition-all duration-300 text-white"
        :class="route.path === '/favorites' ? 'bg-primary hover:bg-[#C00E20]' : 'bg-[#BFBFBF]'">
        <img :src="favIcon" alt="fav" class="mr-2 mb-1" />
        Favorites
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";
import allIcon from "../src/assets/allIcon.svg"
import favIcon from "../src/assets/favIcon.svg"

const route = useRoute();
</script>
