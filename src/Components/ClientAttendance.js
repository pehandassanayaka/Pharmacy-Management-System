import React, { Component } from "react";
import "../Styles/ClientAttendance.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ACTableRow from "./clientattendanceRow";
import Footer from "../Components/Footer";
import logo from "../images/logo.png";



export default class ClientAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendance: [],
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

    getAttendanceCount(status) {
        return this.state.attendance.filter((attendance) => attendance.status === status).length;
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
            return <ACTableRow obj={object} key={i} />;
        });

    }

  

    render() {
        const presentCount = this.getAttendanceCount("Done");
        const absentCount = this.getAttendanceCount("pending");
        return (
        <>
        <div className="header3">
            <p>Mark Attendance Management Page</p>
        </div>

            <div className='ClientAttendance'>
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
                    <h2>Mark Attendance Management </h2>
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
                  

                <table className="table2">
                 <tr ><td>Didn't Mark Attendance Today ?</td>
                <td><button type="submit" className="search">  <a href={"/markattendance"} className="link2" >Mark Attendance</a></button></td>
                </tr>
                </table>
                

                    <p className="ptag">Attendance History</p>
                   
                    <table className="table3">
                        <tr>
                            <th>Day</th>
                            
                            <th>Attendance</th>
                            <th>Action</th>
                        </tr>
                        {this.tabRow()}
                    </table>
                   
                </div>
                <Footer />
            </div>
        </>
        );
    }
}



