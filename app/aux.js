var $ = require('jquery');

module.exports = {
  escapeHTML(string) {
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  },
  submitDoctor(data,cb) {
      console.log('im in the submit doctor function');
      var request = {data: data};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/submit/doctor', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json',
        headers: {'x-access-token':localStorage.token}
      })
      .then(function (data)  {
          console.log(data);
          console.log(data.message);
          if (cb) cb(true,'');
        },
        function (data)  {
          console.log(data);
          console.log(data.responseJSON.message);
          if (cb) cb(false,data.responseJSON.message);
        }
      );
    },
    retrieveDoctors(cb) {
      console.log('im in the retrieve doctors function');
      var request = {hello: 'hello'};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/api/doctors', 
        type: 'GET', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json',
        headers: {'x-access-token':localStorage.token}
      })
      .then(function (data)  {
          console.log(data);
          if (cb) cb(true,data);
        },
        function (data)  {
          console.log(data);
          if (cb) cb(false,data);
        }
      );
    },
    retrieveDoctorsQuery(filter,cb) {
      console.log('im in the retrieve doctors function');
      var request = {hello: 'hello'};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/api/doctors/filter', 
        type: 'GET', 
        data: filter,
        headers: {'x-access-token':localStorage.token}
      })
      .then(function (data)  {
          console.log(data);
          if (cb) cb(true,data);
        },
        function (data)  {
          console.log(data);
          if (cb) cb(false,data);
        }
      );
    }
}