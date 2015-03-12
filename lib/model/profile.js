var async = require('async');
var _ = require('underscore');
var debug = require('debug')('100-sdk');
module.exports = function(sdk){

    var profile = require('./_gen/profile')(sdk);
    /*
        Custom Code goes here
    */

	profile.find = function(query, callback){
		debug("MATT: REMEMBER YOU PUT THIS CODE HERE, FIX IT IN NJAX-GENERATOR");
		if(_.isFunction(query)){
			callback = query;
			query = null;
		}


		if(query.uri){
			var uri = query.uri;
		}else if(query._parent_uri){
			var uri = query._parent_uri + '/profile';
		}else if(query.owner){
			var uri = '/' + query.owner + '/profile';
		}

		sdk.find(uri, query, function(err, profile_records){
			if(err) return callback(err);
			var profiles = [];
			if(!profile_records){
				return callback(null, null);
			}else if(_.isArray(profile_records)){
				for(var i in profile_records){
					profiles.push(new profile(profile_records[i]));
				}
			}else if(profile_records._id){
				var profiles = new profile(profile_records);
			}else{
				return callback(new Error("Invalid Profile Record Returned"), profile_records);
			}
			return callback(null, profiles);
		});

	}
    return profile;
}