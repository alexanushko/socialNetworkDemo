import { addPostActionCreator, deletePostActionCreator } from '../../../redux/profileReducer';
import {MyPosts} from './MyPosts';
import { connect } from 'react-redux';
import { compose } from 'redux';


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
    deletePost: (id) => {
      dispatch(deletePostActionCreator(id));
    }
  }
}

export const MyPostsContainer = compose(
  connect(mapStateToProps,mapDispatchToProps)
)(MyPosts)

