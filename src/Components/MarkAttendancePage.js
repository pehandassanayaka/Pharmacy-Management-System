import React, { Component } from "react";
import "../Styles/MarkAttendancePage.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import Footer from "../Components/Footer";
import logo from "../images/logo.png";


export default class MarkAttendancePage extends Component{

    constructor(props) {
        super(props);
        this.onChangestaffid = this.onChangestaffid.bind(this);
        this.onChangename = this.onChangename.bind(this);
         this.onChangeday = this.onChangeday.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);

        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10);

      
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            staffid: '',
            name: '',
            email:'',
            day:formattedDate,
            status:'',
            
        
        }
    }
    onChangestaffid(e){
        this.setState( {
            staffid: e.target.value
        });
    }
    onChangename(e){
        this.setState( {
            name: e.target.value
        });
    }
   
  
    onChangeemail(e){
        this.setState( {
            email: e.target.value
        });
    }
    onChangeday(e){
        this.setState( {
            day: e.target.value
        });
    }
   
   
    
    onSubmit(e){

        this.state.status = "pending";

        e.preventDefault();
        const obj = {
            staffid : this.state.staffid,
            name : this.state.name,
            email : this.state.email,
            day : this.state.day,
            status : this.state.status
          
          
           
        };

            if(this.state.staffid.length > 0){
                if(this.state.name.length > 2){
                 
                      
                            axios.post('http://localhost:4000/attendance/add',obj)
                                .then(res => {
                                    alert("add Successfully");
                                    this.setState({
                                        staffid: '',
                                        name: '',
                                        email:'',
                                        day:'',
                                        status:''
                            
                                    })
                                    console.log(res.data)});
                            this.props.history.push('/attendence');
                   
                }
                else{
                    alert('Invalid.Name shoud be more than 2 characters');
                }
            } 
            else {
                alert('Pleace enter the staffid');
            }
        
    }



    render(){
        return(
            <div className="root"> 
                <div className="header1">
                    <p>Mark Attendance Page</p>
                </div>
          
            <div className="MarkAttendancePage">
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
                    <form onSubmit={this.onSubmit}>
                    <p>Mark Attendance</p>
                    <table className="table1">
                        <tr>
                            <td>Staff Id</td>
                        </tr>
                        <tr>
                            <td><input type="text" required value={this.state.staffid} onChange = {this.onChangestaffid} /></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                        </tr>
                        <tr>
                            <td><input type="text" required value={this.state.name} onChange = {this.onChangename} /></td>
                        </tr>
                         <tr>
                            <td>Day</td>
                        </tr>
                        <tr>
                            <td><input type="date" readOnly required value={this.state.day} onChange = {this.onChangeday}/></td>
                        </tr> 
                        
                        <tr>
                            <td>
                                <button type="submit">Mark Attendance</button>
                            </td>
                        </tr>
                    </table> 
                </form>
                </div>
                
                <Footer />  
               </div>
        </div>
);
}
}

 