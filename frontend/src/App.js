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

  // Sends email and password to backend and return "login successful" message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function Login() {
    console.log("Logging in")
    console.log("Email: " + email);
    console.log("Password: " + password);
    axios.post("http://127.0.0.1:5050/login", {
      user_email: email,
      user_password: password
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Handles changes in itemTheme, age, additional, email, and password variables
  function handleItemTheme(event) {
    setTheme(event.target.value);
  }
  function handleAgeChange(event) {
    setAge(event.target.value);
  }
  function handleAdditional(event) {
    setAdditional(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  // Page is divided into Navigation-Bar on top and Main below
  // Login-Button located in Navigation-Bar opens a popup Login-Window
  // Main is a flex box with sections History and Query
  // Query is divided into header, Input, button to send, and another header for gift
  return (
    <div className="App">
      <div className="Navigation-Bar">
        <div className="Logo">
          <p1>insert image</p1>
        </div>
        <div className="Title">
          <h1>Gift Giver</h1>
        </div>
        <div className="Login-Button">
          <div>
            <Popup trigger=
              {<button>Login</button>} 
              modal nested>{
              close => (
                <div className="Login-Window">
                  <div className="Login-Info">
                    <p1>E-mail</p1>
                    <p1>Password</p1>
                  </div>
                  <div className="Login-Input">
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {email}
                      onChange = {handleEmail}
                    ></textarea>
                    <textarea
                      cols = {35}
                      rows = {1}
                      value = {password}
                      onChange = {handlePassword}
                    ></textarea>
                  </div>
                  <div className="Login-Buttons">
                    <div>
                      <button onClick = {Login}>
                        Sign in
                      </button>
                    </div>
                    <div>
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
          <h1>Login to view history</h1>
        </div>
        <div className="Query">
          <h1>Welcome to GiftGive! What type of gifts are you looking for?</h1>
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
          <h1>
            Gifts: {gift}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
