var _ = require('underscore');
module.exports = function(sdk){
    var profile = sdk.Profile = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    profile.prototype.base_uri = '/:account/profile';

    profile.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(profile.prototype.base_uri, query, function(err, profile_records){
            if(err) return callback(err);
            var profiles = [];
            for(var i in profile_records){
                profiles.push(new profile(profile_records[i]));
            }
            return callback(null, profiles);
        });

    }

	profile.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = this.parent_uri + '/profile/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rProfile = null;
				if(body){
					rProfile = new profile(body);
				}
				return callback(null, rProfile, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		profile.find(query, function(err, profiles){
			if(err) return callback(err);
			if(!profiles || profiles.length == 0){
				return null;
			}
			return callback(null, profiles[0]);
		});

	}

    profile.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this.parent_uri + '/profile';
            

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
	profile.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    profile.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.name = this.name;

        
			
			ret.desc = this.desc;

        
			
			ret.type = this.type;

        
			
			ret.company = this.company;

        
			
			ret.tagline = this.tagline;

        
			
				ret.original_img_s3 = this.original_img_s3;
			
			ret.original_img = this.original_img;

        
			
				ret.thumb_img_s3 = this.thumb_img_s3;
			
			ret.thumb_img = this.thumb_img;

        
			
			ret.facebook_url = this.facebook_url;

        
			
			ret.twitter_url = this.twitter_url;

        
			
			ret.linkedin_url = this.linkedin_url;

        
			
			ret.instagram_url = this.instagram_url;

        
			
			ret.github_url = this.github_url;

        
			
			ret.website_url = this.website_url;

        
			
			ret.blog_url = this.blog_url;

        
			
			ret.owner = this.owner;

        
			
			ret.location = this.location;

        
			
			ret.archiveDate = this.archiveDate;

        
			
			ret.approveDate = this.approveDate;

        
			
			ret.approveUser = this.approveUser;

        
        return ret;
    }
    return  profile;
}