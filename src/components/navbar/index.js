import React from "react";
import "./navbar.css";
import logo from "../../img/eat_it_branco.png";
import { useSelector, useDispatch } from "react-redux";

/* IMPORTAÇÃO DA ROTA */
import { Link } from "react-router-dom";

function Navbar(id) {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg">
      <img src={logo} alt="Logo EatIT" width="50" height="50" />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse ml-2" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {useSelector((state) => state.usuarioLogado) > 0 ? (
            <>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Restaurante
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="nav-link" to="/restaurantecadastro">
                    <span className="spanDropdown">Cadastrar Restaurante</span>
                  </Link>
                  <Link className="nav-link" to="/pratoscadastro">
                    <span className="spanDropdown">Cadastrar Prato</span>
                  </Link>
                  <Link className="nav-link" to="/status">
                    <span className="spanDropdown">Status do Pedido</span>
                  </Link>
                  <Link className="nav-link" to="/perfilrestaurante">
                    <span className="spanDropdown">Perfil</span>
                  </Link>
                  <Link className="nav-link" to="/historico-restaurante/meuspedidos">
                    <span className="spanDropdown">Histórico</span>
                  </Link>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Cliente
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="nav-link" to="/cliente">
                    <span className="spanDropdown">Completar login</span>
                  </Link>
                  <Link className="nav-link" to="/perfil">
                    <span className="spanDropdown">Perfil</span>
                  </Link>
                  <Link className="nav-link" to="/historico/meuspedidos">
                    <span className="spanDropdown">Histórico</span>
                  </Link>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/sacola/meuspratos">
                  Sacola
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contato">
                  Contato
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/sobre">
                  Sobre Nós
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => dispatch({ type: "LOG_OUT" })}
                >
                  Sair
                </Link>
              </li>
            </>
          ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/novousuario">
                    Cadastrar
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contato">
                    Contato
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sobre">
                    Sobre Nós
                </Link>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
