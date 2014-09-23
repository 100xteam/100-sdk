var _ = require('underscore');
module.exports = function(sdk){
    var tag = sdk.Tag = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    tag.prototype.base_uri = '/tags';

    tag.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(tag.prototype.base_uri, query, function(err, tag_records){
            if(err) return callback(err);
            var tags = [];
            for(var i in tag_records){
                tags.push(new tag(tag_records[i]));
            }
            return callback(null, tags);
        });

    }

    tag.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = tag.prototype.base_uri;
            

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
    tag.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
            ret.namespace = this.namespace;
        
            ret.name = this.name;
        
            ret.desc = this.desc;
        
            ret.archiveDate = this.archiveDate;
        
        return ret;
    }
    return  tag;
}