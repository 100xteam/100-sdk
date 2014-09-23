var _ = require('underscore');
module.exports = function(sdk){
    var requestCode = sdk.RequestCode = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    requestCode.prototype.base_uri = '/request_codes';

    requestCode.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(requestCode.prototype.base_uri, query, function(err, requestCode_records){
            if(err) return callback(err);
            var requestCodes = [];
            for(var i in requestCode_records){
                requestCodes.push(new requestCode(requestCode_records[i]));
            }
            return callback(null, requestCodes);
        });

    }

    requestCode.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = requestCode.prototype.base_uri;
            

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
    requestCode.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
            ret.code = this.code;
        
            ret.application = this.application;
        
        return ret;
    }
    return  requestCode;
}