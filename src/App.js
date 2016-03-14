var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;
//var browserHistory = require('react-router').browserHistory;

var BugList = require('./BugList');
var BugEdit = require('./BugEdit');
var LandingPageC = require('./LandingPageC');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/index" component={LandingPageC} />
      <Route path="/bugs" component={BugList} />
      <Route path="/bugs/:id" component={BugEdit} />
      <Redirect from="/" to="/index" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);