import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';
import './cliente.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

function Cliente({ match }) {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();

    /* REGISTRO CLIENTE */
    const [nome, setNome] = useState();
    const [cpf, setCPF] = useState();
    const [telefone, setTelefone] = useState();
    const [endereco, setEndereco] = useState();
    const [usuario, setUsuario] = useState();
    const [complemento, setComplemento] = useState();
    const [numero, setNumero] = useState();
    const [cep, setCEP] = useState();
    let listapratos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const storage = firebase.storage();
    const db = firebase.firestore();

    function limpar() {
        document.getElementById('form').reset();
    }

    if (match.params.parametro) {
        firebase.firestore().collection('cliente').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            setCarregando(0);
            await resultado.docs.forEach(doc => {
                listapratos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setUsuario(listapratos);
        });
    } else {
        firebase.firestore().collection('cliente').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            setCarregando(0);
            await resultado.docs.forEach(doc => {
                listapratos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setUsuario(listapratos);
        });
    }


    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        if (!nome || !cpf || !telefone || !endereco || !numero || !cep) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        db.collection('cliente').add({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            endereco: endereco,
            complemento: complemento,
            numero: numero,
            cep: cep,
            publico: 1,
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
            <div className="home-content">
                <Link to="" className="btn-editar"><i class="mt-2 fas fa-3x text-dark fa-user-edit"></i></Link>
            </div>
            <div className="col-10 mx-auto">
                <div className="mb-4 mt-5">
                    <h3 className="font-weight-bold">Complete seu cadastro e explore essa possibilidade de sabores</h3>
                </div>

                <form id="form">
                    <div className="form-group">
                        <input onChange={(e) => setNome(e.target.value)} placeholder="Nome*" type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setCPF(e.target.value)} placeholder="CPF/CNPJ*" type="text" className="form-control" maxlength="14" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone*" type="text" className="form-control" />
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <input onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço*" type="text" className="form-control" />
                        </div>

                        <div className="form-group col">
                            <input onChange={(e) => setComplemento(e.target.value)} placeholder="Complemento*" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <input onChange={(e) => setNumero(e.target.value)} placeholder="Número*" type="text" className="form-control" />
                        </div>

                        <div className="form-group col">
                            <input onChange={(e) => setCEP(e.target.value)} placeholder="CEP*" type="text" className="form-control" maxlength="9" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            {
                                carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                    : <button onClick={cadastrar} type="button" className="btn btn-large btn-block mt-4 mb-4 btn-cadastro">Cadastrar</button>
                            }
                        </div>
                        <div className="col">
                            <button onClick={limpar} type="button" className="btn btn-large btn-block mt-4 mb-4 btn-cadastro">Limpar Campos</button>
                        </div>
                    </div>
                </form>

                <div className="msg-login text-center text-center mb-1">
                    {msgTipo === 'sucesso' && <span>Oba!<strong> Dados cadastrado com sucesso! &#128516;</strong></span>}
                    {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128533;</strong></span>}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Cliente;