var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');
var aux = require('./../app/aux');

var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');
var Table = require('react-bootstrap/lib/Table');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var RequestC = React.createClass({
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
  submitQuote: function(e){
    e.preventDefault();
    console.log('Submitted quote');
  },
	render: function(){

    var procBosListStyle = {
      // Font properties
      fontSize: 1+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#b5b5b5",
      textAlign: "left",
    };
    var backButtonStyle = {
      backgroundColor:"#0971BA",
      color:"#ffffff"
    };
    var topBannerStyle = {
      backgroundColor:"#435568",
      color:"#ffffff",
      textAlign: "center",
      fontSize: "1.25em",
      padding: "0.4em",
      margin: "0em -1.25em 1em -1.25em",
      WebkitBorderRadius: "0.5em",
      MozBorderRadius: "0.5em",
      borderRadius: "0.5em",
      fontFamily: "Roboto",
      fontWeight: "100"
    };
    var formStyle = {
      color:"#BFBFBF",
      fontSize: "1.25em",
      fontFamily: "Roboto",
      fontWeight: "100",
      fontStyle: "italic"
    };
    var sendButtonStyle = {
      backgroundColor:"#8598AE",
      fontFamily: "Calibri",
      color: "#ffffff",
      fontStyle: "normal",
      fontSize: "1.25em"
    };
    var procedureListItems = this.props.procedures.map(function(proc,i) {
      return <option value={proc}>{proc}</option>
    });

		return (
      <Grid fluid>
        <Row style={{marginTop:"1em",marginLeft:"0.0em"}}>
          <Col>
            <Button bsSize="small" style={backButtonStyle}
              onClick={this.props.handleBackToProfile}>
              <Glyphicon glyph="menu-left" />
              Return to profile
            </Button>
          </Col>
        </Row>
        <Row style={{marginTop:"1em",marginLeft:"1em",marginRight:"1em",marginBottom:"4em"}}>
        <Col xs={4} sm={4} md={4} lg={4} 
        xsOffset={4} smOffset={4} mdOffset={4} lgOffset={4}
          style={{backgroundColor:"#D9D9D9"}}>
            <div style={topBannerStyle}>
              Create a Request
            </div>
		        <form onSubmit={this.props.handleSendClick} style={formStyle}>



            <Input type="select" ref="proc" style={procBosListStyle} 
              onChange={this.handleProcSelect}
              style={{backgroundColor:"#F2F2F2"}}>

              <option value="" disabled selected >
                Treatment
              </option>
              {procedureListItems}                         
            </Input>

            <Input type="select" ref="decision" style={procBosListStyle} 
              onChange={this.handleProcSelect}
              style={{backgroundColor:"#F2F2F2"}}>

              <option value="" disabled selected >
                Decision Stage
              </option>
              <option value="sure">I am sure</option>
              <option value="questions">I have questions</option>
              <option value="unsure">I am unsure</option>                         
            </Input>

            <Input type="textarea" ref="questions" placeholder="Describe What You're Looking For"
              style={{backgroundColor:"#F2F2F2"}}/>
            <Input type="text" ref="allergies" placeholder="Medical Allergies" 
              style={{backgroundColor:"#F2F2F2"}}/>
            <Input type="text" ref="budget" placeholder="Budget" 
              style={{backgroundColor:"#F2F2F2"}}/>
            <div style={{color:"red"}}>
            {this.state.error ? this.state.errorMessage : ''}
            </div>
            <div style={{color:"green"}}>
            {this.state.success ? this.state.successMessage : ''}
            </div>

            <div>
            	<ButtonInput type="submit" value="Send"
            		bsSize="large" block style={sendButtonStyle}/>
            </div>

          	</form>
          </Col>
        </Row>
      </Grid>

		);
	}

});

//{this.state.error ? this.state.errorMessage : 'No error'}
module.exports = RequestC;
