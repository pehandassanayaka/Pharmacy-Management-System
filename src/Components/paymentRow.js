import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";


class PTableRow extends Component {
    constructor(props) {
        super(props);
          this.delete = this.delete.bind(this);
    }
      delete(){
          axios.get('http://localhost:4000/payment/cusdeletepayment/'+this.props.obj._id)
              .then(this.setState({redirect: true}))
              .catch(err => console.log(err))
          //this.props.history.push('/index');
          alert(" Successfully Deleted....")
        //   window.location.replace('/paymentViewtable/'+this.props.obj.email);
        window.location.replace('/paymentViewtable');
      }
    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.fname}
               </td>
               <td>
                   {this.props.obj.lname}
               </td>
              
               <td>
                   {this.props.obj.amount}
               </td>
               <td>
                   {this.props.obj.cardnumber}
               </td>
              
              
               <td>
                   {this.props.obj.status}
               </td>
           
                 <td>
                   <button className="btn btn-primary"><Link to={"/EditPayment/"+this.props.obj._id} >edit</Link></button>
                   &nbsp;
                    <button onClick={this.delete} className="payment">Detele</button> 
                 
                    {/* <Link to={"/paymentpage/"+this.props.obj._id} className="btn btn-success">pay</Link> */}
               </td>   *
           </tr>
        );
    }
}

export default PTableRow;