var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
var aux = require('./../app/aux');

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');


var DoctorListC = React.createClass({
  submitNew: function(){
    this.props.history.push('/doctorinput');
  },
  submitEdit: function(doc){
    doc.doUpdate = true;
    this.props.history.push('/doctorinput?'+$.param(doc));
  },
  submitDelete: function(doc){
    var doDelete = confirm("test");
    console.log('Delete? '+doDelete)
    if(doDelete){
      aux.deleteDoctor(doc,(worked,data)=>{
        if(worked){
          console.log(data);
          this.loadData();
        }
        else{
         console.log('it did not work');
         this.loadData();
        }
      });
    }
  },
  getInitialState: function() {
    return {doctors: []};
  },
  loadData: function(){
    aux.retrieveDoctors((worked,data)=>{
      if(worked){
        console.log(data);
        this.setState({doctors:data.doctors});
      }
      else console.log('it did not work');

    });    
  },
  componentWillMount: function(){
    this.loadData();
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
    var docRows = this.state.doctors.map((doc,i) => {
      return (
      <tr>
      <td>
        <Button bsStyle="link" onClick={this.submitEdit.bind(this,doc)}>Edit</Button>
      </td>
      <td>
        <Button bsStyle="link" onClick={this.submitDelete.bind(this,doc)}>Delete</Button>
      </td>
      <td>{doc.name}</td>
      <td>{doc.numandstreet}</td>
      <td>{doc.city}</td>
      <td>{doc.state}</td>
      <td>{doc.zip}</td>
      <td>{doc.phone}</td>
      <td>{decodeURIComponent(doc.url)}</td>
      <td>{doc.education}</td>
      <td>{doc.hospaff}</td>
      <td>{doc.specialties}</td>
      <td>{this.listToListString(doc.procedures)}</td>
      <td>{this.listToListString(doc.prices)}</td>
      <td>{this.listToListString(doc.percents)}</td>
      <td>{doc.stars}</td>
      <td>{decodeURIComponent(doc.imgurl)}</td>
      </tr>
      )
    });

    return (
     <Panel>
     <Table striped bordered condensed>
     <thead>
     <tr>
     <th></th>
     <th></th>
     <th>Name</th>
     <th>Number and Street</th>
     <th>City</th>
     <th>State</th>
     <th>Zip</th>
     <th>Phone</th>
     <th>URL</th>
     <th>Education</th>
     <th>Hospital Affiliation</th>
     <th>Specialties</th>
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
     <Button bsSize="large" bsStyle="primary" onClick={this.submitNew}>Create New Doctor</Button>
     </Panel>
     )
  }
});

module.exports = DoctorListC;
