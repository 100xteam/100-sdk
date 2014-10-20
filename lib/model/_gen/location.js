var _ = require('underscore');
module.exports = function(sdk){
    var location = sdk.Location = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    location.prototype.base_uri = '/locations';

    location.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(location.prototype.base_uri, query, function(err, location_records){
            if(err) return callback(err);
            var locations = [];
            for(var i in location_records){
                locations.push(new location(location_records[i]));
            }
            return callback(null, locations);
        });

    }

    location.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = location.prototype.base_uri;
            

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
        
            ret.original_img = this.original_img;
        
            ret.thumb_img = this.thumb_img;
        
            ret.facebook_url = this.facebook_url;
        
            ret.twitter_url = this.twitter_url;
        
            ret.linkedin_url = this.linkedin_url;
        
            ret.instagram_url = this.instagram_url;
        
            ret.website_url = this.website_url;
        
            ret.blog_url = this.blog_url;
        
            ret.archiveDate = this.archiveDate;
        
            ret.host = this.host;
        
        return ret;
    }
    return  location;
}