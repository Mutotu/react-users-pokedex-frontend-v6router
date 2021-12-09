const PokemonList = (props) => {
  return (
    <div>
      {/* Check if filteredSearch has a value if it does render the filtered results */}
      {props.filteredSearch
        ? props.filteredResults.map((pokemon, i) => (
            <div key={i} className='singlePokemon'>
              <h1>{pokemon.name}</h1>
              {/* evaluate if the pokemon.name from the pokemon api exists inside of our favpokemonNames array and conditionally render the right heart with the right function*/}
              {props.isFave(pokemon.name) ? (
                <span
                  className='heartOutline'
                  onClick={() => props.deletePokemon(pokemon.name)}
                >
                  ❤️
                </span>
              ) : (
                <span
                  className='heartOutline'
                  onClick={() => props.savePokemon(pokemon.name)}
                >
                  ♡
                </span>
              )}
            </div>
          ))
        : // if we haven't typed into the filteredSearch ('') then just render all pokemon
          props.allPokemon.map((pokemon, i) => (
            <div key={i} className='singlePokemon'>
              <h1>{pokemon.name}</h1>
              {/* evaluate if the pokemon.name from the pokemon api exists inside of our favpokemonNames array and conditionally render the right heart with the right function*/}
              {props.isFave(pokemon.name) ? (
                <span
                  className='heartOutline'
                  //changed to id from name
                  onClick={() => props.deletePokemon(pokemon.id)}
                >
                  ❤️
                </span>
              ) : (
                <span
                  className='heartOutline'
                  onClick={() => props.savePokemon(pokemon.name)}
                >
                  ♡
                </span>
              )}
            </div>
          ))}
    </div>
  );
};

export default PokemonList;
