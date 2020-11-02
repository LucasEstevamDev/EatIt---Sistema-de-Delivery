import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
import './contato.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

function Contato() {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();

    /* REGISTRO CONTATO */
    const [nome, setNome] = useState();
    const [mensagem, setMensagem] = useState();
    const [email, setEmail] = useState();
    const [titulo, setTitulo] = useState();


    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    function enviarMensagem() {
        setMsgTipo(null);
        setCarregando(1);

        if (!nome || !mensagem || !email) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        db.collection('contato').add({
            nome: nome,
            mensagem: mensagem,
            email: email,
            usuario: usuarioEmail,
            criacao: new Date()
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    }

    return (
        <>
            <Navbar />
            <div className="col-10 mx-auto mt-5">
                <form>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <h2 className="font-weight-bold">Como podemos ajudar?</h2>

                            <div className="form-group mt-3">
                                <select onChange={(e) => setTitulo(e.target.value)} className="form-control">
                                    <option disabled selected value>-- Escolha o motivo do contato --</option>
                                    <option>Elogio</option>
                                    <option>Sugestão</option>
                                    <option>Reclamação</option>
                                    <option>Dúvida</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input onChange={(e) => setNome(e.target.value)} placeholder="Insira seu Nome*" type="text" className="form-control" />
                            </div>

                            <div className="form-group">
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu melhor e-mail*" type="email" className="form-control" />
                            </div>

                        </div>

                        <div className="col mt-5">
                            <div className="form-group">
                                <textarea onChange={(e) => setMensagem(e.target.value)} placeholder="Digite sua mensagem aqui" className="form-control" rows="9" />
                            </div>
                            <div className="text-center">
                                {
                                    carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                        : <button onClick={enviarMensagem} type="button" className="btn btn-large btn-block mt-2 mb-4 btn-cadastro">Enviar Mensagem</button>
                                }
                            </div>
                        </div>
                    </div>
                </form>
                <div className="msg-login text-center text-center mb-1">
                    {msgTipo === 'sucesso' && <span>Oba!<strong> Mensagem enviada com sucesso! &#128516;</strong></span>}
                    {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128533;</strong></span>}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Contato;