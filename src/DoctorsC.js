var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');


var DoctorsC = React.createClass({
  getInitialState: function() {
    return {error:false,
            errorMessage: '',
            doctors: []};
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
        this.setState({doctors:data.doctors});
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
  componentDidUpdate: function(prevProps){
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
  listToListString: function(list){
    var outString = '';
    for(var i=0;i<list.length;i++){
      outString += list[i]+', ';
    }
    outString = outString.substring(0,outString.length-2);
    return outString;
  },
  render: function() {
    console.log("Rendering doc table, num items:", this.state.doctors.length);
    var docRows = this.state.doctors.map((doc) => {
      return (
      <tr>
      <td>{doc.name}</td>
      <td>{doc.numandstreet}</td>
      <td>{doc.city}</td>
      <td>{doc.state}</td>
      <td>{doc.zip}</td>
      <td>{doc.phone}</td>
      <td>{decodeURIComponent(doc.url)}</td>
      <td>{this.listToListString(doc.procedures)}</td>
      <td>{this.listToListString(doc.prices)}</td>
      <td>{this.listToListString(doc.percents)}</td>
      <td>{doc.stars}</td>
      <td>{decodeURIComponent(doc.imgurl)}</td>
      </tr>
      )
    });
    console.log(docRows.length);
    return (
     <Panel>
     <Table striped bordered condensed>
     <thead>
     <tr>
     <th>Name</th>
     <th>Number and Street</th>
     <th>City</th>
     <th>State</th>
     <th>Zip</th>
     <th>Phone</th>
     <th>URL</th>
     <th>Procedures</th>
     <th>Prices</th>
     <th>Percents</th>
     <th>Stars</th>
     <th>Image URL</th>
     </tr>
     </thead>
     <tbody>
     {docRows}
     </tbody>
     </Table>
     <p>
     {docRows.length === 0 ? 'No matches for that search' : ''}
     </p>
     </Panel>
     )
  }
});

module.exports = DoctorsC;
