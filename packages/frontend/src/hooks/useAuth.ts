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
      const res = await fetch(AUTH_STATUS_ENDPOINT, {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();

      if (data.user) {
        appDispatch({
          type: "SET_USER",
          payload: data.user
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
      await fetch(LOGOUT_ENDPOINT, {
        method: 'GET',
        credentials: 'include',
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