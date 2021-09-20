import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ openHamburger, setOpenHamburger }) => {
  const toggleHamburger = () => {
    setOpenHamburger((prev) => !prev);
  };

  const userState = useSelector((state) => state.user);

  return (
    <nav className='navbar mb-5' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavLink
          to='/'
          className='navbar-item is-size-5 is-italic has-text-weight-bold'>
          Musical
        </NavLink>
        <a
          role='button'
          onClick={toggleHamburger}
          className={`navbar-burger ${openHamburger ? 'is-active' : ''}`}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div
        id='navbarBasicExample'
        className={`navbar-menu ml-3 ${openHamburger ? 'is-active' : ''}`}>
        <div className='navbar-start'>
          <NavLink to='/' className='navbar-item'>
            Home
          </NavLink>
          <NavLink to='/search' className='navbar-item'>
            Search
          </NavLink>
          <NavLink to='likedsongs' className='navbar-item'>
            Liked Songs
          </NavLink>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            {userState.isLoggedIn ? (
              <div className='buttons'>
                <h2>{`Hi, ${userState.user.firstName}`}</h2>
              </div>
            ) : (
              <div className='buttons'>
                <NavLink to='/signup' className='button is-primary'>
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink to='/login' className='button is-info'>
                  <strong>Log in</strong>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
