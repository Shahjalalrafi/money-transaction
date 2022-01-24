import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timeStamp } from "../config/config"

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

        case "ADD_DOCUMENT":
            return {isLoading: false, error: null, document: action.payload, success: true}

        case "DELETED_DOCUMENT":
            return {isLoading: false, error: null, document: null, success: true}

        case "ERROR":
            return {isLoading: false, error: action.payload, document: null, success: false}

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    console.log(response)

    const ref = projectFirestore.collection(collection)

    // dispatch if not cencled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }

    // add something to the firestore database
    const addDocument = async(doc) => {
        dispatch({type: "IS_PENDING"})

        try {
            const createdAt = timeStamp.fromDate(new Date())
            const addDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type:"ADD_DOCUMENT", payload: addDocument})
        }
        catch(err) {
            dispatchIfNotCancelled({type: "ERROR", payload: err.message})
        }
    }

    // delete something from firestore database
    const deleteDocument = async(id) => {
        dispatch({type: "IS_PENDING"})

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: "DELETED_DOCUMENT"})
        }
        catch(err) {
            dispatchIfNotCancelled({type: "ERROR", payload: "Could not delete the Document"})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}