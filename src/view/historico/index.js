import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './historico.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import HistoricoCard from '../../components/historico-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function Historico() {
    const [pratos, setPratos] = useState([]);
    const [carregando, setCarregando] = useState(1);
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('pedido').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
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

    return (
        <>
            <Navbar />

            {
                carregando ? <div className="row"><div class="spinner-border mx-auto text-warning mt-3" role="status"><span class="sr-only"></span></div></div>
                    : <div>
                        <div className="home-content">
                            <h1 className="col ml-3 mt-3">Histórico</h1>
                            <div className="col p-3">
                                {pratos.map(item => <HistoricoCard id={item.id} nome={item.nome} troco={item.troco} valor={item.valor} endereco={item.endereco} restaurante={item.restaurante} />)}
                            </div>
                        </div>

                    </div>
            }

            <Footer />

        </>
    )
}


export default Historico;