import React, { useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'

import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

import { AuthProvider, AuthContext } from "./contexts/auth";


const AppRoutes = () => {

    const Private = ( {children} ) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando . . .</div>
        }

        if (!authenticated) {
            return <Navigate to='/login'></Navigate>
        }

        return children;

    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={ <LoginPage /> } />
                    <Route exact path="/" element={ <Private><MainPage /></Private> }/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;