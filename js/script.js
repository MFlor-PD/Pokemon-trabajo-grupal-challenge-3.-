

const btnGetPokemon = document.getElementById("get-pokemon"); //Boton
const infoPokemonDIV = document.getElementById("info-pokemon"); //Contenedor
let selectedPokemon;
let pokemon_types;

/*function getTypesPokemon (types){
    let text ="";
    types.forEach(element => {
        //console.log(element.type.url)
        fetch(`${element.type.url}`)
        .then((response) => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.sprites["generation-iii"].colosseum.name_icon);
        
            text += `<img src= ${data.sprites["generation-iii"].colosseum.name_icon}>`;
            infoPokemonDIV.innerHTML +=text;
        })
    });
}
*/


function getPokemon (){
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
    .then((response) => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
    })
    .then((data) => {
        console.log(data);
        //getTypesPokemon(data.types);
        pokemon_types = data.types;
        const pokemonTypes = data.types.map((type) => type.type.name).join(', ');
        infoPokemonDIV.innerHTML =  
            `<div class="character">
                    <img src=${data.sprites.front_default}>
                    <h3>${data.name}</h3>
                    <p>${pokemonTypes}</p>
                    <p>${data.weight}</p>
                    <p>${data.height}</p>
                </div>`;
        
        
    })
    .catch((error) => {
        console.error("Error: No se pudo procesar la solicitud")
    });

}


btnGetPokemon.addEventListener("click", () => {
    selectedPokemon = document.getElementById("pokemon-select").value; // Pokemon Seleccionado
    getPokemon();
    
    

})