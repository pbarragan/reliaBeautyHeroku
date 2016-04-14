var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var auth = require('./../app/authentication');


//var Panel = require('react-bootstrap/lib/Panel');
var Image = require('react-bootstrap/lib/Image')
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');

var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
//var Alert = require('react-bootstrap/lib/Alert');
//var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Modal = require('react-bootstrap/lib/Modal');

var FullscreenC = require('./FullscreenC');
var SearchBoxC = require('./SearchBoxC');

var ForgotModalC = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
      return {
        disabled: false,
        error: false,
        errorMessage: ''
      }
    },
  submitForgot: function(e){
    console.log('I am trying to submit forgot');
    e.preventDefault();
    this.setState({ disabled: true });
    //console.log(this.refs.email.getValue());
    //console.log(this.refs.password.getValue());

    
    auth.forgot(this.refs.email.getValue(), 
      (succeeded,message) => {
        this.setState({ disabled: false });
        if (!succeeded)
          console.log("Forgot Failed");
        else console.log("Forgot succeeded");

        if (!succeeded)
          return this.setState({ error: true , errorMessage: message})


        console.log('at the routing section in ForgotModalC');
        const { location } = this.props;
        console.log(location);
        //console.log(location.state);
        if (location && location.state && location.state.nextPathname) {
          console.log('i am in the nextPathName');
          this.context.router.replace(location.state.nextPathname)
        } else {
          console.log('i am in the index');
          this.hideForgotModal();
          this.context.router.replace('/index')
        }

      });

      console.log('got past the signup call');
  },

  hideForgotModal: function(){
    this.setState({ error: false });
    this.props.closeForgot();
  },

  render: function() {
    console.log('ForgotModalC: Rendering')
    
    var baseSize = 175; // pt
    //var defaultSize = 14; // px
    var emBase = 8;
    var sizeScale = emBase/baseSize;

    var radiusPX = 55; // px
    var radiusEM = 0.25; // em
    var radiusScale = radiusEM/radiusPX;

    var th = 0.9;
    var dist = 1; // px
    var hS = dist*sizeScale*Math.cos(th);
    var vS = dist*sizeScale*Math.sin(th);

    // Styles
    var forgotLineStyle = {
      // Font properties
      // rem used here to avoid increase in size due to hidden <h4> in header
      // hack  v
      fontSize: 1.25*60*sizeScale+"rem",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#ffffff",
      textShadow: hS+"em "+vS+"em "+0*sizeScale+"em #b7b7b7",
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1.5rem",
      marginBottom: "0.5rem",
      transform: "translate(1.5%, 0px)"
    };

    var textInputStyle = {
      // Font properties
      fontSize: 40*sizeScale+"em",
      // Hack v
      height: 0.8*40*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#929191",
      textAlign: "left",
      paddingTop: "0px",
      paddingBottom: "0px",
      borderRadius: 25*radiusScale+"em",
      marginTop: "0.25em"
    };

    var enterLineStyle = {
      // Font properties
      // Hack   v
      fontSize: 0.9*30*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#ffffff",
      transform: "translate(0px, -75%)"
    };

    var submitButtonStyle = {
      // Font properties
      fontSize: 40*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "400",
      color: "#727272",
      backgroundColor: "#cad1db",
      paddingTop: 2*sizeScale+"px",
      paddingBottom: 2*sizeScale+"px",
      borderRadius: 40*radiusScale+"em",
      width: 8+"em",
      height: 2.125+"em",
      marginTop: 0.75+"em",
      marginBottom: 0.5+"em"
    };

    var disabled = this.state.disabled ? true:false;
    var disabledText = this.state.disabled ? 'Sending email...':'Submit';
    return (
      <Modal show={this.props.showForgotModal} onHide={this.hideForgotModal} 
        dialogClassName="modal-dialog-vertical-align welcome-modal">
        <Modal.Header closeButton className="welcome-modal-header-style">
          <Modal.Title>
          <div style={forgotLineStyle}>
              Forgot your password?
          </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="welcome-modal-body-style">
          <div style={{marginRight:"4em",marginLeft:"4em"}}>
          <div style={enterLineStyle}>
            Enter your email to receive your password
          </div>
          <form onSubmit={this.submitForgot}>
            <Input type="email" placeholder="Email" ref="email" style={textInputStyle}/>
            <div style={{display:"table",margin:"0 auto"}}>
              <ButtonInput type="submit" value={disabledText} bsSize="large" 
              style={submitButtonStyle} disabled={disabled}/>
            </div>
            <div style={{position:"absolute",top:"40%",right:"20%",color:"red"}}>
              {this.state.error ? this.state.errorMessage : ''}
            </div>
          </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
});

module.exports = ForgotModalC;
