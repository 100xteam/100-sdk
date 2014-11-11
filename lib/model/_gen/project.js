var _ = require('underscore');
module.exports = function(sdk){
    var project = sdk.Project = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

	project.prototype._njax_type = 'Project';



    project.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }

		
		if(query.uri){
			var uri = query.uri;
		}else if(query._parent_uri){
			var uri = query._parent_uri + '/projects';
		}else if(query.location){
			var uri = '/locations/' + query.location + '/projects';
		}
		
        sdk.find(uri, query, function(err, project_records){
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
			
			var uri = this.parent_uri + '/projects/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
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
				return callback(null, null);
			}
			return callback(null, projects[0]);
		});

	}

    project.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = this.parent_uri + '/projects';
            

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
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
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

        
			
			ret.subType = this.subType;

        
			
			ret.tagline = this.tagline;

        
			
			ret.company = this.company;

        
			
			ret.desc = this.desc;

        
			
			ret.enrollment_type = this.enrollment_type;

        
			
				ret.original_img_s3 = this.original_img_s3;
			
			ret.original_img = this.original_img;

        
			
				ret.thumb_img_s3 = this.thumb_img_s3;
			
			ret.thumb_img = this.thumb_img;

        
			
			ret.facebook_url = this.facebook_url;

        
			
			ret.twitter_url = this.twitter_url;

        
			
			ret.linkedin_url = this.linkedin_url;

        
			
			ret.instagram_url = this.instagram_url;

        
			
			ret.github_url = this.github_url;

        
			
			ret.website_url = this.website_url;

        
			
			ret.blog_url = this.blog_url;

        
			
			ret.location_friendly_url = this.location_friendly_url;

        
			
			ret.owner = this.owner;

        
			
			ret.location = this.location;

        
			
			ret.type = this.type;

        
			
			ret.archiveDate = this.archiveDate;

        
        return ret;
    }
    return  project;
}