import React, { useState } from 'react';
import './status-pedido-card.css';
/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';


function StatusCard({ id, nome, endereco, usuario, status, ticket, pagamento, telefone, valor }) {

    const [msgTipo, setMsgTipo] = useState();
    const [nomePedido, setNomePedido] = useState();
    const [numPedido, setNumPedido] = useState();
    const [usuarioPedido, SetUsuarioPedido] = useState();
    const [enderecoPedido, setEnderecoPedido] = useState();
    const [statusPedido, setStatusPedido] = useState();
    const [pagamentoPedido, setPagamentoPedido] = useState();
    const [telefoneCliente, setTelefoneCliente] = useState();
    const [valorPedido, setValorPedido] = useState();
    const db = firebase.firestore();

    function cadastrar() {
        setMsgTipo(null);

        db.collection('historico_restaurante').add({
            statusPedido: statusPedido,
            nome: nome,
            pagamento: pagamento,
            telefone: telefone,
            valor: valor,
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

        document.getElementById('finalizar').reset();
    }

    return (
        <>
            <div className="col-md-4 col-sm-12 ">
                <div className="card border-dark" id="card-hidden">
                    <div className="card-body">
                        <h3 onMouseMove={(e) => setNomePedido(e.target.value)} className="card-title">{nome}</h3>
                        <p onMouseMove={(e) => setValorPedido(e.target.value)} className="codigo-card"><i class="fas fa-dollar-sign mr-3"></i>{valor}</p>
                        <p onMouseMove={(e) => setPagamentoPedido(e.target.value)} className="codigo-card"><i class="fas fa-wallet mr-3"></i>{pagamento}</p>
                        <p onMouseMove={(e) => setNumPedido(e.target.value)} className="codigo-card"><i class="fas fa-hashtag mr-3"></i>{id}</p>
                        <p onMouseMove={(e) => SetUsuarioPedido(e.target.value)} className="codigo-card"><i class="fas fa-user-circle mr-3"></i>{usuario}</p>
                        <p onMouseMove={(e) => setTelefoneCliente(e.target.value)} className="codigo-card"><i class="fas fa-phone-alt mr-3"></i>{telefone}</p>
                        <p onMouseMove={(e) => setEnderecoPedido(e.target.value)} className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                        <div className="row">
                            <div className="col-md-8">
                                <input id="finalizar" onChange={(e) => setStatusPedido(e.target.value)} className="form-control mt-2" placeholder="Status atual" />
                            </div>
                            <div className="col">
                                <button onClick={function (event) { cadastrar() }} type="button" className="btn btn-block btn-success mt-2"><i class="fas fa-check-circle"></i></button>
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