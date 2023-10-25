import { useEffect, Fragment } from "react";
import { rememberSessionKey, useAuth } from "./useAuth";

export const useUnload = () => {

  const { signOut } = useAuth()

  useEffect(() => {
    const signOutIfNotSaveSession = () => {
      const savesSession = localStorage.getItem(rememberSessionKey) === 'true'
      window.alert(savesSession)
      if (!savesSession) {
        signOut()
      }
    };
    window.addEventListener('beforeunload', signOutIfNotSaveSession);
    return () => {
      window.removeEventListener('beforeunload', signOutIfNotSaveSession);
    };
  }, []);

  return
}
