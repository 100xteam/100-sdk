
module.exports = function(sdk){

    var location = require('./_gen/location')(sdk);
    /*
        Custom Code goes here
    */
    location.prototype.curators = function(callback){
        sdk.Curator.findByLocation(this, callback);
    }
    return location;
}