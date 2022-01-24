import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import classes from "./Home.module.css"

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestore("transactions")
    return (
        <ul className={classes.transactions}>
            {transactions.map((transaction) => (
                <li key={transaction.id}>
                    <p className={classes.name}>{transaction.name}</p>
                    <p className={classes.amount}>${transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>X</button>
                </li>
            ))}
        </ul>
    )
}
