import React from 'react';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { MeshyClient } from "@meshydb/sdk";
import RegisterForm from './RegisterForm';

const account = '<!-- your account name -->';
const publicKey = '<!-- your public key -->';

function App() 
{
  MeshyClient.initialize(account, publicKey);

  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register"> 
            <RegisterForm />
          </Route> 
      </Switch>
    </Router>
  );
}

export default App;
