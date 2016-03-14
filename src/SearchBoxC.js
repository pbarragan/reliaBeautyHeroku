var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;


//var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
//var Button  = require('react-bootstrap/lib/Button');
//var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
//var Alert = require('react-bootstrap/lib/Alert');
//var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');

var SearchBoxC = React.createClass({
  render: function() {
    console.log('SearchBox: Rendering')

    var searchLineStyle = {
      // Font properties
      fontSize: 60*this.props.sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#000000"
    };
    return (
      <Grid>
      <Row>
        <Col xs={8} md={7} lg={7}>
          <div style={{marginTop:"2em",marginLeft:"0.5em"}}>
            <div style={searchLineStyle}>
              Discover life-changing results from top-quality providers.
            </div>
          </div>
        </Col>
      </Row>
      <Row></Row>
      </Grid>
      );
  }
});

module.exports = SearchBoxC;
  