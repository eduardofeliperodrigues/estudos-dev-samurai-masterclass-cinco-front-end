import React from "react";

import Nav from "./Nav";
import Repositories from "./Repositories";
import Search from "./Search";

import './styles.css'

const MainPage = () => {

    const handleLogout = () => {
        console.log('Saiu')
    }

    const handleSearch = (query) => {
        console.log('Procurou:', query)
    }

    const handleDelete = (repoId) => {
        console.log('Deletou', repoId)
    }

    const handleNewRepo = (url) => {
        console.log('New Repo', url)
    }
    
    return (
        <div id="main">

            <Nav onLogout={ handleLogout }/>

            <Search onSearch={ handleSearch } />

            <Repositories repositories={[]} onDelete={ handleDelete } onNewRepo={ handleNewRepo }/>

        </div>
    );
}

export default MainPage;