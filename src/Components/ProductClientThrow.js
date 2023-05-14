import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";


class CPTableRow extends Component {
    constructor(props) {
        super(props);
        //  this.delete = this.delete.bind(this);
    }
    //  delete(){
    //      axios.get('http://localhost:4000/PharmacyInventory/delete/'+this.props.obj._id)
    //          .then(this.setState({redirect: true}))
    //          .catch(err => console.log(err))
    //      //this.props.history.push('/index');
    //      alert("Your Order Successfully Deleted....")
    //      window.location.replace('/inventoryView/'+this.props.obj.email);
    //  }
    render() {
        return (
           <tr>
               
               <td>
                   {this.props.obj.pName}
               </td>
               <td>
                   {this.props.obj.price}
               </td>
               <td>
                   {this.props.obj.category}
               </td>
               <td>
                   {this.props.obj.pNo}
               </td>
               <td>
                   {this.props.obj.qty}
               </td>
               <td>
                   {this.props.obj.description}
               </td>
                <td>
                <button className='btn1'><Link to={"/ProductOder/"+this.props.obj._id} className="cart">Add to cart</Link></button>
                   {/* <Link to={"/ProductOder/"+this.props.obj._id} className="btn btn-success">Buy</Link> */}
                      &nbsp;
                    {/* <button onClick={this.delete} className="btn btn-danger">Add To cart</button>  */}
               </td>  
           </tr>
        );
    }
}

export default CPTableRow;