import React, { useState } from 'react'
import { projectAuth } from '../config/config'


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(false)

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
            setError(null)
            setIsloading(false)
        }
        catch (err) {
            setError(err.message)
            setIsloading(false)
        }
    }
    return { error, isloading, signup }
}
