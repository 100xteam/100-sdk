var _ = require('underscore');
module.exports = function(sdk){
    var project = sdk.Project = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    project.prototype.base_uri = '/projects';

    project.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(project.prototype.base_uri, query, function(err, project_records){
            if(err) return callback(err);
            var projects = [];
            for(var i in project_records){
                projects.push(new project(project_records[i]));
            }
            return callback(null, projects);
        });

    }

    project.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = project.prototype.base_uri;
            

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
    project.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
            ret.namespace = this.namespace;
        
            ret.name = this.name;
        
            ret.type = this.type;
        
            ret.subType = this.subType;
        
            ret.tagline = this.tagline;
        
            ret.company = this.company;
        
            ret.desc = this.desc;
        
            ret.enrollment_type = this.enrollment_type;
        
            ret.original_img = this.original_img;
        
            ret.thumb_img = this.thumb_img;
        
            ret.website_url = this.website_url;
        
            ret.owner = this.owner;
        
            ret.location = this.location;
        
            ret.archiveDate = this.archiveDate;
        
        return ret;
    }
    return  project;
}