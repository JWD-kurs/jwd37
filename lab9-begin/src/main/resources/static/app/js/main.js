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


wafepaApp.controller("RecordsCtrl", function($scope, $http, $location){
	
	var url = "/api/records";
	var urlUsers = "/api/users";
	var urlActivities = "/api/activities";
	
	$scope.records = [];
	$scope.users = [];
	$scope.activities = [];
	
	$scope.newRecord = {};
	$scope.newRecord.time = "";
	$scope.newRecord.duration = "";
	$scope.newRecord.intensity = "";
	$scope.newRecord.activityId = "";
	$scope.newRecord.userId = "";
	
	var getRecords = function(){
		var promise = $http.get(url);
		promise.then(
			function success(res){
				$scope.records = res.data;
			},
			function error(){
				alert("Couldn't fetch records");
			}
		);
	}
	
	getRecords();
	
	//TODO: Obezbediti prihvat korisnika i aktivnosti
	var getUsers = function(){
		
		var promise = $http.get(urlUsers);
		promise.then(
			function success(res){
				$scope.users = res.data;
			},
			function error(res){
				alert("Couldn't fetch users");
			}
		);
	}
	
	getUsers();
	
	var getActivities = function(){
		
		var promise = $http.get(urlActivities);
		promise.then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(res){
				alert("Couldn't fetch activities");
			}
		);
	}
	
	getActivities();
	
	
	
	$scope.doAdd = function(){
		
		$http.post(url, $scope.newRecord).then(
			function success(res){
				getRecords();
				
				$scope.newRecord.time = "";
				$scope.newRecord.duration = "";
				$scope.newRecord.intensity = "";
				$scope.newRecord.activityId = "";
				$scope.newRecord.userId = "";
	
			},
			function error(){
				alert("Couldn't save the record");
			}
		);
	}
	
	$scope.goToEdit = function(id){
		$location.path("/records/edit/" + id);
	}
	
	$scope.doDelete = function(id){
		$http.delete(url + "/" + id).then(
			function success(){
				getRecords();
			},
			function error(){
				alert("Couldn't delete the record.");
			}
		);
	}
});


wafepaApp.controller("EditRecordCtrl", function($scope, $http, $routeParams, $location){
	
	var recordUrl = "/api/records/" + $routeParams.id;
	var activitiesUrl = "/api/activities";
	var usersUrl = "/api/users";
	
	$scope.record = {};
	$scope.record.time = "";
	$scope.record.duration = "";
	$scope.record.intensity = "";
	$scope.record.userId = "";
	$scope.record.activityId = "";	
	
	
	$scope.activities = [];
	$scope.users = [];
	
	
	
	var getActivities = function(){
		$http.get(activitiesUrl).then(
			function success(res){
				$scope.activities = res.data;
				
				getUsers();
			},
			function error(){
				alert("Couldn't fetch activities");
			}
		);
	}
	
	var getUsers = function(){
		return $http.get(usersUrl).then(
			function success(res){
				$scope.users = res.data;
				
				getRecord();
			},
			function error(){
				alert("Couldn't fetch users.");
			}
		);
	}
	
	var getRecord = function(){
		$http.get(recordUrl).then(
			function success(res){
				$scope.record = res.data;
			},
			function error(){
				alert("Couldn't fetch record.");
			}
		);
	}
	
	//TODO: Obezbediti redosled izvrsavanja!

	
	getActivities();
	
	
	
	$scope.doEdit = function(){
		$http.put(recordUrl, $scope.record).then(
			function success(){
				$location.path("/records");
			},
			function error(){
				alert("Something went wrong.");
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
		.when('/records', {
			templateUrl : '/app/html/records.html'
		})
		.when('/records/edit/:id', {
			templateUrl : '/app/html/edit-record.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
