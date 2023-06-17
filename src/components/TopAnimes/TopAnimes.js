import { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import axios from 'axios';

import { modalStyle } from '../../matirialSxStyles';
import techLines from '../../imgs/techLines.png'
import classes from './TopAnimes.module.css';

const TopAnimes = () => {

  const [topAnimeData, setTopAnimeData] = useState([]);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentTopAnime, setCurrentTopAnime] = useState({});

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime');
      const slicedData = response.data.data.slice(0, 5);
      setTopAnimeData(slicedData);
    } catch (error) {
      console.error(error);
    }
  };

  const clickedTopAnimeHandler = (e) => {
    setOpenModal(true);
    const clickedDiv = e.currentTarget;
    const divs = clickedDiv.querySelectorAll('div');
    const divsArr = Array.from(divs);

    const name = divsArr[0].innerHTML;
    const year = divsArr[1].innerHTML;
    const rank = divsArr[2].innerHTML;
    const image = divsArr[3].childNodes[0].src;
    const synopsis = divsArr[4].innerHTML;
    const status = divsArr[5].innerHTML;

    const topAnimeObject = {
      name,
      year,
      rank,
      image,
      synopsis,
      status
    };

    setCurrentTopAnime(topAnimeObject);
  };

  const renderTopAnimes = () => {
    return topAnimeData?.map((anime, id) => {
      const animeYear = (anime) => (anime) ? anime : 'No specified year';
      const animeImage = <img src={anime?.images?.jpg?.image_url} alt='animeImg'></img>;

      return (
        <div
          key={id}
          className={classes.anime_container}
          onClick={clickedTopAnimeHandler}
        >
          <div className={classes.anime_title}>{`Name: ${anime?.title}`}</div>
          <div className={classes.anime_year}>{`Year: ${animeYear(anime?.year)}`}</div>
          <div className={classes.anime_rank}>{`Rank: ${anime?.rank}`}</div>
          <div className={classes.image_not_displayed}>{animeImage}</div>
          <div className={classes.anime_synopsis}>{anime?.synopsis}</div>
          <div className={classes.anime_status}>{anime?.status}</div>
          <img className={classes.tech_lines} src={techLines} alt='techLines' />
        </div>
      )
    })
  };

  const openButton = (open) ? 'Hide top anime' : 'Show top anime';

  return (
    <div className={classes.top_anime_container}>
      <div className={classes.top_anime_header}>Current TOP 5 Anime:</div>
      <button
        className={classes.top_anime_button}
        onClick={() => setOpen(!open)}
      >
        {openButton}
      </button>
      <Modal
        open={openModal}
        disableAutoFocus
        onClick={() => setOpenModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={modalStyle}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currentTopAnime.name}
          </Typography>

          <Typography id='modal-modal-description' className='mt-2'>
            {`${currentTopAnime.year} - ${currentTopAnime.rank}`}
          </Typography>

          <img src={currentTopAnime.image} alt='animeCover' />
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currentTopAnime.synopsis}
          </Typography>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currentTopAnime.status}
          </Typography>
        </Box>
      </Modal>
      {
        !!(open) &&
        renderTopAnimes()
      }
    </div>
  )
};

export default TopAnimes;