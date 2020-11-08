import React from 'react';
import './perfil-card-restaurante.css';

function PerfilCardRestaurante({ id, cep, complemento, cpf, endereco, nome, numero, telefone }) {

    return (
        <div className="col-10 mx-auto">
            <div className="mb-4 mt-3">
                <h3 className="font-weight-bold mb-4">Meus dados - {nome}</h3>
            </div>

            <form id="form">
                <div className="form-group">
                    <input value={nome} type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <input value={cpf} type="text" className="form-control" maxlength="14" />
                </div>

                <div className="form-group">
                    <input value={telefone} type="text" className="form-control" />
                </div>

                <div className="row">
                    <div className="form-group col">
                        <input value={endereco} type="text" className="form-control" />
                    </div>

                    <div className="form-group col">
                        <input value={complemento} type="text" className="form-control" />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                        <input value={numero} type="text" className="form-control" />
                    </div>

                    <div className="form-group col">
                        <input value={cep} type="text" className="form-control" maxlength="9" />
                    </div>
                </div>
            </form>
        </div >
    )
}

export default PerfilCardRestaurante;