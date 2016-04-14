var mongoUri = process.env.MONGOLAB_URI ||
'mongodb://localhost/reliaDB';
console.log(mongoUri);

module.exports = {
	'url' : mongoUri
};