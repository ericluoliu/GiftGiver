import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

function App() {

  // Variables for query to Gemini
  const [itemTheme, setTheme] = useState("");
  const [age, setAge] = useState(25);
  const [additional, setAdditional] = useState("")
  const [gift, setGift] = useState("");

  // Sends itemTheme, age, and additional variables to backend and receives array of 5 strings for gifts
  function Send() {
    console.log(itemTheme, age, additional);
    axios.post('http://127.0.0.1:5050/query', {
      input_item: itemTheme,
      input_age: age,
      input_additional: additional 
    })
    .then(function(response) {
      // Where array list of 5 items is received
      // TODO: Melody start your card display here
      console.log(response)
      setGift(response.data['message']);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Login: Sends username and password to backend and return "login request received" message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function Login() {
    console.log("Logging in");
    console.log("Username: " + username);
    console.log("Password: " + password);
    axios.post("http://127.0.0.1:5050/login", {
      user_username: username,
      user_password: password
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Register: Sends newUsername and newPassword to backend and return "register request received" message
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  function Register() {
    console.log("Registering account");
    console.log("New Username: " + newUsername);
    console.log("New Password: " + newPassword);
    axios.post("http://127.0.0.1:5050/register", {
      new_username: newUsername,
      new_password: password
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Handles changes in itemTheme, age, additional, username, password, newUsername and newPassword variables
  function handleItemTheme(event) {
    setTheme(event.target.value);
  }
  function handleAgeChange(event) {
    setAge(event.target.value);
  }
  function handleAdditional(event) {
    setAdditional(event.target.value);
  }
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleNewUsername(event) {
    setNewUsername(event.target.value);
  }
  function handleNewPassword(event) {
    setNewPassword(event.target.value);
  }

  // Page is divided into Navigation-Bar on top and Main below
  // User-Interface located in Navigation-Bar contains Login-Button and Register-Button
  // Main is a flex box with sections History and Query
  // Query is divided into header, Input, button to send, and another header for gift
  return (
    <div className="App">
      <div className="Navigation-Bar">
        <div className="Logo">
          <p1>&lt;insert image&gt;</p1>
        </div>
        <div className="Title">
          <h1>Gift Giver</h1>
        </div>
        <div className="User-Interface">
          <div className="Login-Button">
            <Popup trigger=
              {<button>Login</button>} 
              modal nested>{
              close => (
                <div className="Login-Window">
                  <div className="Login-Info">
                    <p1>Username</p1>
                    <p1>Password</p1>
                  </div>
                  <div className="Login-Input">
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {username}
                      onChange = {handleUsername}
                    ></textarea>
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {password}
                      onChange = {handlePassword}
                    ></textarea>
                  </div>
                  <div className="Login-Options">
                    <div className="Login-Options-Buttons">
                      <button onClick = {Login}>
                        Log in
                      </button>
                    </div>
                    <div className="Login-Options-Buttons">
                      <button onClick= {close}>
                        Exit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
          <div className="Register-Button">
            <Popup trigger=
              {<button>Register</button>} 
              modal nested>{
              close => (
                <div className="Register-Window">
                  <div className="Register-Info">
                    <p1>Username</p1>
                    <p1>Password</p1>
                  </div>
                  <div className="Register-Input">
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {newUsername}
                      onChange = {handleNewUsername}
                    ></textarea>
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {newPassword}
                      onChange = {handleNewPassword}
                    ></textarea>
                  </div>
                  <div className="Register-Options">
                    <div className="Register-Options-Buttons">
                      <button onClick = {Register}>
                        Register
                      </button>
                    </div>
                    <div className="Register-Options-Buttons">
                      <button onClick= {close}>
                        Exit
                      </button>
                    </div>
                  </div>
                </div>
                )}
            </Popup>
          </div>
        </div> 
      </div>
      <div className="Main">
        <div className="History">
          <h4>&lt;Login to view history&gt;</h4>
        </div>
        <div className="Query">
          <h2>Welcome to GiftGiver!</h2>
          <h3>Enter the information below to get some gift ideas for your friend!</h3>
          <div className="Input">
            <div className="Item">
              <p1>Item Theme:</p1>
              <textarea
                cols = {20}
                rows = {4}
                value = {itemTheme}
                onChange = {handleItemTheme}
              ></textarea>
            </div>
            <div className="Age">
              <p1>Age:</p1>
              <div>
                <input
                  type="range"
                  id="slider"
                  min="0"
                  max="100"
                  value={age}
                  onChange={handleAgeChange}
                />
              <p>Value: {age}</p>
              </div>
            </div>
            <div className="Additional">
              <p1>Additional Information:</p1>
              <textarea
                cols = {20}
                rows = {4}
                value = {additional}
                onChange = {handleAdditional}
              ></textarea>
            </div>
          </div>
          <button
            onClick = {Send}
          >Send</button>
          <h3>
            Gifts: {gift}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
