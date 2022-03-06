import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import "./styles.css"

const LoginPage = () => {

    const { login } = useContext( AuthContext )

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (email, password) => {
        await login(email, password)
    }

    return (
        <div id="login">
            <div className="title">Login</div>
            <div className="form">
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="actions">
                    <button onClick={ () => handleLogin(email, password) }>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;