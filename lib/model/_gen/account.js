var _ = require('underscore');
module.exports = function(sdk){
    var account = sdk.Account = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    
		account.prototype.base_uri = '';
    

	account.prototype._njax_type = 'Account';



    account.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
			var uri = account.prototype.base_uri;
		
        sdk.find(uri, query, function(err, account_records){
            if(err) return callback(err);
            var accounts = [];
            for(var i in account_records){
                accounts.push(new account(account_records[i]));
            }
            return callback(null, accounts);
        });

    }

	account.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = account.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rAccount = null;
				if(body){
					rAccount = new account(body);
				}
				return callback(null, rAccount, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		account.find(query, function(err, accounts){
			if(err) return callback(err);
			if(!accounts || accounts.length == 0){
				return callback(null, null);
			}
			return callback(null, accounts[0]);
		});

	}

    account.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = account.prototype.base_uri;
            

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
	account.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    account.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.email = this.email;

        
			
			ret.name = this.name;

        
			
			ret.namespace = this.namespace;

        
			
			ret.active = this.active;

        
			
			ret.forgot_pass_code = this.forgot_pass_code;

        
        return ret;
    }
    return  account;
}