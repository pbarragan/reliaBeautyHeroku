var React = require('react');
var Input = require('react-bootstrap/lib/Input');
var aux = require('./../app/aux');

var InputPriceDebounceC = React.createClass({
  getDefaultProps: function () {
    return {
      initialValue: '',
      onChange: function(e){
        console.log('fire action creator '+e.target.value);
    }
    };
  },
  getInitialState: function () {
    console.log("From input debounce, initial value",this.props.initialValue);
    return {
      value: this.props.initialValue,
      onChange: this.props.onChange,
      error: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('Input debounce will receive new props',nextProps)
    this.setState({
      value: nextProps.initialValue
    });
  },
  _searchOnServer: _.debounce(function(value,success){
    console.log(value);
    this.state.onChange(value,success);
  },800),
  handleChange: function (e) {
    var regexPrice = /^\d+(\.\d*)?$/;
    var escapedPrice = aux.escapeHTML(e.target.value);
    if(!regexPrice.test(escapedPrice)){
      this._searchOnServer(escapedPrice,false);
      return this.setState({value: escapedPrice,error: true});
    }

    console.log(e);
    console.log( e.target.value );
    console.log(escapedPrice);
    this.setState({value: escapedPrice,error: false});
    this._searchOnServer(escapedPrice,true);
  },
  render: function () {
    console.log('Rendering InputDebounceC')
    console.log(this.props.initialValue)
    console.log(this.state);
    var state = this.state;
    return (
      <Input bsStyle={this.state.error ? "error":undefined} placeholder={this.props.placeholder} type="text" value={state.value} onChange={this.handleChange} />
    );
  }
});

module.exports = InputPriceDebounceC;
