import axios from 'axios';
import { useState } from 'react';
import './App.css';
import GistComponent from './components/GistComponent/GistComponent';

function App() {
  const [gists, setGists] = useState();
  async function onSubmit(e) {
    e.preventDefault();
    let currPage = 1;
    let result;
    let gistList = [];
    do {
      result = await axios.get(
        `https://api.github.com/users/${e.target.searchQuery.value}/gists?page=${currPage}`
      );
      currPage++;
      gistList = gistList.concat(
        result.data.map((gistData) => (
          <GistComponent key={Date.now() * Math.random()} {...gistData} />
        ))
      );
    } while (result.data.length > 0);
    setGists(gistList);
  }

  return (
    <div className='App'>
      <div className='layout'>
        <div className='mainContent'>
          <div className='topContent'>
            <h1>Gist API Demo</h1>
            <form onSubmit={onSubmit}>
              <input
                className='searchInput'
                type='text'
                name='searchQuery'
                placeholder={'Enter a username'}
              ></input>
              <button className='searchButton' type='submit'>
                Search
              </button>
            </form>
          </div>
          <div className='bottomContent'>{gists}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
