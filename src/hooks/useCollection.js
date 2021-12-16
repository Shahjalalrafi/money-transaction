import { useEffect, useState } from "react"
import { projectFirestore } from "../config/config"

export const useCollection = (collection) => {
    const [error, setError] = useState(null)
    const [document, setDocument] = useState([])

    useEffect(() => {
        const ref = projectFirestore.collection(collection)

        const unSubscribe = ref.onSnapshot((shapshot) => {
            let result = []
            shapshot.docs.map(doc => {
                result.push({ ...doc.data(), id: doc.id })
            })

            // update Document
            setDocument(result)

            setError(null)
        }, (error) => {
            console.log(error)
            setError("Could not fetch the data")
        })

        return () => unSubscribe()
    }, [collection])

    return {error,document }

}