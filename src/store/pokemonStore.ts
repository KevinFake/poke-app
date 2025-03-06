import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", () => {
    const pokemons = ref([]);
    const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);
    const loading = ref(false);
    let offset = 0;

    const fetchPokemons = async () => {
        if (loading.value) return;

        loading.value = true;
        const currentOffset = offset;

        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
            const newPokemons = data.results.filter(pokemon =>
                !pokemons.value.some(existing => existing.name === pokemon.name)
            );

            pokemons.value = [...pokemons.value, ...newPokemons];
            offset += 20;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        } finally {
            loading.value = false;
        }
    };

    const toggleFavorite = (pokemon) => {
        const index = favorites.value.findIndex((fav) => fav.name === pokemon.name);
        if (index === -1) {
            favorites.value.push(pokemon);
        } else {
            favorites.value.splice(index, 1);
        }
    };

    watch(favorites, (newFavorites) => {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }, { deep: true });

    return { pokemons, favorites, loading, fetchPokemons, toggleFavorite };
});