100-sdk
=======

##API/SDK:

`var sdk100 = require('100-sdk')({ config: '...' });`


    

    

    

    

    

    

###Project:


####Query List:
`GET /projects`

#####NodeJS:
```
sdk100.Project.find({ }, function(err, projects){
    if(err) throw err;//Error
    console.log(projects);//Success
});
```

####Detail:
`POST /projects/:project_id`

#####NodeJS:
```
sdk100.Project.findOne({ _id:'project_id' }, function(err, project){
    if(err) throw err;//Error
    if(!project) throw new Error("No Project");

    console.log(project);//Success
});
```

####Update:
`POST /projects/:project_id`
#####NodeJS:
```
sdk100.Project.findOne({ _id:'project_id' }, function(err, project){
    if(err) throw err;//Error
    if(!project) throw new Error("No Project");

    //console.log(project);//Success

    
        project.namespace = ...;
    
        project.name = ...;
    
        project.type = ...;
    
        project.subType = ...;
    
        project.tagline = ...;
    
        project.company = ...;
    
        project.desc = ...;
    
        project.enrollment_type = ...;
    
        project.original_img = ...;
    
        project.thumb_img = ...;
    
        project.website_url = ...;
    
        project.owner = ...;
    
        project.location = ...;
    
        project.archiveDate = ...;
    
    project.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved project");//Success
    });
});
```

####Delete:
`DELETE /projects/:project_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
project.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed project");//Success
});
```
    

    

###ProjectSkill:


####Query List:
`GET /project_skill`

#####NodeJS:
```
sdk100.ProjectSkill.find({ }, function(err, projectSkills){
    if(err) throw err;//Error
    console.log(projectSkills);//Success
});
```

####Detail:
`POST /project_skill/:projectSkill_id`

#####NodeJS:
```
sdk100.ProjectSkill.findOne({ _id:'projectSkill_id' }, function(err, projectSkill){
    if(err) throw err;//Error
    if(!projectSkill) throw new Error("No ProjectSkill");

    console.log(projectSkill);//Success
});
```

####Update:
`POST /project_skill/:projectSkill_id`
#####NodeJS:
```
sdk100.ProjectSkill.findOne({ _id:'projectSkill_id' }, function(err, projectSkill){
    if(err) throw err;//Error
    if(!projectSkill) throw new Error("No ProjectSkill");

    //console.log(projectSkill);//Success

    
        projectSkill._name_cache = ...;
    
        projectSkill.project = ...;
    
        projectSkill.skill = ...;
    
        projectSkill.archiveDate = ...;
    
    projectSkill.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved projectSkill");//Success
    });
});
```

####Delete:
`DELETE /project_skill/:projectSkill_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
projectSkill.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed projectSkill");//Success
});
```
    

    

###AccountSkill:


####Query List:
`GET /account_skill`

#####NodeJS:
```
sdk100.AccountSkill.find({ }, function(err, accountSkills){
    if(err) throw err;//Error
    console.log(accountSkills);//Success
});
```

####Detail:
`POST /account_skill/:accountSkill_id`

#####NodeJS:
```
sdk100.AccountSkill.findOne({ _id:'accountSkill_id' }, function(err, accountSkill){
    if(err) throw err;//Error
    if(!accountSkill) throw new Error("No AccountSkill");

    console.log(accountSkill);//Success
});
```

####Update:
`POST /account_skill/:accountSkill_id`
#####NodeJS:
```
sdk100.AccountSkill.findOne({ _id:'accountSkill_id' }, function(err, accountSkill){
    if(err) throw err;//Error
    if(!accountSkill) throw new Error("No AccountSkill");

    //console.log(accountSkill);//Success

    
        accountSkill._name_cache = ...;
    
        accountSkill.account = ...;
    
        accountSkill.skill = ...;
    
        accountSkill.archiveDate = ...;
    
    accountSkill.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved accountSkill");//Success
    });
});
```

####Delete:
`DELETE /account_skill/:accountSkill_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
accountSkill.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed accountSkill");//Success
});
```
    

    

###Role:


####Query List:
`GET /projects/:project/roles`

#####NodeJS:
```
sdk100.Role.find({ }, function(err, roles){
    if(err) throw err;//Error
    console.log(roles);//Success
});
```

####Detail:
`POST /projects/:project/roles/:role_id`

#####NodeJS:
```
sdk100.Role.findOne({ _id:'role_id' }, function(err, role){
    if(err) throw err;//Error
    if(!role) throw new Error("No Role");

    console.log(role);//Success
});
```

####Update:
`POST /projects/:project/roles/:role_id`
#####NodeJS:
```
sdk100.Role.findOne({ _id:'role_id' }, function(err, role){
    if(err) throw err;//Error
    if(!role) throw new Error("No Role");

    //console.log(role);//Success

    
        role.permissions = ...;
    
        role.archiveDate = ...;
    
        role.approvedDate = ...;
    
        role.assignee = ...;
    
        role.assignor = ...;
    
        role.project = ...;
    
    role.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved role");//Success
    });
});
```

####Delete:
`DELETE /projects/:project/roles/:role_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
role.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed role");//Success
});
```
    

    

###Profile:


####Query List:
`GET /:account/profile`

#####NodeJS:
```
sdk100.Profile.find({ }, function(err, profiles){
    if(err) throw err;//Error
    console.log(profiles);//Success
});
```

