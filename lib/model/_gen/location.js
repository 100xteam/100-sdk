var _ = require('underscore');
module.exports = function(sdk){
    var location = sdk.Location = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    
		location.prototype.base_uri = '/locations';
    

	location.prototype._njax_type = 'Location';



    location.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
			var uri = location.prototype.base_uri;
		
        sdk.find(uri, query, function(err, location_records){
            if(err) return callback(err);
            var locations = [];
            for(var i in location_records){
                locations.push(new location(location_records[i]));
            }
            return callback(null, locations);
        });

    }

	location.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = location.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rLocation = null;
				if(body){
					rLocation = new location(body);
				}
				return callback(null, rLocation, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		location.find(query, function(err, locations){
			if(err) return callback(err);
			if(!locations || locations.length == 0){
				return callback(null, null);
			}
			return callback(null, locations[0]);
		});

	}

    location.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = location.prototype.base_uri;
            

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
	location.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    location.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.name = this.name;

        
			
			ret.namespace = this.namespace;

        
			
			ret.desc = this.desc;

        
			
			ret.type = this.type;

        
			
			ret.tagline = this.tagline;

        
			
				ret.original_img_s3 = this.original_img_s3;
			
			ret.original_img = this.original_img;

        
			
				ret.cropped_img_s3 = this.cropped_img_s3;
			
			ret.cropped_img = this.cropped_img;

        
			
				ret.thumb_img_s3 = this.thumb_img_s3;
			
			ret.thumb_img = this.thumb_img;

        
			
				ret.sm_img_s3 = this.sm_img_s3;
			
			ret.sm_img = this.sm_img;

        
			
				ret.logo_img_s3 = this.logo_img_s3;
			
			ret.logo_img = this.logo_img;

        
			
				ret.logo_thumb_img_s3 = this.logo_thumb_img_s3;
			
			ret.logo_thumb_img = this.logo_thumb_img;

        
			
			ret.facebook_url = this.facebook_url;

        
			
			ret.twitter_url = this.twitter_url;

        
			
			ret.linkedin_url = this.linkedin_url;

        
			
			ret.instagram_url = this.instagram_url;

        
			
			ret.website_url = this.website_url;

        
			
			ret.blog_url = this.blog_url;

        
			
			ret.archiveDate = this.archiveDate;

        
			
			ret.host = this.host;

        
			
			ret.dns_mask = this.dns_mask;

        
			
			ret.tag_options = this.tag_options;

        
			
			ret.location_friendly_url = this.location_friendly_url;

        
			
			ret.custom_css = this.custom_css;

        
			
				ret.custom_css_asset_s3 = this.custom_css_asset_s3;
			
			ret.custom_css_asset = this.custom_css_asset;

        
			
			ret.setup_complete_date = this.setup_complete_date;

        
			
			ret.google_analytics = this.google_analytics;

        
			
			ret.visibility = this.visibility;

        
			
			ret.industury = this.industury;

        
			
			ret.accept_terms_date = this.accept_terms_date;

        
        return ret;
    }
    return  location;
}