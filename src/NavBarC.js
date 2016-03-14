var React = require('react');
var ReactDOM = require('react-dom');
//var $ = require('jquery');
//var Link = require('react-router').Link;

/*
var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Alert = require('react-bootstrap/lib/Alert');
*/
console.log('hello');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavItem = require('react-bootstrap/lib/NavItem');
var Nav = require('react-bootstrap/lib/Nav');
console.log('requires for NavBarC worked');


// creates a NavBar component
var NavBarC = React.createClass({ 
	render: function () {
        console.log("Rendering nav bar custom");

        
        // use MAP to create LI elements from our navItems prop
        var navElements = this.props.navItems.map( function(title,i) {
        	var navItem = <NavItem eventKey={i} href="#">{ title }</NavItem>
        	return navItem;
        });

        // we now draw our 'navElements' inside the UL
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.props.brand}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        { navElements }   
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBarC;

