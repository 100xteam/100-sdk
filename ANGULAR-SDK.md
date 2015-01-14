####Meta Assets:
```
<script  src="/bower_components/angular/angular.js"></script>

<script src="/js/app.js"></script>

<script src="//townsqua.re/sdk.js"></script>

<script src="//townsqua.re/js/services/profile.js"></script>
<script src="//townsqua.re/js/services/project.js"></script>


```
Optional Add your own controllers

```
<script src="//townsqua.re/js/controllers/ProfileCtl.js"></script>
<script src="//townsqua.re/js/services/ProjectCtl.js"></script>
```
####/js/app.js:
```
'use strict';

angular.module(
        'static100',
    [
		'njax.bootstrap',
		'njax.sdk',
		'core100.sdk',
		'static100.ProfileCtl',
    'static100.ProjectCtl',
		'core100.profile.service',
		'core100.project.service',

    ]
).run(['Sdk100',
	function( Sdk100) {
		console.log("Running...");
		Sdk100.init({ /* config */}).then(function(){
			console.log("Init success");
		})

	}]);
	
```

####Index Template:
```
<!DOCTYPE html>
<html lang="en" ng-app="static100">
```


####/js/controllers/ProfileCtl.js

```
'use strict';

/* Controllers */

angular.module('static100.ProfileCtl', ['core100.profile.service','njax.bootstrap'])
	.controller(
		'ProfileCtl',
		[
			'$scope',
			'ProfileService',
			'NJaxBootstrap',
			function($scope, ProfileService, NJaxBootstrap) {
				$scope.selectedSkills = [];
				$scope.skills = [];
				$scope.skills_loaded = false;
				NJaxBootstrap.then(function(){
					ProfileService.queryByLocation({ location: NJaxBootstrap._location._id }, function(profiles){
						$scope.profiles = profiles;
					});

					for(var i in NJaxBootstrap._location.tag_options.skills.children){
						$scope.skills.push(NJaxBootstrap._location.tag_options.skills.children[i]);
					}
					$scope.skills_loaded = true;
				});


				$scope.filterSkills = function(selectedSkills) {
					var tags = selectedSkills.join(',');
					var query = {
						location: NJaxBootstrap._location._id,
						tags: tags
					};
					ProfileService.queryByLocation(query).$promise.then(function(profiles){
						$scope.profiles = profiles;
					});

				}
			}
		]
	);
```
####/templates/controllers/select_memebers.html:
```
<div class="row"> 
  <div class="col-sm-4">
      <h2>Current Members</h2>
  </div> 
  <form id="options" class="form-inline col-sm-4 col-sm-push-4" role="form">
    <div class="form-group col-sm-12">
        <select id="skills-filter" data-placeholder="Filter by skills..." class="form-control"
            chosen="$parent.skills"
            ng-model="$parent.selectedSkills"
            ng-options="skill.value as skill.name for skill in $parent.skills"
            ng-change="filterSkills($parent.selectedSkills)"
            ng-if="$parent.skills_loaded"
            multiple>
        </select>
    </div>
  </form>
</div>
<div class="row row-centered clearfix">
  <ul class="list-unstyled list-inline">
    <li class="text-center profile-single" ng-repeat="profile in $parent.profiles" >
      <a href="//{{profile.location_friendly_url}}">
        <div class="profile-img-container">
          <figure style="background-image: url('{{profile.original_img_s3.url}}')" alt="{{ profile.name }}" class="profile-img"></figure>
        </div>
        <p class="name">
            {{ profile.name }}
        </p>
      </a>
    </li>
  </ul>
</div>
```
	
####Profile List Html:

```
<div ng-controller="ProfileCtl" ng-include="'/templates/controllers/select_members.html'"></div>
```

####/js/controllers/ProjectCtl.js

```
'use strict';

/* Controllers */

angular.module('static100.ProjectCtl', ['core100.project.service', 'njax.bootstrap'])
	.controller(
		'ProjectCtl',
		[
			'$scope',
			'$cookies',
			'ProjectService',
			'NJaxBootstrap',
			function ($scope, $cookies, ProjectService, NJaxBootstrap) {
				$scope.selectedSkills = [];
				$scope.skills = [];
				$scope.skills_loaded = false;
				NJaxBootstrap.then(function () {
					var projects = ProjectService.query({ location: NJaxBootstrap._location._id },function () {
						$scope.projects = projects;
					});

					for (var i in NJaxBootstrap._location.tag_options.skills.children) {
						$scope.skills.push(NJaxBootstrap._location.tag_options.skills.children[i]);
					}
					$scope.skills_loaded = true;
				});


				$scope.filterSkills = function (selectedSkills) {
					var tags = selectedSkills.join(',');
					ProjectService.query({ location: NJaxBootstrap._location._id, tags: tags }).$promise.then(function (projects) {
						$scope.projects = projects;
					});

				}
			}
		]
	);
```
###/templates/controllers/select_projects.html:
```
<div class="row">
    <div class="col-sm-4">
        <h2>Projects</h2>
    </div> 
    <form id="options" class="form-inline col-sm-4 col-sm-push-4" role="form">
        <div class="form-group col-sm-12"> 
            <select  id="skills-filter" data-placeholder="Filter by skills..." class="form-control"
            chosen="skills"
            ng-model="$parent.selectedSkills"
            ng-options="skill.value as skill.name for skill in $parent.skills"
            ng-change="filterSkills($parent.selectedSkills)"
            ng-if="$parent.skills_loaded"
            multiple>
        </select>
        </div>
    </form>
</div>
<div class="row row-centered clearfix">
    <ul class="list-unstyled list-inline">
        <li class="text-center profile-single ng-cloak" ng-repeat="project in $parent.projects" ng-hide="project.hide">
            <a href="//{{project.location_friendly_url}}">
                <div class="profile-img-container">
                    <figure style="background-image: url('{{project.original_img_s3.url}}')" alt="{{project.name}}" class="profile-img">
                </div>
                <p class="name">
                  {{ project.name }}
                </p>
            </a>
        </li>
    </ul>
</div>
```
