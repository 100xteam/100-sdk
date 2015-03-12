var _ = require('underscore');
module.exports = function(sdk){
    var locationSubscriotion = sdk.LocationSubscriotion = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

	locationSubscriotion.prototype._njax_type = 'LocationSubscriotion';



    locationSubscriotion.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
		if(query.uri){
			var uri = query.uri;
		}else if(query._parent_uri){
			var uri = query._parent_uri + '/location_subscriptions';
		}else if(query.follower){
			var uri = '/locations/' + query.follower + '/location_subscriptions';
		}
		
        sdk.find(uri, query, function(err, locationSubscriotion_records){
            if(err) return callback(err);
            var locationSubscriotions = [];
            for(var i in locationSubscriotion_records){
                locationSubscriotions.push(new locationSubscriotion(locationSubscriotion_records[i]));
            }
            return callback(null, locationSubscriotions);
        });

    }

	locationSubscriotion.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = this._parent_uri + '/location_subscriptions/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rLocationSubscriotion = null;
				if(body){
					rLocationSubscriotion = new locationSubscriotion(body);
				}
				return callback(null, rLocationSubscriotion, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		locationSubscriotion.find(query, function(err, locationSubscriotions){
			if(err) return callback(err);
			if(!locationSubscriotions || locationSubscriotions.length == 0){
				return callback(null, null);
			}
			return callback(null, locationSubscriotions[0]);
		});

	}

    locationSubscriotion.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this._parent_uri + '/location_subscriptions';
            

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
	locationSubscriotion.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    locationSubscriotion.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.follower = this.follower;

        
			
			ret.following = this.following;

        
        return ret;
    }
    return  locationSubscriotion;
}
