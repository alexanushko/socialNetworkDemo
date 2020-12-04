import {authAPI, securityAPI} from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL = "security/GET_CAPTCHA_URL";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL:  {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});
const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL,
  payload: { captchaUrl }
});

export let authMeThunkCreator = () => {
  return async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export let loginMeThunkCreator = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let response = await authAPI.loginMe(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(authMeThunkCreator());
    } else {
      if(response.data.resultCode === 10){
        dispatch(getCaptchaThunkCreator())
      }
      let error =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: error }));
    }
  };
};

export let logoutMeThunkCreator = () => {
  return async (dispatch) => {
    let response = await authAPI.logoutMe();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaThunkCreator = () => async(dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
}




