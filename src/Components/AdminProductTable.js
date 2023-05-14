/* eslint-disable react/jsx-no-undef */
import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
 import "../Styles/VehicleTable.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AdminProductTableRow from "./AdminProductTableRow";
import Footer from "../Components/Footer";


export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Product: [],
			search: "",
			email: this.props.match.params.id,
		};
		// this.state.Station = this.props.match.params.id;

		this.onChangeSearch = this.onChangeSearch.bind(this);
	}

	onChangeSearch(e) {
		this.setState({
			search: e.target.value,
		});
	}

	componentDidMount() {
		
		axios.get('http://localhost:4000/PharmacyInventory/getall/')
			.then((response) => {
				// alert('Pass una')

				this.setState({ Product: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	tabRow() {
		return this.state.Product.map(function (object, i) {
			return <AdminProductTableRow obj={object} key={i} />;
		});
		
	}

	exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "My Oder Report";
        const headers = [["Product Name", "price","category", "product Number","qty","description"]];
    
        const data = this.state.Product.map(elt=> [elt.pName, elt.price,  elt.category,elt.pNo, elt.qty, elt.description]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }

	render() {
		return (
		<div className="root">
		<div className="header">
			<p>Manage Product Page</p>
		</div>
			<div className='adminVehicleProfile'>
			
				<br /> <h3 align='center'>Product Management</h3>
				<div className='row-frm'>
					<table className='table table-striped' style={{ marginTop: 20 }}>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Product No</th>
								<th>QTY</th>
								<th>Description</th>


								 <th colSpan='3'>Action</th> 
							</tr>
						</thead>
						 <tbody>{this.tabRow()}</tbody> 
					</table>
					<center>
                        <button onClick={() => this.exportPDF()}style={{background:'blue',padding:10, color:'white', border:'none',borderRadius:'20'}}>- Export All -</button>
                    </center>
				</div>
				<br />
				<br />
				<div>
					<hr className='shadow-lg card-footer' />
				</div>
			
			
			</div>
			<Footer/>
		</div>
		);
	}
}
