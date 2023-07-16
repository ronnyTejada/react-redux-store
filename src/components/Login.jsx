import React, { useState } from "react";
import "../css/login.css";
import { Link, Redirect } from "react-router-dom";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useUser();

  const firebase = useFirebaseApp();

  const signup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        alert("Email incorrecto");
      }
      if (e.code === "auth/wrong-password") {
        alert("Password incorrecta");
      }
    }
  };

  return (
    <section className="principal">
      {user && <Redirect to={"/account"}></Redirect>}

      <div className="form">
        <form action="#">
          <label htmlFor="">
            <strong>Email:</strong>{" "}
          </label>
          <br />
          <i className="fas fa-envelope formi"></i>

          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label for="password">
            <strong>Password:</strong>{" "}
          </label>
          <br />
          <i className="fas fa-lock formi"></i>
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <i className="fas fa-sign-in-alt formi i"></i>
          <input type="button" value="Login" onClick={login} />
          <i className="fas fa-user-plus formi i"></i>
          <input
            type="button"
            value="Signup"
            style={{ backgroundColor: "#6e62f0" }}
            onClick={signup}
          />
        </form>
      </div>
    </section>
  );
};

export default Login;
