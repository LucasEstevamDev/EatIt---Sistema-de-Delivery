import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
import './restaurantes-cadastro.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

function Restaurante() {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCPF] = useState();
    const [telefone, setTelefone] = useState();
    const [endereco, setEndereco] = useState();
    const [numero, setNumero] = useState();
    const [cep, setCEP] = useState();
    const [detalhes, setDetalhes] = useState();
    const [foto, setFoto] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    function limpar() {
        document.getElementById('form').reset();
    }

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        if (!nome || !cpf || !telefone || !endereco || !numero || !cep || !detalhes || !foto) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        storage.ref(`img_restaurantes/${foto.name}`).put(foto).then(() => {
            db.collection('restaurante').add({
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                endereco: endereco,
                numero: numero,
                cep: cep,
                detalhes: detalhes,
                foto: foto.name,
                publico: 1,
                usuario: usuarioEmail,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            })
        });
    }

    return (
        <>
            <Navbar />
            <div className="col-11 mx-auto mt-3">
                <div className="mb-4 mt-4">
                    <h3 className="font-weight-bold">Preencha os dados abaixo e seja nosso parceiro!</h3>
                </div>

                <form id="form">
                    <div className="form-group">
                        <input onChange={(e) => setNome(e.target.value)} id="input_name" placeholder="Nome do estabelecimento*" type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setCPF(e.target.value)} placeholder="CPF/CNPJ*" type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone*" type="text" className="form-control" />
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <input onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço*" type="text" className="form-control" />
                        </div>

                        <div className="form-group col">
                            <input onChange={(e) => setNumero(e.target.value)} placeholder="Número*" type="text" className="form-control" />
                        </div>

                        <div className="form-group col">
                            <input onChange={(e) => setCEP(e.target.value)} placeholder="CEP*" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="form-group">
                        <textarea onChange={(e) => setDetalhes(e.target.value)} placeholder="Breve descrição do estabelecimento*" className="form-control" rows="3" />
                    </div>

                    <div className="form-group">
                        <strong><label>Insira a foto do seu estabelecimento abaixo</label></strong>
                        <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control-file" />
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
                    {msgTipo === 'sucesso' && <span>Oba!<strong> Restaurante cadastrado com sucesso! &#128516;</strong></span>}
                    {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128533;</strong></span>}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Restaurante;