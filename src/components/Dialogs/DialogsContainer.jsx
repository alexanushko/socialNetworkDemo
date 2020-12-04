import {Dialogs} from './Dialogs';
import { sendMessageThunkCreator } from '../../redux/dialogReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, {sendMessageThunkCreator}),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
