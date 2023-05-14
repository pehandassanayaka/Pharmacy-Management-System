import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";


class task extends Component {
    constructor(props) {
        super(props);
         this.delete = this.delete.bind(this);
        this.approve = this.approve.bind(this);
    }

      delete(){
          axios.get('http://localhost:4000/attendance/tdelete/'+this.props.obj._id)
              .then(this.setState({redirect: true}))
              .catch(err => console.log(err))
          //this.props.history.push('/index');
          alert("Task Successfully Deleted....")
          window.location.replace('/taskmanagementpage/'+this.props.obj.email);
      }


    approve(){
        axios.get('http://localhost:4000/attendance/taskstatus/'+this.props.obj._id)
            .then(this.setState({redirect: true}))
            .catch(err => console.log(err))
        //this.props.history.push('/index');
        //alert("Your Payment Successfully Deleted....")
        window.location.replace('/taskmanagementpage');
    }
    

    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.taskNo}
               </td>
               <td>
                   {this.props.obj.staffid}
               </td>
               <td>
                   {this.props.obj.description}
               </td>
            
               <td>
                   {this.props.obj.status}
               </td>
    
                <td>
                    <button onClick={this.approve} className="complete">Complete</button> 
                      &nbsp;
                    <button className='complete'><Link to={"/EditTask/"+this.props.obj._id} className="completed">Update</Link></button> 
                   
                    <button onClick={this.delete} className="complete">Delete</button> 
               </td>  
           </tr>
        );
    }
}

export default task;