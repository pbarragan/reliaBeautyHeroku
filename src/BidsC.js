var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');
var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Button = require('react-bootstrap/lib/Button');

var BidC = require('./BidC');

var BidsC = React.createClass({

	render: function(){
    console.log('Rendering BidsC');
    var keyStyle = {
      fontSize: 1+"em",
      fontFamily: "Roboto",
      fontWeight: "bold",
      color: "#103853"
    };
    var valStyle = {
      fontSize: 1+"em",
      fontFamily: "Roboto",
      color: "#000000"
    };
    var dateStyle = {
      fontSize: 1+"em",
      fontStyle: "italic",
      fontFamily: "Calibri",
      color: "#000000",
      textAlign: "right",
      marginTop: "2em"
    };
    var bigStyle = {
      fontSize: 2.5+"em",
      fontFamily: "Calibri",
      color: "#0066CC",
    };
    var backButtonStyle = {
      backgroundColor:"#0971BA",
      color:"#ffffff"
    };
    console.log('got to return')
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
        <Row style={{marginTop:"2em",marginLeft:"1em",marginRight:"1em",marginBottom:"0em"}}>
        <Panel>
          <Col xs={2} sm={2} md={2} lg={2} style={{marginLeft:"0em"}}>
            <Image style={{backgroundColor:"white"}} 
              src="./img/profilePicture2.png" responsive thumbnail/>
          </Col>
          <Col xs={8} sm={7} md={6} lg={5}>
            <Col xs={4} sm={4} md={4} lg={4}>
            <div style={keyStyle}>
              <ul style={{listStyleType:"none",paddingLeft:"0em"}}>
                <li>Age:</li>
                <li>Gender:</li>
                <li>Procedure:</li>
                <li>Location:</li>
                <li>Medical allergies:</li>
                <li>Budgeted price:</li>
              </ul>
            </div></Col>
            <Col xs={8} sm={8} md={8} lg={8}>
            <div style={valStyle}>
              <ul style={{listStyleType:"none"}}>
                <li>27</li>
                <li>Male</li>
                <li>Rhinoplasty</li>
                <li>New York</li>
                <li>None</li>
                <li>$4,000-$5,000</li>
              </ul>
            </div></Col>
          </Col>
          <Col xs={2} sm={3} md={4} lg={5}>
          <Row>
          <span style={keyStyle}>
          Request:
          </span>
          <span style={valStyle}>
          {" Looking to remove the noticeable bridge on my nose. If possible, would also like to make the width of my nose half an inch smaller. I am relatively healthy and have no prior medical complications."}
          </span>
          </Row>
          <Row>
          <div style={dateStyle}>Last edited: 4/10/16</div>
          </Row>
          </Col>
        </Panel>
        </Row>
        <Row style={{marginTop:"0em",marginLeft:"1em",marginRight:"1em",marginBottom:"0em"}}>
          <div style={bigStyle}>Proposals from doctors in your area</div>
        </Row>

        <BidC imgPath={"./img/doctor1.png"} doctorName={"Irvin L."}
        price={"4000"} message={"Hi Bob, I’m happy to help. Your case seems relatively straightforward to me and are similar to the last few cases I’ve performed. Provided there are no complications when I do your physical scan, I believe I’d be able to complete your surgery for $4,000. Please come in for a consult!"}/>

        <BidC imgPath={"./img/doctor2.png"} doctorName={"Vicky A."}
        price={"4500"} message={"Dear Bob, I really believe I can help you achieve the look you want. This is a relatively straightforward surgery for doctors who have done this before. I personally have performed this type of surgery at least 20 times in the last year and am invested in making this work!"}/>

        <BidC imgPath={"./img/doctor3.png"} doctorName={"Andrew W."}
        price={"5000"} message={"Hi Bob, I specialize in rhinoplasties and have performed over 1,000 procedures in my last 25 years of practice. I can almost guarantee that you’ll have a positive outcome. If you are unsatisfied, I have always offered my repeat customers a deep discount. Please contact me."}/>


      </Grid>

		);
	}

});

/*
        <Row style={{marginTop:"1em",marginLeft:"0.0em"}}>
          <Col>
            <Button bsSize="small" style={backButtonStyle}
              onClick={this.props.handleBackToProfile}>
              <Glyphicon glyph="menu-left" />
              Return to profile
            </Button>
          </Col>
        </Row>




        <BidC imgPath={"./img/doctor1.png"} doctorName={"Irvin L."}
        price={"4000"} message={"Hi Bob, I’m happy to help. Your case seems relatively straightforward to me and are similar to the last few cases I’ve performed. Provided there are no complications when I do your physical scan, I believe I’d be able to complete your surgery for $4,000. Please come in for a consult!"}/>

        <BidC imgPath={"./img/doctor2.png"} doctorName={"Vicky A."}
        price={"4500"} message={"Dear Bob, I really believe I can help you achieve the look you want. This is a relatively straightforward surgery for doctors who have done this before. I personally have performed this type of surgery at least 20 times in the last year and am invested in making this work!"}/>

        <BidC imgPath={"./img/doctor3.png"} doctorName={"Andrew W."}
        price={"5000"} message={"Hi Bob, I specialize in rhinoplasties and have performed over 1,000 procedures in my last 25 years of practice. I can almost guarantee that you’ll have a positive outcome. If you are unsatisfied, I have always offered my repeat customers a deep discount. Please contact me."}/>

*/

//{this.state.error ? this.state.errorMessage : 'No error'}
module.exports = BidsC;
