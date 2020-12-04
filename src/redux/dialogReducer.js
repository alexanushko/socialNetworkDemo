const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
  dialogs: [
    {id: 1, name:'Pasha'},
    {id: 2, name:'Sasha'},
    {id: 3, name:'Stas'},
    {id: 4, name:'Andrey'},
  ],
  messages: [
    {id: 1, text:'Hey,bro,nice dick'},
    {id: 2, text:'Bro,go'},
    {id: 3, text:'utka'},
  ],
};

export const dialogReducer = (state = initialState, action) => {

  switch(action.type){
    case SEND_MESSAGE:
      let text = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 4, text: text}]
      };
    default:
  }
  return state;
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export let sendMessageThunkCreator = (newMessageBody) => {
  return (dispatch) => {
    dispatch(sendMessageCreator(newMessageBody));
  }
}

// export let updateNewMessageTextThunkCreator = (text) => {
//   return (dispatch) => {
//     dispatch(updateNewMessageTextCreator(text));
//   }
// } больше нужен





export default dialogReducer;