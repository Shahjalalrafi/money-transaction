import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../config/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            return {...state, user: action.payload}
        case "LOGOUT": 
            return {...state, user: null}
        case "AUTH__IS__READY": 
            return {...state, user: action.payload, authIsReady: true}
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })
    console.log("auth Context State", state)

    useEffect(() => {
        const unSub = projectAuth.onAuthStateChanged((user) => {
            dispatch({type: "AUTH__IS__READY", payload: user})
            unSub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}