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

	project.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = project.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, this, function(err, body, response){
				if(err) return callback(err);
				var rProject = null;
				if(body){
					rProject = new project(body);
				}
				return callback(null, rProject, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		project.find(query, function(err, projects){
			if(err) return callback(err);
			if(!projects || projects.length == 0){
				return null;
			}
			return callback(null, projects[0]);
		});

	}

    project.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = project.prototype.base_uri;
            

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
	project.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri, this, _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
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

        
			
				ret.original_img_s3 = this.original_img_s3;
			
			ret.original_img = this.original_img;

        
			
				ret.thumb_img_s3 = this.thumb_img_s3;
			
			ret.thumb_img = this.thumb_img;

        
			
			ret.website_url = this.website_url;

        
			
			ret.owner = this.owner;

        
			
			ret.location = this.location;

        
			
			ret.archiveDate = this.archiveDate;

        
        return ret;
    }
    return  project;
}