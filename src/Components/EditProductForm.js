import React, { Component } from "react";
import "../Styles/EditProductForm.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Footer from "../Components/Footer";


export default class EditProductForm extends Component{

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

    componentDidMount() {
        // alert('edit id ' +this.props.match.params.id);
        axios.get('http://localhost:4000/PharmacyInventory/iedit/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    pName: res.data.pName,
                    price: res.data.price,
                    category: res.data.category,
                    pNo: res.data.pNo,
					qty: res.data.qty,
					description: res.data.description,
					
                   
                });
            })
            .catch(function (error){
                console.log("Can't Get Data");
            })
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
                      
                        axios.post('http://localhost:4000/PharmacyInventory/update/'+this.props.match.params.id,obj)
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
                            this.props.history.push('/AdminProductTable');
                        
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
        <div className="root"> 
            <div className="headerEditProduct">
                <p>Edit Product Page</p>
            </div>
       
        <div className='EditProductForm'> 
            <div className='left-sidebar'>
                <div className='component-name dashboard'>
				    <div className='text'>
						<a href='/dashboard'> Dashboard</a>
					</div>
				</div>
				<div className='component-name farmer'>
					<div className='text'>
						<a href='/farmer'> Farmer</a>
					</div>
				</div>
				<div className='component-name vendor'>
					<div className='text'>
						<a href='/vendor'> Vendor</a>
					</div>
				</div>
				<div className='component-name products'>
					<div className='text'>
						<a href='/product'> Products</a>
					</div>
				</div>
				<div className='component-name clients'>
					<div className='text'>
					    <a href='/client'>Clients</a>{" "}
					</div>
				</div>
				<div className='component-name dashboard'>
					<div className='text'>
						<a href='/dashboard'> Dashboard</a>
					</div>
				</div>
				<div className='component-name dashboard'>
					<div className='text'>
						<a href='/dashboard'> Dashboard</a>
					</div>
			    </div>
            </div>  
            <div className='right-side'>
                <h2>Edit Product Form</h2>
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
                            <button type="submit">Update Product</button>
                        </td>
                    </tr>
                </table>
                </form>
            </div>
            
            <Footer/>
            </div>
       </div>
);
    }
}









    
