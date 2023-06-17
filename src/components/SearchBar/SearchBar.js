import { useState, useRef } from 'react';
import axios from 'axios';

import anime from '../../imgs/anime.png'
import classes from './SearchBar.module.css';

const SearchBar = ({ setGetSearchAnimes }) => {

 const [searchedAnime, setSearchedAnime] = useState('');
 const inputRef = useRef(null);

 const handleChangedAnime = (e) => {
  setSearchedAnime(e.target.value)
 };

 const submitFormHanlder = (e) => {
  e.preventDefault();

  const getApi = async () => {
   try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchedAnime}`);
    const limitResponseData = 10;
    const slicedData = response.data.data.slice(0, limitResponseData);
    setGetSearchAnimes(slicedData);
    setSearchedAnime('');
    inputRef.current.value = '';
    
   } catch (error) {
    console.error(error);
   }
  };

  getApi();
 };

 return (
  <div className={classes.search_bar_container}>
   <img src={anime} alt='animeLogo' className={classes.anime_logo_container} />
   <form
    onSubmit={submitFormHanlder}
   >
    <input
     className={classes.input}
     type='text'
     placeholder='Enter Anime Title...'
     onChange={handleChangedAnime}
     ref={inputRef}
    />
    <button className={classes.search_button} type='submit'>Search</button>
   </form>
  </div>
 )
};

export default SearchBar;