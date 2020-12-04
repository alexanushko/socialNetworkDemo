import React from 'react';
import c from './Dialogs.module.css';
import { DialogItem } from './DialogItem/DialogItem';
import { DialogMessage } from './DialogMessage/DialogMessage';
import {reduxForm, Field} from 'redux-form';
import { Textarea } from '../common/formsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators';

export const Dialogs = (props) => {

  const addNewMessage = (values) => {
    props.sendMessageThunkCreator(values.newMessageBody);
  }

  return (
    <div className={c.dialogs}>
      <div className='dialogItems'>
        {props.dialogs.map(el => <DialogItem key={el.id} dialogId={el.id} name={el.name}/>)}
      </div>
      <div className='messages'> 
        <div>{props.messages.map(el => <DialogMessage key={el.id} text={el.text}/>)}</div>
        <div>
          <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
      </div>
    </div>
  );
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field 
        name='newMessageBody' 
        component={Textarea} 
        validate={[required,maxLength50]}
        placeholder='Enter your message'/>
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

