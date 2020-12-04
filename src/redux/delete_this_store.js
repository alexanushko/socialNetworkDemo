import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import sidebarReducer from "./sidebarReducer";


export let store = {
  _state: {
    dialogsPage : {
      dialogs: [
        {id: 1, name:'Pasha'},
        {id: 2, name:'Sasha'},
        {id: 3, name:'Stas'},
        {id: 4, name:'Andrey'},
      ],
      messages: [
        {text:'Hey,bro,nice dick'},
        {text:'Bro,go'},
        {text:'utka'},
      ],
      newMessageText: ''
    },
    profilePage : {
      posts: [
        {id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCENkSHv5ZkAb030gCJYy2i8G5mZDPpZpOWw&usqp=CAU', text: 'я сделяль'},
        {id: 2, url: 'https://i.pinimg.com/originals/94/1a/16/941a1638848c06d3d83139f2ba267c9d.jpg', text: 'Котик'},
      ],
      newPostText: 'text here'
    },
    sidebar: {}
  },
  _callSubscriber() {
    console.log('state changed');
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
}


