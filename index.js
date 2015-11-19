var child_process = require('child_process');
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var argv = require('minimist')(process.argv.slice(2));
var shifts = [];
var email = argv.e;
var message = argv.m;

if (!email) {
	console.log('need an email..')
	return false;
}
if (!message) {
	console.log('need a message..')
	return false;
}

var table = {
	A: {width: 5, points: [9,10,11,12,13,15,18,22,25,30,31,32,33,34]},
	B: {width: 5, points: [8,9,10,11,12,13,15,17,20,22,24,27,30,32,33]},
	C: {width: 5, points: [9,10,11,12,15,20,22,27,30,33]},
	D: {width: 5, points: [8,9,10,11,12,13,15,20,22,27,30,31,32,33]},
	E: {width: 5, points: [8,9,10,11,12,13,15,17,20,22,24,27,29,31,34]},
	F: {width: 5, points: [8,9,10,11,12,13,15,17,22,24,29,31]},
	G: {width: 5, points: [9,10,11,12,15,20,22,25,27,30,32,33]},
	H: {width: 5, points: [8,9,10,11,12,13,17,24,29,30,31,32,33,34]},
	I: {width: 4, points: [8,13,15,16,17,18,19,20,22,27]},
	J: {width: 5, points: [8,11,12,15,20,22,27,29,30,31,32,33]},
	K: {width: 5, points: [8,9,10,11,12,13,17,18,23,26,29,34]},
	L: {width: 5, points: [8,9,10,11,12,13,20,27,34]},
	M: {width: 6, points: [8,9,10,11,12,13,16,24,30,36,37,38,39,40,41]},
	N: {width: 5, points: [8,9,10,11,12,13,16,17,25,26,29,30,31,32,33,34]},
	O: {width: 5, points: [9,10,11,12,15,20,22,27,30,31,32,33]},
	P: {width: 5, points: [8,9,10,11,12,13,15,18,22,25,30,31]},
	Q: {width: 5, points: [9,10,11,12,15,20,22,25,27,30,31,32,33,34]},
	R: {width: 5, points: [8,9,10,11,12,13,15,18,22,25,30,31,33,34]},
	S: {width: 5, points: [9,10,12,15,17,20,22,25,27,30,32,33]},
	T: {width: 5, points: [1,8,15,16,17,18,19,20,22,29]},
	U: {width: 5, points: [8,9,10,11,12,20,27,29,30,31,32,33]},
	V: {width: 4, points: [8,9,10,11,12,20,22,23,24,25,26]},
	W: {width: 6, points: [8,9,10,11,12,20,22,23,24,25,26,34,36,37,38,39,40]},
	X: {width: 5, points: [8,9,12,13,17,18,24,25,29,30,33,34]},
	Y: {width: 4, points: [8,9,10,17,18,19,20,22,23,24]},
	Z: {width: 5, points: [8,12,13,15,18,20,22,24,27,29,30,34]},

	a: {width: 5, points: [10,11,12,16,20,23,27,30,31,32,33,34]},
	b: {width: 5, points: [8,9,10,11,12,13,16,20,23,27,31,32,33]},
	c: {width: 5, points: [10,11,12,16,20,23,27,30,34]},
	b: {width: 5, points: [9,10,11,12,13,16,20,23,27,29,30,31,32,33]},
	e: {width: 5, points: [10,11,12,16,18,20,23,25,27,31,32,34]},
	f: {width: 4, points: [11,16,17,18,19,20,23,25]},
	g: {width: 4, points: [9,10,11,13,16,18,20,23,24,25,26,27]},
	h: {width: 4, points: [9,10,11,12,13,18,20,25,26,27]},
	i: {width: 2, points: [9,11,12,13]},
	j: {width: 3, points: [13,16,18,19,20]},
	k: {width: 4, points: [9,10,11,12,13,19,25,27]},
	l: {width: 2, points: [9,10,11,12,13]},
	m: {width: 6, points: [10,11,12,13,16,24,25,26,27,30,38,39,40,41]},
	n: {width: 5, points: [10,11,12,13,16,23,30,31,32,33,34]},
	o: {width: 5, points: [10,11,12,16,20,23,27,31,32,33]},
	p: {width: 5, points: [9,10,11,12,13,16,18,23,25,30,31,32]},
	q: {width: 5, points: [9,10,11,16,18,23,25,30,31,32,33,34]},
	r: {width: 5, points: [9,10,11,12,13,18,24,30]},
	s: {width: 5, points: [9,10,11,13,16,18,20,23,25,27,30,32,33,34]},
	t: {width: 4, points: [10,16,17,18,19,20,24]},
	u: {width: 5, points: [9,10,11,12,20,27,30,31,32,33,34]},
	u: {width: 4, points: [9,10,11,12,20,23,24,25,26]},
	w: {width: 6, points: [9,10,11,12,20,23,24,25,26,34,37,38,39,40]},
	y: {width: 4, points: [9,10,11,13,18,20,23,24,25,26,27]},
	z: {width: 5, points: [9,13,16,18,20,23,24,27,30,31,34]},

}

