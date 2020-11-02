import React, { useState, useEffect } from 'react';
import './perfil-card.css';
import firebase from '../../config/firebase';

/* IMPORTAÇÃO DA ROTA */
import { Link } from 'react-router-dom';

function PerfilCard({ key, id, cep, complemento, cpf, endereco, nome, numero, telefone }) {
    return (
        <div className="col-md-3 col-sm-12">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{titulo}</h4>
                    <p className="card-text text-justify">{detalhes}</p>
                    <h5 className="card-text text-justify">Valor: R${valor}</h5>

                    <div className="row rodape-card d-flex align-items-center">
                        <div className="col-6">
                            <Link to={'/perfil/' + id} className="btn btn-sm btn-detalhes mt-2">Me escolha</Link>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default PerfilCard;