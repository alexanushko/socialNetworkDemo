import React from 'react';
import c from './MyPosts.module.css';
import { Post } from './Post/Post';
import {reduxForm, Field} from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators';
import { Textarea } from '../../common/formsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={Textarea} placeholder='type here' name='newPostText' validate={[ required, maxLength10]}/>
    </div>
    <div>
      <button>Add Post</button>
    </div>
  </form>
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);


export const MyPosts = (props) => {

  const addNewPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={c.postsBlock}>
      My Posts
      <div>
        <AddNewPostFormRedux onSubmit={addNewPost}/>
      </div>
      <div className={c.posts}>
        {props.posts.map(el => <Post id={el.id} key={el.text} url={el.url} text={el.text} deletePost={props.deletePost}/>)}
      </div>
    </div>
  );
}


