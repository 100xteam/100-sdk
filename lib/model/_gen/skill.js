var _ = require('underscore');
module.exports = function(sdk){
    var skill = sdk.Skill = function(data){
        for(var i in data){
            this[i] = data[i];
        }
        return this;
    }
    

    

	skill.prototype._njax_type = 'Skill';

    skill.prototype.base_uri = '/skills';

    skill.find = function(query, callback){
        if(_.isFunction(query)){
            callback = query;
            query = null;
        }
        sdk.find(skill.prototype.base_uri, query, function(err, skill_records){
            if(err) return callback(err);
            var skills = [];
            for(var i in skill_records){
                skills.push(new skill(skill_records[i]));
            }
            return callback(null, skills);
        });

    }

	skill.findOne = function(query, callback){
		if(_.isString(query)){
			
			var uri = skill.prototype.base_uri + '/' + query;
			
			return sdk.call('get', uri, function(err, body, response){
				if(err) return callback(err);
				var rSkill = null;
				if(body){
					rSkill = new skill(body);
				}
				return callback(null, rSkill, response);
			});
		}

		if(_.isFunction(query)){
			callback = query;
			query = null;
		}
		skill.find(query, function(err, skills){
			if(err) return callback(err);
			if(!skills || skills.length == 0){
				return null;
			}
			return callback(null, skills[0]);
		});

	}

    skill.prototype.save = function(callback){
        if(!this.uri){

            
                this.uri = skill.prototype.base_uri;
            

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
	skill.prototype.remove = function(callback){
		//Check for _id or uri
		sdk.call('delete', this.uri,  _.bind(function(err, body, response){
			if(err) return callback(err);

			return callback(null, this, response);
		}, this));

	}
    skill.prototype.toObject = function(options){
        var ret = {};
        ret._id = this._id;
        ret.uri = this.uri;
        ret.url = this.url;
        ret.api_url = this.api_url;
        
			
			ret.name = this.name;

        
			
			ret.namespace = this.namespace;

        
			
			ret.type = this.type;

        
			
			ret.value = this.value;

        
			
			ret.archiveDate = this.archiveDate;

        
        return ret;
    }
    return  skill;
}