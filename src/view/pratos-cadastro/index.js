import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
import './pratos-cadastro.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

function PratoCadastro() {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [nome, setNome] = useState();
    const [tipo, setTipo] = useState();
    const [restaurante, setRestaurante] = useState();
    const [detalhes, setDetalhes] = useState();
    const [valor, setValor] = useState();
    const [foto, setFoto] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    function limpar() {
        document.getElementById('form').reset();
        document.getElementById('restaurante').selectedIndex = null;
        document.getElementById('tipo').selectedIndex = null;
    }

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        if (!nome || !tipo || !detalhes || !valor || !foto) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        storage.ref(`img_pratos/${foto.name}`).put(foto).then(() => {
            db.collection('pratos').add({
                nome: nome,
                tipo: tipo,
                detalhes: detalhes,
                restaurante: restaurante,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: foto.name,
                valor: valor,
                publico: 1,
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
                <div className="mb-4">
                    <h2 className="font-weight-bold">Painel de administração</h2>
                    <span>Complete os dados abaixo para adicionar um novo prato ao seu cardápio</span>
                </div>

                <form id="form">
                    <div className="form-group">
                        <input onChange={(e) => setNome(e.target.value)} placeholder="Nome do prato" type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                        <select id="tipo" onChange={(e) => setTipo(e.target.value)} className="form-control">
                            <option disabled selected value>-- Escolha o tipo do prato --</option>
                            <option>Entrada</option>
                            <option>Acompanhamento</option>
                            <option>Sobremesa</option>
                            <option>Bebida</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select id="restaurante" onChange={(e) => setRestaurante(e.target.value)} className="form-control">
                            <option disabled selected value>-- Escolha o nome do seu restaurante --</option>
                            <option>Açaí da Lorem</option>
                            <option>Chaleiras</option>
                            <option>Coco Bambu Restaurante</option>
                            <option>Habib's</option>
                            <option>McFavela</option>
                            <option>Outback Steakhouse</option>
                            <option>Osteria Generale</option>
                            <option>Real Burger</option>
                            <option>Restaurante Bentô House</option>
                            <option>Tollocos</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <textarea onChange={(e) => setDetalhes(e.target.value)} placeholder="Descrição do prato" className="form-control" rows="3" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control" />
                    </div>

                    <div className="form-group">
                        <input onChange={(e) => setValor(e.target.value)} placeholder="$ Valor do prato $" type="text" className="form-control" />
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

                <div className="msg-login text-center text-center mb-3">
                    {msgTipo === 'sucesso' && <span>Oba!<strong> Prato cadastrado com sucesso! &#128516;</strong></span>}
                    {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128533;</strong></span>}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default PratoCadastro;