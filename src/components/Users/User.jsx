import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './users.module.css';
import user_pic from './girl.png';

export const User = ({user,followingInProgress,unfollowThunkCreator,followThunkCreator}) => {

  return <div>
  <span>
    <div>
      <NavLink to={`/profile/${user.id}`}>
      <img src={user.photos.small !== null ? user.photos.small : user_pic} className={c.userPhoto} alt='user'/>
      </NavLink>
    </div>
    <div>
      {user.followed ? 
        <button disabled={followingInProgress.some(id => id === user.id)} 
          onClick={() => unfollowThunkCreator(user.id)
        }>Unfollow</button> : 
        <button disabled={followingInProgress.some(id => id === user.id)}
          onClick={() => followThunkCreator(user.id) 
        }>Follow</button>}
    </div>
  </span>
  <span>
    <span>
      <div>{user.name}</div>
      <div>{user.status}</div> 
    </span>
    <span>
      <div>{"user.location.country"}</div>
      <div>{"user.location.city"}</div>
    </span>
  </span>
</div>
}