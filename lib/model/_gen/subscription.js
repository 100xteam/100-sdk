var _ = require('underscore');
module.exports = function(sdk){
    var subscription = sdk.Subscription = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

	subscription.prototype._njax_type = 'Subscription';



    subscription.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
		if(query.uri){
			var uri = query.uri;
		}else if(query._parent_uri){
			var uri = query._parent_uri + '/subscriptions';
		}else if(query.account){
			var uri = '/' + query.account + '/subscriptions';
		}
		
        sdk.find(uri, query, function(err, subscription_records){
            if(err) return callback(err);
            var subscriptions = [];
            for(var i in subscription_records){
                subscriptions.push(new subscription(subscription_records[i]));
            }
            return callback(null, subscriptions);
        });

    }

	subscription.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = this._parent_uri + '/subscriptions/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rSubscription = null;
				if(body){
					rSubscription = new subscription(body);
				}
				return callback(null, rSubscription, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		subscription.find(query, function(err, subscriptions){
			if(err) return callback(err);
			if(!subscriptions || subscriptions.length == 0){
				return callback(null, null);
			}
			return callback(null, subscriptions[0]);
		});

	}

    subscription.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this._parent_uri + '/subscriptions';
            

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
	subscription.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    subscription.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.event_filters = this.event_filters;

        
			
			ret.short_namespace = this.short_namespace;

        
			
			ret.type = this.type;

        
			
			ret.entity_url = this.entity_url;

        
			
			ret.entity_type = this.entity_type;

        
			
			ret.entity_id = this.entity_id;

        
			
			ret.data = this.data;

        
			
			ret._entity_name = this._entity_name;

        
			
			ret._entity_namespace = this._entity_namespace;

        
			
			ret.application = this.application;

        
			
			ret.account = this.account;

        
        return ret;
    }
    return  subscription;
}
