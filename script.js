const pokeName = document.getElementById("pokeName");
const pokeImg = document.getElementById("poke-image");
const pokeTypes = document.getElementById("listTypes");

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
    grass: '#68bb29',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    //default: '#dfd4d8',
    default: 'transparent',
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
           pokemonName.textContent = `Pokemon no encontrado`;
       }
       else{
            return res.json();
        }   
    }).then((data) => {
        console.log(data);
        /**Obtener Imagen */
        let pokeImg = data.sprites.other.home.front_default;
        console.log(pokeImg);
        pokeImage(pokeImg);
        
        /**Obtener nombre */
        let pokemonName = data.name;
        console.log('Nombre: ' + pokemonName);
        pokemon_Name(pokemonName)
        /**Obtener ID */
        let pokemonID = data.id;
        console.log('ID: ' + pokemonID);
        pokemon_ID(pokemonID);
        /**Obtiene el Peso */
        let pokemonWeight = data.weight;
        console.log('Peso: ' + pokemonWeight);
        pokemon_weight(pokemonWeight);
        /**Obtiene la altura */
        let pokemonHeight = data.height;
        console.log( 'Altura: ' + pokemonHeight);
        pokemon_height(pokemonHeight);

        
        //setListTypes(data.types);
        setCardColor(data.types);
        renderPokemonTypes(data.types);

        
    })
}

const setCardColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `${colorOne}`;
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

/** mandar a imprimir ID en el Front */
const pokemon_ID = (pokemonID) => {
    const pokemon_ID  = document.getElementById("pokemonID");
    pokemon_ID.textContent = `# ${pokemonID}`;
}

/** mandar a imprimir Nombre en el Front 
const setListTypes = (types) => {
    types.forEach(type => {
        console.log(type.type.name);
        const lisTypes = document.getElementById('listTypes')
        let li = document.createElement('li')
        li.innerText = type.type.name.toUpperCase()
        lisTypes.append(li);
    });  
}
*/
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("li");
        typeTextElement.style.background = typeColors[type.type.name];
        
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);


    });
}
const pokemon_weight = (pokemonWeight) =>{
    let pokemonPeso = pokemonWeight/10;
    console.log( 'Peso: ' + pokemonPeso + ' Kg')
    const pokemon_weight  = document.getElementById("pokemonWeight")
    pokemon_weight.textContent = `${pokemonPeso} Kg`;
}

const pokemon_height = (pokemonHeight) =>{
    let pokemonAltura = pokemonHeight/10;
    console.log('Altura: ' +pokemonAltura + ' mts' )
    const pokemon_height  = document.getElementById("pokemonHeight")
    pokemon_height.textContent = `${pokemonAltura} m`;
}



//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png");
