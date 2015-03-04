var async = require('async');
var _ = require('underscore');
module.exports = function(sdk){

    var account = require('./_gen/account')(sdk);
    /*
        Custom Code goes here
    */
    sdk.Account.findByAccessToken = function(access_token, options, callback){
        if(!options){
            options = {};
        }

        options.access_token = access_token;

        sdk.call('get', '/me', null, options, function(err, account_data, response){
            if(err) return callback(err);
            if(!account_data.user){
                return callback(new Error("No user data found with that access token"));
            }
            var _account = new account(account_data.user);
            _account.access_token = access_token;

            return callback(null, _account);
        });
    };
    sdk.Account.prototype.curated_locations = function(options, callback){
        if(!options){
            options = {};
        }
        if(this.access_token){
            options.access_token = this.access_token;
        }
        sdk.call('get', '/curated_locations', null, options, function(err, location_records, response){
            if(err) return callback(err);
            var locations = [];
            for(var i in location_records){
                locations.push(new sdk.Location(location_records[i]));
            }
            return callback(null, locations);
        });
    }
	sdk.Account.prototype.profiles = function(options, callback){
		if(!options){
			options = {};
		}
		if(this.access_token){
			options.access_token = this.access_token;
		}
		sdk.call('get', this.url + '/profiles', null, options, function(err, profiles, response){
			if(err) return callback(err);
			var locations = [];
			for(var i in location_records){
				locations.push(new sdk.Profile(location_records[i]));
			}
			return callback(null, locations);
		});
	}


	/** Special overwritten find method **/
	sdk.Account.find = function(query, callback){
		if(_.isFunction(query)){
			callback = query;
			query = null;
		}


		var uri = '/accounts';

		sdk.find(uri, query, function(err, account_records){
			if(err) return callback(err);
			var accounts = [];
			for(var i in account_records){
				accounts.push(new account(account_records[i]));
			}
			return callback(null, accounts);
		});

	}





	var _toObject = sdk.Account.prototype.toObject;
	sdk.Account.prototype.toObject = function(options){
		var ret = _.bind(_toObject, this)(options);
		ret.access_token = this.access_token;
		return ret;

	}
    return account;
}