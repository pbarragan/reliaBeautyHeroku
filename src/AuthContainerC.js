var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('./../app/authentication');

//var NavBarC = require('./NavBarC');

var AuthContainerC = React.createClass({
  getInitialState: function(){
    return{loggedIn: auth.loggedIn()}
  },
  updateAuth: function(loggedIn) {
    console.log('This is from the Auth Container');
    console.log('did we ever get into the updateAuth func?');
    console.log('Set the state to loggedIn:',loggedIn);
    this.setState({loggedIn: loggedIn});
    if(loggedIn){
      console.log('we are logged in!');
      //this.props.history.pushState(null, '/');
    }
    else console.log('we are not logged in.');
  },
  componentWillMount: function() {
    //this.updateAuth = this.updateAuth.bind(this);
    auth.onChange = this.updateAuth;
  },
  render: function() {
    console.log('AuthContainerC: Rendering')

    return (
      <div>
        {this.props.children}
      </div>
      );

  }

});

module.exports = AuthContainerC;
