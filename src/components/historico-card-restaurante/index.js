import React from 'react';
import './historico-card-restaurante.css';


function HistoricoCardRestaurante({ id, nome, statusPedido, endereco, usuario }) {

    return (
        <div className="col-md-4 col-sm-12 ">

            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{nome}</h3>
                    <p className="card-text"><i class="fas fa-spinner mr-3"></i>{statusPedido}</p>
                    <p className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                    <p className="card-text">{usuario}</p>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default HistoricoCardRestaurante;