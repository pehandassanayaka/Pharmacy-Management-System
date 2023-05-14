import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";



class ATableRow extends Component {
    constructor(props) {
        super(props);
        //  this.delete = this.delete.bind(this);
        this.approve = this.approve.bind(this);
    }
    //  delete(){
    //      axios.get('http://localhost:4000/attendance/delete/'+this.props.obj._id)
    //          .then(this.setState({redirect: true}))
    //          .catch(err => console.log(err))
    //      //this.props.history.push('/index');
    //      alert("Your Order Successfully Deleted....")
    //      window.location.replace('/manageattendancepage/'+this.props.obj.email);
    //  }

     approve(){
        axios.get('http://localhost:4000/attendance/attendance/'+this.props.obj._id)
            .then(this.setState({redirect: true}))
            .catch(err => console.log(err))
        //this.props.history.push('/index');
        //alert("Your Payment Successfully Deleted....")
        window.location.replace('/manageattendancepage');
    }
    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.staffid}
               </td>
               <td>
                   {this.props.obj.name}
               </td>

             
               <td>
                   {this.props.obj.status}
               </td>
              
              
                <td>
                   {/* <Link to={"/editproductform/"+this.props.obj._id} className="btn btn-success">edit</Link>
                      &nbsp; */}
                    <button onClick={this.approve} className="Delete">Complete</button> 
               </td>  
           </tr>
        );
    }
}

export default ATableRow;