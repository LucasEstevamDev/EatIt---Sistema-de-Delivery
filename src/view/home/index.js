import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import RestauranteCard from '../../components/restaurante-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function Home() {

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
        <h1 className="text-center my-3">OPÇÃO PARA TODAS AS FOMES</h1>

        <div className="p-3">
          <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquise o nome do restaurante" />
        </div>

        <div className="row p-3">
          {restaurante.map(item => <RestauranteCard key={item.id} id={item.id} img={item.foto} detalhes={item.detalhes} titulo={item.nome} />)}
        </div>
      </div>
      <Footer />
    </>
  )
}


export default Home;