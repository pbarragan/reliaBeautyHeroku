var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');


var DoctorResultC = React.createClass({
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
    var nameStyle = {
      fontSize: 1.5+"em",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#636C7C"
    };
    var procedureStyle = {
      fontSize: 1+"em",
      fontStyle: "italic",
      fontFamily: "Calibri",
      fontWeight: "bold",
      color: "#000000",
      textAlign: "center"
    };
    var specialtiesStyle = {
      fontSize: 1+"em",
      fontStyle: "italic",
      fontFamily: "Calibri",
      fontWeight: "bold",
      color: "#000000"
    };
    var priceStyle = {
      fontSize: 1.75+"em",
      fontFamily: "Calibri",
      fontWeight: "bold",
      color: "#000000",
      textAlign: "center"
    };
    var priceInd = 
      this.props.doctor.procedures.indexOf(this.props.procedure);
    var price = 
      this.props.doctor.prices[priceInd];

    var specialties = this.props.doctor.specialties ?
                      this.props.doctor.specialties:' ';

    return (
     <Panel style={{backgroundColor:"#d7dbe4",
      marginTop:"0.25em",marginBottom:"0.25em"}}
      onClick={this.props.handleDoctorClick.bind(null,this.props.doctor)}>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Image style={{backgroundColor:"white"}} 
          src="./img/profilePictureSM.png" responsive />
      </Col>
      <Col xs={5} sm={5} md={5} lg={5}>
        <div style={nameStyle}>{this.props.doctor.name+", MD"}</div>
        <div style={specialtiesStyle}>{specialties}</div>
      </Col>
      <Col xs={4} sm={4} md={4} lg={4}>
        <div style={priceStyle}>
          {'$'+price}
        </div>
        <div style={procedureStyle}>
          {'Avg. total '+this.props.procedure+' cost'}
        </div>
      </Col>
     </Panel>
     )
  }
});

module.exports = DoctorResultC;
