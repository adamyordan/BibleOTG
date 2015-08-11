var app = angular.module('AlkitabApps', []);
app.controller('myCtrl', function($scope, $http){

	$(".button-collapse").sideNav();
		$('.modal-trigger').leanModal();

	$scope.search = "Kejadian 1";
	$scope.loading = true;
	var fontSize = 1.0;
	$scope.fontSizeStyle = {'font-size': fontSize + "em"};

	$scope.update = function(){
		$scope.loading = true;
		$http.get("http://sonnylab.com/api/alkitab/" + $scope.search).success(function(response){
			$scope.book = response[0].bookname;
			$scope.chapter = response[0].chapter;
			$scope.verses = [];
			response.forEach(function(item){
				var newItem = {
					verse: item.verse,
					text: item.text
				};
				newItem['text'] = newItem['text'].replace(/&quot;/g, "\"");
				newItem['text'] = newItem['text'].replace('<span id="r">', "");
				newItem['text'] = newItem['text'].replace('</span>', "");
				$scope.verses.push(newItem);
			});
			$scope.loading = false;
		});
	}
	
	$scope.update();
	
	$scope.updateNext = function(){
		var res = $scope.search.split(" ");
		res[res.length-1]++;
		$scope.search = res.join(" ");
		$scope.update();
	};	
	
	$scope.updatePrev = function(){
		var res = $scope.search.split(" ");
		res[res.length-1]--;
		$scope.search = res.join(" ");
		$scope.update();
	};	
	
	$scope.reduceFontSize = function() {
		fontSize -= 0.05;
		$scope.fontSizeStyle = {'font-size': fontSize + "em"};
	}

	$scope.increaseFontSize = function() {
		fontSize += 0.05;
		$scope.fontSizeStyle = {'font-size': fontSize + "em"};
	}

});
