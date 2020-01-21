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
import ForgotPassword from './ForgotPassword';
import TaskList from './TaskList';  
import TaskEntry from './TaskEntry'; 

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
          <Route path="/forgotpassword">  
            <ForgotPassword />
          </Route>
          <PrivateRoute exact path="/tasks">   
              <TaskList />
          </PrivateRoute> 
          <PrivateRoute exact path="/tasks/create">   
              <TaskEntry />
          </PrivateRoute>
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
