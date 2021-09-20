import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userSignup,
  setMessage,
  setError,
  setLoading,
} from '../../features/user/userSignupSlice';
import { useHistory } from 'react-router';

const isValidEmail = (email) => {
  const emailRegex = new RegExp('[a-z][0-9]*@gmail.com');
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = new RegExp('[0-9]+');
  return password.length > 6 && passwordRegex.test(password);
};

const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.signup);
  const userState = useSelector((state) => state.user);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    setError({ firstName: '', lastName: '', email: '', password: '' });
    let validationSuccess = true;
    let error = { firstName: '', lastName: '', email: '', password: '' };
    if (!user.firstName) {
      error.firstName = 'Please Enter a valid name';
      validationSuccess = false;
    }
    if (!user.email || !isValidEmail(user.email)) {
      error.email = 'Please Enter a valid email';
      validationSuccess = false;
    }
    if (!user.password || !isValidPassword(user.password)) {
      error.password =
        'password must be 6 characters long and must contain a number';
      validationSuccess = false;
    }
    dispatch(setError(error));
    return validationSuccess;
  };

  const signUpHandler = () => {
    dispatch(setMessage(''));
    dispatch(setLoading(true));
    if (validateForm()) {
      dispatch(userSignup(user));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    userState.isLoggedIn && history.push('/');
  }, [userState.isLoggedIn]);

  return (
    <div className='auth-wrapper flex-center'>
      <div className='login-container'>
        <h1 className='rm purple-txt login-title'>Create an account</h1>
        <div className='input-group'>
          <input
            type='text'
            className='input-area'
            name='firstName'
            placeholder='first name'
            value={user.firstName}
            onChange={onChangeHandler}
          />
          {state.error.firstName && (
            <small className='red-txt'>*{state.error.firstName}</small>
          )}
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='input-area'
            name='lastName'
            placeholder='last name'
            value={user.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='input-area'
            name='email'
            placeholder='email : johndoe@gmail.com'
            value={user.email}
            onChange={onChangeHandler}
          />
          {state.error.email && (
            <small className='red-txt'>*{state.error.email}</small>
          )}
        </div>
        <div className='input-group'>
          <input
            type='password'
            className='input-area'
            name='password'
            placeholder='password'
            value={user.password}
            onChange={onChangeHandler}
          />
          {state.error.password && (
            <small className='red-txt'>*{state.error.password}</small>
          )}
        </div>
        <div className='login-btn__container'>
          <button className='btn btn-primary' onClick={() => signUpHandler()}>
            {state.loading ? 'SIGNING IN.....' : 'CREATE AN ACCOUNT'}
          </button>
          {state.message && (
            <div className='alert danger-alert'>
              <div>
                <i className='fa fa-exclamation-circle fa-2x'></i>
              </div>
              <span>{state.message}</span>
            </div>
          )}
          <small className='mb'>
            Have an account?{' '}
            <span
              className='purple-txt underline pointer'
              onClick={() => history.push('/login')}>
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
