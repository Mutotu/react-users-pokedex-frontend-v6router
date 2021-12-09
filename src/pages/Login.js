import { useState } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    // console.log(env);
    // console.log(email);
    axios
      .post(`http://localhost:3001/user/login`, {
        // .post(`${env.BACKEND_URL}/user/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("userId", response.data.foundUser.id);
          props.setUser(response.data);
          navigation("/");
        }
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
        <input type='submit' value='Login' />
      </div>
    </form>
  );
};

export default Login;
