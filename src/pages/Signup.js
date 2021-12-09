import { useState } from "react";
import env from "react-dotenv";
import axios from "axios";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(env);

    axios
      .post(`http://localhost:3001/user/`, {
        //   .post(`${env.BACKEND_URL}/favPokemon/`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.newUser.id);
        localStorage.setItem("userId", response.data.newUser.id);

        props.setUser(response.data.newUser);
      });
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor='email'>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input type='submit' value='Sign up!' />
      </div>
    </form>
  );
};

export default Signup;
