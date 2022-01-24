import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../config/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [error, setError] = useState(null)
    const [document, setDocument] = useState([])

    const query = useRef(_query).current
    // for oder by assending or descending
    // const orderBy = useRef(_orderBy).current
    
    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query) {
            ref = ref.where(...query)
        }
        
        // for oder by assending or descending
        // if(orderBy) {
        //     ref = ref.orderBy(...orderBy)
        // }

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
    }, [collection, query])

    return {error,document }

}