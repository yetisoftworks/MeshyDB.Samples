import React from 'react';
import Home from './Home';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from "react-router-dom";
import { MeshyClient } from "@meshydb/sdk";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logout from './Logout'; 

const account = '<!-- your account name -->';
const publicKey = '<!-- your public key -->';

function App() 
{
  MeshyClient.initialize(account, publicKey);

  return (
    <Router>
      <Switch>
          <PrivateRoute exact path="/">  
            <Home /> 
          </PrivateRoute>
          <Route path="/register"> 
            <RegisterForm />
          </Route> 
          <Route path="/login">  
            <LoginForm />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, ...rest }) => { 
  return ( 
        <Route {...rest}
                render={({ location })=> 
                MeshyClient.currentConnection != null ? ( 
                  children 
                ) : ( 
            <Redirect to={{
              pathname: "/login",
              state: { from: location }
            }} />
        ) 
      } 
    /> 
  ); 
}; 

export default App;
