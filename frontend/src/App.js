import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

function App() {
  const [item, setTheme] = useState("");
  const [gift, setGift] = useState("");
  const [age, setAge] = useState(25);
  const [additional, setAdditional] = useState("")
  function SignIn() {
    console.log("Sign in button pressed")
  }
  function handleItemTheme(event) {
    setTheme(event.target.value)
  }
  function handleAgeChange(event) {
    setAge(event.target.value);
  }
  function handleAdditional(event) {
    setAdditional(event.target.value);
  }
  function Send() {
    console.log(item, age, additional);
    axios.post('http://127.0.0.1:5050/', {
      input_item: item,
      input_age: age,
      input_additional: additional 
    })
    .then(function (response) {
      // Where array list of 5 items is received
      // TODO: Melody start your card display here
      console.log(response)
      setGift(response.data['message']);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  return (
    <div className="App">
      <div className="Navigation-Bar">
        <div className="Logo">
          <p1>insert image</p1>
        </div>
        <div className="Title">
          <h1>Gift Giver</h1>
        </div>
        <div className="SignIn-Button">
          <div>
            <Popup trigger=
              {<button>Sign in</button>} 
                modal nested>
                {
                  close => (
                    <div className="SignIn-Window">
                      <div className="SignIn-Info">
                        <p1>E-mail</p1>
                        <p1>Password</p1>
                      </div>
                      <div className="SignIn-Input">
                        <textarea
                          cols = {20}
                          rows = {1}
                        ></textarea>
                        <textarea
                          cols = {20}
                          rows = {1}
                        ></textarea>
                      </div>
                      <div className="SignIn-Buttons">
                        <div>
                          <button onClick = {SignIn}>
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
                  )
                }
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
                value = {item}
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
