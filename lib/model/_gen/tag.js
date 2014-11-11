var _ = require('underscore');
module.exports = function(sdk){
    var tag = sdk.Tag = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    
		tag.prototype.base_uri = '/tags';
    

	tag.prototype._njax_type = 'Tag';



    tag.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
			var uri = tag.prototype.base_uri;
		
        sdk.find(uri, query, function(err, tag_records){
            if(err) return callback(err);
            var tags = [];
            for(var i in tag_records){
                tags.push(new tag(tag_records[i]));
            }
            return callback(null, tags);
        });

    }

	tag.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = tag.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rTag = null;
				if(body){
					rTag = new tag(body);
				}
				return callback(null, rTag, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		tag.find(query, function(err, tags){
			if(err) return callback(err);
			if(!tags || tags.length == 0){
				return callback(null, null);
			}
			return callback(null, tags[0]);
		});

	}

    tag.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = tag.prototype.base_uri;
            

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
	tag.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    tag.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.type = this.type;

        
			
			ret.sub_type = this.sub_type;

        
			
			ret.value = this.value;

        
			
			ret.entity_type = this.entity_type;

        
			
			ret.entity_url = this.entity_url;

        
			
			ret.entity_id = this.entity_id;

        
			
			ret._entity_name = this._entity_name;

        
			
			ret._entity_namespace = this._entity_namespace;

        
			
			ret.application = this.application;

        
			
			ret.account = this.account;

        
        return ret;
    }
    return  tag;
}