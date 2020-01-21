import React from 'react'; 
import { MeshyClient } from "@meshydb/sdk"; 
import Navigation from './Navigation'; 
import { Link, withRouter } from "react-router-dom";  
import queryString from 'query-string';

class TaskList extends React.Component  
{ 
    constructor(props)  
    { 
        super(props); 

        //constructor 
        const query = this.props.location ? queryString.parse(this.props.location.search) : {}; 
        
        this.state =  
        {  
            message: query.created === "true" ? 'Task created successfully' : '' 
        }; 
    } 

    render()  
    { 
        return ( 
            <div> 
                <Navigation />
                {this.state.message &&  
                <p className="alert alert-info" role="alert">  
                {this.state.message}  
                </p>} 
                <div className="row"> 
                    <div className="col-sm-12"> 
                        <Link to="/tasks/create" className="btn btn-secondary float-right">+ Add Task</Link> 
                    </div> 
                </div> 
            </div> 
        ); 
    } 
}

export default withRouter(TaskList);