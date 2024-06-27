import React, { useState } from 'react'
import { loginAPICall, storeToken, saveLoggedInUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/Login-style.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  async function handleLoginForm(e) {
    e.preventDefault();

    loginAPICall(username, password)
      .then((response) => {
        // console.log(response.data);
        const token = 'Bearer ' + response.data.accessToken;
        storeToken(token);
        saveLoggedInUser(username);
        navigator("/main");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card" id='login-card'>
            <div className="card-header" id='login-card-header'>
              <h2 className="text-center">Prisijungimas</h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    {" "}
                   El.paštas arba Vardas
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      placeholder="Įveskite Vardą arba El. paštą"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-100"
                      id='login-w-100'
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Slaptažodis</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      placeholder="Įveskite slaptažodį"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-100"
                      id='login-input'
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    id='login-button'
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Prisijungti
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
