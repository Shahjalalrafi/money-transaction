import React from 'react'

// import styles 
import classes from "./Home.module.css"
import TransactionForm from './TransactionForm'

export default function Home() {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                transaction list
            </div>
            <div className={classes.sidebar}>
                <TransactionForm />
            </div>
        </div>
    )
}
