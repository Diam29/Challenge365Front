import axios from "axios";
import { auth } from "../Firebase/FirebaseConfig";
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";


export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) console.log('No se ha creado el contexto')
    return context
}

export const AuthProvider = ({ children }) => {

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  console.log('children', children)

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setUser(null)
            } else {
                setUser(currentUser)
            }
        })
        return () => suscribed()
    }, [])


    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            setUser(response.user)
            console.log('soy register', response.user)
            const userData = {
              uid: response.user.uid,
              email: response.user.email,
              displayName: response.user.displayName,
              photoURL: response.user.photoURL
            }
            // localStorage.setItem('id', response.user.uid);
            await axios.post('http://localhost:3000/user/createUser', userData)
            return response
        } catch (error) {
            setError(error.message)
            throw error
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            setUser(response.user)
            // localStorage.setItem('id', response.user.uid);
            return response
        } catch (error) {
            setError(error.message)
            console.log('soy mensaje de login context', error.message)
            throw error
        }
    }
    const loginWithGoogle = async () => {
        try {
            const responseGoogle = new GoogleAuthProvider();
            const authResult = await signInWithPopup(auth, responseGoogle);
            const user = authResult.user;
            console.log('user context', user)
            // localStorage.setItem('id', authResult.user.uid);
            setUser(user);

            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }
            await axios.post('http://localhost:3000/user/createUser', userData)
            console.log('error interno google', userData)
            return authResult;
          
        } catch (error) {
            console.error('Error al iniciar sesión con Google', error);
            throw error;
        }
    }

    const logout = async () => {
        const response = await signOut(auth)
        console.log('responseLogout', response)

    }

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
        try {
        console.log('Email enviado')
        } catch (error) {
        console.error('Error al enviar email', error)
        }
    };
    return <authContext.Provider value={{
        register, login, loginWithGoogle, logout, resetPassword, error,
        setError: () => setError(null), user
    }}>{children}</authContext.Provider>
}