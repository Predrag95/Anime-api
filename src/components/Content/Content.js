import classes from './Content.module.css';

const Content = ({ animeData }) => {
  console.log(animeData)

  const renderSearchedAnimes = () => {
    return animeData?.map((anime, id) => {
      const imgUrl = anime?.images?.jpg?.image_url;
      const determineBgColor = () => (anime?.score > 7) ? '#31c050' : '#f5b70e';
      const nullScore = () => anime?.score === null ? 'No score' : anime?.score;

      return (
        <div
          key={id}
          className={classes.searched_anime_container}
        >
          <img src={imgUrl} alt='animeImage' className={classes.anime_img} />
          <div className={classes.anime_desc_container}>
            <div className={classes.anime_desc}>{`Name: ${anime?.title_english}`}</div>
          </div>
          <div className={classes.anime_score} style={{ background: determineBgColor() }}>{`Score: ${nullScore()}`}</div>
        </div>
      )
    })
  };

  return (
    <div className={classes.content_container}>
      {renderSearchedAnimes()}
    </div>
  )
};

export default Content;