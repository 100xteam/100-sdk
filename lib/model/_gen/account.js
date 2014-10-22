var _ = require('underscore');
module.exports = function(sdk){
    var account = sdk.Account = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    account.prototype.base_uri = '';

    account.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(account.prototype.base_uri, query, function(err, account_records){
            if(err) return callback(err);
            var accounts = [];
            for(var i in account_records){
                accounts.push(new account(account_records[i]));
            }
            return callback(null, accounts);
        });

    }

	account.findOne = function(query, callback){
		if(_.isFunction(query)){
		callback = query;
		query = null;
		}
		account.find(query, function(err, accounts){
			if(err) return callback(err);
			if(!accounts || accounts.length == 0){
				return null;
			}
			return callback(null, accounts[0]);
		});

	}

    account.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = account.prototype.base_uri;
            

        }


        sdk.save(this, _.bind(function(err, response, body){
            if(err) return callback(err);
            if(body.uri){
                for(var i in body){
                    this[i] = body[i];
                }
            }
            return callback(null, response, this);
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