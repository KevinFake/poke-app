<template>
    <div class="flex flex-col w-full h-screen px-2 pb-10 pt-9">
        <div class="w-full flex justify-center">
            <label
                class="input input-bordered bg-white text-[#353535] flex items-center gap-2 h-[50px] w-[87%] max-w-[740px] mr-3 shadow-lg">
                <img :src="searchIcon" alt="search">
                <input v-model="searchTerm" type="text" placeholder="Search" class="grow bg-white focus:outline-none" />
            </label>
        </div>

        <div v-if="filteredPokemons.length === 0" class="text-center text-[#353535]">
            <h1 class="text-[36px] text-[#353535] font-bold mb-5 mt-12">Uh-oh!</h1>
            <p class="text-[#5E5E5E] text-lg font-medium mt-2 mb-5">
                You look lost on your journey!
            </p>

            <RouterLink to="/" class="btn btn-primary hover:bg-[#C00E20] mt-6 rounded-full font-bold"
                @click="searchTerm = ''">
                Go back home
            </RouterLink>
        </div>

        <div ref="scrollContainer" @scroll="handleScroll"
            class="flex-1 overflow-y-auto px-6 w-full max-w-[800px] mx-auto">
            <div v-for="pokemon in filteredPokemons" :key="pokemon.name"
                class="bg-white flex justify-between items-center rounded-md my-2 cursor-pointer"
                @click="fetchPokemonDetails(pokemon.name)">
                <p class="p-4 text-xl text-[#353535] capitalize">{{ pokemon.name }}</p>
                <div class="p-4 text-right">
                    <button @click.stop="toggleFavorite(pokemon)" class="text-2xl">
                        <img :src="isFavorite(pokemon) ? Active : Disabled" alt="Favorite Icon" class="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>

        <dialog ref="modalRef" class="modal p-0">
            <div class="modal-box w-[85%] bg-white text-[#5E5E5E] text-lg p-0">
                <div v-if="selectedPokemon">
                    <div class="w-full h-[200px] bg-cover bg-center flex justify-center items-center"
                        :style="`background-image: url(${pokeground})`">
                        <button @click="closeModal" class="absolute right-4 top-4">
                            <img :src="closeIcon" alt="close">
                        </button>
                        <img v-if="selectedPokemon?.sprites?.front_default" :src="selectedPokemon.sprites.front_default"
                            alt="Pokemon Image" class="w-[50%] max-w-[200px] object-contain mt-6 jump">
                    </div>

                    <div class="py-4 px-7">
                        <p v-if="selectedPokemon?.name" class="border-b border-[#dcdcdc] h-1/5 py-2">
                            <strong>Name:</strong> {{ selectedPokemon.name }}
                        </p>
                        <p v-if="selectedPokemon?.height" class="border-b border-[#dcdcdc] h-1/5 py-2">
                            <strong>Height:</strong> {{ selectedPokemon.height }}
                        </p>
                        <p v-if="selectedPokemon?.weight" class="border-b border-[#dcdcdc] h-1/5 py-2">
                            <strong>Weight:</strong> {{ selectedPokemon.weight }}
                        </p>
                        <p v-if="selectedPokemon?.types" class="border-b border-[#dcdcdc] h-1/5 py-2">
                            <strong>Type:</strong> {{selectedPokemon.types?.map(t => t.type.name).join(", ")}}
                        </p>
                    </div>
                </div>

                <div v-if="selectedPokemon" class="flex justify-between items-center relative bottom-4 mt-5 px-7">
                    <button @click="copyToClipboard"
                        class="btn btn-primary hover:bg-[#C00E20] rounded-full text-lg font-bold w-[200px]">
                        Share to my friends
                    </button>
                    <button @click.stop="toggleFavorite(selectedPokemon)" class="text-2xl">
                        <img :src="isFavorite(selectedPokemon) ? Active : Disabled" alt="Favorite Icon"
                            class="w-10 h-10" />
                    </button>
                </div>
            </div>
        </dialog>

    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "../store/pokemonStore";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import Active from "../assets/Active.svg";
import Disabled from "../assets/Disabled.svg";
import searchIcon from "../assets/searchIcon.svg";
import pokeground from "../assets/pokeground.svg";
import closeIcon from "../assets/close.svg";

const store = usePokemonStore();
const scrollContainer = ref(null);
const searchTerm = ref("");
const modalRef = ref(null);
const selectedPokemon = ref(null);

onMounted(() => {
    store.fetchPokemons();
});

const filteredPokemons = computed(() => {
    return store.pokemons.filter(pokemon =>
        pokemon.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

const isFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name) return false;
    return store.favorites.some((fav) => fav.name === pokemon.name);
};

const fetchPokemonDetails = async (name) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!data) throw new Error("No se encontraron datos para este Pokémon");

        selectedPokemon.value = data;
        modalRef.value.showModal();
    } catch (error) {
        console.error("Error obteniendo detalles:", error);
        selectedPokemon.value = null;
    }
};

const closeModal = () => {
    modalRef.value.close();
    selectedPokemon.value = null;
};

const toggleFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name) return;
    store.toggleFavorite({ ...pokemon });
};

let isFetching = false;
const handleScroll = () => {
    if (isFetching || !scrollContainer.value) return;

    requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            isFetching = true;
            store.fetchPokemons().finally(() => {
                isFetching = false;
            });
        }
    });
};

const copyToClipboard = () => {
    if (!selectedPokemon.value) return;

    const isFav = isFavorite(selectedPokemon.value) ? "\n\nIn my favorites list! ⭐" : "";

    const pokemonData = `Check out this Pokémon!:\n\n` +
        `Name: ${selectedPokemon.value.name}\n` +
        `Height: ${selectedPokemon.value.height}, Weight: ${selectedPokemon.value.weight}, ` +
        `Type: ${selectedPokemon.value.types.map(t => t.type.name).join(", ")}${isFav}`;

    navigator.clipboard.writeText(pokemonData)
        .then(() => alert("Pokémon info copied to clipboard!"))
        .catch(err => console.error("Error copying:", err));
};
</script>