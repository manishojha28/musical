import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLikedSongs } from '../../features/likedsongs/likedSongsSlice';
import { Container } from '@material-ui/core';
import SongCard from '../song card/SongCard';

const LikedSongs = () => {
  const userState = useSelector((state) => state.user);
  const likedSongs = useSelector((state) => state.likedsongs.likedSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedSongs({ id: userState.user._id }));
  }, []);

  return (
    <Container maxWidth='md'>
      {likedSongs.length ? (
        likedSongs.map((song) => (
          <SongCard data={song} liked={false} key={song.id} />
        ))
      ) : (
        <h2>You dont have any liked songs.</h2>
      )}
    </Container>
  );
};

export default LikedSongs;
