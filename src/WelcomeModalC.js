var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;


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

var WelcomeModalC = React.createClass({

  render: function() {
    console.log('WelcomeModalC: Rendering')
    
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
    var welcomeLineStyle = {
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
      marginBottom: "2.5rem"
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
      borderRadius: 25*radiusScale+"em"
    };

    var pwInputStyle = {
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
      marginTop: 1+"em"
    };

    var forgotPWLineStyle = {
      // Font properties
      fontSize: 24*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#ffffff",
      textDecoration: "underline",
      transform: "translate(.75em,-1.25em)"
    };

    var signInButtonStyle = {
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
      height: 2.125+"em"
    };

    var fbButtonStyle = {
      width: "100%",
      height: "auto",
      padding: "0px 0px",
      marginTop: "3em",
      marginBottom: "3em",
      border: "medium none transparent",
      borderRadius: 25*radiusScale+"em",
      position: "relative",
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#687dac+0,6479aa+17,48639c+75,405d97+100 */
      background: "#687dac", /* Old browsers */
      background: "-moz-linear-gradient(top,  #687dac 0%, #6479aa 17%, #48639c 75%, #405d97 100%)", /* FF3.6-15 */
      background: "-webkit-linear-gradient(top,  #687dac 0%,#6479aa 17%,#48639c 75%,#405d97 100%)", /* Chrome10-25,Safari5.1-6 */
      background: "linear-gradient(to bottom,  #687dac 0%,#6479aa 17%,#48639c 75%,#405d97 100%)", /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#687dac', endColorstr='#405d97',GradientType=0 )" /* IE6-9 */
    }

    var fbLineStyle = {
      // Font properties
      // Hack   v
      fontSize: 0.8*36*sizeScale+"em",
      fontFamily: "Lucida Grande",
      color: "#ffffff",
      position: "absolute",
      top: "50%",
      transform: "translate(-37%,-50%)"
    };

    return (
      <Modal show={this.props.showWelcomeModal} onHide={this.props.closeWelcome} 
        dialogClassName="modal-dialog-vertical-align welcome-modal">
        <Modal.Header closeButton className="welcome-modal-header-style">
          <Modal.Title>
          <div style={welcomeLineStyle}>
              Welcome back!
          </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="welcome-modal-body-style">
          <div style={{marginRight:"4em",marginLeft:"4em"}}>
          <form>
            <Input type="email" placeholder="Email" style={textInputStyle}/>
            <Input type="password" placeholder="Password" style={pwInputStyle}/>
            <div style={{textAlign:"right"}}>
              <Button style={forgotPWLineStyle}
                bsStyle="link" onClick={this.props.openForgot}>
                Forgot your password?
              </Button>
            </div>
            <div style={{display:"table",margin:"0 auto"}}>
              <ButtonInput type="submit" value="Sign in" bsSize="large" style={signInButtonStyle}/>
            </div>
            <Button type="submit" style={fbButtonStyle}>
              <Image src="./img/facebookButton.png" responsive />
              <span style={fbLineStyle}>Sign in with Facebook</span>
            </Button>
          </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
});

module.exports = WelcomeModalC;
