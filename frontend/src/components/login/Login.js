import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userLogin, setMessage } from '../../features/user/userSlice';
import './Login.css';

const Login = () => {
  //const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const history = useHistory();

  const validateForm = () => {
    setError({
      email: '',
      password: '',
    });
    let validationSuccess = true;

    if (!user.email) {
      setError((error) => ({ ...error, email: 'Please Enter a valid email' }));
      validationSuccess = false;
    }
    if (!user.password) {
      setError((error) => ({
        ...error,
        password: 'Please Enter a valid password',
      }));
      validationSuccess = false;
    }
    return validationSuccess;
  };

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = () => {
    dispatch(setMessage(''));
    setLoading(true);
    if (validateForm()) {
      dispatch(userLogin(user));
    }
    setLoading(false);
  };

  useEffect(() => {
    userData.isLoggedIn && history.push('/');
  }, [userData.isLoggedIn]);

  return (
    <div className='auth-wrapper flex-center'>
      <div className='login-container'>
        <h1 className='rm purple-txt login-title'>Login</h1>
        <div className='input-group'>
          <input
            type='text'
            className='input-area'
            placeholder='email'
            value={user.email}
            name='email'
            onChange={onChangeHandler}
          />
          {error.email && <small className='red-txt'>*{error.email}</small>}
        </div>
        <div className='input-group'>
          <input
            type='password'
            className='input-area'
            placeholder='password'
            value={user.password}
            name='password'
            onChange={onChangeHandler}
          />
          {error.password && (
            <small className='red-txt'>*{error.password}</small>
          )}
        </div>
        <div className='login-btn__container'>
          {loading ? (
            <button className='btn btn-primary'>LOGGING IN...</button>
          ) : (
            <button className='btn btn-primary' onClick={loginHandler}>
              LOGIN
            </button>
          )}
          {userData.message && (
            <div className='alert danger-alert'>
              <div>
                <i className='fa fa-exclamation-circle fa-2x'></i>
              </div>
              <span>{userData.message}</span>
            </div>
          )}
          <small className='mb'>
            Don't have an account?{' '}
            <span
              className='purple-txt underline pointer'
              /*onClick={() => navigate('/signup')}*/
            >
              Create an account
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
