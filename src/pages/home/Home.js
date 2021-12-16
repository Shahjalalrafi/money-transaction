import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// import styles 
import classes from "./Home.module.css"
import TransactionForm from './TransactionForm'

export default function Home() {
    const {user} = useAuthContext()
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                transaction list
            </div>
            <div className={classes.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
