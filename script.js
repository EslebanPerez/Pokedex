const pokeName = document.getElementById("pokeName");

pokeName.addEventListener("keyup", function(event) {
    //Si la tecla es "Enter" entonces...
  if (event.keyCode === 13) {
    //Cancela la accion por default
   event.preventDefault();
   //Ejecuta la función que esta en el boton de busqueda en el HTML
   document.getElementById("buscar-button").click();
  }
});

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};



const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
       // console.log(res);
       if(res.status != '200'){
           console.log(res);
           pokeImage("./assets/sad-pikachu.gif")
       }
       else{
            return res.json();
        }   
    }).then((data) => {
        console.log(data);
        /**Obtener Imagen */
        let pokeImg = data.sprites.other.home.front_default;
        console.log(pokeImg);
        pokeImage(pokeImg)

        /**Obtener nombre */
        let pokemonName = data.name;
        console.log(pokemonName);
        pokemon_Name(pokemonName)
        /**Obtiene el tipo */
        let pokemontype = data.types;
        console.log('lenght: '+pokemontype.length);
        if(pokemontype.length == 2){
            let type1 = pokemontype[0];
            let nameType1 = type1.type.name;
            console.log('tipo 1: '+nameType1);
            let type2 = pokemontype[1];
            let nameType2 = type2.type.name;
            console.log('tipo 2: '+nameType2);

            pokemon_type(nameType1, nameType2);
        }else{
            let type1 = pokemontype[0];
            let nameType1 = type1.type.name;
            console.log('tipo 1: '+nameType1);
            pokemon_type(nameType1, "");
        }
        //pokemon_type(pokemontype);
        /**Obtiene el Peso */
        let pokemonWeight = data.weight;
        console.log(pokemonWeight);
        pokemon_weight(pokemonWeight);
        /**Obtiene la altura */
        let pokemonHeight = data.height;
        console.log(pokemonHeight);
        pokemon_height(pokemonHeight);



    })
}



//fetchPokemon();

const pokeImage = (url) =>{
    const pokeImg = document.getElementById("pokeImg")
    pokeImg.src = url;
}
/** mandar a imprimir Nombre en el Front */
const pokemon_Name = (pokemonName) => {
    const pokemon_Name  = document.getElementById("pokemonName");
    pokemon_Name.textContent = pokemonName.toUpperCase();
}

/** mandar a imprimir Nombre en el Front 
const pokemon_type = (pokemonType) => {
    const pokemon_type  = document.getElementById("pokemonType");
    pokemon_type.textContent = pokemonType.toUpperCase();
}*/

const pokemon_weight = (pokemonWeight) =>{
    let pokemonPeso = pokemonWeight/10;
    console.log(pokemonPeso)
    const pokemon_weight  = document.getElementById("pokemonWeight")
    pokemon_weight.textContent = `${pokemonPeso} Kg`;
}

const pokemon_height = (pokemonHeight) =>{
    let pokemonAltura = pokemonHeight/10;
    console.log(pokemonAltura)
    const pokemon_height  = document.getElementById("pokemonHeight")
    pokemon_height.textContent = `${pokemonAltura} m`;
}

const pokemon_type = (type1,type2) => {

}


//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png");

const imprimir = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola " + pokeInput);
}