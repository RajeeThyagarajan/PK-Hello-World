/* Name: services.js
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
//factory shared object between controllers

angular.module('Recharge').service("dataSharingService", function() {
	var topUpDetail = {};
	var topUpSubmitResponse = null;
	return {
	setDetail :function(detail) {
		topUpDetail = detail;
	},
	getDetail :function() {
		return topUpDetail;
	},
	setTopUpSubmitResponse:function(response){
		topUpSubmitResponse = response;
	},
	getTopUpSubmitResponse:function(){
		return topUpSubmitResponse ;
	}
	};
}) 
.service("myWebService",function($http,CONFIG){
	console.log('config',CONFIG);
	var countryList = null,
	 topUpAmount = null,
	 paymentDeviceType = null;
	
	return{
		getCountryList:function(){
			var promise = $http.get(CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.getCountryList).then(function(response) {
				
			
				countryList=  response.data.country;
			});
			return promise;
		},
		getTopUpAmount:function(){
			var promise = $http.get(CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.getTopUpAmounts).then(function(response) {
				topUpAmount =  response.data.pricePoint;
			});
			return promise;
		},
		getPaymentDeviceType:function(){
			var promise = $http.get(CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.getPaymentDeviceType).then(function(response) {
				paymentDeviceType =  response.data.paymentDevices;
			});
			return promise;
		},
		getRegionlist:function(countryCode,cb){
			$http.get(CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.getCountryRegion+countryCode).then(function(response) {
				cb(response);
			});
			
		},
		validateMdn:function(mobileNumber,cb){
			$http.get(CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.getMdnQuery+mobileNumber).then(function(response) {
				cb(response);
			});
		},
		topUpSubmit:function($scope,cb){
			console.log('aaa',$scope);
			var postData =  {
						    "PDCountryCode": $scope.topUpDetail.country.countryCode,
						    "ChargeAccountNumber": $scope.topUpDetail.cardNumber,
						    "IsGift": "false",
						    "CurrencyCode": $scope.topUpDetail.currencyCode,
						    "ChargeAmount": $scope.topUpDetail.amount.Amount,
						    "ChargeCVN": $scope.topUpDetail.cardSecuritykey,
						    "SelectedPaymentDeviceChargeTypeCD": $scope.topUpDetail.card.PaymentDeviceChargeTypeCD,
						    "PDPostalCode": "",
						    "PDAddressLine1":$scope.topUpDetail.address1,
						    "PDAddressLine2": $scope.topUpDetail.address2 || "",
						    "SVAID": $scope.topUpDetail.svaid,
						    "PDRegion": $scope.topUpDetail.region.Name || $scope.topUpDetail.region,
						    "PDFirstName": $scope.topUpDetail.cardFirstName,
						    "PDLastName": $scope.topUpDetail.cardLastName,
						    "PDCity": $scope.topUpDetail.city,
						    "ChargeExpirationMMYY": $scope.topUpDetail.cardExpiryMonth+$scope.topUpDetail.cardExpiryYear,
						    "OriginatingIPAddress": "127.0.0.1"
						  };
						
			
			$http({
		        url: CONFIG.app[CONFIG.app.mode].webServiceUrl+CONFIG.requests.topUpService,
		        method: "POST",
		        data: JSON.stringify({req:postData}),
		        headers: {'Content-Type': 'application/json'}
		      }).success(function (data, status, headers, config) {
		          
		           cb(data);
		        }).error(function (data, status, headers, config) {
		           
		        });
	
		},
		getDataCountryList:function(){
			return countryList;
		},
		getDataTopUpAmountList:function(){
			return topUpAmount;
		},
		getPaymentDeviceTypeList:function(){
			return paymentDeviceType;
		}
	};
})
.service("commonFunctions",function($http,CONFIG){
	var digitToshow = 4;
	return {
		maskCreditCard:function(number){
			var temp;
			if(number){
			 temp = new Array(number.length - digitToshow + 1).join('x')
		       + number.slice( -digitToshow);
			
			}
			return temp;
		}
	};
});

