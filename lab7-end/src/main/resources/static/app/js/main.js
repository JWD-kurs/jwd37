var wafepaApp = angular.module("wafepa", ["ngRoute"]);

wafepaApp.controller("HomeCtrl", function($scope){
	$scope.message = "Hello JWD!";
});


wafepaApp.controller("ActivitiesCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	
	var getActivities = function(){
		var promise = $http.get(baseUrl);
		promise.then(
			function success(res){
				//console.log(res);
				$scope.activities = res.data;
			},
			function error(){
				
			}
		);
		
		//console.log("test");	
	}
	
	getActivities();
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
});


wafepaApp.controller("EditActivityCtrl", function($scope, $routeParams, $http, $location){
	//console.log($routeParams);
	var url = "/api/activities/" + $routeParams.id;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		var promise = $http.get(url);
		promise.then(
			function uspeh(res){
				$scope.activity = res.data;
			},
			function neuspeh(){
				alert("Couldn't fetch activity.")
			}
		);
	} 
	
	getActivity();
	
	$scope.doEdit = function(){
		$http.put(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				
			}
		);
	}
});


wafepaApp.controller("AddActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	
	$scope.doAdd = function(){
		var promise = $http.post(url, $scope.activity);
		promise.then(
			function success(res){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't save the activity.");
			}
		);
	}
	
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/home.html',
			controller : 'HomeCtrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:id', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
