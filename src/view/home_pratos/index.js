import React, { useState, useEffect } from 'react';
import './home_pratos.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PratoCard from '../../components/prato-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function HomePratos() {
    const [pratos, setPratos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('pratos').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                if (doc.data().nome.indexOf(pesquisa) >= 0) {
                    listapratos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })

            setPratos(listapratos);

        });
    })

    return (
        <>
            <Navbar />
            <div>
                <div className="home-content">
                    <h1 className="text-center my-3">Escolha seu prato e seja feliz</h1>

                    <div className="p-3">
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquise o nome do restaurante" />
                    </div>

                    <div className="row p-3">
                        {pratos.map(item => <PratoCard id={item.id} img={item.foto} detalhes={item.detalhes} titulo={item.nome} valor={item.valor} />)}
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default HomePratos;