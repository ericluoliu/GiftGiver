import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

// Material UI imports
import Button from '@mui/material/Button';

function App() {

  // Variables for query to Gemini
  const [itemTheme, setTheme] = useState("");
  const [age, setAge] = useState(25);
  const [additional, setAdditional] = useState("")
  const [gift, setGift] = useState([]);

  // Logged User: To store queries and view user history
  const [loggedUser, setLoggedUser] = useState("")
  const [loginStatus, setLoginStatus] = useState(false)
  const [userHistory, setUserHistory] = useState([])
  
  // Sends itemTheme, age, and additional variables to backend and receives array of 5 strings for gifts
  // If logged in, also returns 'history' for user which is a 2-D array
  function Send() {
    console.log(itemTheme, age, additional);
    axios.post('http://127.0.0.1:5050/query', {
      input_item: itemTheme,
      input_age: age,
      input_additional: additional,
      input_user: loggedUser
    })
    .then(function(response) {
      // Where array list of 5 items is received
      // TODO: Melody start your card display here
      console.log(response)
      setGift(response.data['message']);
      if (loginStatus) {
        setUserHistory(response.data['history'])
        // TODO: Sort user history to be in order of most recent query(?)
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Login: Sends username and password to backend and login
  // If login successful, retrieve 'history' for user and display
  // If login fails, clear fields and show alert message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false)
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
      if (response.data['login status'] === 'successful login') {
        console.log("Login Successful")
        setLoggedUser(username)
        setLoginStatus(true)
        console.log("Logged User: " + username)
        setUsername("")
        setPassword("")
        setLoginError(false)
        setUserHistory(response.data['history'])
      }
      else {
        console.log("Login Failed")
        setUsername("")
        setPassword("")
        setLoginError(true)
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Register: Sends newUsername and newPassword to backend and return "register request received" message
  // If registration successful, retrieve 'history' for user and display
  // If registration fails, clear fields and show alert message
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registerError, setRegisterError] = useState(false)
  function Register() {
    console.log("Registering account");
    console.log("New Username: " + newUsername);
    console.log("New Password: " + newPassword);
    axios.post("http://127.0.0.1:5050/register", {
      new_username: newUsername,
      new_password: newPassword
    })
    .then(function(response) {
      console.log(response.data['registration status'])
      if (response.data['registration status'] === 'successful registration') {
        console.log("Registration Successful")
        setLoggedUser(newUsername)
        setLoginStatus(true)
        console.log("Logged User: " + newUsername)
        setNewUsername("")
        setNewPassword("")
        setRegisterError(false)
        setUserHistory(response.data['history'])
      }
      else {
        console.log("Registration Failed")
        setNewUsername("")
        setNewPassword("")
        setRegisterError(true)
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Logs user out
  function LogOut() {
    setLoggedUser("")
    setLoginStatus(false)
  }

  // Clears login interface when popup is closed
  function handleClose(close) {
    setUsername('');
    setPassword('');
    setNewUsername('');
    setNewPassword('');
    setLoginError(false);
    setRegisterError(false);
    close();
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
    // User-Interface located in Navigation-Bar contains:
      // Logged in: Login-Button and Register-Button
      // Logged out: Welcome text and Log Out button
    // Main is a flex box with sections History and Query
      // History is a scrollable div which displays user history items when logged in
      // Query is divided into header, Input, button to send, and another header for gift
  return (
    <div className="App">
      <div className="Navigation-Bar">
        <div className="Logo">
          <img src="/eric.jpg" alt="Eric's face" style={{width: "75px", height: "75px"}}/>
        </div>
        <div className="Title">
          <h1>Gift Giver</h1>
        </div>
        <div className="User-Interface">
          {loginStatus ? (
            <div className="Logged-In">
              <p1>Welcome {loggedUser}!</p1>
              <button onClick={LogOut}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="Not-Logged-In">
              <div className="Login-Button">
              <Popup trigger=
                {<button>Login</button>} 
                modal nested>{
                close => (
                  <div className="Login-Window">
                    <div className="Login-Info">
                      <p1 className="Empty-Div">.</p1>
                      <p1>Username</p1>
                      <p1>Password</p1>
                    </div>
                    <div className="Login-Input">
                      {loginError ? (
                        <p1 className="Error-Text">There was an error logging in</p1>
                        ) : (
                        <p1>Please enter your login information</p1>
                      )}
                      <textarea
                        cols = {45}
                        rows = {1}
                        value = {username}
                        onChange = {handleUsername}
                      ></textarea>
                      <textarea
                        cols = {45}
                        rows = {1}
                        value = {password}
                        onChange = {handlePassword}
                      ></textarea>
                    </div>
                    <div className="Login-Options">
                      <p1 className="Empty-Div">.</p1>
                      <div className="Login-Options-Buttons">
                        <button onClick = {Login}>
                          Log in
                        </button>
                      </div>
                      <div className="Login-Options-Buttons">
                        <button onClick= {() => handleClose(close)}>
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
                      <p1 className="Empty-Div">.</p1>
                      <p1>Username</p1>
                      <p1>Password</p1>
                    </div>
                    <div className="Register-Input">
                      {registerError ? (
                        <p1 className="Error-Text">There was an error while registering</p1>
                        ) : (
                        <p1>Please enter a username and password to register</p1>
                      )}
                      <textarea
                        cols = {45}
                        rows = {1}
                        value = {newUsername}
                        onChange = {handleNewUsername}
                      ></textarea>
                      <textarea
                        cols = {45}
                        rows = {1}
                        value = {newPassword}
                        onChange = {handleNewPassword}
                      ></textarea>
                    </div>
                    <div className="Register-Options">
                      <p1 className="Empty-Div">.</p1>
                      <div className="Register-Options-Buttons">
                        <button onClick = {Register}>
                          Register
                        </button>
                      </div>
                      <div className="Register-Options-Buttons">
                        <button onClick= {() => handleClose(close)}>
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
              </Popup>
              </div>
            </div>
          )}
        </div> 
      </div>
      <div className="Main">
        <div className="History">
          {loginStatus ? (
            userHistory.map((query, indexOne) => (
              <div key={indexOne} style={{ margin: '10px', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                {query.map((item, indexTwo) => (
                  <div key={indexOne} style={{ margin: '10px', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                    {item}
                  </div>
                ))}
              </div>
            ))
            ) : (
            <div>Login to view past search history</div>
            )
          }
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
          <Button variant="outlined" onClick={Send}>Send</Button>
          <h3>
            Gifts:
          </h3>
          <div classname="Gifts">
            {gift.map((item, index) => (
              <div classname="Gift-Item" key={index} style={{ margin: '10px', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
