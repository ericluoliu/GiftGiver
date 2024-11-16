import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState("");
  const [gift, setGift] = useState("");
  function QueryHandler(event) {
    setQuery(event.target.value)
  }
  function Send() {
    axios.post('http://127.0.0.1:5050/', {
      input_query: query
    })
    .then(function (response) {
      console.log(response)
      setGift(response.data['message']);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  function Login() {
    console.log("login button pressed")
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
        <div className="Login-Button">
          <button onClick = {Login}>
            Login</button>
        </div>
      </div>
      <div className="Main">
        <div className="History">
          <h1>Login to view history</h1>
        </div>
        <div className="Query">
          <h1>Welcome to GiftGive! What type of gifts are you looking for?</h1>
          <textarea
            cols = {70}
            rows = {4}
            value = {query}
            onChange = {QueryHandler}
          ></textarea>
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
