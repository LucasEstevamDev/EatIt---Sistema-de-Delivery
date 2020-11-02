import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './perfil.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import RestauranteCard from '../../components/restaurante-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';

function Perfil() {

    const [restaurante, setRestaurante] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listarestaurante = [];

    useEffect(() => {
        firebase.firestore().collection('restaurante').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                if (doc.data().nome.indexOf(pesquisa) >= 0) {
                    listarestaurante.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            setRestaurante(listarestaurante);
        });
    })

    return (
        <>
            <Navbar />

            <div className="home-content">
                <Link to="" className="btn-editar"><i class="mt-2 fas fa-3x text-dark fa-user-edit"></i></Link>
            </div>
            <Footer />
        </>
    )
}


export default Perfil;