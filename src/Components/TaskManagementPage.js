import React, { Component } from "react";
import logo from "../images/logo.png";
import "../Styles/TaskManagementPage.css";
import "../Styles/Header.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import TableRow from "./taskManagementRow";
import "../Styles/LeftSidebar.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Footer from "../Components/Footer";

export default class taskHomePage extends Component {
	constructor(props) {
		super(props);
		this.state = { task: [], search: "" };
		this.state.Station = this.props.match.params.id;

		this.onChangeSearch = this.onChangeSearch.bind(this);
	}

	onChangeSearch(e) {
		this.setState({
			search: e.target.value,
		});
	}

	getAttendanceCount(status) {
        return this.state.task.filter((task) => task.status === status).length;
      }
      

	componentDidMount() {
		// alert('email is ' +this.props.match.params.id);
		axios
			.get("http://localhost:4000/attendance/tgetall/")
			.then((response) => {
				// //  alert('Pass una')
				// alert('Data Tika :'+response.data)
				this.setState({ task: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	tabRow() {
		return this.state.task.map(function (object, i) {
			return <TableRow obj={object} key={i} />;
		});
		// return <OrderTableRow obj={this.state.orders}/>
	}

	exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape
		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);
		doc.setFontSize(15);
		const title = "task Report";
		const headers = [["taskNo", "staffid", "description", "status"]];
		const data = this.state.task.map((elt) => [
			elt.taskNo,
			elt.staffid,
			elt.description,
			elt.status,
		]);
		let content = {
			startY: 50,
			head: headers,
			body: data,
		};
		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("report.pdf");
	};

	render() {
		const completeCount = this.getAttendanceCount("Done");
        const pendingCount = this.getAttendanceCount("pending");
		return (
			<div className="root">
				<div className="header4">
					<p>Manage Task Page</p>
				</div>
		
			<div className='TaskManagementPage'>
				<div className='left-sidebar'>
					<img src={logo} alt='' className='header-logo' />
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/producthomepage'>Product</a>
						</div>
					</div>
					<div className='component-name farmer'>
						<div className='text'>
							<a href='/farmer'> Attendance</a>
						</div>
					</div>
					<div className='component-name vendor'>
						<div className='text'>
							<a href='/vendor'> Payment</a>
						</div>
					</div>
					<div className='component-name products'>
						<div className='text'>
							<a href='/product'> Payment History</a>
						</div>
					</div>
					<div className='component-name clients'>
						<div className='text'>
							<a href='/client'>Product Admin</a>{" "}
						</div>
					</div>
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/dashboard'>Task</a>
						</div>
					</div>
					<div className='component-name dashboard'>
						<div className='text'>
							<a href='/dashboard'> Dashboard</a>
						</div>
					</div>
				</div>
				<div className='right-side'>
					<h2>Task Management</h2>
					<div className='row-frm'>
						<table className='table1'>
							<tr>
								{/* <td>
									<p>Today Allocated Task</p>
									<p>20</p>
								</td> */}
								<td>
									<p>Completed Task</p>
									<p>{completeCount}</p>
								</td>
								<td>
									<p>Remaining Task</p>
									<p>{pendingCount}</p>
								</td>
							</tr>
						</table>
						<form onSubmit={this.onSubmit}>
							<table className='table2'>
								<tr>
									<td>Search Staff Id</td>
									<td>
										<input
											type='text'
											placeholder='Search...'
											required
											value={this.state.search}
											onChange={this.onChangeSearch}
										/>
									</td>
									<td>
										<button type='submit' className='search'>
											<a
												href={"/taskSearch/" + this.state.search}
												className='link2'>
												Search
											</a>
										</button>
									</td>
								</tr>
							</table>
						</form>
						<p className='ptag'>Today Allocated Tasks for Employees</p>
						<table className='table3'>
							<tr>
								<th>Task No</th>
								<th>Staff Id</th>
								<th>Details</th>
								<th>Status</th>

								<th colSpan='5'>Action</th>
							</tr>
							{this.tabRow()}
						</table>
						{/* <button className="addtask" >Add Task</button> */}
						<button className='addtask' type='submit'>
							{" "}
							<a href={"/taskallocationpage"}>Add Task</a>
						</button>
						<table className='table4'>
							<tr>
								<td>Generate Task Report</td>
								<td>
									<button onClick={() => this.exportPDF()} className="task-report">Task Report</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
				
			</div>
			<Footer />
		</div>
		);
	}
}
