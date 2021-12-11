import React, { useState } from 'react'
import { projectAuth } from '../config/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const logOut = async() => {
        setError(null)
        setIsLoading(true)
        try {
            await projectAuth.signOut()

            dispatch({type: "LOGOUT"})
        }catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    return {error, isLoading, logOut}
}