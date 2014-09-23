var async = require('async');
var _ = require('underscore');
module.exports = function(sdk){

    var curator = require('./_gen/curator')(sdk);
    /*
        Custom Code goes here
    */
    curator.findByLocation = function(location, options, callback){
        if(_.isFunction(options)){
            callback = options;
            options = {};
        }
        if(!options){
            options = {};
        }



        sdk.call('get', location.uri + '/curators' , null, options, function(err, curator_reocrds, response){
            if(err) return callback(err);
            if(!curator_reocrds.length || curator_reocrds.length == 0){
                return callback(new Error("No user data found with that location"));
            }
            var accounts = [];
            for(var i in curator_reocrds){
                accounts.push(new sdk.Account(curator_reocrds[i].account));
            }

            return callback(null, accounts);
        });
    };

    return curator;
}