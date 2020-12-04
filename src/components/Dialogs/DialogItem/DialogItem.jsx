import React from 'react';
import c from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';

export const DialogItem = (props) => {
  return (
    <div className={c.dialog}>
      <NavLink to={`dialogs/${props.dialogId}`}>{props.name}</NavLink>
    </div>
  );
}
