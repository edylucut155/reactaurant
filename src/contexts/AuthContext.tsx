import React, { createContext, FC, ReactNode, useEffect, useState, useContext } from 'react';
import { signInWithEmailAndPassword,signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { add } from "../configs/firebase/actions";
import { User as FirebaseUser } from 'firebase/auth';

const logIn = async(email: string, password: string) => signInWithEmailAndPassword(auth,email,password);

const logOut = async() => signOut(auth);

const signUp = async(
    email:string,
    password:string,
    phoneNumber:string,
    name:string,
    type:string
) => {
    const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
    await add("users",{
        userId: userCredentials.user.uid,
        email,
        phoneNumber,
        name,type
    })
}

const userAuthContext = createContext({user:{}, logIn, signUp, logOut})

export const UserAuthContextProvider: FC<{children: ReactNode}> = ({children}) => {
    const [user,setUser] = useState<FirebaseUser>({} as FirebaseUser)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser as FirebaseUser);
        })

        return () => {
            unsubscribe();
        }
    },[])

    return (
        <userAuthContext.Provider value={{user,logIn, signUp, logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}