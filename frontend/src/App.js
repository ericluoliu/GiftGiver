import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { LucideHelpCircle } from 'lucide-react';

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
  return (
    <div className="App">
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
  );
}

export default App;
