import { useEffect, useReducer } from "react"
import { projectFirestore } from "../config/config"

const initialState = {
    isLoading: null,
    error: null,
    document: null,
    success: null
}

const fireStoreReducer = (state, action) => {
    switch(action.type) {

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)
    const [isCencled, setIscencled] = useState(false)

    const ref = projectFirestore.collection(collection)

    // add something to the firestore database
    const addDocument = (doc) => {

    }

    // delete something from firestore database
    const deleteDocument = (id) => {

    }

    useEffect(() => {
        return () => setIscencled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}