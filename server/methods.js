Meteor.methods({
	testBuffer(str){
		var buf = new Buffer(str, 'base64');
		console.log(buf);
	}
})