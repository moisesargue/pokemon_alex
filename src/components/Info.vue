<template>
    <div>
        <div class="pokedex">
            
            <router-link to="/">
                <img src="pokedex.png" style="width: 40%;">
            </router-link>
        </div><br>

        <div class="container" v-for="p in useStore.Array" :key="p">
            <div class="row">
                <div class="col-6">
                    <h5># {{ p.id }}</h5>
                    <div>
                        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`"
                            style="width: 200px; height: auto;margin-top: 20%;">
                    </div><br>
                    <h5 style="text-transform: capitalize;font-weight: bold;">{{ p.name }}</h5>
                    <div class="tipo" :class="[p.types[0].type.name]">{{ p.types[0].type.name }}</div>
                </div>
                <div class="col-6">
                    <p style="font-weight: bolder;font-size: larger;">Información Básica</p>
                    <p><b>Peso:</b> <span>{{ p.weight }}kg</span></p>
                    <p><b>Estatura:</b> <span>{{ p.height }}</span></p>
                    <p><b>Experiencia base:</b> <span>{{ p.base_experience }}</span></p>
                    <p style="font-weight: bolder;font-size: larger;">Estadísticas</p>
                    <p><b>HP</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[0].base_stat + '%' }"
                            :aria-valuenow="p.stats[0].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[0].base_stat }}</div>
                    </div>
                    <p><b>Ataque</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[1].base_stat + '%' }"
                            :aria-valuenow="p.stats[1].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[1].base_stat }}</div>
                    </div>
                    <p><b>Defensa</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[2].base_stat + '%' }"
                            :aria-valuenow="p.stats[2].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[2].base_stat }}</div>
                    </div>
                    <p><b>Ataque Especial</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[3].base_stat + '%' }"
                            :aria-valuenow="p.stats[3].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[3].base_stat }}</div>
                    </div>
                    <p><b>Defensa Especial</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[4].base_stat + '%' }"
                            :aria-valuenow="p.stats[4].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[4].base_stat }}</div>
                    </div>
                    <p><b>Velocidad</b></p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: p.stats[5].base_stat + '%' }"
                            :aria-valuenow="p.stats[5].base_stat" aria-valuemin="0" aria-valuemax="100">{{
                                p.stats[5].base_stat }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script setup>
import { useUserStore } from '../stores/user.js';
const useStore = useUserStore();
console.log(useStore.Array);
</script>
  
<style scoped>
.pokedex {
    display: flex;
    justify-content: left;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    align-items: center;
    text-align: center;
    background-color: rgba(231, 129, 13, 0.301);
    width: 70rem;
    height: auto;
    border-radius: 50px;
    border: 4px solid rgba(224, 13, 101, 0.486);
    padding: 20px;
    margin-top: -25px;
}

.tipo {
    display: inline-block;
    padding: 5px 10px;
    font-size: 14px;
    text-transform: capitalize;
    border-radius: 4px;
}

.progress {
    margin-top: -10px;
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
.progress{
    background-color: #f09090;
}
.progress-bar{
    background-color: #960883;
}
</style>
