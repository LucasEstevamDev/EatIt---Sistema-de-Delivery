import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './sacola.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import SacolaCard from '../../components/sacola-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function Sacola(props) {
    const [pratos, setPratos] = useState([]);
    const [carregando, setCarregando] = useState(1);
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('sacola').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            setCarregando(0);
            await resultado.docs.forEach(doc => {
                listapratos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            setPratos(listapratos);
        });
    })

    function remover() {
        firebase.firestore().collection('sacola').where('usuario', '==', usuarioEmail).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col my-3 mx-3">
                    <button onClick={remover} type="button" className="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                    <strong><span className="ml-2">Clique aqui para limpar os itens!!</span></strong>

                </div>
            </div>

            {
                carregando ? <div className="row"><div class="spinner-border mx-auto text-warning mt-3" role="status"><span class="sr-only"></span></div></div>
                    : <div>
                        <div className="home-content">
                            <div className="row">
                                <div className="col">
                                    <div className="row p-3">
                                        {pratos.map(item => <SacolaCard id={item.id} nome={item.nome} troco={item.troco} valor={item.valor} endereco={item.endereco} restaurante={item.restaurante} />)}
                                    </div>
                                </div>
                            </div>

                            <div className="row mr-2 ml-2">
                                <div className="col-md-12 col-sm-12">
                                    {
                                        carregando ? <div class="spinner-border text-warning text-center" role="status"><span class="sr-only">Loading...</span></div>
                                            : <button type="button" className="btn btn-large btn-block mt-3 mb-3 btn-cadastro btn-pedido">Finalizar Pedido</button>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
            }

            <Footer />

        </>
    )
}


export default Sacola;