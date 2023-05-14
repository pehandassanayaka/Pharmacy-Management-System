/* eslint-disable react/jsx-no-undef */
import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import "../Styles/VehicleTable.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import TableRow from "./cartRow";
import Footer from "../Components/Footer";

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
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
		
		axios.get('http://localhost:4000/PharmacyInventory/ogetall/')
			.then((response) => {
				// alert('Pass una')

				this.setState({ orders: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	tabRow() {
		return this.state.orders.map(function (object, i) {
			return <TableRow obj={object} key={i} />;
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
         const headers = [["Product Name", "category","pieces", "total","status"]];
         const data = this.state.orders.map(elt=> [elt.pName, elt.category,  elt.pieces,elt.total, elt.status]);
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
				<p>Manage Cart</p>
			 </div >
			<div className='adminVehicleProfile'>
			
				<br /> <h3 align='center'>Cart Management</h3>
				<div className='row-frm'>
					<table className='table table-striped' style={{ marginTop: 20 }}>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Category</th>
								{/* <th>pieces</th> */}
								<th>total</th>
							


								 <th colSpan='2'>Action</th> 
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
				<Footer />
			</div>
		);
	}
}
