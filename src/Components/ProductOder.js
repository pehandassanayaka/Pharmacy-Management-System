import  React, {Component} from 'react';
import "../Styles/productOder.css";
// import Footer from "./Footer";
import axios from 'axios';
import Footer from "../Components/Footer";


	export default  class productOder extends  Component{
 


    constructor(props) {
        super(props);
        this.onChangepName = this.onChangepName.bind(this);
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onChangepieces = this.onChangepieces.bind(this);
        // this.onChangetotal = this.onChangetotal.bind(this);
        //  this.approve = this.approve.bind(this);
       
        
        
      
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            pName: '',
            category: '',
            pieces:'',
            total:'',
            status:'',
        }
        // this.state.email = this.props.match.params.id;
    }

    componentDidMount() {
        //alert('edit id ' +this.props.match.params.id);
        axios.get('http://localhost:4000/PharmacyInventory/edit/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    pName: res.data.pName,
                    price: res.data.price,
                    category: res.data.category,
                    qty: res.data.qty,
                   
                });
            })
            .catch(function (error){
                console.log("Can't Get Data");
            })
    }


    onChangepName(e){
        this.setState( {
            pName: e.target.value
        });
    }
    onChangecategory(e){
        this.setState( {
            category: e.target.value
        });
    }
    onChangepieces(e){
        this.setState( {
            pieces: e.target.value,
        
        });
       
            
        
    }
        
            
    
    // onChangetotal(e){
    //     this.setState( {
    //         total: e.target.value
    //     });
    // }
   
    
    onSubmit(e){

        this.state.status = 'pending';
            
        // if (this.state.vehicle == 'Scooter') {
        //     this.state.price = this.state.qty * 1000;
        // } 
       

     const obj1 = {
         pName : this.state.pName,
         price : this.state.price,
         category : this.state.category,
         pNo : this.state.pNo,
         qty : this.state.qty,
         description : this.state.description
     };


         this.state.total = this.state.pieces * this.state.price;

            let avalablestock = 0;

            avalablestock = this.state.qty - this.state.pieces;

            this.state.qty = avalablestock;

            if (this.state.qty <= 0) {
                alert("Out of Stock");
                
                this.props.history.push('/');
                window.location.replace('/');
            }
            else{
                alert("avalablestock " +avalablestock);

                
            
                
            
        
            }
         

        e.preventDefault();
        const obj = {
            pName : this.state.pName,
            category : this.state.category,
            qty : this.state.qty,
            total : this.state.total,
            status : this.state.status,
          
           
        };

                   
        axios.post('http://localhost:4000/PharmacyInventory/oadd',obj)
                                .then(res => {
                                    alert("add Successfully");
                                    this.setState({
                                        pName: '',
                                        category: '',
                                        pieces:'',
                                        total:'',
                                        status:'',
                            
                                    })
                                    console.log(res.data)});
                            this.props.history.push('/');
                            window.location.replace('/');

                        
                        

                         

                
        
    }
    // approve(){
    //     axios.post('http://localhost:4000/PharmacyInventory/update/'+this.props.match.params.id,obj1)
    // };


    render() {
	return (
        <div className='foo'>
            <div className='header5'>
                <p>Product Order page</p>
            </div>
       
		<div className='AddVehiclePage'>
			
			<div className='content'>
				<form onSubmit={this.onSubmit}>

                


                    <div className='detail'>
						<label htmlFor=''> Product Name</label>
						<input type='text' id='vehicleName' name='vehicleName' required readOnly  value={this.state.pName} onChange = {this.onChangepName}/>
					</div>

					<div className='detail'>
						<label htmlFor=''> category</label>
						<input type='text' id='vehicleName' name='vehicleName' required readOnly  value={this.state.category} onChange = {this.onChangecategory}/>
					</div>

					
					
                    <div className='detail'>
						<label htmlFor=''>Quntity</label>
						<input type='number' id='vehicleName' name='vehicleName' required   value={this.state.pieces} onChange = {this.onChangepieces}/>
					</div>

                   
                    {/* <button onClick={this.approve} className="btn btn-danger">Complete</button>  */}
					<button  type='submit'>Add</button>
				</form>
			</div>
        
		</div>
        <Footer />
    </div>
	);
}  
	}
// fix