/* Name: routes.js
 * Version: 1.0
 * Author: Prokarma
 *
 * -------------------------------------------------------------
 * Copyright (c) 2012 Prokarma, Inc.
 * All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 * --------------------------------------------------------------
 */
// configure our routes
angular.module('MainApp').config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'modules/recharge/views/topUpEnter.html',
		controller : 'homeController',
		resolve : {
			countryList : function(myWebService) {
				return myWebService.getCountryList();
			},
			topUpAmount : function(myWebService) {
				return myWebService.getTopUpAmount();
			},
			paymentDeviceType:function(myWebService){
				return myWebService.getPaymentDeviceType();
			}
		}
	}).when('/preview', {
		templateUrl : 'modules/recharge/views/topUpPreview.html',
		controller : 'previewController'
	}).when('/confirmation', {
		templateUrl : 'modules/recharge/views/topUpConfirmation.html',
		controller : 'confirmationController'
	}).otherwise({
        redirectTo: '/'
      });
}).run(function($rootScope) {//To show loader till dependency services are resolved
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		if (curr.$$route && curr.$$route.resolve) {
			// Show a loading message until promises are not resolved
			$rootScope.loadingView = true;
		}
	});
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
		// Hide loading message
		$rootScope.loadingView = false;
	});
}); 