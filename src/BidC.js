var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Button  = require('react-bootstrap/lib/Button');


var BidC = React.createClass({
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
      textAlign: "left"
    };
    var valStyle = {
      fontSize: 1+"em",
      fontFamily: "Roboto",
      color: "#000000"
    };
    var respondButtonStyle = {
      fontFamily: "Roboto",
      fontWeight: "300",
      backgroundColor:"#0066CC",
      color:"#ffffff",
      fontSize: 1.25+"em",
      padding: "0.75em 1.5em",
      WebkitBorderRadius: "0.5em",
      MozBorderRadius: "0.5em",
      borderRadius: "0.5em",
      width: "8em"
    };
    var removeButtonStyle = {
      fontFamily: "Roboto",
      fontWeight: "300",
      backgroundColor:"#CC0000",
      color:"#ffffff",
      fontSize: 1.25+"em",
      padding: "0.75em 1.5em",
      WebkitBorderRadius: "0.5em",
      MozBorderRadius: "0.5em",
      borderRadius: "0.5em",
      width: "8em"
    };


/*
      <Col xs={2} sm={2} md={2} lg={2}>
        <Image style={{backgroundColor:"white"}} 
          src={"./img/bigArrow.png"} responsive />  
      </Col>





          <Row style={{marginTop:"0em",marginLeft:"1em",marginRight:"1em",marginBottom:"0em"}>
      <Col xs={10} sm={10} md={10} lg={10}>
        <Panel style={{backgroundColor:"#ffffff",
          marginTop:"0.25em",marginBottom:"0.25em"}}>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Image style={{backgroundColor:"white"}} 
              src={this.props.imgPath} responsive />
          </Col>
          <Col xs={5} sm={5} md={5} lg={5}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div style={nameStyle}>{this.props.doctorName+", MD"}</div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div style={priceStyle}>
                  {'Est. ~$'+this.props.price}
                </div>
              </Col>
            </Row>
            <Row>
              <div style={valStyle}>
                {this.props.message}
              </div>
            </Row>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Row>
              <Button style={respondButtonStyle}>
                Respond
              </Button>
            </Row>
            <Row>
              <Button style={removeButtonStyle}>
                Remove
              </Button>
            </Row>
          </Col>
        </Panel>
      </Col>
    </Row>
*/ 
    console.log('Rendering BidC')
    return (
    <Row style={{marginTop:"0em",marginLeft:"1em",marginRight:"1em",marginBottom:"0em"}}>
      <Col xs={2} sm={2} md={2} lg={2}>
        <Image style={{backgroundColor:"white",padding:"3em 0em 0em 3em"}} 
          src={"./img/bigArrow.png"} responsive />  
      </Col>
      <Col xs={10} sm={10} md={10} lg={10}>
        <Panel style={{backgroundColor:"#ffffff",
          marginTop:"0.25em",marginBottom:"0.25em"}}>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Image style={{backgroundColor:"white"}} 
              src={this.props.imgPath} responsive />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div style={nameStyle}>{this.props.doctorName+", MD"}</div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div style={priceStyle}>
                  {'Est. ~$'+this.props.price}
                </div>
              </Col>
            </Row>
            <Row>
              <div style={valStyle}>
                {this.props.message}
              </div>
            </Row>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <div style={{marginLeft:"1em",marginTop:"1em"}}>
            <Row>
              <Button style={respondButtonStyle}>
                Respond
              </Button>
            </Row>
            <Row>
              <Button style={removeButtonStyle}>
                Remove
              </Button>
            </Row>
            </div>
          </Col>
        </Panel>
      </Col>
    </Row>
     )
  }
});

module.exports = BidC;