table['!']  = {width: 2, points: [8,9,10,12,13,15,16,17,19,20]};
table[':']  = {width: 2, points: [8,9,12,13,15,16,18,19]};

var totalshift = 364 - moment().format('d') - 1 - 1;
var calculateShifts = function(message){
	var characters = message.split('');
	var shifts = [];
	for (var i=0; i<characters.length; i++) {
		var t = table[characters[i]];
		t.points.map(function(d){ shifts.push(totalshift - d) })
		totalshift -= t.width * 7
	}
	return shifts;
}
shifts = calculateShifts(message);

// child_process.exec("git log | grep commit ",
//   function (error, stdout, stderr) {
//   	var length = 40;
//   	var commits = [];

//     return Promise.resolve(stdout.replace(/commit/g, '').replace(/\n/g, '').split(' ')).map(function(d, i){
//     	if (d.length === 40){
//     		commits.push(d)
//     	}
//     }, {concurrency: 1}).then(function(){
//     	commits = commits.slice(1).reverse().slice(0, 365)
//     	var len = commits.length
//     	console.log('total length is: ' + len + ', can you believe that?')
// 	    return Promise.resolve(commits).map(function(d, i){
// 	    	if (i ===0) {
// 	    		return processCommit('', moment().add({days: -len + i}).format())
// 	    	}
// 	    		console.log(d, i, -len + i)
// 	    	return processCommit(d, moment().add({days: -len + i}).format())
// 	    }, {concurrency: 1})
//     })
// });

var commitChange = function(){
	return Promise.promisify(child_process.exec)('sh commit.sh').spread(function(stdout, stderr){
		console.log('stdout')
		console.log(stdout)
		console.log('stderr')
		console.log(stderr)
	})
}
var getLatestCommit = function(){
	return Promise.promisify(child_process.exec)('git log | grep commit').spread(function(stdout, stderr){
		return _.compact(stdout.replace(/commit/g, '').replace(/\n/g, '').split(' '))[0]
	})
};

// child_process.exec("git log | grep commit ",
//   function (error, stdout, stderr) {
//   	var length = 40;
//   	var commits = [];

//     return Promise.resolve(stdout.replace(/commit/g, '').replace(/\n/g, '').split(' ')).map(function(d, i){
//     	if (d.length === 40){
//     		commits.push(d)
//     	}
//     }, {concurrency: 1}).then(function(){
//     	commits = commits.slice(1).reverse().slice(0, 1)
//     	var len = commits.length
//     	console.log('total length is: ' + len + ', can you believe that?')
// 	    return Promise.resolve(commits).map(function(d, i){
// 	    	if (i ===0) {
// 	    		return processCommit('', moment().add({days: -len + i}).format())
// 	    	}
// 	    		console.log(d, i, -len + i)
// 	    	return processCommit(d, moment().add({days: -len + i}).format())
// 	    }, {concurrency: 1})
//     })
// });

function processCommit(commit, date) {

	date = '\"' + moment(new Date(date)).format('ddd MMM D 00:00:00 YYYY -0800') + '\"'

	return Promise.promisify(child_process.exec)('sh love.sh ' + commit + ' ' + date + ' ' + email).then(function(d){
		// console.log(d)
	})
}

var shiftAndCommit = function(shift){
	return Promise.resolve()
	.delay(2000)
	.then(function(){
		return commitChange();
	}).then(function(){
		return getLatestCommit()
	}).then(function(commit){
		var date = moment().add({days: -shift}).format();
		console.log([commit, date, shift])
		return processCommit(commit, date)
	})
}

Promise.resolve(shifts).map(function(d, i){
	return Promise.resolve()
	.then(function(){
		return shiftAndCommit(d);
	}).then(function(){
		return shiftAndCommit(d);
	})
}, {concurrency: 1})


