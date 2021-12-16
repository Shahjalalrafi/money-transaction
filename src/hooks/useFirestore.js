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

        case "ERROR":
            return {isLoading: false, error: action.payload, document: null, success: false}

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

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

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}