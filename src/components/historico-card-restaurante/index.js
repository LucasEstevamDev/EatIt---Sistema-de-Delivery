import React from 'react';
import './historico-card-restaurante.css';


function HistoricoCardRestaurante({ id, nome, troco, endereco, valor, pagamento }) {

    return (
        <>
            <div className="col-md-4 col-sm-12 =">
                <div className="card border-secondary">
                    <div className="card-body">
                        <h3 className="card-header">{nome}</h3>
                        <p className="card-text"><i class="fas fa-dollar-sign mt-3 mr-3"></i><strong>R$</strong>{valor}</p>
                        <p className="card-text"><i class="fas fa-wallet mr-3"></i><strong></strong>{pagamento}</p>
                        {troco ? <p className="card-text"><i class="fas fa-exchange-alt mr-3"></i><strong>R$</strong>{troco}</p> : null}
                        <p className="card-text"><i class="fas fa-map-marked-alt mr-3"></i><strong>{endereco}</strong></p>
                        <p className="codigo-card"><i class="fas fa-hashtag mr-3"></i>{id}</p>
                    </div>
                </div>
                <br></br>
            </div>
        </>
    )
}

export default HistoricoCardRestaurante;