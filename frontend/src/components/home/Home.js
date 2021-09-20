import { CircularProgress, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../features/home/homeSlice';
import SongCard from '../song card/SongCard';

const Home = () => {
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getSongs());
  }, []);

  return (
    <Container maxWidth='lg'>
      {homeState.loading ? (
        <CircularProgress />
      ) : (
        homeState.songs.map((song) => <SongCard data={song} key={song.id} />)
      )}
    </Container>
  );
};

export default Home;
