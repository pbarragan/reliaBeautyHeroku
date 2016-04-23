// This is the center panel of the results tab

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button  = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var DoctorResultC = require('./DoctorResultC');

var DoctorResultsC = React.createClass({
  getInitialState: function() {
    return {error:false,
            errorMessage: '',
            doctors: [],
            procedure: '',
            city: ''};
  },
  listToListString: function(list){
    var outString = '';
    for(var i=0;i<list.length;i++){
      outString += list[i]+', ';
    }
    outString = outString.substring(0,outString.length-2);
    return outString;
  },

  /*
  loadData: function(){
    var state = {doctors: this.props.doctors};
    if (this.props.city)
      state.city = this.props.city;
    if (this.props.procedure)
      state.procedure = this.props.procedure;
    this.setState(state);
  },

  componentDidMount: function(){
    this.loadData();
  },

  componentDidUpdate: function(prevProps){
    this.loadData();
  },
  */

  render: function() {
    console.log("Rendering doc results, num items:", this.props.doctors.length);
    var docRows = this.props.doctors.map((doc) => {
      return (
        <Row>
          <DoctorResultC doctor={doc} procedure={this.props.procedure}
          handleDoctorClick={this.props.handleDoctorClick}/>
        </Row>
      )
    });
    console.log(docRows.length);

    var sortButtonStyle = {
      width:"10em",
      backgroundColor:"#0971BA",
      color:"#ffffff"
    };

    var sortStyle = {
      fontStyle: "italic",
      fontFamily: "Calibri",
      fontWeight: "bold",
      transform: "translateY(50%)"
    };
    return (
     <div style={{marginTop:"0.5em",marginBottom:"0.5em"}}>
      <Row>
        <Col xs={4} sm={3} md={2} lg={2}>
          <div style={sortStyle}>Sort: by</div>
        </Col>
        <Col xs={8} sm={9} md={10} lg={10}>
          <ButtonToolbar>
            <Button style={sortButtonStyle} 
              onClick={this.props.handlePriceClick}>
              {'Price '}
              <Glyphicon glyph={this.props.ascending ?
                "triangle-top":"triangle-bottom"} />
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
      {docRows}
     <Row>
     {docRows.length === 0 ? 'No matches for that search' : ''}
     </Row>
     </div>
     )
  }
});

/* old toolbar
          <ButtonToolbar>
            <Button style={sortButtonStyle}>
              Rating
            </Button>
            <Button style={sortButtonStyle}>
              Price
            </Button>
            <Button style={sortButtonStyle}>
              Distance
            </Button>
          </ButtonToolbar>
*/

module.exports = DoctorResultsC;
