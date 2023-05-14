import React, { Component } from "react";
import "../Styles/AddProductForm.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import logo from "../images/logo.png";

import axios from 'axios';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Footer from "../Components/Footer";


export default class AddProductForm extends Component{

    constructor(props) {
        super(props);
        this.onChangepName = this.onChangepName.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onChangepNo = this.onChangepNo.bind(this);
        this.onChangeqty = this.onChangeqty.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pName: '',
            price: '',
            category:'',
            pNo:'',
            qty:'',
            description:''
            
        
        }
    }
    onChangepName(e){
        this.setState( {
            pName: e.target.value
        });
    }
    onChangeprice(e){
        this.setState( {
            price: e.target.value
        });
    }
    onChangecategory(e){
        this.setState( {
            category: e.target.value,
        });
    }
    onChangepNo(e){
        this.setState( {
            pNo: e.target.value
        });
    }
    onChangeqty(e){
        this.setState( {
            qty: e.target.value
        });
    }
    onChangedescription(e){
        this.setState( {
            description: e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();
        const obj = {
            pName : this.state.pName,
            price : this.state.price,
            category : this.state.category,
            pNo : this.state.pNo,
            qty : this.state.qty,
            description : this.state.description
           
        };

            if(this.state.price.length > 0){
                if(this.state.qty.length >= 0){
                    if(this.state.description.length > 10){
                      
                            axios.post('http://localhost:4000/PharmacyInventory/add',obj)
                                .then(res => {
                                    alert("add Successfully");
                                    this.setState({
                                        pName: '',
                                        price: '',
                                        category:'',
                                        pNo:'',
                                        qty:'',
                                        description:''
                            
                                    })
                                    console.log(res.data)});
                            this.props.history.push('/');
                        
                    } 
                    else {
                        alert('Enter More than 10 caractors');
                    }
                }
                else{
                    alert('Invalid Stock number.. Pleace enter more than 1 digits.');
                }
            } 
            else {
                alert('Pleace enter valid price');
            }
        
    }



render() {
    return(
        <>
   <div className="header1">
    <p>Add Product Page</p>
     </div> 
		
        <div className='AddProductForm'> 
          	<div className='left-sidebar'>
					<img src={logo} alt='' className='header-logo' />
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/producthomepage'>Product</a>
						</div>
					</div>
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/addproductform'>Add Product</a>
						</div>
					</div>
					<div className='component-name farmer'>
						<div className='text'>
							<a href='/attendence'> Attendance</a>
						</div>
					</div>
					<div className='component-name vendor'>
						<div className='text'>
							<a href='/paymentViewtable'> Payment</a>
						</div>
					</div>
					<div className='component-name products'>
						<div className='text'>
							<a href='/paymentViewtable'> Payment History</a>
						</div>
					</div>
					<div className='component-name clients'>
						<div className='text'>
							<a href='/AdminProductTable'>Product Admin</a>{" "}
						</div>
					</div>
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/taskmanagementpage'>Task</a>
						</div>
					</div>
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/dashboard'> Dashboard</a>
						</div>
					</div>
						<div className='component-name dashboard'>
						<div className='text'>
							<a href='/clienttaskpage'> ClientTaskManagement</a>
						</div>
					</div>
				</div>
            <div className='right-side'>
                <h2>Add Product Form</h2>
                <form onSubmit={this.onSubmit}>
                <table className="table">
                    <tr >
                        <td>Product Catagory </td>
                        <td>Product Name </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="" id="" required value={this.state.category} onChange = {this.onChangecategory}>
                                <option value='Personal Care Products'>Personal Care Products</option>
                                <option value='Herbal and Natural Remedies'>Herbal and Natural Remedies</option>
                                <option value='Vaccines'>Vaccines</option>
                                <option value='Beauty Products'>Beauty Products</option>
                           
                            </select>
                    
                        </td>
                        <td>
                            <input type="text" required value={this.state.pName} onChange = {this.onChangepName}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Product No</td>
                        <td>Product Price</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" required value={this.state.pNo} onChange = {this.onChangepNo}></input>         
                        </td>
                        <td>
                            <input type="text" required value={this.state.price} onChange = {this.onChangeprice}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" required value={this.state.qty} onChange = {this.onChangeqty}></input>
                        </td>
                    </tr>
           
                    <tr>
                        <td>Description</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" required value={this.state.description} onChange = {this.onChangedescription}></input>
                        </td>
                    </tr>
                    <tr>
                         <td>
                            <button type="submit">Add Product</button>
                        </td>
                    </tr>
                </table>
                <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                </form>
             
            </div>
           
            <Footer />
        </div>
        </>
);
    }
}









    
