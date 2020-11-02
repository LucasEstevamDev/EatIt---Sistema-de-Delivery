import React, { useState, useEffect } from 'react';
import './restaurante-card.css';
import firebase from '../../config/firebase';

/* IMPORTAÇÃO DA ROTA */
import { Link } from 'react-router-dom';

function RestauranteCard({ key, id, img, titulo, detalhes }) {

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`img_restaurantes/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    }, [urlImagem]);


    return (
        <div className="col-md-3 col-sm-12">
            <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do restaurante" />

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{titulo}</h4>
                    <p className="card-text card-text-restaurante text-justify overflow-auto">{detalhes}</p>

                    <div className="row rodape-card d-flex align-items-center">
                        <div className="col-6">
                            <Link to="/matesuafome" className="btn btn-sm btn-detalhes">Mate sua fome!</Link>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
        </div>
    )
}

export default RestauranteCard;