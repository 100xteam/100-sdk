var _ = require('underscore');
module.exports = function(sdk){
    var accessToken = sdk.AccessToken = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    accessToken.prototype.base_uri = '/access_tokens';

    accessToken.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(accessToken.prototype.base_uri, query, function(err, accessToken_records){
            if(err) return callback(err);
            var accessTokens = [];
            for(var i in accessToken_records){
                accessTokens.push(new accessToken(accessToken_records[i]));
            }
            return callback(null, accessTokens);
        });

    }

	accessToken.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = accessToken.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rAccessToken = null;
				if(body){
					rAccessToken = new accessToken(body);
				}
				return callback(null, rAccessToken, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		accessToken.find(query, function(err, accessTokens){
			if(err) return callback(err);
			if(!accessTokens || accessTokens.length == 0){
				return null;
			}
			return callback(null, accessTokens[0]);
		});

	}

    accessToken.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = accessToken.prototype.base_uri;
            

        }


        sdk.save(this, _.bind(function(err, body, response){
            if(err) return callback(err);

            if(body.uri){
                for(var i in body){
                    this[i] = body[i];
                }
            }
            return callback(null, this, response);
        }, this));

    }
	accessToken.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    accessToken.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.perms = this.perms;

        
			
			ret.token = this.token;

        
			
			ret.application = this.application;

        
			
			ret.account = this.account;

        
        return ret;
    }
    return  accessToken;
}