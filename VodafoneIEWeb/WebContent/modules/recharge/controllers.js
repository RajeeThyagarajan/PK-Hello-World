/* Name: controllers.js
 * Module: Recharge
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
angular.module('Recharge').controller('homeController', function($scope, $rootScope, dataSharingService, $location, myWebService) {

	$scope.topUpDetail = {};
	$scope.countryList = myWebService.getDataCountryList();
	$scope.topUpAmount = myWebService.getDataTopUpAmountList();
	$scope.paymentDeviceType = myWebService.getPaymentDeviceTypeList();
	
	//set default selected item here
    $scope.topUpDetail.amount = $scope.topUpAmount[0];
    $scope.topUpDetail.card = $scope.paymentDeviceType[0];
    $scope.topUpDetail.country = $scope.countryList[0];

	$scope.topUpPreview = function(topUpDetail) {

		dataSharingService.setDetail(topUpDetail);

		if ($scope.topUpDetailForm.$invalid) {
			$scope.showError = 'show-custom-error';
			//show custom message for credit card validation
			return;
		} else {
			$location.path('/preview');
		}
	};
	$scope.getRegionlist = function(countryCode){
		 myWebService.getRegionlist(countryCode,function(response){
			 $scope.regionList = response.data.region;
			 
			 if (angular.isArray($scope.regionList)) {
				 $scope.topUpDetail.region = $scope.regionList[0];//default value for select menu
				};
		 });
		
	};
	
	$scope.validateMdn = function(mobileNumber){
		if(mobileNumber!='08' && mobileNumber.length==10){
			 myWebService.validateMdn(mobileNumber,function(response){
				 console.log('response',response);
				 $scope.topUpDetail.svaid = response.data.MDN.SVAID;
				 $scope.topUpDetail.currencyCode = response.data.MDN.CurrencyCode;
				
			 });
		}
	};
}).controller('previewController', function($scope, dataSharingService, $location,myWebService,commonFunctions) {

	
	$scope.maskCreditCard = commonFunctions.maskCreditCard;//common function between controllers defined in this service
	
	$scope.topUpDetail = dataSharingService.getDetail();
	

	$scope.topUpSubmit = function() {
		
		if ($scope.termsConditions) {
			myWebService.topUpSubmit($scope,function(response){
				dataSharingService.setTopUpSubmitResponse(response);
				$location.path('/confirmation');
			});
				
			
			
		} else {
			alert('please accept terms and conditions');
		}

	};
}).controller('confirmationController', function($scope, dataSharingService, $location,commonFunctions) {
	$scope.maskCreditCard = commonFunctions.maskCreditCard;//common function between controllers defined in this service
	$scope.topUpDetail = dataSharingService.getDetail();
	$scope.topUpSubmitResponse = dataSharingService.getTopUpSubmitResponse();
	
	
});
