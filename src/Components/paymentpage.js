import  React, {Component} from 'react';
import "../Styles/PaymentPage.css"
import axios from 'axios'

// import './Styles/cusProfile.css'
import Footer from "../Components/Footer";


export default  class CusAddPayment extends  Component{


    constructor(props) {
        super(props);
        this.state = {customers : []};
        this.state.Email = this.props.match.params.id;

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fname: '',
            lname:'',
            email: '',
            amount:'',
            cardnumber:'',
            date:'',
            cvv:'',
            status:''
        }
    }

    componentDidMount() {
        //alert('edit id ' +this.props.match.params.id);
        axios.get('http://localhost:4000/PharmacyInventory/oedit/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    total: res.data.total,
                    status: res.data.status
                    
                   
                });
            })
            .catch(function (error){
                console.log("Can't Get Data");
            })
    }


    onChangeFirstName(e){
        this.setState( {
           fname: e.target.value
        });
    }
    onChangeLastName(e){
        this.setState( {
           lname: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState( {
           email: e.target.value
        });
    }
    onChangeAmount(e){
        this.setState( {
            amount: e.target.value
        });
    }
    onChangeCardNumber(e){
        this.setState( {
            cardnumber: e.target.value
        });
    }
    onChangeDate(e){
        this.setState( {
            date: e.target.value
        });
    }
    onChangeCVV(e){
        this.setState( {
            cvv: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        this.state.status = 'Complete';
        this.state.email = this.props.match.params.id;
        const obj = {
            fname : this.state.fname,
            lname : this.state.lname,
            email : this.state.email,
            amount : this.state.total,
            cardnumber : this.state.cardnumber,
            date : this.state.date,
            cvv : this.state.cvv,
            status : this.state.status
        };
       
        alert ("Your Email is : "+this.state.email);
        if(this.state.cvv.length === 3 ){
        if(this.state.cardnumber.length > 8){
                            axios.post('http://localhost:4000/payment/cusaddpayment',obj)
                                .then(res => {
                                    alert("payment Successfully");
                                    this.setState({
                                        fname: '',
                                        lname:'',
                                        email: '',
                                        amount:'',
                                        cardnumber:'',
                                        date:'',
                                        cvv:''
                                    })
                                    console.log(res.data)});
                            //this.props.history.push('/viewpayment/'+this.props.match.params.id);
                            window.location.replace('/paymentViewtable/');
               
        }else{
             alert('Enter valid Payment Amount...');
     }
    }else{
        alert('Enter valid cvv number...');
}

    }

    render() {
        return(
            <div>
             <div className='header1'>
                
                    <p>Payment Page</p>
                    </div>
            <div class="content">
                     
                        <h2 align="center">Customer Payment Form</h2>
                       
                  
                        <div className="container" style={{marginLeft:300}}>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-row">
                                <div class="form-group1">
                                <label for="inputEmail4">First Name</label>
                                <input type="text" class="form-control" value={this.state.fname} onChange = {this.onChangeFirstName}/>
                                </div>
                                <div class="form-group2">
                                <label for="inputPassword4">Last Name</label>
                                <input type="text" class="form-control" value={this.state.lname} onChange = {this.onChangeLastName}/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group3">
                                <label for="inputEmail4">ID***</label>
                                <input type="email" class="form-control" value={this.props.match.params.id} onChange = {this.onChangeEmail} readOnly/>
                                </div>
                                <div class="form-group4">
                                <label for="inputPassword4">Amount</label>
                                <input type="text" class="form-control" value={this.state.total} onChange = {this.onChangeAmount}/>
                                </div>
                            </div>
                            
                          
                            <h4 className='cdetails' style={{color:'blue'}}>Enter Credit Card Details</h4>
                        

                            <div class="form-group5">
                                <label for="inputAddress">Card Number</label>
                                <input type="text" class="form-control" value={this.state.cardnumber} onChange = {this.onChangeCardNumber}/>
                            </div>
                            <div class="form-row">
                                <div class="form-group6">
                                <label for="inputEmail4">End Date</label>
                                <input type="date" class="form-control" value={this.state.date} onChange = {this.onChangeDate}/>
                                </div>
                                <div class="form-group7">
                                <label for="inputPassword4">CVV</label>
                                <input type="text" class="form-control" value={this.state.cvv} onChange = {this.onChangeCVV}/>
                                </div>
                            </div>
                         
                           
                            <table>
                                <tr>
                                    <td>
                                        <button type="submit" className='give'>Pay</button>
                                    </td>
                                    <td>
                                        <button className='view'><a href = {"/paymentViewtable"} class="link1">View Payment</a></button>
                                    </td>
                                </tr>
                            </table>
                            </form>
                        </div>  
                        <Footer/>
                   </div>
                   </div>
                       
        );
    }
}