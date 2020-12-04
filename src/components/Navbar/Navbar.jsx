import React from 'react';
import c from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import home from '../../img/home.png';
import message from '../../img/message_icon.png';
import user from '../../img/user_icon.png';


export const Navbar = () => {
  return (
    <nav className={c.nav}>
      <ul>
        <li>
          <NavLink to='/profile'>
            <img className={c.icon} src={home} alt='home-icon'/>
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dialogs'>
            <img className={c.icon} src={message} alt='message-icon'/>
            <span>Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/users'>
            <img className={c.icon} src={user} alt='user-icon'/>
            <span>Users</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

