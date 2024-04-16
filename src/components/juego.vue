<template>
<router-link to="/">
                <img src="./pokedex.png" style="width: 10%;">
            </router-link>
    <div class="con">
        <div class="ma">
            <div class="zz">
           
            </div>
            <img class="ss" :src="imagen" alt="Pokémon"
                :style="{ filter: estado === 1 ? 'brightness(1)' : 'brightness(0)' }">
                <div class="xx">
            <input class="aa" type="text" v-model="pokemon" placeholder="BUSCAR POKEMON...">
            
            <button @click="validarPokemon" aria-required="true" style="height: 50px; width: 10%;">🔍</button>
</div>
            <div class="vv">
                
                <button @click="generarNumeroAleatorio">POKEMON ALEATORIO</button>
            </div>

        </div>
       
            
     </div>
  
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

let imagen = ref('');
let informacion = ref('');
let numAleatorio = ref(null);
let pokemon = ref('');
let nombre = ref('');
let estado = ref(0);

async function generarNumeroAleatorio() {
    numAleatorio.value = Math.floor(Math.random() * 898) + 1; // El número máximo de Pokémon es 898
    await informacionPokemon(numAleatorio.value);
    estado.value = 0
    pokemon.value = ""
}

async function informacionPokemon(num) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
        informacion.value = res.data;
        nombre.value = res.data.name
        console.log(nombre.value);
        imagen.value = res.data.sprites.other.dream_world.front_default;
        if (imagen.value == null) {
            generarNumeroAleatorio();
        }
    } catch (error) {
        console.error(error);
    }
}

// Llama a la función para generar un Pokémon aleatorio al inicio
generarNumeroAleatorio();


function validarPokemon() {
    console.log('validar pokemon');
    if (pokemon.value == nombre.value) {
        console.log('es correcto');
        estado.value = 1;

        Swal.fire({
            position: "center",
            icon: "success",
            title: "POKEMON CORRECTO",
            showConfirmButton: false,
            timer: 1500

        });
    } else {

        console.log('incorrecto');
        Swal.fire({
            icon: "error",
            title: "SIGUE INTENTANDO",
            footer: '<a href="#">🏠</a>'
        });
    }
}
</script>

<style>

@media(max-width: 1240px){
    .aa {
    margin-left: 30%;
    width: 40%;
    height: 50PX;
    

}
    
    
}
.ss {
    width: 30vh;
    height: 30vh;
    margin-right: 800px;
    top: 62%;
    left: 600px;


}

.con {
    padding: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-image: url(./mm.png);

}

.ma {
    padding: 40px;
    margin-left: 300px;

    
}

.aa {
    margin-left: 10%;
    width: 40%;
    height: 50PX;
    

}
.zz{
    color: aliceblue;
    margin-bottom: 300px;
}
.xx{
    position: absolute;
    top: 65%;
    width: 50%;
    height: 50px;
    right:60px;
}

.vv button{
   width: 30%;
    height: 50px;

}



</style>