####Detail:
`POST /:account/profile/:profile_id`

#####NodeJS:
```
sdk100.Profile.findOne({ _id:'profile_id' }, function(err, profile){
    if(err) throw err;//Error
    if(!profile) throw new Error("No Profile");

    console.log(profile);//Success
});
```

####Update:
`POST /:account/profile/:profile_id`
#####NodeJS:
```
sdk100.Profile.findOne({ _id:'profile_id' }, function(err, profile){
    if(err) throw err;//Error
    if(!profile) throw new Error("No Profile");

    //console.log(profile);//Success

    
        profile.name = ...;
    
        profile.desc = ...;
    
        profile.type = ...;
    
        profile.company = ...;
    
        profile.tagline = ...;
    
        profile.original_img = ...;
    
        profile.thumb_img = ...;
    
        profile.facebook_url = ...;
    
        profile.twitter_url = ...;
    
        profile.linkedin_url = ...;
    
        profile.instagram_url = ...;
    
        profile.github_url = ...;
    
        profile.website_url = ...;
    
        profile.blog_url = ...;
    
        profile.owner = ...;
    
        profile.location = ...;
    
        profile.archiveDate = ...;
    
        profile.approveDate = ...;
    
        profile.approveUser = ...;
    
    profile.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved profile");//Success
    });
});
```

####Delete:
`DELETE /:account/profile/:profile_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
profile.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed profile");//Success
});
```
    

    

###Skill:


####Query List:
`GET /skills`

#####NodeJS:
```
sdk100.Skill.find({ }, function(err, skills){
    if(err) throw err;//Error
    console.log(skills);//Success
});
```

####Detail:
`POST /skills/:skill_id`

#####NodeJS:
```
sdk100.Skill.findOne({ _id:'skill_id' }, function(err, skill){
    if(err) throw err;//Error
    if(!skill) throw new Error("No Skill");

    console.log(skill);//Success
});
```

####Update:
`POST /skills/:skill_id`
#####NodeJS:
```
sdk100.Skill.findOne({ _id:'skill_id' }, function(err, skill){
    if(err) throw err;//Error
    if(!skill) throw new Error("No Skill");

    //console.log(skill);//Success

    
        skill.name = ...;
    
        skill.namespace = ...;
    
        skill.type = ...;
    
        skill.value = ...;
    
        skill.archiveDate = ...;
    
    skill.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved skill");//Success
    });
});
```

####Delete:
`DELETE /skills/:skill_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
skill.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed skill");//Success
});
```
    

    

###Location:


####Query List:
`GET /locations`

#####NodeJS:
```
sdk100.Location.find({ }, function(err, locations){
    if(err) throw err;//Error
    console.log(locations);//Success
});
```

####Detail:
`POST /locations/:location_id`

#####NodeJS:
```
sdk100.Location.findOne({ _id:'location_id' }, function(err, location){
    if(err) throw err;//Error
    if(!location) throw new Error("No Location");

    console.log(location);//Success
});
```

####Update:
`POST /locations/:location_id`
#####NodeJS:
```
sdk100.Location.findOne({ _id:'location_id' }, function(err, location){
    if(err) throw err;//Error
    if(!location) throw new Error("No Location");

    //console.log(location);//Success

    
        location.name = ...;
    
        location.namespace = ...;
    
        location.desc = ...;
    
        location.type = ...;
    
        location.tagline = ...;
    
        location.original_img = ...;
    
        location.thumb_img = ...;
    
        location.logo_img = ...;
    
        location.facebook_url = ...;
    
        location.twitter_url = ...;
    
        location.linkedin_url = ...;
    
        location.instagram_url = ...;
    
        location.website_url = ...;
    
        location.blog_url = ...;
    
        location.archiveDate = ...;
    
        location.host = ...;
    
    location.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved location");//Success
    });
});
```

####Delete:
`DELETE /locations/:location_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
location.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed location");//Success
});
```
    

    

###Curator:


####Query List:
`GET /locations/:location/curators`

#####NodeJS:
```
sdk100.Curator.find({ }, function(err, curators){
    if(err) throw err;//Error
    console.log(curators);//Success
});
```

####Detail:
`POST /locations/:location/curators/:curator_id`

#####NodeJS:
```
sdk100.Curator.findOne({ _id:'curator_id' }, function(err, curator){
    if(err) throw err;//Error
    if(!curator) throw new Error("No Curator");

    console.log(curator);//Success
});
```

####Update:
`POST /locations/:location/curators/:curator_id`
#####NodeJS:
```
sdk100.Curator.findOne({ _id:'curator_id' }, function(err, curator){
    if(err) throw err;//Error
    if(!curator) throw new Error("No Curator");

    //console.log(curator);//Success

    
        curator._account_name = ...;
    
        curator._location_name = ...;
    
        curator.location = ...;
    
        curator.account = ...;
    
        curator.archiveDate = ...;
    
    curator.save(function(err){
        if(err) throw err;//Error
        console.log("Successfully saved curator");//Success
    });
});
```

####Delete:
`DELETE /locations/:location/curators/:curator_id`


#####NodeJS:
!!!!NOTE: Matt has not written this yet
```
curator.remove(function(err){
    if(err) throw err;//Error
    console.log("Successfully removed curator");//Success
});
```
    


//TOOD: Add Javasript Angular SDK

