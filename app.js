var fs = require('fs'),
    byline = require('byline');
var mhash = require("mhash");

var file = process.argv[2];
var destination = file.replace(/(.*)(\.csv)$/gi, '$1_' + mhash('crc32b', new Date().toISOString()) + '$2');

var inStream = byline(fs.createReadStream(file, { encoding: 'utf8' }));
var outStream = fs.createWriteStream(destination);

inStream.on('data', function(line) {
	var line = line.replace(/([a-zA-Z0-9\-\_\.]*)@([a-zA-Z0-9\-\_\.]*)/gi, function(match){
		return mhash('crc32b', match) + '@email.com';
	});
	outStream.write(line + '\n');
});