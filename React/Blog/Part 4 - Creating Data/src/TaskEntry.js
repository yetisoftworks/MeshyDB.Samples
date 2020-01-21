import React from 'react'; 
import { MeshyClient } from "@meshydb/sdk"; 
import Navigation from './Navigation';  
import { Link, Redirect } from "react-router-dom"; 
 
class TaskEntry extends React.Component  
{ 
    constructor(props)  
    {  
        super(props);   
 
        this.state =  
        {  
            success: null,  
            message: '',
            title: '', 
            description: '', 
            dueDate: null, 
            done: false, 
            owner: MeshyClient.currentConnection.currentUser.id 
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
            //copy state to new object, prevent saving of other state variables (i.e message & success)
            var task = {
                title: this.state.title, 
                description: this.state.description, 
                dueDate: this.state.dueDate, 
                done: this.state.done, 
                owner: this.state.owner 
            };

            MeshyClient.currentConnection.meshesService.create("task", task).then(_ => { 
                this.setState({ "success" : true });  
            }).catch(e=> {  
                this.setState({ "message" : e.response.message });
                this.setState({ "success" : false });  
            }); 
            event.preventDefault();  
    } 

    render()  
    { 
        return ( 
            <div> 
                {this.state.success &&   
                <Redirect to="/tasks?created=true" />}  
                <Navigation />
                {this.state.success === false &&  
                    <p className="alert alert-danger" role="alert">  
                    {this.state.message}  
                </p>} 
                <div className="row"> 
                    <div className="col-12"> 
                        <Link to="/tasks" className="btn btn-secondary float-right">Cancel</Link> 
                        <form onSubmit={this.handleSubmit}>  
                            <h2 className="text-center">Task Entry Form</h2>  
                            <div className="form-group">  
                                <input type="text" className="form-control" placeholder="Title" name="title" required onChange={this.handleChange} />
                            </div>  
                            <div className="form-group">  
                                <input type="text" className="form-control" placeholder="Description" name="description" required onChange={this.handleChange} />
                            </div>  
                            <div className="form-group">  
                                <input type="date" className="form-control" placeholder="Due Date" name="dueDate" required onChange={this.handleChange} />
                            </div>  
                            <div className="form-check"> 
                                <input type="checkbox" className="form-check-input" id="done" name="done" onChange={this.handleChange} />
                                <label className="form-check-label" htmlFor="done"> 
                                Done 
                                </label> 
                            </div> 
                            <hr />
                            <button type="submit" className="btn btn-primary btn-block">Save</button>    
                        </form> 
                    </div> 
                </div> 
            </div> 
        ); 
    } 
} 
 
export default TaskEntry; 