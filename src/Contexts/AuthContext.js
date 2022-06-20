import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}


export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Login
    const githubAuthProvider = new GithubAuthProvider()
    async function login(){

        return(signInWithPopup(auth, githubAuthProvider).then(authData => {
            setCurrentUser(authData.user);
        }))
    }
     //Logout functionality
     async function logout(){
        signOut(auth).then(setCurrentUser(null));
    }

    const value = {currentUser, login, logout};

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange; 
    }, []);

  return (
     <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}