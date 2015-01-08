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
	
####Profile List Html:

```
<div ng-controller="ProfileCtl" ng-include="'/templates/controllers/select_members.html'"></div>
```
