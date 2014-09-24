var _ = require('underscore');
module.exports = function(sdk){
    var curator = sdk.Curator = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    curator.prototype.base_uri = '/locations/:location/curators';

    curator.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(curator.prototype.base_uri, query, function(err, curator_records){
            if(err) return callback(err);
            var curators = [];
            for(var i in curator_records){
                curators.push(new curator(curator_records[i]));
            }
            return callback(null, curators);
        });

    }

    curator.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this.parent_uri + '/curators';
            

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
    curator.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
            ret._account_name = this._account_name;
        
            ret._location_name = this._location_name;
        
            ret.location = this.location;
        
            ret.account = this.account;
        
            ret.archiveDate = this.archiveDate;
        
        return ret;
    }
    return  curator;
}