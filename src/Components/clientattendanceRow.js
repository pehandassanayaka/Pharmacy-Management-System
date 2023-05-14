import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";


class ACTableRow extends Component {
    constructor(props) {
        super(props);
        //  this.delete = this.delete.bind(this);
        this.approve = this.approve.bind(this);
    }
   

     approve(){
        axios.get('http://localhost:4000/attendance/attendance/'+this.props.obj._id)
            .then(this.setState({redirect: true}))
            .catch(err => console.log(err))
        //this.props.history.push('/index');
        //alert("Your Payment Successfully Deleted....")
        window.location.replace('/clienttaskpage');
    }
    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.day}
               </td>
               

             
               <td>
                   {this.props.obj.status}
               </td>
              
              
                <td>
                   {/* <Link to={"/editproductform/"+this.props.obj._id} className="btn btn-success">edit</Link>
                      &nbsp; */}
                    {/* <button onClick={this.approve} className="delete">Complete</button>  */}
               </td>  
           </tr>
        );
    }
}

export default ACTableRow;