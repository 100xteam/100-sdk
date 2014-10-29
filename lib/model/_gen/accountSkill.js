var _ = require('underscore');
module.exports = function(sdk){
    var accountSkill = sdk.AccountSkill = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

	accountSkill.prototype._njax_type = 'AccountSkill';

    accountSkill.prototype.base_uri = '/account_skill';

    accountSkill.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(accountSkill.prototype.base_uri, query, function(err, accountSkill_records){
            if(err) return callback(err);
            var accountSkills = [];
            for(var i in accountSkill_records){
                accountSkills.push(new accountSkill(accountSkill_records[i]));
            }
            return callback(null, accountSkills);
        });

    }

	accountSkill.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = accountSkill.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rAccountSkill = null;
				if(body){
					rAccountSkill = new accountSkill(body);
				}
				return callback(null, rAccountSkill, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		accountSkill.find(query, function(err, accountSkills){
			if(err) return callback(err);
			if(!accountSkills || accountSkills.length == 0){
				return null;
			}
			return callback(null, accountSkills[0]);
		});

	}

    accountSkill.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = accountSkill.prototype.base_uri;
            

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
	accountSkill.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    accountSkill.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret._name_cache = this._name_cache;

        
			
			ret.account = this.account;

        
			
			ret.skill = this.skill;

        
			
			ret.archiveDate = this.archiveDate;

        
        return ret;
    }
    return  accountSkill;
}