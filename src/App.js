import AllPokemon from "./pages/AllPokemon";
import FavPokemon from "./pages/FavPokemon";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [favPokemon, setFavPokemon] = useState([]);
  const [favPokemonNames, setFavPokemonNames] = useState([]);
  const [user, setUser] = useState({});

  const fetchUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // console.log(localStorage.getItem("userId"));
      axios
        .get(`http://localhost:3001/user/verify`, {
          // .get(`${env.BACKEND_URL}/users/verify`, {
          headers: {
            Authorization: userId,
          },
        })
        .then((response) => {
          setUser(response.data.user);
          fetchSavedPokemon();
        });
    }
  };

  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    if (localStorage.userId) {
      try {
        let response = await axios.get(
          `http://localhost:3001/favPokemon/${localStorage.userId}`
        );
        // console.log(response);
        // assign to state of favPokemon
        setFavPokemon(response.data.favPokemon);

        // create an empty array
        let names = [];
        // loop through the favorite pokemon array
        for (let pokemon of response.data.favPokemon) {
          // only push the names of each favorited pokemon into names
          names.push(pokemon.name);
        }
        // then set favpokemonnames to an array of just the saved pokemon names
        // to be used in the isFave function
        setFavPokemonNames(names);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ONLY when the app loads fetch all saved pokemon
  // will not update saved pokemon everytime you save one!!!

  const savePokemon = async (pokemonName) => {
    if (localStorage.userId) {
      try {
        let res = await axios.post("http://localhost:3001/favPokemon", {
          name: pokemonName,
          userId: localStorage.userId,
        });
        // after every save, refetch all saved pokemon and update
        fetchSavedPokemon();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isFave = (currentPokemonName) => {
    // check if the parameter currentPokemonName exists inside of the favPokemonNames array, if so return true, otherwise return false (for the conditional render of hearts)
    if (favPokemonNames.includes(currentPokemonName)) {
      return true;
    }
    return false;
  };

  const deletePokemon = async (pokemonName) => {
    try {
      let res = await axios.delete(
        `http://localhost:3001/favPokemon/${pokemonName}`
      );
      // console.log(res);
      fetchSavedPokemon();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchSavedPokemon();
  }, [localStorage.userId]);
  return (
    <div className='App'>
      <Navbar
        user={user}
        setUser={setUser}
        setFavPokemon={setFavPokemon}
        setFavPokemonNames={setFavPokemonNames}
        favPokemon={favPokemon}
      />
      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <AllPokemon
                savePokemon={savePokemon}
                isFave={isFave}
                deletePokemon={deletePokemon}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/favorites'
          element={
            user ? (
              <FavPokemon
                favPokemon={favPokemon}
                isFave={isFave}
                deletePokemon={deletePokemon}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/signup'
          element={<Signup user={user} setUser={setUser} />}
        />

        <Route path='/login' element={<Login setUser={setUser} />} />
        {/* <Route
          path='/'
          element={
            <AllPokemon
              savePokemon={savePokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
          }
        />

        <Route
          path='/favorites'
          element={
            <FavPokemon
              favPokemon={favPokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
          }
        />
        <Route
          path='/signup'
          element={<Signup user={user} setUser={setUser} />}
        />

        <Route path='/login' element={<Login setUser={setUser} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
