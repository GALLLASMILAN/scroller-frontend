import React from 'react';
import { Link } from "react-router-dom";
import Logo from './logo.svg';

const Menu = () => <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand p-2" to="#">
        <img src={Logo} alt="Logo" />
        <span className="ml-2">Ověřeno.cz</span>
    </Link>
</nav>

export default Menu;

/*
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
<div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav ml-auto p-2">
            <li className="nav-item pr-2">
                <Link className="nav-link" to="/">Vyhledávání <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item pr-2">
                <Link className="nav-link" to="/login">Přihlášení</Link>
            </li>
            <li className="nav-item pr-2">
                <Link className="nav-link" to="/registration">Registrace</Link>
            </li>
        </ul>

        </div>
        */