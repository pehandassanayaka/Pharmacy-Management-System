import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";


class TableRow extends Component {
    constructor(props) {
        super(props);
         this.delete = this.delete.bind(this);
    }
     delete(){
         axios.get('http://localhost:4000/PharmacyInventory/odelete/'+this.props.obj._id)
             .then(this.setState({redirect: true}))
             .catch(err => console.log(err))
         //this.props.history.push('/index');
         alert("Your Order Successfully Deleted....")
         window.location.replace('/cart/'+this.props.obj.email);
     }
    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.pName}
               </td>
               <td>
                   {this.props.obj.category}
               </td>
               {/* <td>
                   {this.props.obj.pieces}
               </td> */}
               <td>
                   {this.props.obj.total}
               </td>
             
           
                <td>
                   {/* <Link to={"/editOder/"+this.props.obj._id} className="btn btn-success">edit</Link> */}
                      &nbsp;
                    <button onClick={this.delete} className="btn btn-danger">Detele</button> 
                    &nbsp;
                    <button className="payment"> <Link to={"/paymentpage/"+this.props.obj._id} className="btn btn-success">pay</Link></button> 
               </td>  
           </tr>
        );
    }
}

export default TableRow;