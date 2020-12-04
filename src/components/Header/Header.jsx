import React from 'react';
import c from './Header.module.css';
import { NavLink } from 'react-router-dom';
// import { logo } from '../../img/logo.png';
import logo from './logo.png';

export const Header = (props) => {
  return (
      <header className={c.header}>
        <div className={c.logoBlock}>
          <img src={logo} alt='logo'/>  
          <h1>Peitoocher</h1>
        </div>
        <div className={c.loginBlock}>
          {props.isAuth ? <div>{props.login} - <button onClick={props.logoutMeThunkCreator}>Log out</button></div> 
          : <NavLink to='/login'>Login</NavLink> }
        </div>
      </header>
  );
}
