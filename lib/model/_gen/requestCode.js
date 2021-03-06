var _ = require('underscore');
module.exports = function(sdk){
    var requestCode = sdk.RequestCode = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    
		requestCode.prototype.base_uri = '/request_codes';
    

	requestCode.prototype._njax_type = 'RequestCode';



    requestCode.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
			var uri = requestCode.prototype.base_uri;
		
        sdk.find(uri, query, function(err, requestCode_records){
            if(err) return callback(err);
            var requestCodes = [];
            for(var i in requestCode_records){
                requestCodes.push(new requestCode(requestCode_records[i]));
            }
            return callback(null, requestCodes);
        });

    }

	requestCode.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = requestCode.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rRequestCode = null;
				if(body){
					rRequestCode = new requestCode(body);
				}
				return callback(null, rRequestCode, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		requestCode.find(query, function(err, requestCodes){
			if(err) return callback(err);
			if(!requestCodes || requestCodes.length == 0){
				return callback(null, null);
			}
			return callback(null, requestCodes[0]);
		});

	}

    requestCode.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = requestCode.prototype.base_uri;
            

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
	requestCode.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    requestCode.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.code = this.code;

        
			
			ret.application = this.application;

        
        return ret;
    }
    return  requestCode;
}
