import React from 'react' 
import { MeshyClient } from "@meshydb/sdk"; 
import Navigation from './Navigation';

class RegisterForm extends React.Component
{
    constructor(props)
    {
        super(props); 

        this.state =  
        { 
            username: '', 
            firstName: '',
            lastName: '', 
            newPassword: '',
            phoneNumber: '',
            securityQuestions: 
            [ 
                { 
                    question: 'What was your best friends name?', 
                    answer: '' 
                }, 
                { 
                    question: 'What was the name of your first pet?', 
                    answer: '' 
                } 
            ], 
            success: null, 
            message: '' 
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleArrayChange = this.handleArrayChange.bind(this);
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
    
    handleArrayChange(event)
    {
        const target = event.target;
        const value = target.value;
        const index = target.dataset.index;
    
        var updated = this.state.securityQuestions;
    
        updated[index].answer = value;
    
        this.setState({ "securityQuestions" : updated });
    
        return true;
    }
    
    handleSubmit(event) 
    {
        MeshyClient.registerUser(this.state).then(_ => {
            this.setState({ "success" : true });
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
                <Navigation />
                <h1>User Registration</h1> 
                <p>
                    Please fill in all the required fields to create a new user account.
                </p>
                {this.state.success === false &&
                <p className="alert alert-danger" role="alert">
                    {this.state.message}
                </p>}
                {this.state.success === true &&
                <p className="alert alert-success" role="alert">
                    User successfully registered
                </p>}
                {!this.state.success &&
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="newPassword" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" placeholder="Phone Number" name="phoneNumber" onChange={this.handleChange} />
                    </div>
                    {this.state.securityQuestions.map((item, index) => (
                    <div className="form-group" key={index}>
                        <label>{item.question}</label>
                        <input type="text" className="form-control" data-index={index} placeholder="Answer" required onChange={this.handleArrayChange} />
                    </div>
                    ))}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>}
            </div> 
        ); 
    } 
 } 

export default RegisterForm;