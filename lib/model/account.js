
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
    return account;
}