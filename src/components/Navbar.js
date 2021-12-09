// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const Navbar = (props) => {
//   const nav = useNavigate();
//   const afterLogout = () => {
//     return (
//       <>
//         <li>
//           <Link to='/signup'>Sign up</Link>
//         </li>
//         <li>
//           <Link to='/login'>Login</Link>
//         </li>
//       </>
//     );
//   };

//   const loggedin = () => {
//     return (
//       <>
//         <li>
//           <Link to='/'>All Pokemon</Link>
//         </li>
//         <li>
//           <Link to='/favorites'>My Favorites</Link>
//         </li>
//         <li>
//           <span
//             onClick={() => {
//               localStorage.removeItem("userId");
//               props.setUser({});
//               props.setFavPokemon([]);
//               props.setFavPokemonNames([]);
//               nav("/");
//             }}
//           >
//             Logout
//           </span>
//         </li>
//       </>
//     );
//   };

//   // return <ul>{isLoggedIn ? <>{loggedin()}</> : <>{afterLogout()}</>}</ul>;
//   return <ul>{!props.user ? <>{afterLogout()} </> : <>{loggedin()}</>}</ul>;
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const nav = useNavigate();
  const afterLogout = () => {
    return (
      <>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </>
    );
  };

  const loggedin = () => {
    return (
      <>
        <li>
          <Link to='/'>All Pokemon</Link>
        </li>
        <li>
          <Link to='/favorites'>My Favorites</Link>
        </li>
        <li>
          <span
            onClick={() => {
              localStorage.removeItem("userId");
              props.setUser({});
              props.setFavPokemon([]);
              props.setFavPokemonNames([]);
              // console.log(props.favPokemon);
              nav("/");
            }}
          >
            Logout
          </span>
        </li>
      </>
    );
  };

  return (
    <ul>{!localStorage.userId ? <>{afterLogout()} </> : <>{loggedin()}</>}</ul>
  );
  // return <ul>{!props.user ? <>{afterLogout()} </> : <>{loggedin()}</>}</ul>;
  // return (
  //   <>
  //     <ul>
  //       {afterLogout()}
  //       {loggedin()}
  //     </ul>
  //   </>
  // );
};

export default Navbar;
