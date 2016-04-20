var React = require('react');
var ReactDOM = require('react-dom');

//var NavBarC = require('./NavBarC');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var DoctorResultsC = require('./DoctorResultsC');


var ResultsC = React.createClass({
  render: function() {
    console.log('FullscreenC: Rendering')
    var youSearchedStyle = {
      fontStyle: "italic",
      fontFamily: "Calibri",
      fontWeight: "bold",
    };
    var procedureStyle = {
      fontSize: 1.5+"em",
      fontFamily: "Calibri",
      fontWeight: "bold",
      transform: "translateY(50%)"
    };
    var filterByStyle = {
      fontSize: 1.25+"em",
      fontFamily: "Calibri",
      fontWeight: "bold",
    };
    return (
      <Grid fluid>
        <Row>
          <Col xs={3} sm={3} md={3} lg={3}>
            <div style={{marginTop:"1em"}}>
              <span style={youSearchedStyle}>You searched:</span>
              <span style={procedureStyle}>{' '+this.props.procedure}</span>
            </div>
            <div style={{marginTop:"15em"}}>
              <span style={filterByStyle}>
              Locations:
              </span>
            </div>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <DoctorResultsC doctors={this.props.doctors}
            procedure={this.props.procedure} city={this.props.city}
            handleDoctorClick={this.props.handleDoctorClick} />          
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <div style={{marginTop:"3em",marginLeft:"0.5em"}}>
              <span style={filterByStyle}>Filter by:</span>
            </div>
          </Col>
        </Row>
        </Grid>
      );

  }

});

module.exports = ResultsC;
