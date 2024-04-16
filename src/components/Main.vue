<template>
   <router-link to="/juego">
            
            </router-link>

            <button style="margin-left: 170vh;position: relative;text-decoration: none;top: 260px;" type="button" class="btn btn-success"><router-link to="juego">
             JUEGO
            </router-link></button>
            
  <div>
    <div class="pokedex">
      <img src="./pokedex.png" style="width: 32.5%;">
    </div><br>

    <div class="q-pa-md">

      <button style="margin-left: 10%;font-size: 15px;width: 150px;border-radius: 20px;" type="button" class="btn btn-warning dropdown-toggle" 
        data-bs-toggle="dropdown" aria-expanded="false" >
        FILTRAR
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li v-for="tipo in tipos" :key="tipo">
          <a class="dropdown-item" href="#" @click="filtrarPorTipo(tipo)">{{ tipo }}</a>
        </li>
      </ul>
    </div>

    <div class="container">
      <div class="q-mr-md">
        
        <q-input rounded outlined bg-color="white" v-model="texto" label="Buscar pokemon" style="width: 310px;"></q-input>
      </div>
      <div>
        <q-btn color="dark" label="BUSCAR" @click="buscarPoke()"></q-btn>
        <q-btn color="dark" label="volver a inicio" v-if="busquedaActiva" @click="volverAInicio()"
          style="margin-left: 10px;"></q-btn>

      </div>
    </div>

    <div class="container text-center" id="cards">
      <div class="q-pa-md row items-start q-gutter-md" style="margin-top: 20px;">
        <q-card class="my-card" v-for="(pokemon) in filtrados" :key="pokemon">
          <div style="font-size: large;"># {{ pokeNum(pokemon) }}</div>
          <router-link :to="`/Info/${pokemon.name}`" @click="pokeImg(pokemon)">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeImg(pokemon)}.png`"
              style="width: 150px; height: auto;margin-top: 12px;">
          </router-link>
          <q-card-section style="text-align: center;">
            <div class="text-h6" style="text-transform: capitalize;font-weight: bold;">{{ pokemon.name }}</div>
            <div class="tipos">
              <div style="border-radius: 4px; margin-top: 5px;" v-for="tipo in traerTipo(pokemon)" :key="tipo"
                :class="tipoClass(tipo)">{{ tipo }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div style="text-align: center;margin-top: 16px;">
      <q-btn color="primary" label="CARGAR MÁS" @click="cargar50()" v-if="!busquedaActiva"></q-btn>
    </div><br><br>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "../stores/user.js"

const useStore = useUserStore()

let pokemones = ref([]);
let texto = ref("");
let filtrados = ref([]);
let busquedaActiva = ref(false);
let pokemonTipo = [];

let tipos = ref([
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy"
]);

axios
  .get("https://pokeapi.co/api/v2/pokemon/?limit=50")
  .then((res) => {
    console.log(res.data);
    pokemones.value = res.data.results;
    filtrados.value = res.data.results;

    //console.log(filtrados);
  })
  .catch((error) => {
    console.log(error);
  });

function pokeImg(pokemon) {
  let pokemonId = pokeNum(pokemon);
  useStore.Array = []
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((res) => {
      pokemonTipo = res.data.types.map((type) => type.type.name);
      pokemon.types = pokemonTipo;
      useStore.Array.push(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
  return pokemonId;
}

function pokeNum(pokemon) {
  return pokemon.url.split("/")[pokemon.url.split("/").length - 2];
}

function buscarPoke() {
  let input = texto.value.toLowerCase();

  filtrados.value = pokemones.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(input)
  );
  texto.value = ""
  busquedaActiva.value = input !== "";
}

function filtrarPorTipo(tipo) {
  filtrados.value = pokemones.value.filter((pokemon) =>
    traerTipo(pokemon).includes(tipo)
  );
}

function volverAInicio() {
  filtrados.value = pokemones.value;
  busquedaActiva.value = false;
}

function cargar50() {
  let offset = filtrados.value.length;
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`)
    .then((res) => {
      let nuevosPokemones = res.data.results;
      filtrados.value.push(...nuevosPokemones);
    })
    .catch((error) => {
      console.log(error);
    });
}

function traerTipo(pokemon) {
  return pokemon.types;
}

function tipoClass(tipo) {
  return tipo.toLowerCase();
}


</script>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
  display: flex;
}

#cards {
  margin-left: 9%;
  
}

.pokedex {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-card {
  width: 12rem;
  height: 22rem;
  display: inline-block;
  border: solid rgba(57, 5, 247, 0.616);
  transition: box-shadow 0.3s, transform 0.3s;
  background-color: rgba(221, 11, 11, 0.37);
  margin-top: 30px;
}

.my-card:hover {
  transform: scale(1.2);
}

.tipos {
  margin-top: 15px;
  display: inline-block;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 14px;
  text-transform: capitalize;
}

.bug {
  background-color: #A8B820;
}

.dark {
  background-color: #705848;
}

.dragon {
  background-color: #7038F8;
}

.electric {
  background-color: #F8D030;
}

.fairy {
  background-color: #EE99AC;
}

.fighting {
  background-color: #C03028;
}

.fire {
  background-color: #F08030;
}

.flying {
  background-color: #A890F0;
}

.ghost {
  background-color: #705898;
}

.grass {
  background-color: #78C850;
}

.ground {
  background-color: #E0C068;
}

.ice {
  background-color: #98D8D8;
}

.normal {
  background-color: #A8A878;
}

.poison {
  background-color: #A040A0;
}

.psychic {
  background-color: #F85888;
}

.rock {
  background-color: #B8A038;
}

.steel {
  background-color: #B8B8D0;
}

.water {
  background-color: #6890F0;
}

.btn btn-warning dropdown-toggle{
  margin-bottom: 50%;
}

a{
 text-decoration: none;
 color: white;
}
</style>