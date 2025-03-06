# poke-app
Este proyecto es una aplicación web para explorar y gestionar Pokémon, desarrollada con Vue 3 y Vite. Permite buscar, visualizar detalles y marcar Pokémon como favoritos, con una experiencia fluida gracias a TailwindCSS + DaisyUI.

Tecnologías utilizadas
Vue 3 + Vite: Framework progresivo para la interfaz.
Pinia: Manejo de estado global, asegurando reactividad y facilidad en la gestión de favoritos.
Vue Router: Navegación entre vistas de manera eficiente.
Axios: Cliente HTTP para consumir la API de PokéAPI.
TailwindCSS + DaisyUI: Estilización rápida y componentes predefinidos.
LocalStorage: Persistencia de favoritos en el navegador.

Optimización en la carga de datos
Para mejorar la experiencia y el rendimiento:
Carga por lotes: Los Pokémon se obtienen en bloques de 20 usando un scroll infinito, evitando la sobrecarga inicial.
Evitamos recargas innecesarias: Se almacena el estado de los Pokémon ya cargados para no volver a solicitarlos.
Búsqueda en tiempo real: Filtros aplicados en el frontend sin afectar el rendimiento.
