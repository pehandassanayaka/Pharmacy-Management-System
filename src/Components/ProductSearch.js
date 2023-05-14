import React, { Component } from "react";
import logo from "../images/logo.png";
import "../Styles/ProductHomePage.css";
import "../Styles/Header.css";
import {BrowserRouter as Router, Link} from "react-router-dom";
 import ProductTableSerach from './ProductClientThrow.js';
import "../Styles/LeftSidebar.css";
import "../Styles/VehicleTable.css";
import Footer from "../Components/Footer";
import axios from 'axios';

export default class ProductHomePage extends Component {

		   
    constructor(props) {
        super(props);
        this.state = { product: [] };
    }

    onChangeSearch(e){
        this.setState( {
           search: e.target.value
        });

    }

    componentDidMount() {
        // alert('email is ' +this.props.match.params.id);
        axios.get('http://localhost:4000/PharmacyInventory/search/'+this.props.match.params.pathParam1)
            .then(response => {
                // alert('Pass una')
                // alert('Data Tika :'+response.data)
                this.setState({product : response.data});

            })
            .catch(function (error){
                console.log(error);
            })
    }

    tabRow(){
        return this.state.product.map(function (object, i){
            return <ProductTableSerach obj = {object} key = {i}/>;
        });
        // return <OrderTableRow obj={this.state.orders}/>
    }

 


	render() {
		return (
			<div>
				<div className="header1">
					<p> Searched Product Page</p>
				</div>
			
			<div className='ProductHomePage'>
				<div className='left-sidebar'>
					<img src={logo} alt='' className='header-logo' />
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
					<h2>Inventory Management</h2>
                   
					<p className='list'>Product List</p>
				
				  
					<div className='row-frm '>
					<table className='table table-striped table2' style={{ marginTop: 20 }}>
						<thead>
							<tr>
								<th>Item Name</th>
								<th>Item Price</th>
								<th>Item Category</th>
								<th>Product No</th>
								<th>Quantity</th>
								<th>Description</th>

								<th colSpan='3'>Action</th>
							</tr>
						</thead>
						<tbody>{this.tabRow()}</tbody>
					</table>
					
				</div>
    
                   
				</div>
				<Footer />
			</div>
			</div>
		);
	}
}
