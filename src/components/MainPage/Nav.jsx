import React from "react";

const Nav = ( { onLogout }) => {
    return (
        <div className="nav">
            <div className="logo">SISRepo</div>
            <button onClick={ onLogout }>Sair</button>
        </div>
    )
}

export default Nav;