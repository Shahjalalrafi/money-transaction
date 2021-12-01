import React from 'react'
import { NavLink } from "react-router-dom"

// import styels 
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><NavLink to="/">myMoney</NavLink></li>

                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/signup">Signup</NavLink></li>
            </ul>
        </nav>
    )
}
