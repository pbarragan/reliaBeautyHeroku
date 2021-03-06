var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var auth = require('./../app/authentication');

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
var SearchBoxC = require('./SearchBoxC'); // I don't think this is used
var WelcomeModalC = require('./WelcomeModalC');
var ForgotModalC = require('./ForgotModalC');

var LandingPageC = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  submitSearch: function(e){
    e.preventDefault();
    console.log(this.refs.proc.getValue());    
    console.log(this.refs.city.getValue());
    var filter = {};
    filter.city = this.refs.city.getValue();
    filter.type = "search";

    if(this.refs.proc.getValue() !== '')
      filter.procedure = this.refs.proc.getValue();

    //this.context.router.replace('/doctors?'+$.param(filter))
    this.props.history.push('/info?'+$.param(filter));
  },
  submitLogout: function() {
    console.log('I clicked logout');
    auth.logout(  () => {
      this.setState({ loggedIn: auth.loggedIn() });
      const { location } = this.props;
      if (location && location.state && location.state.nextPathname) {
          console.log('i am in the nextPathName');
          this.context.router.replace(location.state.nextPathname)
        } else {
          console.log('i am in the index after logout');
          this.context.router.replace('/index')
        }
      });
  },

  getInitialState: function() {
    console.log('LandingPage: get initial state loggedIn is: ', auth.loggedIn());
    return { disabled: true,
      showWelcomeModal: false, showForgotModal: false,
      loggedIn: auth.loggedIn() };
  },

  closeWelcome: function() {
    this.setState({ showWelcomeModal: false });
  },

  openWelcome: function() {
    this.setState({ showWelcomeModal: true });
  },
  closeForgot: function() {
    this.setState({ showForgotModal: false });
  },

  openForgot: function() {
    this.setState({ showWelcomeModal: false, showForgotModal: true });
  },

  handleProcSelect: function(e) {
    if(e.target.value !== '') this.setState({disabled: false});
  },

  render: function() {
    console.log('LandingPage: Rendering');
    console.log('When the landing page rendered, loggedIn is:',this.state.loggedIn);
    console.log('Auth says loggedIn is: ',auth.loggedIn());
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
      return <option value={proc}>{proc}</option>
    });

    var cityList = ["Boston","Los Angeles","New York"];
    var cityListItems = cityList.map(function(city,i) {
      return <option value={city}>{city}</option>
    });

    // Styles
    // <div style={nameStyle}>ReliaBeauty</div>
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
      height: 0.5*60*sizeScale+"em",
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
    var snapStyle = {
      color: "#0971BA",
      fontStyle: "italic",
      fontSize: 220*sizeScale+"em",
      fontFamily: "Perpetua, serif"
    };
    var bellaStyle = {
      color: "#17547C",
      fontSize: 160*sizeScale+"em",
      fontWeight: "bold"
    };
    var disabled = this.state.disabled ? true:false;
    //The most trusted name is cosmetic medicine.
    return (
      <FullscreenC backgroundImage={backgroundImage}>
        <Grid>
          <Row>
            <Col>
            <div style={{marginTop:"2em"}}>
              <span style={snapStyle}>snap</span>
              <span style={bellaStyle}>BELLA.</span>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{marginTop:"0em"}}>
                <div style={tagLineStyle}>
                  
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
          <form onSubmit={this.submitSearch}>
          <Row>
            <Col xs={7} md={6} lg={6}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <Input type="select" ref="proc" style={procBosListStyle} 
                  bsSize="large" onChange={this.handleProcSelect}>
                    <option value="" disabled selected >
                      Search by procedure
                    </option>
                    {procedureListItems}                         
                  </Input>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={3} lg={3}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <Input type="select" ref="city" style={procBosListStyle} bsSize="large">
                    {cityListItems}                        
                  </Input>
              </ButtonGroup>
            </Col>
            <Col xs={3} md={3} lg={3}>
              <ButtonGroup vertical block
                style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                  <Button bsSize="large" type="submit" 
                  style={searchButtonStyle} disabled={disabled}>
                    Search
                  </Button>
              </ButtonGroup>
            </Col>
          </Row>
          </form>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <div style={{marginTop:"0.5em",marginLeft:"0.5em"}}>
                <span style={memberLineStyle}>
                  Already a member?
                </span>                
                <span>
                {this.state.loggedIn ?
                  <Button style={signInLineStyle}
                  bsStyle="link" onClick={this.submitLogout}>Logout</Button>:
                  <Button style={signInLineStyle}
                  bsStyle="link" onClick={this.openWelcome}>Sign in</Button>}
                </span>
              </div>
            </Col>
          </Row>
        </Grid>

        <WelcomeModalC showWelcomeModal={this.state.showWelcomeModal} 
          closeWelcome={this.closeWelcome} openForgot={this.openForgot}
          city={"Boston"} procedure={"Liposuction"} history={this.props.history}/>

        <ForgotModalC showForgotModal={this.state.showForgotModal} 
          closeForgot={this.closeForgot}/>

      </FullscreenC>
      );

  }

});
/*
        <div style={{position:"absolute",top:0,right:0}}>
          {this.state.loggedIn ? "Logged In":"Not Logged In"}
        </div>
        */

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
/*
    var procedureListItems = procedureList.map(function(proc,i) {
      return <MenuItem eventKey={i}>{proc}</MenuItem>
    });
    var cityListItems = cityList.map(function(city,i) {
      return <MenuItem eventKey={i}>{city}</MenuItem>
    });
                  <DropdownButton bsSize="medium" title="Search by procedure" style={procBosListStyle} block>
                    {procedureListItems}                         
                  </DropdownButton>
                  <DropdownButton title="Boston" style={procBosListStyle} block>
                    {cityListItems}                        
                  </DropdownButton>
*/

module.exports = LandingPageC;
