import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

/* PÁGINAS */
import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import PratosCadastro from './view/pratos-cadastro';
import RestauranteCadastro from './view/restaurantes-cadastro';
import Restaurante from './view/restaurante';
import Cliente from './view/cliente';
import Perfil from './view/perfil';
import HomePratos from './view/home_pratos';
import FinalizarPedido from './view/finalizarpedido';
import Sacola from './view/sacola';
import Contato from './view/contato';
import Historico from './view/historico';
import Status from './view/status-pedido';
import SobreNos from './view/sobre';
import HistoricoRestaurante from './view/historico-restaurante';
import PerfilRestaurante from './view/perfil-restaurante';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/novousuario' component={NovoUsuario} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
          <Route exact path='/pratoscadastro' component={PratosCadastro} />
          <Route exact path='/restaurantecadastro' component={RestauranteCadastro} />
          <Route exact path='/restaurante' component={Restaurante} />
          <Route exact path='/cliente' component={Cliente} />
          <Route exact path='/perfil' component={Perfil} />
          <Route exact path='/perfilrestaurante' component={PerfilRestaurante} />
          <Route path='/editardados/:id' component={Perfil} />
          <Route exact path='/matesuafome' component={HomePratos} />
          <Route path='/finalizarpedido/:id' component={FinalizarPedido} />
          <Route path='/sacola/:id' component={Sacola} />
          <Route path='/historico/:id' component={Historico} />
          <Route exact path='/historico-restaurante/meuspedidos' component={HistoricoRestaurante} />
          <Route exact path='/contato' component={Contato} />
          <Route exact path='/status' component={Status} />
          <Route exact path='/sobre' component={SobreNos} />
        </Router>
      </PersistGate >
    </Provider >
  )
}

export default App;
