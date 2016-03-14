var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;


//var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
//var Alert = require('react-bootstrap/lib/Alert');
//var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var FullscreenC = require('./FullscreenC');
var SearchBoxC = require('./SearchBoxC');

var LandingPageC = React.createClass({
  render: function() {
    console.log('LandingPage: Rendering')
    var backgroundImage = './img/landingPage.jpg';
    
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

    var procedureList = ["Liposuction","Eye lift","Rhinoplasty","Facelift",
      "Brow Lift","Chin Augmentation","Injectables","Tummy Tuck",
      "Breast augmentation","Breast Lift","Breast Reduction",
      "Breast Reconstruction","Brazilian butt lift","Mommy Makeover",
      "Arm Lift","Body Lift"];
    var procedureListItems = procedureList.map(function(proc,i) {
      return <MenuItem eventKey={i}>{proc}</MenuItem>
    });

    var cityList = ["Boston","Los Angeles","New York"];
    var cityListItems = cityList.map(function(city,i) {
      return <MenuItem eventKey={i}>{city}</MenuItem>
    });

    // Styles
    var nameStyle = {
      // Font properties
      fontSize: 175*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#ffffff",
      textShadow: hS+"em "+vS+"em "+0*sizeScale+"em #b7b7b7"
    };

    var tagLineStyle = {
      // Font properties
      fontSize: 48*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      fontStyle: "italic",
      color: "#000000"
    };
    var searchLineStyle = {
      // Font properties
      fontSize: 60*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#000000"
    };
    var procBosListStyle = {
      // Font properties
      fontSize: 60*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#b5b5b5",
      textAlign: "left",
      paddingTop: "0px",
      paddingBottom: "0px",
      borderRadius: 40*radiusScale+"em"
    };
    var searchButtonStyle = {
      // Font properties
      fontSize: 60*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "300",
      color: "#e4e0e0",
      backgroundColor: "#535c7b",
      paddingTop: 2*sizeScale+"px",
      paddingBottom: 2*sizeScale+"px",
      borderRadius: 55*radiusScale+"em"
    };
    var memberLineStyle = {
      // Font properties
      fontSize: 40*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#000000",
      verticalAlign: "baseline"
    };
    var signInLineStyle = {
      // Font properties
      fontSize: 40*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "400",
      color: "#535c7b",
      verticalAlign: "baseline",
      textDecoration: "underline"
    };
    return (
      <FullscreenC backgroundImage={backgroundImage}>
        <Grid>
          <Row>
            <Col>
            <div style={{marginTop:"2em"}}>
              <div style={nameStyle}>ReliaBeauty</div>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{marginTop:"0em"}}>
                <div style={tagLineStyle}>
                  The most trusted name is cosmetic medicine.
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={8} md={7} lg={7}>
              <div style={{marginTop:"3em",marginLeft:"0.5em"}}>
                <div style={searchLineStyle}>
                  Discover life-changing results from top-quality providers.
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={7} md={6} lg={6}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <DropdownButton bsSize="medium" title="Search by procedure" style={procBosListStyle} block>
                    {procedureListItems}                         
                  </DropdownButton>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={3} lg={3}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <DropdownButton title="Boston" style={procBosListStyle} block>
                    {cityListItems}                        
                  </DropdownButton>
              </ButtonGroup>
            </Col>
            <Col xs={3} md={3} lg={3}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <Button bsSize="large" style={searchButtonStyle}>
                    Search
                  </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <div style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                <span style={memberLineStyle}>
                  Already a member?
                </span>                
                <span>
                  <Link style={signInLineStyle}
                  className="btn btn-link" to="/">Sign in</Link>
                </span>
              </div>
            </Col>
          </Row>
        </Grid>
      </FullscreenC>
      );

  }

  /*
  componentDidMount: function() {
    console.log("LandingPage: componentDidMount");
    console.log('Things are changing');
    console.log(this.props);
    console.log(this.props.setBackgroundImage);
    console.log('well');
    this.props.setBackgroundImage('./img/landingPage.jpg');
    console.log("LandingPage: sent new background image")
  }
  */

});
/*
var styles = StyleSheet.create({
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});
var LandingPage = React.createClass({
  render: function() {
    return (
      <Image source={require('./img/landingPage.jpg')} style={styles.container}>
        ... Your Content ...
      </Image>
    );
}
});
*/
module.exports = LandingPageC;
