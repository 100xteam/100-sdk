
module.exports = function(sdk){

    var profile = require('./_gen/profile')(sdk);
    /*
        Custom Code goes here
    */
	profile.prototype.base_uri = '/members';//This is hacky


	return profile;
}