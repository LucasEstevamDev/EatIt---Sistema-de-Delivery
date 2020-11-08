import React, { useState } from 'react';
import './status-pedido-card.css';
/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';


function StatusCard({ id, nome, endereco, usuario, status, ticket }) {

    const [msgTipo, setMsgTipo] = useState();
    const [nomePedido, setNomePedido] = useState();
    const [numPedido, setNumPedido] = useState();
    const [usuarioPedido, SetUsuarioPedido] = useState();
    const [enderecoPedido, setEnderecoPedido] = useState();
    const [statusPedido, setStatusPedido] = useState();
    const db = firebase.firestore();

    function remover() {

    }

    function cadastrar() {
        setMsgTipo(null);

        db.collection('historico_restaurante').add({
            statusPedido: statusPedido,
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

        db.collection('pedido_cliente').doc(id).update({
            ticket: 'fechado'
        }).then(() => {
            setMsgTipo('sucesso');
        }).catch(erro => {
            setMsgTipo('erro');
        });

        firebase.firestore().collection('pedido_cliente').where('ticket', '==', 'fechado').get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <>
            <div className="col-md-4 col-sm-12 ">
                <div className="card" id="card-hidden">
                    <div className="card-body">
                        <h3 onMouseMove={(e) => setNomePedido(e.target.value)} className="card-title">{nome}</h3>
                        <p onMouseMove={(e) => setNumPedido(e.target.value)} className="codigo-card"><i class="fas fa-hashtag mr-3"></i>{id}</p>
                        <p onMouseMove={(e) => SetUsuarioPedido(e.target.value)} className="codigo-card"><i class="fas fa-user-circle mr-3"></i>{usuario}</p>
                        <p onMouseMove={(e) => setEnderecoPedido(e.target.value)} className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                        <div className="progress">
                            <div id="barraProgresso" className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width: "50%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <input onChange={(e) => setStatusPedido(e.target.value)} className="form-control mt-2" placeholder="Status atual" />
                            </div>

                            <div className="col">
                                <button onClick={function (event) { cadastrar(); remover() }} type="button" className="btn btn-block btn-success mt-2"><i class="fas fa-check-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        </>
    )
}

export default StatusCard;