import React, { Component } from "react";
import "../Styles/ManageAttendancePage.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import AdminAtendaceRow from "./AdminAtendaceRow";
import Footer from "../Components/Footer";
import logo from "../images/logo.png";


export default class ManageAttendancePage extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     attendance: [],
        //     search: "",
        //     email: this.props.match.params.id,
        // };

        this.state = { attendance: [], search: '' };
        // this.state.Station = this.props.match.params.id;

        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    getAttendanceCount(status) {
        return this.state.attendance.filter((attendance) => attendance.status === status).length;
      }
      

    onChangeSearch(e) {
        this.setState({
            search: e.target.value,
        });
    }

    componentDidMount() {

        axios.get('http://localhost:4000/attendance/getall/')
            .then((response) => {
                // alert('Pass una')

                this.setState({ attendance: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    tabRow() {
        return this.state.attendance.map(function (object, i) {
            return <AdminAtendaceRow obj={object} key={i} />;
        });

    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "attendance Report";
        const headers = [["staffid", "name", "status", "day"]];

        const data = this.state.attendance.map(elt => [elt.staffid, elt.name, elt.status, elt.day]);

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
         const presentCount = this.getAttendanceCount("Done");
         const absentCount = this.getAttendanceCount("pending");
      
        return (
            <div>
                <div className="header3">
                    <p>Manage Attendance Page</p>
                </div>
          
            <div className='ManageAttendancePage'>
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
                <div className="right-side">
                    <h2>Attendance Management</h2>
                    <table className="table1">
                        <tr>
                            <td>
                                <p>Attendance Today</p>
                                <p>{presentCount}</p>
                            </td>
                            <td>
                                <p>Absent</p>
                                <p>{absentCount}</p>
                            </td>
                        </tr>
                    </table>
                   

                    
					<form onSubmit={this.onSubmit}>
						<table className='table2'>
							<tr>
								<td>
									<p>Search by name</p>
								</td>
								<td>
									<input type='text' placeholder='search...' required value={this.state.search} onChange={this.onChangeSearch} />
								</td>
								<td>
									<button type="submit" className="search">  <a href={"/searchAttendance/" + this.state.search} className="link2" >Search</a></button>
								</td>
							
							</tr>
						</table>
					</form>


                    <p className="ptag">Today Attendance of Staff Members</p>
                    <table className="table3">
                        <tr>
                            <th>Staff Id</th>
                            <th>Name</th>
                            <th>Attendance</th>
                            <th>Action</th>
                        </tr>
                        {this.tabRow()}
                    </table>
                    <table className="table4">
                        <tr>
                            <td>Generate Monthly Attendance Report</td>
                            <td>
                                <button onClick={() => this.exportPDF()}>Monthly Report</button>
                            </td>
                        </tr>
                    </table>
                </div>
               
                <Footer/>
                </div>
                </div>

        );
    }
}



