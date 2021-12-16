import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({uid}) {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    
    // use firestore hook
    const {response, addDocument} = useFirestore("transactions")

    const handleSubmit = e => {
        e.preventDefault()

        const transactionData = {
            uid,
            name,
            amount
        }
        addDocument(transactionData)
        console.log(transactionData)
        console.log(response)
    }

    useEffect(() => {
        if(response.success) {
            setName("")
            setAmount("")
        }
    }, [response.success])

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                {
                    response.isLoading && <p  style={{color: "white"}}>uploading...</p>
                }
                {
                    response.error && <p style={{color: "white"}}>{response.error}</p>
                }
                <button>Add Transaction</button>
            </form>
        </>
    )
}
