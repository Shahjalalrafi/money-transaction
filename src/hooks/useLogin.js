import { useEffect, useState } from "react"
import { projectAuth } from "../config/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [isCencled, setIscencled] = useState(false)
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const { dispatch } = useAuthContext()

    const logIn = async (email, password) => {
        setError(null)
        setIsloading(true)

        try {
            let res = await projectAuth.signInWithEmailAndPassword(email, password)

            dispatch({type: "LOGIN", payload: res.user})

            if(!isCencled) {
                setError(null)
                setIsloading(false)
            }
        } catch (err) {
            if(isCencled) {
                setError(err.message)
                setIsloading(false)
            }
        }
    }

    useEffect(() => {
        return () => setIscencled(true)
    })
    return { error, isloading, logIn }
}