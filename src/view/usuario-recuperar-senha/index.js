import React, { useState } from 'react';
import './usuario-recuperar-senha.css';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';
require('firebase/auth');

function UsuarioRecuperarSenha() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();

    function recuperarSenha() {

        setCarregando(1);

        if (!email) {
            setMsgTipo('erro')
            setMsg('Preencha o campo!')
            setCarregando(0)
            return;
        } else {
            firebase.auth().sendPasswordResetEmail(email).then(resultado => {
                setCarregando(0);
                setMsgTipo('sucesso')
                setMsg('Enviamos um link no seu email para você redifinir sua senha!');
            }).catch(erro => {
                setCarregando(0);
                setMsgTipo('erro')
                setMsg('Verifique o email digitado!');
            })
        }
    }

    return (
        <>

            <Navbar />
            <br></br>
            <form className="text-center form-login mx-auto mt-5">
                <h3 className="mb-4 font-weight-bold">Recuperar Senha</h3>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />

                {
                    carregando ? <div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>
                        : <button onClick={recuperarSenha} type="button" className="btn btn=lg btn-block btn-enviar">Recuperar Senha</button>
                }

                <div className="msg my-4 text-center">
                    {msgTipo === 'sucesso' && <span>WoW!<strong> {msg} &#128526;</strong></span>}
                    {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128540;</strong></span>}
                </div>
            </form>

            <Footer />
        </>
    )
}

export default UsuarioRecuperarSenha;