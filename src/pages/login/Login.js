import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// import style
import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {error, isloading, logIn} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()

        logIn(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>login</h2>
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
