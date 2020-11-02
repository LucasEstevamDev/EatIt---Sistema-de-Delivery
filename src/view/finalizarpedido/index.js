import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './finalizarpedido.css';

/* IMPORTAÇÃO REDUX */
import { useSelector } from 'react-redux';

/* IMPORTAÇÃO DA ROTA */
import { Link } from 'react-router-dom';

/* IMPORTAÇÃO DO FIREBASE */
import firebase from '../../config/firebase';

import Navbar from '../../components/navbar';

function FinalizarPedido(props) {

    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [prato, setPrato] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const [carregando, setCarregando] = useState(1);
    const [troco, setTroco] = useState();
    const [nome, setNome] = useState();
    const [restaurante, setRestaurante] = useState();
    const [valor, setValor] = useState();
    const [pagamento, setPagamento] = useState();
    const [cpf, setCpf] = useState();
    const [endereco, setEndereco] = useState();
    const [radioValue, setRadioValue] = useState(false);
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const db = firebase.firestore();

    useEffect(() => {
        if (carregando) {
            firebase.firestore().collection('pratos').doc(props.match.params.id).get().then(resultado => {
                setPrato(resultado.data())
                firebase.storage().ref(`img_pratos/${resultado.data().foto}`).getDownloadURL().then(url => {
                    setUrlImg(url)
                    setCarregando(0);
                });
            });
        }
    }, []);

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        if (!pagamento || !endereco) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        db.collection('pedido').add({
            nome: nome,
            restaurante: restaurante,
            valor: valor,
            pagamento: pagamento,
            cpf: cpf,
            endereco: endereco,
            troco: troco,
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

    function sacola() {
        setMsgTipo(null);
        setCarregando(1);

        if (!pagamento || !endereco) {
            setMsgTipo('erro')
            setMsg('Você precisa preencher todos os campos!')
            setCarregando(0)
            return;
        }

        db.collection('sacola').add({
            nome: nome,
            valor: valor,
            restaurante: restaurante,
            pagamento: pagamento,
            cpf: cpf,
            endereco: endereco,
            troco: troco,
            usuario: usuarioEmail,
            criacao: new Date()
        }).then(() => {
            setMsgTipo('sucessoSacola');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    }

    return (
        <>
            <Navbar />
            <div className="container">
                {
                    carregando ? <div className="row mt-5"><div class="spinner-border text-warning mx-auto" role="status"><span class="sr-only"></span></div></div>
                        :
                        <>
                            <div className="row mt-2">
                                <div className="col-md-4 col-sm-12 mt-5">
                                    <img src={urlImg} className="card-img-top img-cartao" alt="Imagem do evento" />

                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">{prato.nome}</h4>
                                            <p className="card-text text-justify overflow-auto">{prato.detalhes}</p>
                                            <h5 className="card-text text-justify">Valor: R${prato.valor}</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="card col-md-8 mt-5">
                                    <div className="card-body">
                                        <div>
                                            <h3>Resumo do Pedido</h3>
                                            <form className="mt-3">
                                                <div className="form-group">
                                                    <p onMouseMove={(e) => setRestaurante(e.target.value)}>{prato.restaurante}</p>
                                                </div>

                                                <div className="form-group">
                                                    <p onMouseMove={(e) => setNome(e.target.value)}>{prato.nome}</p>
                                                </div>

                                                <div className="form-group">
                                                    <p onMouseMove={(e) => setValor(e.target.value)}>{prato.valor}</p>
                                                </div>

                                                <div className="form-group">
                                                    <select onChange={(e) => setPagamento(e.target.value)} className="form-control">
                                                        <option disabled selected value>-- Forma de pagamento na entrega --</option>
                                                        <option>Dinheiro</option>
                                                        <option>Cartão de Crébito</option>
                                                    </select>
                                                </div>

                                                <span className="font-weight-bold mr-3">Vai precisar de troco?</span>
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" onClick={(e) => setRadioValue(e.target.value)} value={radioValue} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                            <label class="form-check-label" for="inlineRadio1">Sim</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                            <label class="form-check-label" for="inlineRadio2">Não</label>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <input placeholder="Troco pra quanto?" onChange={(e) => setTroco(e.target.value)} disabled={!radioValue} id="disabledTextInput" type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <input onMouseMove={(e) => setCpf(e.target.value)} placeholder="CPF na nota" type="text" className="form-control" maxLength="14" />
                                                </div>

                                                <div className="form-group">
                                                    <input onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço da Entrega" type="text" className="form-control" />
                                                </div>

                                                <div className="row">
                                                    <div className="text-center col">
                                                        {
                                                            carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                                                : <button onClick={cadastrar} type="button" className="btn btn-large btn-block mt-3 mb-3 btn-cadastro">Finalizar Pedido</button>
                                                        }
                                                    </div>
                                                    <div className="text-center col">
                                                        {
                                                            carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                                                : <button onClick={sacola} type="button" className="btn btn-large btn-block mt-3 mb-3 btn-cadastro">Adicionar Sacola</button>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="msg-login text-center text-center mb-3">

                                                {msgTipo === 'erro' && <span>Ops!<strong> {msg} &#128533;</strong></span>}
                                                <div className="">
                                                    {msgTipo === 'sucesso' && <span>Oba!<strong> Pedido realizado com sucesso, volte sempre! &#128516;</strong></span>}
                                                </div>
                                                <div className="">
                                                    {msgTipo === 'sucesso' && <Link to={'/'} className="btn btn-large btn-block btn-detalhes mt-2">Voltar ao Início</Link>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-2">
                                    <div className="font-weight-bold mt-3">
                                        {msgTipo === 'sucessoSacola' && <Link to={'/sacola/meuspratos'} className="btn btn-large btn-block mt-2"><i class="fas fa-shopping-bag fa-3x mb-3"></i></Link>}
                                        {msgTipo === 'sucessoSacola' && <span className="text-break"><strong> Item adicionado a sacola! &#127881;</strong></span>}
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default FinalizarPedido;