import {addPostActionCreator, profileReducer} from './profileReducer';


test('length of state should be incremented', () => {

  let action = addPostActionCreator('yoyoyo');

  let state = {
    posts: [
      {id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCENkSHv5ZkAb030gCJYy2i8G5mZDPpZpOWw&usqp=CAU', text: 'я сделяль'},
      {id: 2, url: 'https://i.pinimg.com/originals/94/1a/16/941a1638848c06d3d83139f2ba267c9d.jpg', text: 'Котик'},
    ]
  };

  let res = profileReducer(state,action);


  expect(res.posts.length).toBe(3);
});


