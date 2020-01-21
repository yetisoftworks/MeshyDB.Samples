import React from 'react'  
import { MeshyClient } from "@meshydb/sdk";  
import { Redirect } from 'react-router-dom' 
  
class Logout extends React.Component 
{ 
    constructor(props) 
    { 
        super(props);  
  
        this.state = { 
            success: null 
        }; 
    } 
     
    componentDidMount() 
    { 
        if(MeshyClient.currentConnection != null) 
            MeshyClient.currentConnection.signout(); 
  
        this.setState({"success": true}); 
    } 
  
    render() 
    { 
        if(!this.state.success) 
            return (<div>signing out...</div>); 
        else 
            return (<Redirect to='/' />); 
    }  
 }  

 export default  Logout; 