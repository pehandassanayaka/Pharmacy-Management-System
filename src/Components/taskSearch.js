import React, { Component } from "react";
import logo from "../images/logo.png";
import "../Styles/ProductHomePage.css";
import "../Styles/Header.css";
import {BrowserRouter as Router, Link} from "react-router-dom";
import TableRow from './taskManagementRow';
import "../Styles/LeftSidebar.css";
import "../Styles/VehicleTable.css";
import axios from 'axios';
import Footer from "../Components/Footer";

export default class ProductHomePage extends Component {

		   
    constructor(props) {
        super(props);
        this.state = { task: [] };
    }

    onChangeSearch(e){
        this.setState( {
           search: e.target.value
        });

    }

    componentDidMount() {
        // alert('email is ' +this.props.match.params.id);
        axios.get('http://localhost:4000/attendance/tsearch/'+this.props.match.params.pathParam1)
            .then(response => {
                // alert('Pass una')
                // alert('Data Tika :'+response.data)
                this.setState({task : response.data});

            })
            .catch(function (error){
                console.log(error);
            })
    }

    tabRow(){
        return this.state.task.map(function (object, i){
            return <TableRow obj = {object} key = {i}/>;
        });
        // return <OrderTableRow obj={this.state.orders}/>
    }

 

	render() {
		return (
			<div className="root">
				<div className="header4">
					<p>Searched Task Page</p>
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
								<td>
									<p>Today Allocated Task</p>
									<p>20</p>
								</td>
								<td>
									<p>Completed Task</p>
									<p>2</p>
								</td>
								<td>
									<p>Remaining Task</p>
									<p>18</p>
								</td>
							</tr>
						
						</table>
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
