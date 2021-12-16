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
        case "IS_PENDING":
            return {isLoading: true, error: null, document: null, success: null}

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirestore.collection(collection)

    // dispatch if not cencled

    // add something to the firestore database
    const addDocument = async(doc) => {
        dispatch({type: "IS_PENDING"})

        try {
            const addDocument = await ref.add(doc)
        }
        catch(err) {

        }
    }

    // delete something from firestore database
    const deleteDocument = async(id) => {

    }

    useEffect(() => {
        return () => setIscencled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}