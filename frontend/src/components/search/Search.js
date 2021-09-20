import React, { useRef, useState, useEffect } from 'react';
import { CircularProgress, Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getSearchedSongs } from '../../features/search/searchSlice';
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from '../song card/SongCard';

const Search = () => {
  const [songName, setSongName] = useState('');

  const inputRef = useRef(null);

  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchedSongs({ name: songName }));
  };

  return (
    <Container maxWidth='md'>
      <form className='form' onSubmit={(e) => submitHandler(e)}>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='search any song'
          ref={inputRef}
          onChange={(e) => setSongName(e.target.value)}
        />
        <IconButton type='submit'>
          <SearchIcon color='primary' fontSize='medium' />
        </IconButton>
      </form>
      {searchState.searching ? (
        <CircularProgress />
      ) : (
        searchState.searchedSongs.map((song) => (
          <SongCard data={song} key={song.id} />
        ))
      )}
    </Container>
  );
};

export default Search;
