import axios from 'axios';

import { useAppContext } from "../context/app_context/AppContext";
import { AUTH_STATUS_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "../lib/endpoints";

export const useAuth = () => {
  const { appDispatch } = useAppContext()

  const getAuthStatus = async () => {
    appDispatch({
      type: "SET_LOADING",
      payload: { appLoading: true }
    })

    try {
      const { data: { user } } = await axios.get(AUTH_STATUS_ENDPOINT, { 
        withCredentials: true 
      })

      if (user) {
        appDispatch({
          type: "SET_USER",
          payload: user
        })
      }       
    } catch (error) {
      console.error('getAuthStatus error:', error);
    } finally {
      appDispatch({
        type: "SET_LOADING",
        payload: { appLoading: false }
      })
    }
  };

  // OAuth redirect
  const login = async () => {
    window.open(LOGIN_ENDPOINT, "_self")
  }

  const logout = async () => {
    appDispatch({
      type: "SET_LOADING",
      payload: { appLoading: true }
    })

    try {
      await axios.get(LOGOUT_ENDPOINT, { 
        withCredentials: true 
      });

      appDispatch({
        type: "SET_USER",
        payload: null
      })
    } catch (error) {
      console.error(error)
    } finally {
      appDispatch({
        type: "SET_LOADING",
        payload: { appLoading: false }
      })
    }
  }

  return {
    getAuthStatus,
    login,
    logout,
  }
}