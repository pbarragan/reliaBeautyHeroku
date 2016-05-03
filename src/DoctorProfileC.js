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

var DoctorProfileC = React.createClass({
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
      fontSize: 2.25+"em",
      fontFamily: "Roboto",
      fontWeight: "bold",
      color: "#103853"
    };
    var headerStyle = {
      fontSize: 1.75+"em",
      fontStyle: "italic",
      fontFamily: "Calibri",
      color: "#000000",
      textDecoration: "underline"
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
      borderRadius: "0.5em"
    };


    var priceInd = 
      this.props.doctor.procedures.indexOf(this.props.procedure);
    var price = 
      this.props.doctor.prices[priceInd];

    var procRows = this.props.doctor.procedures.map((proc,i) => {
      return (
        <Row style={{marginTop:"0.25em",marginBottom:"0.25em"}}>
          <Col xs={6} sm={6} md={6} lg={6} style={secondStyle}>
            {proc}
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} style={secondStyle}>
            {'$'+this.props.doctor.prices[i]}
          </Col>
        </Row>
      )
    });

    return (
      <Grid fluid>
        <Row style={{marginTop:"1em",marginLeft:"0.0em"}}>
          <Col>
            <Button bsSize="small" style={backButtonStyle}
              onClick={this.props.handleBackClick}>
              <Glyphicon glyph="menu-left" />
              Return to results
            </Button>
          </Col>
        </Row>
        <Row style={{marginTop:"1em",marginLeft:"1em",marginRight:"1em"}}>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Image style={{backgroundColor:"white"}} 
              src="./img/profilePictureSM.png" responsive thumbnail/>
          </Col>
          <Col xs={5} sm={5} md={5} lg={5}>
            <div style={nameStyle}>{this.props.doctor.name+", MD"}</div>
            <div style={seventhStyle}>{this.props.doctor.specialties}</div>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Button bsSize="large" style={quoteButtonStyle}
              onClick={this.props.handleQuoteClick}>
              Get a consultation
            </Button>
          </Col>
        </Row>
        <Row style={{margin:"1em 1em 8em 1em"}}>
          <Col xs={3} sm={3} md={3} lg={3} 
            style={{borderRightColor:"black",
                  borderRightWidth: "1px",
                  borderRightStyle: "solid"}}>
            <div style={headerStyle}>
              Qualifications
            </div>
            <div style={{marginTop:"1em",marginBottom:"1em"}}>
              <div style={secondStyle}>Education</div>
              <div style={sixthStyle}>{this.props.doctor.education}</div>
            </div>
            <div style={{marginTop:"1em",marginBottom:"1em"}}>
              <div style={secondStyle}>Hospital Affiliation</div>
              <div style={sixthStyle}>{this.props.doctor.hospaff}</div>
            </div>
            <div style={{marginTop:"1em",marginBottom:"1em"}}>
              <div style={secondStyle}>Specialties</div>
              <div style={sixthStyle}>{this.props.doctor.specialties}</div>
            </div>
          </Col>
          <Col xs={5} sm={5} md={5} lg={5}
            style={{marginLeft:"2em",
                  marginRight: "-2em"}}>
            <div style={headerStyle}>
              Pricing Estimates
            </div>
            {procRows}
            <div style={{marginTop:"4em",width:"75%"}}>
              <span style={fifthStyle}>
              Note: Pricing are estimates only based on standard procedure types. May be subject to change based on specific patient circumstances.
              </span>
            </div>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <div style={{marginTop:"-2em",marginBottom:"4em"}}>
              <div style={thirdStyle}>
                For more information:
              </div>
              <div style={fourthStyle}>
                <a href={'"'+decodeURIComponent(this.props.doctor.url)+'"'}>
                  {decodeURIComponent(this.props.doctor.url)}</a>
              </div>
            </div>
            <div style={thirdStyle}>
              Location:
            </div>
            <div style={fourthStyle}>
              {this.props.doctor.numandstreet+', '
                +this.props.doctor.city+', '
                +this.props.doctor.state+', '
                +this.props.doctor.zip
              }
            </div>      
          </Col>
        </Row>
      </Grid>
     )
  }
});

module.exports = DoctorProfileC;
