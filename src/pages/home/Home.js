import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// import styles 
import classes from "./Home.module.css"
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
    const {user} = useAuthContext()
    const {error, document} = useCollection("transactions")
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <TransactionList transactions = {document} />
            </div>
            <div className={classes.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
