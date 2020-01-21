import React from 'react' 
import { Navbar, Nav } from 'react-bootstrap';
import IntegrationCheck from './IntegrationCheck';
import { MeshyClient } from "@meshydb/sdk"; 

class Navigation extends React.Component
{    
    constructor(props){
        super(props);
    
        this.state = { 
            authenticated: (MeshyClient.currentConnection != null) 
        }; 
    }

    render()
    {
        return ( 
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img src="https://cdn.meshydb.com/images/logo-blue-no-text.png" width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;
                    MeshyDB React Sample
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {this.state.authenticated && 
                        <Nav.Link href="/">Home</Nav.Link>}
                        {this.state.authenticated &&  
                        <Nav.Link href="/tasks">Tasks</Nav.Link>} 
                        {!this.state.authenticated && 
                        <Nav.Link href="/register">Register</Nav.Link>} 
                        {this.state.authenticated &&  
                        <Nav.Link href="/logout">Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <IntegrationCheck />
        </div>
        );
    }
 } 

 export default Navigation;
