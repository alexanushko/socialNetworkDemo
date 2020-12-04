import React from 'react';
import {reduxForm} from 'redux-form';
import {createField, Input} from '../common/formsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux';
import { loginMeThunkCreator } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import style from '../common/formsControls/FormsControls.module.css';


const Login = (props) => {

  const onSubmit = (formData) => {
    const {email, password, rememberMe, captcha} = formData;
    props.loginMeThunkCreator(email, password, rememberMe, captcha);
  }
  if(props.isAuth){
    return <Redirect to='/profile'/>
  }
  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
  </div>
}

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return <form onSubmit={handleSubmit}>
    {createField('Email','email',[required],Input)}
    {createField('Password','password',[required],Input,{type:'password'})}
    {createField(null,'rememberMe',[],Input,{type:'checkbox'},'Remember Me')}

    {captchaUrl && <img src={captchaUrl}/> }
    {captchaUrl && createField('Write captcha','captcha',[required],Input, {}) }

    {error && <div className={style.formSymmaryError}>
      {error}
    </div>}
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {loginMeThunkCreator })(Login);