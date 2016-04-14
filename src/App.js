var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;
//var browserHistory = require('react-router').browserHistory;
var auth = require('./../app/authentication');

var Button  = require('react-bootstrap/lib/Button');

var BugList = require('./BugList');
var BugEdit = require('./BugEdit');
var LandingPageC = require('./LandingPageC');
var AuthContainerC = require('./AuthContainerC');
var SignupC = require('./SignupC');
var ResetC = require('./ResetC');

var $ = require('jquery');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

var LogoutC = React.createClass(
  {  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  submitLogout: function() {
    auth.logout(  () => {
      const { location } = this.props;
      if (location.state && location.state.nextPathname) {
          console.log('i am in the nextPathName');
          this.context.router.replace(location.state.nextPathname)
        } else {
          console.log('i am in the index after logout');
          this.context.router.replace('/index')
        }
      });
  },
  render: function() {
      console.log('Rendering logout');
    return(
      <div>
      <Button
        bsStyle="primary" onClick={this.submitLogout}>Logout</Button>
        </div>
    );
  }

});

var Profile = React.createClass({
  render: function() {
    return (
      <h2>A profile would go here</h2>
    );
  }
});

var ResetMissingC = React.createClass({
  render: function() {
    return (
      <h2>Sorry, but that reset link is no longer valid.</h2>
    );
  }
});

var NotLoggedIn = React.createClass({
  render: function() {
    return (
      <h2>You are not logged in</h2>
    );
  }
});

var FBCallbackC = React.createClass({
  componentWillMount: function(){
    console.log('the code is')
    console.log(this.props)
    console.log(this.props.params.code)
    //$.ajax('/auth/facebook').then(function(data){console.log('eureka')});
    /*
  $.ajax({
        url: '/auth/facebook', 
        type: 'GET', 
      })
      .then(function (data)  {
          console.log('im in then');
          console.log(data);

        },
        function (data)  {
          console.log('im in then 2');
          console.log(data);
        }
      )
  */
        $.ajax({
        url: '/auth/facebook', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify({hello:"hello"}),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log('im in then');
          console.log(data);
        },
        function (data)  {
          console.log('im in then 2');
          console.log(data);
        }
      );
  },
  render: function() {
    return (
      <h2>Facebook callback</h2>
    );
  }
});

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/notloggedin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireResetToken(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/resetmissing',
      state: { error: false }
    })
  }
}

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Redirect from="/" to="/index" />

      <Route path="/" component={AuthContainerC}>
        <Route path="/index" component={LandingPageC} />
        <Route path="/signup" component={SignupC} />
        <Route path="/logout" component={LogoutC} />
        <Route path="/profile" component={Profile} onEnter={requireAuth} />
        <Route path="/notloggedin" component={NotLoggedIn} />
        <Route path="/bugs" component={BugList} />
        <Route path="/bugs/:id" component={BugEdit} />
        <Route path="/reset/:token" component={ResetC} />
        <Route path="/resetmissing" component={ResetMissingC} />
        <Route path="/facebookcallback" component={FBCallbackC} />

        <Route path="*" component={NoMatch} />
      </Route>

    </Router>
  ),
  document.getElementById('main')
);