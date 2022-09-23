import axios from 'axios';
import { useState } from 'react';
import './App.css';
import GistComponent from './components/GistComponent/GistComponent';



function App() {
  const [gists, setGists] = useState();
  function onSubmit(e)
  {
    console.log("test")
    e.preventDefault();
     axios.get(`https://api.github.com/users/${e.target.searchQuery.value}/gists`).then(response => setGists(response.data.map(gistData => GistComponent(gistData))));
    //axios.get(`https://api.github.com/users/${e.target.searchQuery.value}/gists`).then(console.log);


  }
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" name="searchQuery" placeholder = {"Enter a username"}></input>
        <button type="submit">Search</button>
      </form>
      {gists && JSON.stringify(gists)}
    </div>
  );
}

export default App;
