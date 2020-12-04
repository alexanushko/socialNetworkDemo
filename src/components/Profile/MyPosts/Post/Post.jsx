import React from 'react';
import c from './Post.module.css';

export const Post = (props) => {
  

  const onDeletePost = () => {
    props.deletePost(props.id);
  }
  return (
    <div className={c.item}>
      <img src={props.url} alt={props.text}/>
      <h3>{props.text}</h3>
      <button onClick={onDeletePost}>X</button>
    </div>
  );
}

