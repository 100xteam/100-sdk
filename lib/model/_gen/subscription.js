var _ = require('underscore');
module.exports = function(sdk){
    var subscription = sdk.Subscription = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    
		subscription.prototype.base_uri = '/subscription';
    

	subscription.prototype._njax_type = 'Subscription';



    subscription.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
			var uri = subscription.prototype.base_uri;
		
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
			
			var uri = subscription.prototype.base_uri + '/' + query;
			
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

            
                this.uri = subscription.prototype.base_uri;
            

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

        
			
			ret.entity_url = this.entity_url;

        
			
			ret.entity_type = this.entity_type;

        
			
			ret.entity_id = this.entity_id;

        
			
			ret.data = this.data;

        
			
			ret.account = this.account;

        
        return ret;
    }
    return  subscription;
}