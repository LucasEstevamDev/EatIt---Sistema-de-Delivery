import React, { useState, useEffect } from 'react';
import './status-pedido.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import StatusCard from '../../components/status-pedido-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function StatusPedido(props) {
    const [pratos, setPratos] = useState([]);
    const [carregando, setCarregando] = useState(1);

    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('pedido_cliente').get().then(async (resultado) => {
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
                            <div className="row">
                                <div className="col">
                                    <div className="row p-3">
                                        {pratos.map(item => <StatusCard id={item.id} nome={item.nome} usuario={item.usuario} valor={item.valor} endereco={item.endereco} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <Footer />

        </>
    )
}


export default StatusPedido;