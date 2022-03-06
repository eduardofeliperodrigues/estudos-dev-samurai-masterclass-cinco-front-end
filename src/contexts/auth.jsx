import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (user && token) {
            setUser(JSON.parse(user))
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false)
          
    }, [])

    const login = async (email, password) => {
        try {
            const response = await createSession(email, password);

            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
            
            setUser(response.data.user)
            setLoading(false)

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            navigate('/')

        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        
        setUser(null)
        api.defaults.headers.Authorization = null;

        navigate('/login')

    }

    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            loading,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    );
}