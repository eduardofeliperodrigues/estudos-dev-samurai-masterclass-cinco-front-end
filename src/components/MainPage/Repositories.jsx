import React, {useState} from "react";

const Repositories = ( {repositories, onDelete, onNewRepo }) => {

    const [url, setUrl] = useState('')

    return (
        <div className="repositories">
            <h2 className="title">Repositórios</h2>
            <ul className="list">
                {
                    repositories.map((repository) => (
                        <li className="item" key={repository._id}>
                            <div className="info">
                                <div className="owner">{repository.proprietario}</div>
                                <div className="name">{repository.name}</div>
                            </div>
                            <button onClick={() =>  onDelete(repository._id) }>Apagar</button>
                        </li>
                    ))
                }
            </ul>

            <div className="new">
                <label htmlFor="new-repo">New Repo: </label>
                <input 
                    type="url"
                    name="new-repo"
                    id="new-repo"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                />
                <button onClick={ () => onNewRepo(url) }>Adicionar</button>
            </div>
        </div>
    );
}

export default Repositories;