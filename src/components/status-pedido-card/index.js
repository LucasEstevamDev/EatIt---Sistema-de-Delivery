import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './status-pedido-card.css';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';


function StatusCard({ id, nome, endereco, usuario }) {

    const [msgTipo, setMsgTipo] = useState();
    const [nomePedido, setNomePedido] = useState();
    const [numPedido, setNumPedido] = useState();
    const [usuarioPedido, SetUsuarioPedido] = useState();
    const [enderecoPedido, setEnderecoPedido] = useState();
    const db = firebase.firestore();

    function estilo() {
        document.getElementById('barraProgresso').style.width = '100%';
    }

    function cadastrar() {
        setMsgTipo(null);

        db.collection('pedido_restaurante').add({
            nome: nome,
            id: id,
            usuario: usuario,
            endereco: endereco,
            criacao: new Date()
        }).then(() => {
            setMsgTipo('sucesso');
        }).catch(erro => {
            setMsgTipo('erro');
        });
    }

    return (
        <div className="col-md-4 col-sm-12 ">

            <div className="card">
                <div className="card-body">
                    <h3 onMouseMove={(e) => setNomePedido(e.target.value)} className="card-title">{nome}</h3>
                    <p onMouseMove={(e) => setNumPedido(e.target.value)} className="codigo-card"><i class="fas fa-hashtag mr-3"></i>{id}</p>
                    <p onMouseMove={(e) => SetUsuarioPedido(e.target.value)} className="codigo-card"><i class="fas fa-user-circle mr-3"></i>{usuario}</p>
                    <p onMouseMove={(e) => setEnderecoPedido(e.target.value)} className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                    <div className="progress">
                        <div id="barraProgresso" className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width: "50%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button onClick={cadastrar} type="button" className="btn btn-success mt-2"><i class="fas fa-check-circle"></i></button>
                </div>
            </div>

            <div className="">
                {msgTipo === 'sucesso' && <span>Oba!<strong> Pedido realizado com sucesso, volte sempre! &#128516;</strong></span>}
            </div>
            <br></br>
        </div >
    )
}

export default StatusCard;