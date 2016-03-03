var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var Panel = require('react-bootstrap/lib/Panel');
var Table = require('react-bootstrap/lib/Table');


var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
  render: function() {
    console.log("Rendering BugRow:", this.props.bug);
    return (
      <tr>
        <td>
	    <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link>
	</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
});

var BugTable = React.createClass({
  render: function() {
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function(bug) {
      return <BugRow key={bug._id} bug={bug} />
    });
    return (
	<Panel>
      <Table striped bordered condensed>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </Table>
	    </Panel>
    )
  }
});

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: []};
  },
  render: function() {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.changeFilter} 
	initFilter={this.props.location.query}/>
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug} />
      </div>
    )
  },

  componentDidMount: function() {
      console.log("BugList: componentDidMount");
      this.loadData({});
  },

  addBug: function(bug) {
    console.log("Adding bug:", bug);
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  },
    changeFilter: function(newFilter){
	this.props.history.push({search: '?' + $.param(newFilter)});
	//this.props.loadData(newFilter);
    },
    loadData: function(){
	//'?'+filter.priority etc etc
	var query = this.props.location.query || {};
	var filter = {priority: query.priority, status: query.status};
	$.ajax('/api/bugs',{data: filter}).done(function(data) {
	    this.setState({bugs: data});
	}.bind(this));
	// In production, we'd also handle errors.
    },
    componentDidUpdate: function(prevProps){
	var oldQuery = prevProps.location.query;
	var newQuery = this.props.location.query;
	if (oldQuery.priority === newQuery.priority &&
            oldQuery.status === newQuery.status) {
	    console.log("BugList: componentDidUpdate, no change in filter, not updating");
	    return;
	} else {
	    console.log("BugList: componentDidUpdate, loading data with new filter");
	    this.loadData();
	}
    }
});

module.exports = BugList;
