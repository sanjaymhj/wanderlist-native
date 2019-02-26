import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';

// Action creators
export const authStart = () => ({type: "AUTH_START"})
export const authSuccess = token => ({type: "AUTH_SUCCESS", token})
export const authFail = () => ({type: "AUTH_FAIL"})

export const authLogout = () => {
  try {
    AsyncStorage.removeItem('token');
  } catch (err) {
    console.log(err)
  }
  return {type: "AUTH_LOGOUT"}
} 

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`http://10.0.2.2:8000/api/v1/rest-auth/login/`, {
      username: username,
      password: password
    })
      .then(response => {
        var token = response.data.key;
        try {
          AsyncStorage.setItem('token', token);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail());
        /* 
        Create the error message based on the response from the server. The err.response.data variable will be an object
        with keys corresponding to which field had errors, e.g. password. The error will be an array with a 
        string message. The keys strings need to be formated to uppercase. If there are multiple errors, they will be added 
        into the error variable, ending with a newline. 
        */
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            case 'password': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'non_field_errors': {
              return error += `${err.response.data[message]}\n`
            }
            default: return null
          }
        });
        Alert.alert('Error', error);
      })
  }
}

export const authRegister = (username, email, password1, password2, home) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`http://10.0.2.2:8000/api/v1/rest-auth/registration/`, {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      home: home
    })
      .then(response => {
        var token = response.data.key;
        try {
          AsyncStorage.setItem('token', token);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
        Alert.alert('Sucess', 'You have successfully created an account.')
      })
      .catch(err => {
        dispatch(authFail()); 
        /* 
        Create the error message based on the response from the server. The err.response.data variable will be an object
        with keys corresponding to which field had errors, e.g. password. The error will be an array with a 
        string message. The keys strings need to be formated to uppercase. If there are multiple errors, they will be added 
        into the error variable, ending with a newline. 
        */
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            case 'username': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'email': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'password1': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'password2': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'home': {
              return error += `Home Country: This field may not be blank.\n`
            }
            case 'non_field_errors': {
              return error += `${err.response.data[message]}\n`
            }
            default: return null
          }
        });
        Alert.alert('Error', error);
      })
  }
}

export const authCheckState = (token) => {
  return dispatch => {
    if (token === null) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token));
    }
  }
}

export const requestPasswordReset = (email) => {
  return dispatch => {
    axios.post(`http://10.0.2.2:8000/api/v1/rest-auth/password/reset/`, {
      email: email,
    })
      .then(response => {
        Alert.alert('Success', 'New password requested. Check your email for more info.');
      })
      .catch(err => {
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            case 'email': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'non_field_errors': {
              return error += `${err.response.data[message]}\n`
            }
            default: return null
          }
        });
        Alert.alert('Error', error);
      })
  }
}