import React, { useEffect, useState } from 'react'
import { projectAuth } from '../config/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCencled, setIscencled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const logOut = async () => {
        setError(null)
        setIsLoading(true)
        try {
            await projectAuth.signOut()

            dispatch({ type: "LOGOUT" })
            if (!isCencled) {
                setError(null)
                setIsLoading(false)
            }
        }
        catch (err) {
            if (!isCencled) {
                setError(err.message)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        return () => setIscencled(true)
    }, [])

    return { error, isLoading, logOut }
}