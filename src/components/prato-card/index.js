import React, { useState, useEffect } from 'react';
import './prato-card.css';
import firebase from '../../config/firebase';

/* IMPORTAÇÃO DA ROTA */
import { Link } from 'react-router-dom';

function PratoCard({ key, id, img, titulo, detalhes, valor }) {

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`img_pratos/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    }, [urlImagem]);


    return (
        <div className="col-md-3 col-sm-12">
            <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do prato" />

            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{titulo}</h4>
                    <p className="card-text card-text-prato text-justify">{detalhes}</p>
                    <h5 className="card-text card-text-prato text-justify">Valor: R${valor}</h5>

                    <div className="row rodape-card d-flex align-items-center">
                        <div className="col-6">
                            <Link to={'/finalizarpedido/' + id} className="btn btn-sm btn-detalhes mt-2">Me escolha</Link>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
        </div>
    )
}

export default PratoCard;