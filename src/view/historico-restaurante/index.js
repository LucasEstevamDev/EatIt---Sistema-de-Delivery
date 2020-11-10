import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './historico-restaurante.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import HistoricoCardRestaurante from '../../components/historico-card-restaurante';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function HistoricoRestaurante() {
    const [pratos, setPratos] = useState([]);
    const [carregando, setCarregando] = useState(1);

    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('historico_restaurante').get().then(async (resultado) => {
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
                            <strong><p style={{ fontSize: '30pt' }} className="col ml-3 mt-3">Histórico</p></strong>
                            <div className="col row p-3">
                                {pratos.map(item => <HistoricoCardRestaurante id={item.id} nome={item.nome} troco={item.troco} valor={item.valor} endereco={item.endereco} pagamento={item.pagamento} />)}
                            </div>
                        </div>

                    </div>
            }

            <Footer />

        </>
    )
}


export default HistoricoRestaurante;