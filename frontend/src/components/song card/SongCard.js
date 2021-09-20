import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedSong } from '../../features/song card/songCardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2em',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    marginLeft: '3em',
  },
}));

const SongCard = ({ data, liked }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [color, setColor] = useState(false);

  const likeHandler = () => {
    if (userState.isLoggedIn) {
      dispatch(addLikedSong({ id: userState.user._id, song: data }));
      setColor(!color);
    } else {
      alert('You need signup or login to like a song!');
    }
  };

  return (
    <Container maxWidth='md'>
      <Card className={classes.root}>
        {liked && (
          <CardActions>
            <IconButton onClick={likeHandler}>
              <FavoriteIcon color={color ? 'primary' : 'inherit'} />
            </IconButton>
          </CardActions>
        )}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              {data.song}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {data.album}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <audio controls src={data.media_url}></audio>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={data.image}
          title='Album cover'
        />
      </Card>
    </Container>
  );
};

export default SongCard;

SongCard.defaultProps = {
  liked: true,
};
