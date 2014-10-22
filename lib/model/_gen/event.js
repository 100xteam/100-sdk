var _ = require('underscore');
module.exports = function(sdk){
    var event = sdk.Event = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    event.prototype.base_uri = '/events';

    event.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(event.prototype.base_uri, query, function(err, event_records){
            if(err) return callback(err);
            var events = [];
            for(var i in event_records){
                events.push(new event(event_records[i]));
            }
            return callback(null, events);
        });

    }

	event.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = event.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, this, function(err, body, response){
				if(err) return callback(err);
				var rEvent = null;
				if(body){
					rEvent = new event(body);
				}
				return callback(null, rEvent, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		event.find(query, function(err, events){
			if(err) return callback(err);
			if(!events || events.length == 0){
				return null;
			}
			return callback(null, events[0]);
		});

	}

    event.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = event.prototype.base_uri;
            

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
	event.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri, this, _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    event.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.event_namespace = this.event_namespace;

        
			
			ret.short_namespace = this.short_namespace;

        
			
			ret.entity_url = this.entity_url;

        
			
			ret.data = this.data;

        
			
			ret.application = this.application;

        
			
			ret.accounts = this.accounts;

        
        return ret;
    }
    return  event;
}