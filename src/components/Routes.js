import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login'
import Register from '../pages/Register';
import Kitchen from '../pages/Kitchen';
import Salon from '../pages/Salon';
import Pagina404 from '../pages/Pagina404';
import PaginaPedidos from '../pages/PaginaPedidos';
import Andamento from "../pages/Andamento";
import Pronto from "../pages/Pronto";
import Entregue from "../pages/Entregue";

const PrivateRoute = ({component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => 
          localStorage.getItem("token") ? (
            <Component { ...props} />
          ) : (
            <Redirect to={{pathname: "/", state: { from: props.location } }} />
          )
        }
    />
);

function Routes() {

    return (
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/cozinha" component={Kitchen}/>
            <PrivateRoute path="/salao" component={Salon}/>
            <PrivateRoute path="/pedidos/:mesa" component={PaginaPedidos} />
            <PrivateRoute path="/andamento" component={Andamento} />
            <PrivateRoute path="/pronto" component={Pronto} />
            <PrivateRoute path="/entregue" component={Entregue} />

            <PrivateRoute component={Pagina404}/>
        </Switch>
   
    );
}
  
export default Routes;
