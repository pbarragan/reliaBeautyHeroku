var React = require('react');
var Input = require('react-bootstrap/lib/Input');
var aux = require('./../app/aux');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var InputPriceDebounceC = require('./InputPriceDebounceC');


var FilterPriceC = React.createClass({

  render: function () {
    var headerStyle = {
      fontSize: 1.5+"em",
      fontFamily: "Calibri",
      color: "#000000",
    };
    var labelStyle = {
      fontSize: 1.25+"em",
      fontFamily: "Calibri",
      color: "#000000",
      fontStyle: "italic",
      textAlign: "center"
    };
    console.log('Rendering FilterPriceC')
    console.log('Initial Min',this.props.initialMin);
    return (
      <Row>
      <Col xs={12} sm={12} md={12} lg={12} style={headerStyle}>
        Price
      </Col>
      <Col xs={6} sm={6} md={6} lg={6}>
        <InputPriceDebounceC initialValue={this.props.initialMin} 
        placeholder="Min" onChange={this.props.handleMin} />
        <div style={labelStyle}>Min</div>
      </Col>
      <Col xs={6} sm={6} md={6} lg={6}>
        <InputPriceDebounceC initialValue={this.props.initialMax} 
        placeholder="Max" onChange={this.props.handleMax} />
        <div style={labelStyle}>Max</div>
      </Col>
      </Row>
    );
  }
});

module.exports = FilterPriceC;
