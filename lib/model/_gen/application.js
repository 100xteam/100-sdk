var _ = require('underscore');
module.exports = function(sdk){
    var application = sdk.Application = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    application.prototype.base_uri = '/apps';

    application.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(application.prototype.base_uri, query, function(err, application_records){
            if(err) return callback(err);
            var applications = [];
            for(var i in application_records){
                applications.push(new application(application_records[i]));
            }
            return callback(null, applications);
        });

    }

	application.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = application.prototype.base_uri + '/' + query;
			
			return this.call('get', uri, this, _.bind(function(err, body, response){
				if(err) return callback(err);
				var application = null;
				if(body){
					application = new application(body);
				}
				return callback(null, application, response);
			}, this));
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		application.find(query, function(err, applications){
			if(err) return callback(err);
			if(!applications || applications.length == 0){
				return null;
			}
			return callback(null, applications[0]);
		});

	}

    application.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = application.prototype.base_uri;
            

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
	application.prototype.remove = function(callback){
		//Check for _id or uri
		this.call('delete', this.uri, this, _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    application.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.namespace = this.namespace;

        
			
			ret.name = this.name;

        
			
			ret.desc = this.desc;

        
			
			ret.app_url = this.app_url;

        
			
			ret.domain = this.domain;

        
			
			ret.secret = this.secret;

        
			
			ret.level = this.level;

        
			
			ret.callback_url = this.callback_url;

        
			
			ret.iframes = this.iframes;

        
			
			ret.owner = this.owner;

        
        return ret;
    }
    return  application;
}