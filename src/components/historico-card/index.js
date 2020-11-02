import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import './historico-card.css';


function HistoricoCard({ id, nome, troco, endereco, valor, restaurante }) {

    return (
        <div className="col-md-4 col-sm-12 ">

            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{nome}</h3>
                    <p className="card-text"><i class="fas fa-utensils mr-3"></i><strong className="mr-1"></strong>{restaurante}</p>
                    <p className="card-text"><i class="fas fa-dollar-sign mr-3"></i><strong className="mr-1">R$</strong>{valor}</p>
                    <p className="card-text"><i class="fas fa-exchange-alt mr-3"></i><strong className="mr-1">R$</strong>{troco}</p>
                    <p className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                    <p className="codigo-card"><i class="fas fa-hashtag mr-3"></i>{id}</p>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default HistoricoCard;