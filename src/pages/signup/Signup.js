import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// import styles
import styles from "./Signup.module.css"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")

    const { error, isloading, signup } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()

        signup(email, password, displayName)
        console.log(email, password, displayName)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>userName:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>

            {
                error && <p>{error}</p>
            }
            {
                isloading && <button className="btn" disabled>loading</button>
            }
            {
                !isloading && <button className="btn">Signup</button>
            }

        </form>
    )
}
