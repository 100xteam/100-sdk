var _ = require('underscore');
module.exports = function(sdk){
    var role = sdk.Role = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    role.prototype.base_uri = '/roles';

    role.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(role.prototype.base_uri, query, function(err, role_records){
            if(err) return callback(err);
            var roles = [];
            for(var i in role_records){
                roles.push(new role(role_records[i]));
            }
            return callback(null, roles);
        });

    }

	role.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = role.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rRole = null;
				if(body){
					rRole = new role(body);
				}
				return callback(null, rRole, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		role.find(query, function(err, roles){
			if(err) return callback(err);
			if(!roles || roles.length == 0){
				return null;
			}
			return callback(null, roles[0]);
		});

	}

    role.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = role.prototype.base_uri;
            

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
	role.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    role.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.permissions = this.permissions;

        
			
			ret.archiveDate = this.archiveDate;

        
			
			ret.approvedDate = this.approvedDate;

        
			
			ret.assignee = this.assignee;

        
			
			ret.assignor = this.assignor;

        
			
			ret.project = this.project;

        
        return ret;
    }
    return  role;
}