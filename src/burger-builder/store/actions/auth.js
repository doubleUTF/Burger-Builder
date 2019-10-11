import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, token, userId };
};

export const authFail = error => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_pAXFLSlCBcaLVQxiqZmD6JPo-Zp4de4";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_pAXFLSlCBcaLVQxiqZmD6JPo-Zp4de4";
    }
    axios
      .post(url, { email, password, returnSecureToken: true })
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.error(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate.getTime() > new Date().getTime()) {
        const userId = localStorage.getItem("userId");
        const timeRemaining =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(timeRemaining));
      } else {
        dispatch(authLogout());
      }
    }
    dispatch(authInit());
  };
};

export const authInit = () => {
  return { type: actionTypes.AUTH_INIT };
};
