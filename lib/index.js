var request = require('request');
var _ = require('underscore');

var config = {
    'protocol':'http',
    'host':'api.local.100i.com:3030'
}
module.exports = function(options){
    config = _.extend(options, config);
    if(!config.host){
        if(host.domain && host.port){
            config.host = host.domain + ':' + host.port;
        }
    }

    var state100 = {

        call:function(method, uri, body, options, callback){

            if(_.isFunction(body)){
                callback = body;
                options = {};
                body = null;
            }else if(_.isFunction(options)){
                callback = options;
                options = {};
            }
            if(!options){
                options = {};
            }

            options.method = method;
            options.url = config.protocol + '://' + config.host  + uri;
            options.headers = {};
            if(!_.isUndefined(options.client_id)){
                options.headers.client_id = options.client_id;
            }else{
                options.headers.client_id = config.client_id;
            }
            options.json = true;
            options.headers.client_secret = options.client_secret || config.client_secret;
            options.headers.access_token = options.access_token || config.access_token;

            if(body){
                options.body = body;
            }
            //console.debug(options);
            return request(options, function(err, response, body){
                if(err) return callback(err);
                var data = body;
                if(_.isString(body)){
                    try{
                        data = JSON.parse(body);
                    }catch(e){
                        console.error(body);
                        return callback(e);
                    }
                }
                if(data.error){
                    return callback(new Error(data.error.message || data.error));
                }
                return callback(err, data, response);
            });

        },
        trigger:function(users, event, data, callback){

            return this.call('post', '/trigger', { event: event, data:data, users:users }, callback)
        },
        register:function(name, email, password, callback){

            return this.call('post', '/register', { name:name, username:email, password:password }, callback)
        },
        find:function(uri, data, callback){

            this.call('get', uri, data, callback)
        },
        save:function(data, callback){

            //Check for _id or uri
            this.call('post', data.uri, data, callback)

        }
    };


    
        require('./model/account')(state100);
    
        require('./model/application')(state100);
    
        require('./model/accessToken')(state100);
    
        require('./model/requestCode')(state100);
    
        require('./model/tag')(state100);
    
        require('./model/project')(state100);
    
        require('./model/projectSkill')(state100);
    
        require('./model/accountSkill')(state100);
    
        require('./model/role')(state100);
    
        require('./model/profile')(state100);
    
        require('./model/skill')(state100);
    
        require('./model/location')(state100);
    
        require('./model/curator')(state100);
    
    return state100;
}