var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');
var aux = require('./../app/aux');

var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');
var Table = require('react-bootstrap/lib/Table');

var DoctorInputC = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  	},
  procedureList: ["Liposuction","Eye lift","Rhinoplasty","Facelift",
    "Brow Lift","Chin Augmentation","Injectables","Tummy Tuck",
    "Breast augmentation","Breast Lift","Breast Reduction",
    "Breast Reconstruction","Brazilian butt lift","Mommy Makeover",
    "Arm Lift","Body Lift"],
	getInitialState: function() {
    console.log(this.procedureList);
    console.log(aux);
    console.log(aux.escapeHTML)
 
    var procs = [];
    for(var i=0;i<this.procedureList.length;i++)
      procs.push({id: this.procedureList[i], selected: false, price: '0'});

    	return {
        error: false,
      	errorMessage: '',
        success: false,
        successMessage: '',

        name: '',
        numandstreet: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        url: '',
        procedures: procs
    	}
  	},
  handleChange: function(e){
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    console.log(e.target.label);

    console.log(e.target.checked);

  },
  changeSelection: function(id) {
        var procs = this.state.procedures.map(function(d) {
            return {
                id: d.id,
                selected: (d.id === id ? !d.selected : d.selected),
                price: d.price
            };
        });

        this.setState({ procedures: procs });

  },
  changePrice: function(id,e) {
        var procs = this.state.procedures.map(function(d) {
            return {
                id: d.id,
                selected: d.selected,
                price: (d.id === id ? e.target.value : d.price)
            };
        });

        this.setState({ procedures: procs });

  },
  changeAllChecks: function(e) {
        var value = e.target.checked;
        console.log(value);
        console.log(this.refs.globalSelector);
        var state = this.state.procedures.map(function(d) {
            return { id: d.id, selected: value, price: d.price};
        });

        this.setState({ procedures: state });
  },
  validateAndPrepState: function(state){
    var procArr = [], priceArr = [];
    var regexPrice = /^[+-]?\d+(\.\d+)?$/;
    var regexZip = /^[0-9]{5}$/;
    var regexPhone = /^[0-9]{10}$/;
    var regexURL = /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/i;
    var regexState = /^([a-zA-Z]){2}$/;

    var escapedZip = aux.escapeHTML(this.refs.zip.getValue());
    var escapedPhone = aux.escapeHTML(this.refs.phone.getValue());
    var escapedState = aux.escapeHTML(this.refs.state.getValue());

    if(!regexZip.test(escapedZip))
      return {success: false, obj: this.refs.zip.getValue()};

    if(!regexPhone.test(escapedPhone))
      return {success: false, obj: this.refs.phone.getValue()};

    if(!regexState.test(escapedState))
      return {success: false, obj: this.refs.state.getValue()};

    if(!regexURL.test(this.refs.url.getValue()))
      return {success: false, obj: this.refs.url.getValue()};

    for(var i=0;i<state.procedures.length;i++){
      if(state.procedures[i].selected){
        procArr.push(state.procedures[i].id);
        var escapedPrice = aux.escapeHTML(state.procedures[i].price);
        if(regexPrice.test(escapedPrice)){
          priceArr.push(Math.round(parseFloat(escapedPrice)*100)/100);
        }
        else return {success: false, obj: state.procedures[i].price};
      }
    }
    return {success: true, obj:{
      name: aux.escapeHTML(this.refs.name.getValue()),
      numandstreet: aux.escapeHTML(this.refs.numandstreet.getValue()),
      city: aux.escapeHTML(this.refs.city.getValue()),
      state: escapedState,
      zip: escapedZip,
      phone: escapedPhone,
      url: encodeURIComponent(this.refs.url.getValue()),
      procedures: procArr,
      prices: priceArr
    }}
  },
  submitDoctor: function(e){
    e.preventDefault();
    var result = this.validateAndPrepState(this.state);
    if(result.success){
      this.setState({error: false,errorMessage:""})
      this.setState({success: false,successMessage:""})

      console.log('data ready');
      console.log(result.obj);
      aux.submitDoctor(result.obj,(worked,message) =>{
        if(worked){ console.log("doctor submit worked");
        this.setState({success: true,successMessage:"Doctor submit worked"});
      }
        else{ console.log("doctor signup did not work");
        this.setState({error: true,
          errorMessage:"Doctor submit did not work: "+message});
      }
      })
    }
    else this.setState({error:true,
      errorMessage:"This entry is invalid:"+result.obj})

  },
	render: function(){

    var procRows = this.state.procedures.map((proc,i) => {
      return(
        <tr>
        <td style={{width:"50%"}}>
        <Input type="checkbox" checked={proc.selected} 
        label={proc.id} key={i} 
        onChange={this.changeSelection.bind(this, proc.id)}/>
        </td>
        <td style={{width:"1%"}}>$</td>
        <td style={{width:"49%"}}>
        <Input type="text" key={i} value={proc.price} 
        onChange={this.changePrice.bind(this, proc.id)}/>
        </td>
        </tr>
        )
    });

		return (
      <div style={{width:"50%", paddingLeft:"2em"}}><h1>Fill in all the doctor information</h1>
			<form onSubmit={this.submitDoctor}>
            <Input type="text" ref="name" label="Name" required/>
            <p>Address</p>
            <Input type="text" ref="numandstreet" label="Number and Street" required />
            <Input type="text" ref="city" label="City" required/>
            <Input type="text" ref="state" label="State (e.g. CA, MA, etc)" required/>
            <Input type="text" ref="zip" label="Zip (5 Digits)" required/>
            <p>Contact</p>
            <Input type="text" ref="phone" label="Phone (No punctuation, 10 digits, e.g. 6175551234)" required/>
            <Input type="text" ref="url" label="Website URL (No http://)" required/>

            <Table striped condensed>
            <thead>
            <tr>
            <th style={{width:"50%"}}>Procedure</th>
            <th style={{width:"1%"}}></th>
            <th style={{width:"49%"}}>Price</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>
            <Input type="checkbox" ref="globalSelector" 
            label="Select All" onChange={this.changeAllChecks} />
            </td><td></td><td></td>
            </tr>
            {procRows}
            </tbody>
            </Table>

            <div style={{color:"red"}}>
            {this.state.error ? this.state.errorMessage : ''}
            </div>
            <div style={{color:"green"}}>
            {this.state.success ? this.state.successMessage : ''}
            </div>

            <div>
            	<ButtonInput type="submit" value="Submit"
            		bsSize="large" />
            </div>

          	</form></div>

		);
	}

});

//{this.state.error ? this.state.errorMessage : 'No error'}
module.exports = DoctorInputC;
