import React, { useState } from 'react';
import './usuario-novo.css';
import { useDispatch } from "react-redux";

/* IMPORTAÇÃO DA ROTA */
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
require('firebase/auth');

function NovoUsuario() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();


    function cadastrar() {
        setCarregando(1);
        setMsgTipo(null);

        if (!email || !senha) {
            setMsgTipo('erro')
            setMsg('Você precisa informar o e-mail e senha para fazer o cadastro!')
            setCarregando(0)
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            switch (erro.message) {
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Este e-mail já está sendo utlizado por outro usuário!');
                    break;
                case 'The email address is badly formatted.':
                    setMsg('O formato do seu e-mail é inválido');
                    break;
                default:
                    setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                    break;
            }
        })
    }

    return (
        <>
            <Navbar />

            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mt-2 mb-5 text-black font-weight-bold">Cadastro</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                    <div className="row">
                        <div className="col">
                            <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />
                        </div>
                        <div className="col mt-3">
                            <small class="text-muted">
                                Sua senha precisa conter de 6-12 caracteres.
                            </small>
                        </div>
                    </div>

                    {
                        carregando ? <div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                            : <button onClick={cadastrar} type="button" className="btn btn-large btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }



                    <div className="msg-login text-black text-center text-center my-5">
                        {msgTipo === 'sucesso' && <span>
                            <strong> Usuário cadastrado com sucesso! &#128526; </strong>
                            <small class="text-muted">
                                <br></br>
                                Clique abaixo para realizar o login
                            </small>
                            <Link to={'/login'} className="btn btn-large btn-block mt-2"><i class="logar fas fa-4x fa-sign-in-alt"></i></Link>
                        </span>}

                        {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128546;</strong></span>}
                    </div>
                </form>
            </div >
            <Footer />
        </>
    )
}

export default NovoUsuario; 