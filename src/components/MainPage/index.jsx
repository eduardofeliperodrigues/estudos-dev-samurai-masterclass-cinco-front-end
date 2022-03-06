import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav";
import Repositories from "./Repositories";
import Search from "./Search";

import { getRepositories, deleteRepository, newRepository } from "../../services/api";

import { AuthContext } from "../../contexts/auth";

import './styles.css'

const MainPage = () => {

    const { user, logout } = useContext( AuthContext )

    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError ] = useState(false);

    const loadData = async (query = '') => {
        try {
            const response = await getRepositories(user?.id, query)
            setRepositories(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoadError(true)
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    },[])

    const handleDelete = async (repoId) => {
        try {
            await deleteRepository(user?.id, repoId)
            await loadData()
        } catch (error) {}
    }

    const handleNewRepo = async (url) => {
        try {
            await newRepository(user?.id, url)
            await loadData();
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSearch = async (query) => {
        await loadData(query)
    }

    

    const handleLogout = () => {
        logout();
    }

    if (loadError) {
        return (
            <div className="loading">
                Erro ao carregar os dados de repositório. <Link to="/login">Voltar</Link>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="loading">
                Carregando . . .
            </div>
        );
    }
    
    return (
        <div id="main">

            <Nav onLogout={ handleLogout }/>

            <Search onSearch={ handleSearch } />

            <Repositories repositories={repositories} onDelete={ handleDelete } onNewRepo={ handleNewRepo }/>

        </div>
    );
}

export default MainPage;