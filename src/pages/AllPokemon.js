import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import Filterbar from "../components/Filterbar";
const AllPokemon = (props) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const fetchAllPokemon = async () => {
    try {
      let response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=200"
      );
      // console.log(response.data.results)
      setAllPokemon(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPokemon();
  }, []);

  // filter through the full array of pokemon and if the pokemon.name includes the search term
  // then set the filteredResults to be an array with the filtered results
  const filter = (term) => {
    // returns an array with all the items that includes the term passed in
    let filtered = allPokemon.filter((pokemon) => {
      return pokemon.name.includes(term);
    });
    setFilteredResults(filtered);
  };
  // this useEffect watches every time the filteredSearch changes (every letter we type in or delete) then run the filter function again
  useEffect(() => {
    filter(filteredSearch);
  }, [filteredSearch]);

  return (
    <div className='allPokemon'>
      <h1>All Pokemon</h1>
      <Filterbar
        filteredSearch={filteredSearch}
        setFilteredSearch={setFilteredSearch}
      />
      <PokemonList
        // pass down all the pokemon
        allPokemon={allPokemon}
        // pass down the filtered results
        filteredResults={filteredResults}
        // pass down the searchTerm (whatever we type into the input)
        filteredSearch={filteredSearch}
        // pass down the save pokemon function to save a pokemon to our backend
        savePokemon={props.savePokemon}
        // pass down the isFave to evaluate if a pokemon has been favorited
        isFave={props.isFave}
        // pass down the deletePokemon function to delete a pokemon from our backend
        deletePokemon={props.deletePokemon}
      />
    </div>
  );
};
export default AllPokemon;
