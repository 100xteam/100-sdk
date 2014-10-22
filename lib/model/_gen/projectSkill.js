var _ = require('underscore');
module.exports = function(sdk){
    var projectSkill = sdk.ProjectSkill = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

    projectSkill.prototype.base_uri = '/project_skill';

    projectSkill.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(projectSkill.prototype.base_uri, query, function(err, projectSkill_records){
            if(err) return callback(err);
            var projectSkills = [];
            for(var i in projectSkill_records){
                projectSkills.push(new projectSkill(projectSkill_records[i]));
            }
            return callback(null, projectSkills);
        });

    }

	projectSkill.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = projectSkill.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, this, function(err, body, response){
				if(err) return callback(err);
				var rProjectSkill = null;
				if(body){
					rProjectSkill = new projectSkill(body);
				}
				return callback(null, rProjectSkill, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		projectSkill.find(query, function(err, projectSkills){
			if(err) return callback(err);
			if(!projectSkills || projectSkills.length == 0){
				return null;
			}
			return callback(null, projectSkills[0]);
		});

	}

    projectSkill.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = projectSkill.prototype.base_uri;
            

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
	projectSkill.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri, this, _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    projectSkill.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret._name_cache = this._name_cache;

        
			
			ret.project = this.project;

        
			
			ret.skill = this.skill;

        
			
			ret.archiveDate = this.archiveDate;

        
        return ret;
    }
    return  projectSkill;
}