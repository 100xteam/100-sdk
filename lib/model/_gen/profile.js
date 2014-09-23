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

    profile.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this.parent_uri + '/profile';
            

        }


        sdk.save(this, _.bind(function(err, response, body){
            if(err) return callback(err);
            if(body.uri){
                for(var i in body){
                    this[i] = body[i];
                }
            }
            return callback(null, response, this);
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
        
            ret.original_img = this.original_img;
        
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