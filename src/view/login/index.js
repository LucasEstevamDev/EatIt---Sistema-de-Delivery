import React, { useState } from "react";
import logo from "../../img/eat_it_branco.png";
import "./login.css";

/* IMPORTAÇÃO REDUX */
import { useSelector, useDispatch } from "react-redux";

/* IMPORTAÇÃO DA ROTA */
import { Link, Redirect } from "react-router-dom";

/* IMPORTAÇÃO DO FIREBASE */
import firebase from "../../config/firebase";
require("firebase/auth");

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();

  const dispatch = useDispatch();

  function logar() {

    setCarregando(1);

    setMsgTipo(null);

    if (!email || !senha) {
      setMsgTipo('erro')
      setMsg('Você precisa informar o e-mail e senha para logar!')
      setCarregando(0);
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
      setCarregando(0)
      setMsgTipo('sucesso')
      setTimeout(() => {
        dispatch({ type: 'LOG_IN', usuarioEmail: email });
      }, 800);
    })
      .catch(erro => {
        setCarregando(0)
        setMsgTipo('erro')
        setMsg('Usuário ou senha estão incorretos!')
      });
  }

  return (

    <>
      <div className="login-content">
        <div className="icon-content">
          <Link to="/">
            <span><i class="text-white fas fa-home fa-lg"></i></span>
          </Link>
        </div>

        <div className=" d-flex align-items-center">
          {useSelector((state) => state.usuarioLogado) > 0 ? (
            <Redirect to="/" />
          ) : null}

          <form className="form-signin text-center mx-auto">
            <div className="text-center">
              <img src={logo} alt="Logo EatIT" width="150" height="150" />
            </div>

            <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
            <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />

            {
              carregando ? <div class="spinner-border text-warning mt-3" role="status"><span class="sr-only">Loading...</span></div>
                : <button onClick={logar} type="button" className="btn btn-large btn-login btn-block my-4">Logar</button>
            }

            <div className="msg-login text-white text-center my-4">
              {msgTipo === 'sucesso' && (<span>Oba!<strong> Você está conectado! &#128526;</strong></span>)}
              {msgTipo === 'erro' && (<span>Ops!<strong> {msg} &#128546;</strong></span>)}
            </div>

            <div className="opcoes-login">
              <Link className="mx-2" to="/usuariorecuperarsenha">Recuperar Senha</Link>
              <Link to="novousuario" className="mx-2">Quero Cadastrar</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
