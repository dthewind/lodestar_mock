(function (ng) {
	'use strict';

	ng.module('app')

		.directive('lsMyAccount', ['UserService', //'ModeService',
			function (UserService, ModeService) {
				return {
					restrict: 'EA',
					replace: true,
					template: '<div  data-ng-bind="msg"></div>', //data-ng-style="getStyle()" data-ng-click="click()"

					controller: ['$scope', '$element',
						function ($scope, $element) {
							$scope.msg = UserService.name;
							$scope.msgText = function () {
								// var msg = 'My Account';
								// if (UserService.isAdmin()) {
								// 	if (ModeService.getIsPreview()) {
								// 		msg = 'PREVIEW';
								// 	} else {
								// 		msg = ModeService.getIsClientMode() ? 'Client' : 'Admin';
								// 	}
								// }
								return $scope.msg; //msg + ': ' + UserService.name;
							};

							$scope.getStyle = function () {
								if (!UserService.isAdmin()) {
									return {
										'cursor': 'auto'
									};
								}
							};

							$scope.click = function () {
								if (UserService.isAdmin()) {
									// if (!ModeService.getIsPreview()) {
									// 	ModeService.toggleIsClientMode();
									// }
								}
							};

							$scope.$on('refreshUser', function () {
								var msg = 'My Account';
								if (UserService.isAdmin()) {
									// if (ModeService.getIsPreview()) {
									// 	msg = 'PREVIEW';
									// } else {
									// 	msg = ModeService.getIsClientMode() ? 'Client' : 'Admin';
									// }
								}
								$scope.msg = msg + ': ' + UserService.name;
							});
						}
					]
				};
			}
		])

	;

})(angular);