import React from 'react';
import Pablo from "../../img/pablo.jpg";
import Henrique from "../../img/henrique.jpg";
import Lucas from "../../img/lucas.jpg";
import Nat from "../../img/nat.png";
import Kevin from "../../img/kevin.png";
import './sobre.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

function Sobre() {
    return (
        <>
            <Navbar />
            <div className="header mb-5">
                <div className="content-info">
                    <div className="col-md-6 offset-md-3 text-center">
                        <span className="text-center text-justify texto">
                            O EatIt é um service food que tem como público alvo os restaurantes, consumidores e entregadores,
                            buscando incentivar o meio social e focando no crescimento econômico do "Cozinheiro Independente".
                            Agregamos valor em comodidade e agilidade do dia a dia, diferente das outras empresas, focamos em empreendedorismo social.
                    </span>
                    </div>
                </div>
            </div>

            <div>
                <strong><p style={{ fontSize: "35pt" }} className="text-center my-4">NOSSO TIME</p></strong>
            </div>

            <div className="perfil1">
                <div className="row">
                    <div className="col ml-4">
                        <div class="profile-userpic">
                            <img src={Pablo} class="img-responsive mt-4" alt="" />
                        </div>
                        <strong><p className="text-justify mt-2">Scrum Master </p></strong>
                        <i class="text-primary fab fa-linkedin mr-1"></i>
                        <strong><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/pablo-sperandeo/">Pablo Sperandeo</a></strong>
                    </div>

                    <div className="col ml-4">
                        <div class="profile-userpic">
                            <img src={Henrique} class="img-responsive mt-4" alt="" />
                        </div>
                        <strong><p className="text-justify mt-2">Product Owner </p></strong>
                        <i class="text-primary fab fa-linkedin mr-1 fa-1x"></i>
                        <strong><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/henriquejesuslv/">Henrique Silva</a></strong>
                    </div>

                    <div className="col ml-4">
                        <div class="profile-userpic">
                            <img src={Lucas} class="img-responsive mt-4" alt="" />
                        </div>
                        <strong><p className="text-justify mt-2">Fullstack Developer</p></strong>
                        <i class="text-primary fab fa-linkedin mr-1"></i>
                        <strong><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/lucas-estevam/">Lucas Estevam</a></strong>
                    </div>

                    <div className="col ml-4">
                        <div class="profile-userpic">
                            <img src={Nat} class="img-responsive mt-4" alt="" />
                        </div>
                        <strong><p className="text-justify mt-2">Data Analytics </p></strong>
                        <i class="text-primary fab fa-linkedin mr-1"></i>
                        <strong><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nathalie-m-paula">Náthalie De Melo Paula</a></strong>
                    </div>

                    <div className="col ml-4">
                        <div class="profile-userpic">
                            <img src={Kevin} class="img-responsive mt-4" alt="" />
                        </div>
                        <strong><p className="text-justify mt-2">Software Engineer </p></strong>
                        <i class="text-primary fab fa-linkedin mr-1"></i>
                        <strong><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kevin-g-ferreira">Kevin Ferreira</a></strong>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Sobre;