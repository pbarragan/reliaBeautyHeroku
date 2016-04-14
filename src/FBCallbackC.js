var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');


var FBCallbackC = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  	},

  componentWillMount: function() {
    console.log('URL params');
    console.log(this.props.params);
    console.log(this.props.location);
    auth.loginFacebook(this.props.location.query.token, 
      () => {
        console.log('at the routing section in FBCallbackC');
        const { location } = this.props;
        console.log(location);
        //console.log(location.state);
        if (location && location.state && location.state.nextPathname) {
          console.log('i am in the nextPathName');
          this.context.router.replace(location.state.nextPathname)
        } else {
          console.log('i am in the profile');
          this.context.router.replace('/profile')
        }

      });
  },

	render: function(){

		return (
      <div>
      </div>
		);
	}

});

module.exports = FBCallbackC;
