var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Button = require('react-bootstrap/lib/Button');

var ProfileC = React.createClass({
  getInitialState: function() {
    return {error:false,
            errorMessage: '',
            doctors: []};
  },
  listToListString: function(list){
    var outString = '';
    for(var i=0;i<list.length;i++){
      outString += list[i]+', ';
    }
    outString = outString.substring(0,outString.length-2);
    return outString;
  },
  render: function() {
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
      color: "#000000"
    };
    var secondStyle = {
      fontSize: 1.25+"em",
      fontFamily: "Calibri",
      color: "#000000",
    };
    var thirdStyle = {
      fontSize: 1.5+"em",
      fontFamily: "Calibri",
      fontWeight: "bold",
      color: "#000000",
    };
    var fourthStyle = {
      fontSize: 1.5+"em",
      fontFamily: "Calibri",
      color: "#000000",
    };
    var fifthStyle = {
      fontSize: 1+"em",
      fontFamily: "Calibri",
      color: "#000000",
    };
    var sixthStyle = {
      fontSize: 1+"em",
      fontFamily: "Calibri",
      color: "#000000",
      fontStyle: "italic",
    };
    var seventhStyle = {
      fontSize: 1.75+"em",
      fontStyle: "italic",
      fontFamily: "Calibri",
      color: "#000000"
    };

    var backButtonStyle = {
      backgroundColor:"#0971BA",
      color:"#ffffff"
    };
    var quoteButtonStyle = {
      fontFamily: "Roboto",
      fontWeight: "300",
      backgroundColor:"#0971BA",
      color:"#ffffff",
      fontSize: 1.75+"em",
      padding: "1em 2em",
      WebkitBorderRadius: "0.5em",
      MozBorderRadius: "0.5em",
      borderRadius: "0.5em",
      width: "12em"
    };

    return (
      <Grid fluid>
        <Row style={{marginTop:"2em",marginLeft:"1em",
                      marginRight:"1em",marginBottom:"2em"}}>
          <Col xs={2} sm={2} md={2} lg={2} style={{marginLeft:"0em"}}>
            <Image style={{backgroundColor:"white"}} 
              src="./img/profilePicture2.png" responsive thumbnail/>
              <div style={dateStyle}>Last edited: 4/10/16</div>
          </Col>
          <Col xs={8} sm={7} md={6} lg={5}>
            <Col xs={4} sm={4} md={4} lg={4}>
            <div style={keyStyle}>
              <ul style={{listStyleType:"none",paddingLeft:"0em"}}>
                <li>Name:</li>
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
                <li>Bob</li>
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
            <Button bsSize="large" style={quoteButtonStyle}
              onClick={this.props.handleRequestClick}>
              Create Request
            </Button>
            </Row>
            <Row>
            <Button bsSize="large" style={quoteButtonStyle}
              onClick={this.props.handleBidsClick}>
              View My Bids
            </Button>
            </Row>
          </Col>
        </Row>
      </Grid>
     )
  }
});

module.exports = ProfileC;
