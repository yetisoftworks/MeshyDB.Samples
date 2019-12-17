import React from 'react'  
import { MeshyClient } from "@meshydb/sdk";  
import Navigation from './Navigation'; 
import { Redirect } from "react-router-dom"; 

class LoginForm extends React.Component 
{ 
    constructor(props) 
    { 
        super(props);  

        this.state = 
        { 
            success: null, 
            message: '' 
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    handleChange(event)  
    { 
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value; 
        const name = target.name; 

        this.setState({ [name]: value }); 

        return true; 
    } 

    handleSubmit(event)
    {
        MeshyClient.login(this.state.username, this.state.password).then(_=> { 
              this.setState({ "success": true }); 
        }).catch(e=>{ 
              this.setState({ "message" : e.response.error_description }); 
              this.setState({ "success" : false }); 
        }); 
    
        event.preventDefault(); 
    }

    render() 
    {  
        return (  
            <div> 
                {this.state.success &&  
                <Redirect to="/" />}
                <Navigation />
                <div className="row"> 
                    <div className="col-lg-8 offset-lg-2">  
                        {this.state.success === false && 
                        <p className="alert alert-danger" role="alert"> 
                            {this.state.message} 
                        </p>} 
                        {!this.state.success && 
                        <div> 
                            <form onSubmit={this.handleSubmit}> 
                                <h2 className="text-center">Log in</h2>        
                                <div className="form-group"> 
                                    <input type="text" className="form-control" placeholder="Username" name="username" required onChange={this.handleChange} />
                                </div> 
                                <div className="form-group"> 
                                    <input type="password" className="form-control" placeholder="Password" name="password" required onChange={this.handleChange} />
                                </div> 
                                <div className="form-group"> 
                                    <button type="submit" className="btn btn-primary btn-block">Log in</button> 
                                </div>         
                            </form> 
                        </div>}
                    </div>  
                </div> 
            </div>
        );  
    }  
 }  

export default LoginForm;