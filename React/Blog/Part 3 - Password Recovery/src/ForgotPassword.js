import React from 'react'  
import { MeshyClient } from "@meshydb/sdk";  
import Navigation from './Navigation'; 
import { Redirect } from "react-router-dom"; 

class ForgotPassword extends React.Component 
{ 
    constructor(props) 
    { 
        super(props);  

        this.state = 
        { 
            success: null, 
            message: '' ,
            username: '',
            expires: '',
            hint: '',
            hash:'',
            newPassword: '',
            verificationCode: '',
            done: false,
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this);
        this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
    }  

    handleChange(event)  
    { 
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value; 
        const name = target.name; 

        this.setState({ [name]: value }); 

        return true; 
    } 

    handleForgotPasswordSubmit(event)
    {
        MeshyClient.forgotPassword(this.state.username).then((x) => { 
            this.setState({ "success": true }); 
            this.setState({ "expires": x.expires});
            this.setState({ "hint": x.hint});
            this.setState({ "hash": x.hash});
        }).catch(e=>{ 
            this.setState({ "message" : e.response.message }); 
            this.setState({ "success" : false }); 
        }); 
                
        event.preventDefault(); 
    }

    handleResetPasswordSubmit(event)
    {
        MeshyClient.resetPassword(this.state).then(_ => { 
            this.setState({ "success": true }); 
            this.setState({ "done": true }); 
        }).catch(e=>{ 
            this.setState({ "message" : e.response.message }); 
            this.setState({ "success" : false }); 
        }); 
                
        event.preventDefault(); 
    }

    render() 
    {  
        return (  
            <div> 
                {this.state.done === true &&
                <Redirect to="/login?reset=true" />}
                <Navigation />
                <div className="row"> 
                    <div className="col-lg-8 offset-lg-2">  
                        {this.state.success === false && 
                        <p className="alert alert-danger" role="alert"> 
                            {this.state.message} 
                        </p>}
                        <div> 
                            <h2 className="text-center">Password Reset</h2>
                            {this.state.hash === '' &&
                            <form onSubmit={this.handleForgotPasswordSubmit}> 
                                <div className="form-group"> 
                                    <input type="text" className="form-control" placeholder="Enter your username" name="username" required onChange={this.handleChange} />
                                </div> 
                                <div className="form-group"> 
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button> 
                                </div>        
                            </form>}
                            {this.state.hash !== '' &&
                            <form onSubmit={this.handleResetPasswordSubmit}> 
                                <div className="form-group"> 
                                    <input type="text" className="form-control" placeholder={this.state.hint} name="verificationCode" required onChange={this.handleChange} />
                                </div> 
                                <div className="form-group"> 
                                    <input type="password" className="form-control" placeholder="New password" name="newPassword" required onChange={this.handleChange} />
                                </div> 
                                <div className="form-group"> 
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button> 
                                </div>         
                            </form>}
                        </div>
                    </div>  
                </div> 
            </div>
        );  
    }  
 }  

export default ForgotPassword;