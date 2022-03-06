import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav";
import Repositories from "./Repositories";
import Search from "./Search";

import { getRepositories, deleteRepository, newRepository } from "../../services/api";

import './styles.css'

const userId = '62216c868964a6c62b8d80f2'

const MainPage = () => {

    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError ] = useState(false);

    const loadData = async (query = '') => {
        try {
            const response = await getRepositories(userId, query)
            setRepositories(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoadError(true)
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, [])

    const handleDelete = async (repoId) => {
        try {
            await deleteRepository(userId, repoId)
            await loadData()
        } catch (error) {}
    }

    const handleNewRepo = async (url) => {
        try {
            await newRepository(userId, url)
            await loadData();
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSearch = async (query) => {
        await loadData(query)
    }

    

    const handleLogout = () => {
        console.log('Saiu')
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