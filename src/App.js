import SearchBar from './components/SearchBar/SearchBar';
import TopAnimes from './components/TopAnimes/TopAnimes';
import Content from './components/Content/Content';
import { useState } from 'react';

const App = () => {

  const [getSearchAnimes, setGetSearchAnimes] = useState([]);

  return (
    <div className='app_container'>
      <SearchBar setGetSearchAnimes={setGetSearchAnimes} />
      <div className='main_body_container'>
        <TopAnimes />
        <Content animeData={getSearchAnimes} />
      </div>
    </div>
  )
};

export default App;