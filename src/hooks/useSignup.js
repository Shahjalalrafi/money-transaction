import React, { useEffect, useState } from 'react'
import { projectAuth } from '../config/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
    const [isCencled, setIscencled] = useState(false)
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsloading(true)

        try {
            let res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

            if (!res) {
                throw new Error("couldn't create user")
            }

            await res.user.updateProfile({ displayName })
            dispatch({ type: "LOGIN", payload: res.user })

            if (!isCencled) {
                setError(null)
                setIsloading(false)
            }
        }
        catch (err) {
            if (!isCencled) {
                setError(err.message)
                setIsloading(false)
            }
        }
    }

    useEffect(() => {
        return () => setIscencled(true)
    }, [])
    
    return { error, isloading, signup }
}
