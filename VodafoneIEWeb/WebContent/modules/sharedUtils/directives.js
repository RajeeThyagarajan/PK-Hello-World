/* Name: directives.js
 * Module: SharedUtils
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
//custom reusable directives

angular.module('SharedUtils').directive('numbersOnly', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				// this next if is necessary for when using ng-required on your input.
				// In such cases, when a letter is typed first, this parser will be called
				// again, and the 2nd time, the value will be undefined
				if (inputValue == undefined)
					return '';
				var transformedInput = inputValue.replace(/[^0-9]/g, '');
				if (transformedInput != inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}

				return transformedInput;
			});
		}
	};
});
