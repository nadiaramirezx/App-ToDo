import { useContext, createContext } from 'react';
import { useStorageState } from '../useStorageState';


const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Hook para acceder a la info del usuario
export function useSession() {

  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session');
  //permite ver valores en consola
  console.log('cargando:', isLoading);
  console.log('sesion actual', session);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          //logica del incio de sesion
          if (session !== 'Autenticado'){
            setSession('Autenticado')
           
          } else {
            Alert.alert('Error', 'Correo o contraseña incorrectos');
          }
        } ,
        
        signOut:() => {
          if(session !== null){ //solo se actualizara si la sesion no es nula
            setSession(null);
          }
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
