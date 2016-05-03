var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var auth = require('./../app/authentication');
var aux = require('./../app/aux');

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
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');
var Modal = require('react-bootstrap/lib/Modal');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var FullscreenC = require('./FullscreenC');
var SearchBoxC = require('./SearchBoxC'); // I don't think this is used
var WelcomeModalC = require('./WelcomeModalC');
var ForgotModalC = require('./ForgotModalC');
var DoctorsC = require('./DoctorsC');
var ResultsC = require('./ResultsC');
var DoctorProfileC = require('./DoctorProfileC');
var QuoteC = require('./QuoteC');
var ProfileC = require('./ProfileC');
var RequestC = require('./RequestC');
var BidsC = require('./BidsC');

var InfoC = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  submitSearch: function(e){
    e.preventDefault();
    console.log(this.refs.proc.getValue());    
    console.log(this.state.city);
 
    if(this.refs.proc.getValue() !== ''){
      var filter = {};
      filter.city = this.state.city;

      if(this.refs.proc.getValue() !== '')
        filter.procedure = this.refs.proc.getValue();

      //this.context.router.replace('/doctors?'+$.param(filter))
      this.props.history.push('/info?'+$.param(filter));
    }
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
    var query = this.props.location.query || {};
    var tabKeyInit = query.type ? query.type === "search" ? 0:1 : 0;
    var state = { tabKey: tabKeyInit, 
                  showWelcomeModal: false, 
                  showForgotModal: false,
                  loggedIn: auth.loggedIn(),
                  error: false,
                  errorMessage: '',
                  ascending:true,

                  initialMin:undefined,
                  initialMax:undefined,
                  min:undefined,
                  max:undefined,
                  doctors: [],
                  doctorsAll: [],

                  city: '',
                  procedure: '',
                  showDoctorList: true,
                  showDoctorProfile: true,
                  showProfile: true,
                  showRequest: false,
                  doctor: {}
                  };
    if (query.city)
      state.city = query.city;
    if (query.procedure)
      state.procedure = query.procedure;

    console.log('LandingPage: get initial state loggedIn is: ', auth.loggedIn());
    return state;
  },
  filterDoctors: function(doctors,proc,min,max){
    console.log(arguments);
    var filteredDoctors = [];
    for(var i=0;i<doctors.length;i++){
      var priceInd = doctors[i].procedures.indexOf(proc);
      var price = doctors[i].prices[priceInd];
      console.log(price);
      if(price>=min && price<=max)
        filteredDoctors.push(doctors[i]);
    }
    return filteredDoctors;
  },
  handleMin: function(value,success){
    console.log("Min says",value,success);
    if(success){
      console.log('Filter on',value);
      var filteredDoctors = 
        this.filterDoctors(this.state.doctorsAll,
                            this.state.procedure,
                            value,this.state.max);
      var sortedFilteredDoctors =
        this.sortByPrice(this.state.ascending,
                          this.state.procedure,
                          filteredDoctors);
      this.setState({doctors:sortedFilteredDoctors,min:value});
    }
  },
  handleMax: function(value,success){
    console.log("Max says",value,success);
    if(success){
      console.log('Filter on',value);
      var filteredDoctors = 
        this.filterDoctors(this.state.doctorsAll,
                            this.state.procedure,
                            this.state.min,value);
      var sortedFilteredDoctors =
        this.sortByPrice(this.state.ascending,
                          this.state.procedure,
                          filteredDoctors);
      this.setState({doctors:sortedFilteredDoctors,max:value});
    }
  },

  handlePriceClick: function(e){
    e.preventDefault();

    /*
    var primerFunc = function(priceArray,doctor,proc){
      console.log('where am i');
      console.log(proc);
      var priceInd = 
        doctor.procedures.indexOf(proc);
      var price = pricesArray[priceInd];
      return price;
    };
    sortedDocs = aux.sortObjects(this.state.doctors,'prices',false,
                primerFunc,this.state.procedure);
    console.log(sortedDocs);
    */

    this.setState({ascending:!this.state.ascending,
                  doctors:this.sortByPrice(!this.state.ascending,
                                            this.state.procedure,
                                            this.state.doctors)});
    console.log("Price order is now ascending:"+this.state.ascending);
  },
  handleDoctorClick: function(doctor,e){
    e.preventDefault();
    console.log('We clicked a doctor');
    this.setState({showDoctorList:false,doctor:doctor})
  },
  handleBackClick: function(e){
    e.preventDefault();
    console.log('We went back');
    this.setState({showDoctorList:true,doctor:{}})
  },
  handleQuoteClick: function(e){
    e.preventDefault();
    console.log('We clicked quote');
    this.setState({showDoctorProfile:false})
  },
  handleBackQuoteClick: function(e){
    e.preventDefault();
    console.log('We went back from quote');
    this.setState({showDoctorProfile:true})
  },

  handleRequestClick: function(e){
    e.preventDefault();
    console.log('Go to request');
    this.setState({showProfile:false,showRequest:true})
  },
  handleBidsClick: function(e){
    e.preventDefault();
    console.log('Go to bids');
    this.setState({showProfile:false,showRequest:false})
  },
  handleSendClick: function(e){
    e.preventDefault();
    console.log('Sent request');
    this.setState({showProfile:true,showRequest:false})
  },
  handleBackToProfile: function(e){
    e.preventDefault();
    console.log('Go back to profile');
    this.setState({showProfile:true,showRequest:false})
  },

  sortByPrice: function(ascending,procedure,doctors){
    var prices = [];
    for(var i=0;i<doctors.length;i++){
      var priceInd = doctors[i].procedures.indexOf(procedure);
      prices.push(doctors[i].prices[priceInd])
    }
    var sortedDoctors = ascending ?
                        aux.sortTwoAscending(prices,doctors)
                        : aux.sortTwoDescending(prices,doctors);
    return sortedDoctors[1];
  },
  loadData: function(){
    var query = this.props.location.query || {};
    var filter = {};
    if (query.city)
      filter.city = query.city;
    if (query.procedure)
      filter.procedure = query.procedure;

    aux.retrieveDoctorsQuery(filter,(worked,data)=>{
      if(worked){
        console.log(data);
        var doctors = data.doctors;

        // sort by price
        if (query.procedure){
          var prices = [];
          for(var i=0;i<doctors.length;i++){
            var priceInd = 
              doctors[i].procedures.indexOf(query.procedure);
            prices.push(doctors[i].prices[priceInd])
          }
          doctors = this.sortByPrice(this.state.ascending,
                                      query.procedure,doctors);

        }

        var currentMin = aux.arrayMin(prices)
        var currentMax = aux.arrayMax(prices)
        var state = {doctors:doctors,doctorsAll:doctors,
                    initialMin:currentMin,initialMax:currentMax,
                    min:currentMin,max:currentMax};
        if (query.city)
          state.city = query.city;
        if (query.procedure)
          state.procedure = query.procedure;
        this.setState(state);
      }
      else{
        this.setState({error:true,
          errorMessage:'Error: please try search again.'});
      }
    });
  },

  componentDidMount: function(){
    this.loadData();
  },

  componentDidUpdate: function(prevProps,prevState){
  var oldQuery = prevProps.location.query;
  var newQuery = this.props.location.query;
  console.log(prevProps);
  console.log(oldQuery);
  console.log(newQuery)
  if (oldQuery.city === newQuery.city &&
    oldQuery.procedure === newQuery.procedure) {
    console.log("DoctorsC: componentDidUpdate, no change in filter, not updating");
    return;
  } else {
    console.log("DoctorsC: componentDidUpdate, loading data with new filter");
    this.loadData();
  }
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
  handleTabSelect: function(key) {
    this.setState({tabKey: key});
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
      fontSize: 35*sizeScale+"em",
      //height: 0.5*100*sizeScale+"em",
      fontFamily: "Roboto",
      fontWeight: "100",
      color: "#b5b5b5",
      textAlign: "left",
      paddingTop: "0px",
      paddingBottom: "0px",
      fontStyle: "italic",
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
    var topBarStyle = {
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,d7dbe4+1,d6dae5+100 */
      background: "#ffffff", /* Old browsers */
      background: "-moz-linear-gradient(top,  #d7dbe4 0%, #d6dae5 100%)", /* FF3.6-15 */
      background: "-webkit-linear-gradient(top,  #d7dbe4 0%,#d6dae5 100%)", /* Chrome10-25,Safari5.1-6 */
      background: "linear-gradient(to bottom,  #d7dbe4 0%,#d6dae5 100%)", /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d6dae5',GradientType=0 )", /* IE6-9 */
    };
    var snapStyle = {
      color: "#0971BA",
      fontStyle: "italic",
      fontSize: 110*sizeScale+"em",
      fontFamily: "Perpetua, serif"
    };
    var bellaStyle = {
      color: "#17547C",
      fontSize: 80*sizeScale+"em",
      fontWeight: "bold"
    };
    var searchDivStyle = {
      position: "absolute",
      left: 0.5+"em",
      top: 7+"em"
      //width: 22+"em"
    };
    var snapBellaDivStyle = {
      left: 0.75+"em",
      top: 1+"em",
      bottom: 1+"em"
    };
    var innerButton = 
      <Button type="submit" style={{backgroundColor:"#0971BA"}}>
        <Glyphicon glyph="search" />
      </Button>;

    return (
      <FullscreenC backgroundColor="#d7dbe4">
        <div style={{marginLeft:"1em",marginTop:"0.5em",marginBottom:"0.25em"}}>
        <div style={snapBellaDivStyle}>
          <span style={snapStyle}>snap</span>
          <span style={bellaStyle}>BELLA.</span>
        </div>
        <Col xs={3} sm={3} md={4} lg={4} style={searchDivStyle}>
          <form onSubmit={this.submitSearch}>
          <Input type="select" ref="proc" style={procBosListStyle} 
            bsSize="large" buttonAfter={innerButton}>
            <option value="" disabled selected>Search by procedure</option>
            {procedureListItems}                         
          </Input>
          </form>
        </Col>
        </div>
        <Tabs tabWidth={12} activeKey={this.state.tabKey} onSelect={this.handleTabSelect}>
        <Tab eventKey={0} title="Doctors in your area" tabClassName="tab-name-style">
          <div style={{backgroundColor:"white"}}>
            {this.state.showDoctorList ?
              (<ResultsC doctors={this.state.doctors}
              procedure={this.state.procedure} city={this.state.city}
              handleDoctorClick={this.handleDoctorClick}
              handlePriceClick={this.handlePriceClick}
              ascending={this.state.ascending}
              handleMin={this.handleMin} handleMax={this.handleMax}
              initialMin={this.state.min}
              initialMax={this.state.max} />)
              : 
              this.state.showDoctorProfile ?
              (<DoctorProfileC procedure={this.state.procedure} 
                city={this.state.city} doctor={this.state.doctor}
                handleBackClick={this.handleBackClick}
                handleQuoteClick={this.handleQuoteClick}/>)
              :
              (<QuoteC procedure={this.state.procedure} 
                city={this.state.city} doctor={this.state.doctor}
                handleBackQuoteClick={this.handleBackQuoteClick}/>)
            }
          </div>
        </Tab>
        <Tab eventKey={1} title="My profile" tabClassName="tab-name-style">
          <div style={{backgroundColor:"white"}}>
            {this.state.showProfile ?
              (<ProfileC handleRequestClick={this.handleRequestClick}
                handleBidsClick={this.handleBidsClick} />)
              : 
              this.state.showRequest ?
              (<RequestC procedures={procedureList} 
                handleSendClick={this.handleSendClick}
                handleBackToProfile={this.handleBackToProfile}/>)
              :
              (<BidsC handleBackToProfile={this.handleBackToProfile}/>)
            }
          </div>
        </Tab>
      </Tabs>
      </FullscreenC>
      );

  }

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

module.exports = InfoC;
