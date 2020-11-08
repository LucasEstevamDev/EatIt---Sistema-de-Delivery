import React, { useState } from 'react';
import './sacola-card.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

function SacolaCard({ id, nome, endereco, valor, restaurante, usuario }) {
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();

    /* REGISTRO CLIENTE */
    const [nomePrato, setNomePrato] = useState();
    const [enderecoCliente, setEnderecoCliente] = useState();
    const [usuarioCliente, setUsuario] = useState();
    const [valorPrato, setValorPrato] = useState();
    const [nomeRestaurante, setNomeRestaurante] = useState();

    const db = firebase.firestore();

    function finalizar() {
        setMsgTipo(null);
        setCarregando(1);

        db.collection('pedido_cliente').add({
            nome: nome,
            endereco: endereco,
            valor: valor,
            usuario: usuario,
            restaurante: restaurante,
            criacao: new Date()
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    }

    function finalizarHistorico() {
        setMsgTipo(null);
        setCarregando(1);

        db.collection('historico_cliente').add({
            nome: nome,
            endereco: endereco,
            valor: valor,
            restaurante: restaurante,
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
        <div className="col-md-4 col-sm-12 ">
            <div className="card">

                <form>
                    <div className="card-body">
                        <p className="card-title"><i class="fas fa-utensils mr-2"></i>{id}</p>
                        <div className="form-group">
                            <input onMouseMove={(e) => setNomePrato(e.target.value)} className="form-control" type="text" value={nome} />
                        </div>

                        <div className="form-group">
                            <input onMouseMove={(e) => setEnderecoCliente(e.target.value)} className="form-control" type="text" value={restaurante} />
                        </div>

                        <div className="form-group">
                            <input onMouseMove={(e) => setValorPrato(e.target.value)} className="form-control" type="text" value={valor} />
                        </div>

                        <div className="form-group">
                            <input onMouseMove={(e) => setUsuario(e.target.value)} className="form-control" type="text" value={usuario} />
                        </div>

                        <div className="form-group">
                            <input onMouseMove={(e) => setNomeRestaurante(e.target.value)} className="form-control" type="text" value={endereco} />
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="text" value={id} />
                        </div>

                        <div className="text-center">
                            {
                                carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                    : <button onClick={function (event) { finalizar(); finalizarHistorico() }} type="button" className="btn btn-success btn-large btn-block mb-3">OK</button>
                            }
                        </div>

                        <div className="">
                            {msgTipo === 'sucesso' && <span>Oba!<strong> Pedido realizado com sucesso, volte sempre! &#128516;</strong></span>}
                        </div>
                    </div>
                </form>

            </div>
            <br></br>
        </div>
    )
}

export default SacolaCard;