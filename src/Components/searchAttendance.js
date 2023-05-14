import React, { Component } from "react";
import "../Styles/ManageAttendancePage.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import AdminAtendacesearch from "./AdminAtendaceRow";
import Footer from "../Components/Footer";


export default class AttendanceSearchPage extends Component{
    
    constructor(props) {
		super(props);
        this.state = { attendance: [] };

		// this.onChangeSearch = this.onChangeSearch.bind(this);
	}

	// onChangeSearch(e) {
	// 	this.setState({
	// 		search: e.target.value,
	// 	});
	// }

    componentDidMount() {
        // alert('email is ' +this.props.match.params.id);
        axios.get('http://localhost:4000/attendance/search/'+this.props.match.params.pathParam1)
            .then(response => {
                // alert('Pass una')
                // alert('Data Tika :'+response.data)
                this.setState({attendance : response.data});

            })
            .catch(function (error){
                console.log(error);
            })
    }
	tabRow() {
		return this.state.attendance.map(function (object, i) {
			return <AdminAtendacesearch obj={object} key={i} />;
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
        const headers = [["staffid", "name","day", "email"]];
    
        const data = this.state.attendance.map(elt=> [elt.staffid, elt.name,  elt.day,elt.email]);
    
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
            <div>
                <div className="header3">
                    <p>Searched Attendance Page</p>
                </div>
          
            <div className='ManageAttendancePage'>
               <div className='left-sidebar'>
        
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
                                <p>20</p>
                            </td>
                            <td>
                                <p>Absent</p>
                                <p>2</p>
                            </td>
                        </tr>
              
               </table>
    
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


