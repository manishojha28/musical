import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Search from './components/search/Search';
import { useSelector } from 'react-redux';
import LikedSongs from './components/likedsongs/LikedSongs';

function App() {
  const [openHamburger, setOpenHamburger] = useState(false);

  const userState = useSelector((state) => state.user);

  return (
    <div className='App'>
      <Navbar
        openHamburger={openHamburger}
        setOpenHamburger={setOpenHamburger}
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/likedsongs'>
          {userState.isLoggedIn ? <LikedSongs /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
