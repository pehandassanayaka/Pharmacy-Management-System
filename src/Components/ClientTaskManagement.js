import React, { Component } from "react";
import logo from "../images/logo.png";
import "../Styles/ClientTaskManagement.css";
import "../Styles/Header.css";
// import "../Styles/ProductHomePage.css";
import {BrowserRouter as Router, Link} from "react-router-dom";
 import TableRow from './ClienttaskRow';
import "../Styles/LeftSidebar.css";
 import "../Styles/VehicleTable.css";
 import Footer from "../Components/Footer";

import axios from 'axios';

export default class taskHomePage extends Component {

		   
    constructor(props) {
        super(props);
        this.state = {task : [], search:''};
        this.state.Station = this.props.match.params.id;

         this.onChangeSearch = this.onChangeSearch.bind(this);
    }
    getAttendanceCount(status) {
        return this.state.task.filter((task) => task.status === status).length;
      }
      

    onChangeSearch(e){
        this.setState( {
           search: e.target.value
        });

    }

    componentDidMount() {
        // alert('email is ' +this.props.match.params.id);
        axios.get('http://localhost:4000/attendance/tgetall/')
            .then(response => {
                // //  alert('Pass una')
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

        const completeCount = this.getAttendanceCount("Done");
        const allocateCount = this.getAttendanceCount("pending");

		return (
            <>
            <div className="header4">
                <p>Staff Tasks Page</p>
            </div>
			<div className='ClientTaskManagement'>
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
                    <table className="table1">
                            <tr>
                                <td>
                                    <p>Today Allocated Tasks</p>
                                    <p>{allocateCount}</p>
                                 </td>
                                 <td>
                                    <p>Completed Tasks</p>
                                    <p>{completeCount}</p>
                                 </td>
                              
                            </tr> 
                        </table>   
                    
                        <table className="table2">
                      
                   <h1><p className="ptag">Today Allocated Tasks</p> </h1>     
                            
                        </table>
                      
                      
                    
                        <table className='table table-striped table2' style={{ marginTop: 20 }}>
                            <tr>
                                <th>Task No</th>
                                <th>Staff Id</th>
                                <th>Details</th>
                                <th>Status</th>
                              
                                <th colSpan='2'>Action</th> 
                            </tr>
                            {this.tabRow()}
                        </table>
                       

					
				</div>
                       

					
				
                     
                   
				</div>
                <Footer />
			</div>
        </>
		);
	}
}
