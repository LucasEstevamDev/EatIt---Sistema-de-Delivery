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

    return (
        <>
            <Navbar />
            {
                carregando ? <div className="row"><div class="spinner-border mx-auto text-warning mt-3" role="status"><span class="sr-only"></span></div></div>
                    : <div>
                        <h1 className="text-center my-4">Aproveite cada pedaço!!</h1>
                        <div className="home-content">
                            <div className="row">
                                <div className="col">
                                    <div className="row p-3">
                                        {pratos.map(item => <SacolaCard id={item.id} nome={item.nome} troco={item.troco} valor={item.valor} endereco={item.endereco} telefone={item.telefone} pagamento={item.pagamento} restaurante={item.restaurante} usuario={item.usuario} />)}
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


export default Sacola;