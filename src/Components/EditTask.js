import React, { Component } from "react";
import "../Styles/TaskAllocationPage.css";
import "../Styles/Header.css";
import "../Styles/LeftSidebar.css";
import axios from 'axios';
import Footer from "../Components/Footer";

export default class TaskAllocationPage extends Component{


    constructor(props) {
        super(props);
        this.onChangetaskNo = this.onChangetaskNo.bind(this);
        this.onChangestaffid = this.onChangestaffid.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
      
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            taskNo: '',
            staffid: '',
            description:'',
            email:'',
            status:''
        
        }
    }


    componentDidMount() {
        // alert('edit id ' +this.props.match.params.id);
        axios.get('http://localhost:4000/attendance/tedit/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    taskNo: res.data.taskNo,
                    staffid: res.data.staffid,
                    description: res.data.description,
                    email: res.data.email,
					status: res.data.status,
					
					
                   
                });
            })
            .catch(function (error){
                console.log("Can't Get Data");
            })
    }

    onChangetaskNo(e){
        this.setState( {
            taskNo: e.target.value
        });
    }
    onChangestaffid(e){
        this.setState( {
            staffid: e.target.value
        });
    }
    onChangedescription(e){
        this.setState( {
            description: e.target.value,
        });
    }
  
    onChangeemail(e){
        this.setState( {
            email: e.target.value
        });
    }
   
    
    onSubmit(e){

        this.state.status = "pending";
        e.preventDefault();
        const obj = {
            taskNo : this.state.taskNo,
            staffid : this.state.staffid,
            description : this.state.description,
            email : this.state.email,
            status : this.state.status
          
           
        };

            if(this.state.taskNo.length > 0){
                if(this.state.description.length > 5){
                 
                    axios.post('http://localhost:4000/attendance/tupdate/'+this.props.match.params.id,obj)
                        
                                .then(res => {
                                    alert("add Successfully");
                                    this.setState({
                                        taskNo: '',
                                        staffid: '',
                                        description:'',
                                        email:'',
                                        status:''
                            
                                    })
                                    console.log(res.data)});
                            this.props.history.push('/taskmanagementpage');
                   
                }
                else{
                    alert('Invalid.Description be more than 5 characters');
                }
            } 
            else {
                alert('Pleace enter the task No');
            }
        
    }



    render(){
        return(
            <div className="root">

                <div className="header1">
                    <p>Edit Task Allocation Page</p>
              
            </div>
            <div className="TaskAllocationPage">
                <div className="left-sidebar">
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
                <div className="right-side">
                    <h2>Task Management</h2>
                    <p>Allocate Task</p>
                    <form onSubmit={this.onSubmit}>
                    <table className="table1">
                        <tr>
                            <td>Task No</td>
                        </tr>
                        <tr>
                            <td><input type="number"  required value={this.state.taskNo} onChange = {this.onChangetaskNo} /></td>
                        </tr>
                        <tr>
                            <td>Staff Id *</td>
                        </tr>
                        <tr>
                            <td>
                                <select name="" id=""  required value={this.state.staffid} onChange = {this.onChangestaffid} >
                                    <option value="A001">A001</option>
                                    <option value="A001">A002</option>
                                    <option value="A003">A003</option>
                                    <option value="A004">A004</option>
                                </select></td>
                        </tr>
                        <tr>
                            <td>Details *</td>
                        </tr>
                        <tr>
                            <td><input type="text"  required value={this.state.description} onChange = {this.onChangedescription} /></td>
                        </tr>

                        {/* <tr>
                            <td>Details *</td>
                        </tr>
                        <tr>
                            <td><input type="text"  required value={this.state.description} onChange = {this.onChangedescription} /></td>
                        </tr> */}

                        <tr>
                            <td>
                                <button type="submit">Edit Allocate Task</button>
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

 