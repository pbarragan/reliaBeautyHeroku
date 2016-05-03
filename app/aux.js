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

/*
  unescapeHTML(string) {
  var entityMap = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': "/"
  };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  },
*/
  unescapeHTML(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&#x2F;/g,"/");
  },

  arrayMax(numArray) {
    return Math.max.apply(null, numArray);
  },
  arrayMin(numArray) {
    return Math.min.apply(null, numArray);
  },

  //------------- Don't use these
  sortBy(field, reverse, primer){
    console.log('whats the deal');
    var key = primer ? 
      function(x) {return primer().apply(null,[x[field],x].concat(Array.prototype.slice.call(arguments, 3)))} : 
      function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      a = key(a);
      b = key(b);
      return reverse * ((a > b) - (b > a));
    } 
  },
  sortObjects(docs,field,reverse,primer){
    console.log('im here');
    return docs.sort(this.sortBy().apply(null,Array.prototype.slice.call(arguments, 1)));
  },
  //------------- END Don't use these

  sortTwoAscending(A,B){
    // assuming a and b are the same length
    // assume a is what to sort on
    var ASorted = A.map(function(e,i){return i;}).sort(function(a,b){return A[a] - A[b];}).map(function(e){return A[e];});
    var BSorted = A.map(function(e,i){return i;}).sort(function(a,b){return A[a] - A[b];}).map(function(e){return B[e];});
    return [ASorted,BSorted]
  },
  sortTwoDescending(A,B){
    // assuming a and b are the same length
    // assume a is what to sort on
    var ASorted = A.map(function(e,i){return i;}).sort(function(a,b){return A[b] - A[a];}).map(function(e){return A[e];});
    var BSorted = A.map(function(e,i){return i;}).sort(function(a,b){return A[b] - A[a];}).map(function(e){return B[e];});
    return [ASorted,BSorted]
  },

  // AJAX Calls
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
    updateDoctor(data,cb) {
      console.log('im in the update doctor function');
      var request = {data: data};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/update/doctor', 
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
  deleteDoctor(data,cb) {
      console.log('im in the delete doctor function');
      var request = {data: data};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/delete/doctor', 
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
        
          //see if this works
          for(var i=0; i<data.doctors.length;i++){
            data.doctors[i].name = this.unescapeHTML(data.doctors[i].name);
            data.doctors[i].numandstreet = this.unescapeHTML(data.doctors[i].numandstreet);
            data.doctors[i].city = this.unescapeHTML(data.doctors[i].city);
            data.doctors[i].education = this.unescapeHTML(data.doctors[i].education);
            data.doctors[i].hospaff = this.unescapeHTML(data.doctors[i].hospaff);
            data.doctors[i].specialties = this.unescapeHTML(data.doctors[i].specialties);
          }

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

          //see if this works
          for(var i=0; i<data.doctors.length;i++){
            data.doctors[i].name = this.unescapeHTML(data.doctors[i].name);
            data.doctors[i].numandstreet = this.unescapeHTML(data.doctors[i].numandstreet);
            data.doctors[i].city = this.unescapeHTML(data.doctors[i].city);
            data.doctors[i].education = this.unescapeHTML(data.doctors[i].education);
            data.doctors[i].hospaff = this.unescapeHTML(data.doctors[i].hospaff);
            data.doctors[i].specialties = this.unescapeHTML(data.doctors[i].specialties);
          }


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